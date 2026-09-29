//! Stores the GitHub token in a dot-folder under the user's home directory.
//!
//! `~/.course-export/credentials.json`: the same path on Windows, macOS and
//! Linux, because an instructor moving between machines should not have to
//! remember three conventions.
//!
//! The token is never printed back in full; `auth status` shows only the last
//! four characters so you can tell *which* token is stored without exposing it.

use anyhow::{Context, Result};
use serde::{Deserialize, Serialize};
use std::path::PathBuf;

const DIR_NAME: &str = ".course-export";
const FILE_NAME: &str = "credentials.json";

#[derive(Serialize, Deserialize, Default)]
pub struct Credentials {
    pub token: String,
    /// The GitHub login the token belonged to when it was saved: shown by
    /// `auth status` so you can spot a token for the wrong account.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub login: Option<String>,
}

/// Overrides the storage directory. Useful on a locked-down machine where the
/// home directory is not writable, and how the round-trip test avoids touching
/// the real one.
const HOME_OVERRIDE: &str = "COURSE_EXPORT_HOME";

pub fn dir() -> Result<PathBuf> {
    if let Ok(custom) = std::env::var(HOME_OVERRIDE) {
        if !custom.trim().is_empty() {
            return Ok(PathBuf::from(custom));
        }
    }
    let home = dirs::home_dir().context("could not determine your home directory")?;
    Ok(home.join(DIR_NAME))
}

pub fn path() -> Result<PathBuf> {
    Ok(dir()?.join(FILE_NAME))
}

pub fn load() -> Result<Option<Credentials>> {
    let p = path()?;
    if !p.exists() {
        return Ok(None);
    }
    let raw = std::fs::read_to_string(&p)
        .with_context(|| format!("reading {}", p.display()))?;
    let creds: Credentials = serde_json::from_str(&raw)
        .with_context(|| format!("{} is not valid JSON: delete it and run `auth login`", p.display()))?;
    if creds.token.trim().is_empty() {
        return Ok(None);
    }
    Ok(Some(creds))
}

pub fn save(creds: &Credentials) -> Result<PathBuf> {
    let d = dir()?;
    std::fs::create_dir_all(&d).with_context(|| format!("creating {}", d.display()))?;
    let p = path()?;
    let json = serde_json::to_string_pretty(creds)? + "\n";
    std::fs::write(&p, json).with_context(|| format!("writing {}", p.display()))?;
    restrict_permissions(&p)?;
    Ok(p)
}

pub fn delete() -> Result<bool> {
    let p = path()?;
    if p.exists() {
        std::fs::remove_file(&p).with_context(|| format!("removing {}", p.display()))?;
        return Ok(true);
    }
    Ok(false)
}

/// Owner-read/write only. A token in a world-readable file is a real problem on
/// a shared training machine.
#[cfg(unix)]
fn restrict_permissions(p: &std::path::Path) -> Result<()> {
    use std::os::unix::fs::PermissionsExt;
    let mut perms = std::fs::metadata(p)?.permissions();
    perms.set_mode(0o600);
    std::fs::set_permissions(p, perms)?;
    Ok(())
}

/// On Windows the file inherits the user-profile ACL, which is already
/// per-user. There is no portable chmod equivalent worth emulating here.
#[cfg(not(unix))]
fn restrict_permissions(_p: &std::path::Path) -> Result<()> {
    Ok(())
}

/// `ghp_xxxx…ab12`: enough to identify, not enough to use.
pub fn mask(token: &str) -> String {
    let n = token.chars().count();
    if n <= 8 {
        return "*".repeat(n.max(1));
    }
    let prefix: String = token.chars().take(4).collect();
    let suffix: String = token.chars().skip(n - 4).collect();
    format!("{prefix}…{suffix}")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn mask_keeps_only_the_ends() {
        assert_eq!(mask("ghp_abcdefghijkl"), "ghp_…ijkl");
    }

    #[test]
    fn mask_hides_short_tokens_entirely() {
        assert_eq!(mask("short"), "*****");
        assert!(!mask("short").contains('s'));
    }

    /// Save → load → delete, against a temp directory rather than the real home.
    /// Sets the override, so it must not run beside other env-touching tests.
    #[test]
    fn credentials_round_trip() {
        let tmp = std::env::temp_dir().join(format!("course-export-test-{}", std::process::id()));
        std::env::set_var(HOME_OVERRIDE, &tmp);

        assert!(load().unwrap().is_none(), "should start empty");

        let saved = save(&Credentials {
            token: "ghp_exampleTokenValue1234".into(),
            login: Some("octocat".into()),
        })
        .unwrap();
        assert!(saved.exists());

        let loaded = load().unwrap().expect("token should load back");
        assert_eq!(loaded.token, "ghp_exampleTokenValue1234");
        assert_eq!(loaded.login.as_deref(), Some("octocat"));

        // The stored file must not be world-readable on unix.
        #[cfg(unix)]
        {
            use std::os::unix::fs::PermissionsExt;
            let mode = std::fs::metadata(&saved).unwrap().permissions().mode();
            assert_eq!(mode & 0o077, 0, "credentials must not be group/other readable");
        }

        assert!(delete().unwrap());
        assert!(load().unwrap().is_none(), "should be gone after delete");

        std::env::remove_var(HOME_OVERRIDE);
        let _ = std::fs::remove_dir_all(&tmp);
    }
}

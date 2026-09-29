//! The slice of the GitHub REST API this tool needs.
//!
//! The export is pushed as **one commit built through the Git Data API**
//! (blobs → tree → commit → ref) rather than file-by-file through the Contents
//! API. Two reasons: it is a single atomic commit rather than one commit per
//! file, and because the tree is created *without* a `base_tree`, it replaces
//! the whole repository, so content deleted here disappears there instead of
//! lingering forever.
//!
//! No `git` binary is required.

use anyhow::{anyhow, bail, Result};
use base64::Engine;
use serde_json::{json, Value};

const API: &str = "https://api.github.com";
const UA: &str = concat!("course-export/", env!("CARGO_PKG_VERSION"));

pub struct Client {
    token: String,
}

/// Where a repository's default branch currently points, if anywhere.
pub enum Head {
    /// Existing branch: (commit sha, tree sha)
    At { commit: String, tree: String },
    /// Repository exists but the branch does not: a fresh, empty repo.
    Empty,
}

impl Client {
    pub fn new(token: impl Into<String>) -> Self {
        Self { token: token.into() }
    }

    fn get(&self, url: &str) -> Result<Option<Value>> {
        let res = ureq::get(url)
            .set("Authorization", &format!("Bearer {}", self.token))
            .set("Accept", "application/vnd.github+json")
            .set("X-GitHub-Api-Version", "2022-11-28")
            .set("User-Agent", UA)
            .call();
        match res {
            Ok(r) => Ok(Some(r.into_json()?)),
            Err(ureq::Error::Status(404, _)) => Ok(None),
            Err(e) => Err(describe(e, url)),
        }
    }

    fn send(&self, method: &str, url: &str, body: Value) -> Result<Value> {
        let res = ureq::request(method, url)
            .set("Authorization", &format!("Bearer {}", self.token))
            .set("Accept", "application/vnd.github+json")
            .set("X-GitHub-Api-Version", "2022-11-28")
            .set("User-Agent", UA)
            .send_json(body);
        match res {
            Ok(r) => Ok(r.into_json()?),
            Err(e) => Err(describe(e, url)),
        }
    }

    /// Verify the token and return the login it belongs to.
    pub fn whoami(&self) -> Result<String> {
        let v = self
            .get(&format!("{API}/user"))?
            .ok_or_else(|| anyhow!("GitHub rejected the token (404 on /user)"))?;
        v["login"]
            .as_str()
            .map(str::to_string)
            .ok_or_else(|| anyhow!("unexpected /user response: no login field"))
    }

    pub fn repo_exists(&self, owner: &str, repo: &str) -> Result<bool> {
        Ok(self.get(&format!("{API}/repos/{owner}/{repo}"))?.is_some())
    }

    /// Create the repository under the user, or under an org when `owner` is not
    /// the authenticated login.
    pub fn create_repo(&self, login: &str, owner: &str, repo: &str, private: bool, description: &str) -> Result<()> {
        let url = if owner.eq_ignore_ascii_case(login) {
            format!("{API}/user/repos")
        } else {
            format!("{API}/orgs/{owner}/repos")
        };
        self.send(
            "POST",
            &url,
            json!({
                "name": repo,
                "private": private,
                "description": description,
                "auto_init": false,
                "has_issues": false,
                "has_wiki": false,
            }),
        )?;
        Ok(())
    }

    pub fn head(&self, owner: &str, repo: &str, branch: &str) -> Result<Head> {
        let url = format!("{API}/repos/{owner}/{repo}/git/ref/heads/{branch}");
        let Some(v) = self.get(&url)? else {
            return Ok(Head::Empty);
        };
        let commit = v["object"]["sha"]
            .as_str()
            .ok_or_else(|| anyhow!("ref response had no object.sha"))?
            .to_string();

        let c = self
            .get(&format!("{API}/repos/{owner}/{repo}/git/commits/{commit}"))?
            .ok_or_else(|| anyhow!("commit {commit} not found"))?;
        let tree = c["tree"]["sha"]
            .as_str()
            .ok_or_else(|| anyhow!("commit response had no tree.sha"))?
            .to_string();

        Ok(Head::At { commit, tree })
    }

    /// Upload binary content and return its blob sha.
    pub fn create_blob(&self, owner: &str, repo: &str, bytes: &[u8]) -> Result<String> {
        let encoded = base64::engine::general_purpose::STANDARD.encode(bytes);
        let v = self.send(
            "POST",
            &format!("{API}/repos/{owner}/{repo}/git/blobs"),
            json!({ "content": encoded, "encoding": "base64" }),
        )?;
        v["sha"]
            .as_str()
            .map(str::to_string)
            .ok_or_else(|| anyhow!("blob response had no sha"))
    }

    /// Create a tree from prepared entries. No `base_tree`, so this is the
    /// complete content of the repository.
    pub fn create_tree(&self, owner: &str, repo: &str, entries: Vec<Value>) -> Result<String> {
        let v = self.send(
            "POST",
            &format!("{API}/repos/{owner}/{repo}/git/trees"),
            json!({ "tree": entries }),
        )?;
        v["sha"]
            .as_str()
            .map(str::to_string)
            .ok_or_else(|| anyhow!("tree response had no sha"))
    }

    pub fn create_commit(&self, owner: &str, repo: &str, message: &str, tree: &str, parent: Option<&str>) -> Result<String> {
        let mut body = json!({ "message": message, "tree": tree });
        body["parents"] = match parent {
            Some(p) => json!([p]),
            None => json!([]),
        };
        let v = self.send("POST", &format!("{API}/repos/{owner}/{repo}/git/commits"), body)?;
        v["sha"]
            .as_str()
            .map(str::to_string)
            .ok_or_else(|| anyhow!("commit response had no sha"))
    }

    /// Point the branch at `commit`, creating the ref if the repo was empty.
    pub fn set_ref(&self, owner: &str, repo: &str, branch: &str, commit: &str, create: bool) -> Result<()> {
        if create {
            self.send(
                "POST",
                &format!("{API}/repos/{owner}/{repo}/git/refs"),
                json!({ "ref": format!("refs/heads/{branch}"), "sha": commit }),
            )?;
        } else {
            self.send(
                "PATCH",
                &format!("{API}/repos/{owner}/{repo}/git/refs/heads/{branch}"),
                // The export is authoritative: it may drop files, which is not a
                // fast-forward, so the update has to be forced.
                json!({ "sha": commit, "force": true }),
            )?;
        }
        Ok(())
    }
}

/// Turn a ureq error into something an instructor can act on.
fn describe(e: ureq::Error, url: &str) -> anyhow::Error {
    match e {
        ureq::Error::Status(code, r) => {
            let body = r.into_string().unwrap_or_default();
            let msg = serde_json::from_str::<Value>(&body)
                .ok()
                .and_then(|v| v["message"].as_str().map(str::to_string))
                .unwrap_or_else(|| body.chars().take(300).collect());
            let hint = match code {
                401 => "\n  The token was rejected. Run `course-export auth login` with a fresh token.",
                403 => "\n  Forbidden: usually a missing `repo` scope, or a rate limit. Check the token's scopes.",
                404 => "\n  Not found: check the owner/name, and that the token can see it (private repos need `repo`).",
                422 => "\n  GitHub rejected the request as invalid. If creating a repo, the name may already be taken.",
                _ => "",
            };
            anyhow!("GitHub returned {code} for {url}\n  {msg}{hint}")
        }
        other => anyhow::Error::new(other).context(format!("request to {url} failed")),
    }
}

/// Validate and split an `owner/name` argument.
pub fn split_repo(spec: &str) -> Result<(String, String)> {
    let parts: Vec<&str> = spec.split('/').collect();
    if parts.len() != 2 || parts[0].is_empty() || parts[1].is_empty() {
        bail!("--repo must look like `owner/name` (got `{spec}`)");
    }
    let name = parts[1].trim_end_matches(".git");
    Ok((parts[0].to_string(), name.to_string()))
}

/// Best-effort short sha of the source repo, for the default commit message.
/// Uses the `git` binary if present; absence is not an error.
pub fn source_revision(root: &std::path::Path) -> Option<String> {
    let out = std::process::Command::new("git")
        .args(["rev-parse", "--short", "HEAD"])
        .current_dir(root)
        .output()
        .ok()?;
    if !out.status.success() {
        return None;
    }
    let s = String::from_utf8(out.stdout).ok()?.trim().to_string();
    (!s.is_empty()).then_some(s)
}

pub fn context_for(owner: &str, repo: &str) -> String {
    format!("https://github.com/{owner}/{repo}")
}

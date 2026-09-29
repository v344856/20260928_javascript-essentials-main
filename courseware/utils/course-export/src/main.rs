//! course-export: publish the student-facing course content to a GitHub repo.
//!
//! The working repository holds three kinds of material: the course itself, the
//! instructor's planning material, and the tooling that builds and checks it.
//! Only the first belongs in a repository students can see. This tool makes that
//! split explicit, shows it to you before anything is sent, and pushes the result
//! as a single commit.

mod credentials;
mod github;
mod manifest;

use anyhow::{bail, Context, Result};
use clap::{Parser, Subcommand};
use credentials::Credentials;
use serde_json::json;
use std::io::Write;
use std::path::{Path, PathBuf};

/// GitHub rejects blobs above this; warn well before it.
const LARGE_FILE_WARN: usize = 25 * 1024 * 1024;
const LARGE_FILE_MAX: usize = 100 * 1024 * 1024;

#[derive(Parser)]
#[command(
    name = "course-export",
    version,
    about = "Export the student-facing course content to a GitHub repository.",
    long_about = "Publishes the course to GitHub, leaving behind the instructor folder, \
                  the AI-agent instructions, and the build/validation tooling.\n\n\
                  Run `course-export plan` first: it prints exactly what would ship."
)]
struct Cli {
    /// Path to the course repository (defaults to the working directory, walking
    /// up to find the repo root).
    #[arg(long, global = true, value_name = "DIR")]
    root: Option<PathBuf>,

    #[command(subcommand)]
    command: Command,
}

#[derive(Subcommand)]
enum Command {
    /// Manage the stored GitHub token.
    #[command(subcommand)]
    Auth(AuthCmd),

    /// Show what would be exported, without contacting GitHub.
    Plan {
        /// Also list every excluded file, not just the rules.
        #[arg(long)]
        verbose: bool,
    },

    /// Export the course to GitHub as a single commit.
    Push {
        /// Target repository, as `owner/name`.
        #[arg(long, value_name = "OWNER/NAME")]
        repo: String,

        /// Branch to update.
        #[arg(long, default_value = "main")]
        branch: String,

        /// Commit message. Defaults to one naming the source revision.
        #[arg(long, short = 'm')]
        message: Option<String>,

        /// Create the repository if it does not exist.
        #[arg(long)]
        create: bool,

        /// Make a newly created repository public. The course LICENSE restricts
        /// the documents to enrolled students, so new repos are private unless
        /// you ask for otherwise.
        #[arg(long)]
        public: bool,

        /// Skip the confirmation prompt.
        #[arg(long, short = 'y')]
        yes: bool,

        /// Do everything except create the commit.
        #[arg(long)]
        dry_run: bool,
    },
}

#[derive(Subcommand)]
enum AuthCmd {
    /// Prompt for a GitHub token and store it under your home directory.
    Login {
        /// Read the token from this env var instead of prompting.
        #[arg(long, value_name = "VAR")]
        from_env: Option<String>,
    },
    /// Show whether a token is stored, and who it belongs to.
    Status,
    /// Delete the stored token.
    Logout,
}

fn main() {
    if let Err(e) = run() {
        eprintln!("\nerror: {e:#}");
        std::process::exit(1);
    }
}

fn run() -> Result<()> {
    let cli = Cli::parse();
    let root = resolve_root(cli.root.as_deref())?;

    match cli.command {
        Command::Auth(cmd) => auth(cmd),
        Command::Plan { verbose } => plan(&root, verbose),
        Command::Push { repo, branch, message, create, public, yes, dry_run } => {
            push(&root, &repo, &branch, message.as_deref(), create, public, yes, dry_run)
        }
    }
}

/// Find the course repository root: the nearest ancestor holding `courseware/`.
fn resolve_root(explicit: Option<&Path>) -> Result<PathBuf> {
    let start = match explicit {
        Some(p) => p.to_path_buf(),
        None => std::env::current_dir().context("reading the working directory")?,
    };
    let start = start
        .canonicalize()
        .with_context(|| format!("{} does not exist", start.display()))?;

    for dir in start.ancestors() {
        if dir.join("courseware").is_dir() {
            return Ok(dir.to_path_buf());
        }
    }
    bail!(
        "could not find the course root from {}\n  \
         Expected an ancestor directory containing `courseware/`. Pass --root explicitly.",
        start.display()
    )
}

// ---------------------------------------------------------------------------
// auth
// ---------------------------------------------------------------------------

fn auth(cmd: AuthCmd) -> Result<()> {
    match cmd {
        AuthCmd::Login { from_env } => {
            let token = match from_env {
                Some(var) => std::env::var(&var)
                    .with_context(|| format!("environment variable {var} is not set"))?,
                None => prompt_for_token()?,
            };
            let token = token.trim().to_string();
            if token.is_empty() {
                bail!("no token entered: nothing was saved");
            }

            print!("Verifying with GitHub... ");
            std::io::stdout().flush().ok();
            let login = github::Client::new(&token)
                .whoami()
                .context("could not verify the token")?;
            println!("ok, it belongs to {login}.");

            let path = credentials::save(&Credentials { token, login: Some(login) })?;
            println!("Saved to {}", path.display());
            #[cfg(unix)]
            println!("Permissions set to 0600 (owner read/write only).");
            Ok(())
        }

        AuthCmd::Status => match credentials::load()? {
            Some(c) => {
                println!("Token:  {}", credentials::mask(&c.token));
                println!("Owner:  {}", c.login.as_deref().unwrap_or("(unknown)"));
                println!("Stored: {}", credentials::path()?.display());
                Ok(())
            }
            None => {
                println!("No token stored. Run `course-export auth login`.");
                Ok(())
            }
        },

        AuthCmd::Logout => {
            if credentials::delete()? {
                println!("Removed {}", credentials::path()?.display());
            } else {
                println!("No stored token to remove.");
            }
            Ok(())
        }
    }
}

fn prompt_for_token() -> Result<String> {
    println!("A GitHub personal access token is needed to create and push to the export repo.");
    println!();
    println!("  Create one at: https://github.com/settings/tokens");
    println!("  Scope needed:  `repo`  (classic)  or  Contents: read+write (fine-grained)");
    println!();
    println!("The token is stored at ~/.course-export/credentials.json and reused next time.");
    println!();
    // Read without echoing: this is a secret, and instructors often screen-share.
    let token = rpassword::prompt_password("GitHub token (input hidden): ")
        .context("could not read the token")?;
    Ok(token)
}

fn stored_token() -> Result<String> {
    match credentials::load()? {
        Some(c) => Ok(c.token),
        None => bail!("no GitHub token stored: run `course-export auth login` first"),
    }
}

// ---------------------------------------------------------------------------
// plan
// ---------------------------------------------------------------------------

fn plan(root: &Path, verbose: bool) -> Result<()> {
    let p = manifest::build(root)?;
    print_plan(root, &p, verbose);
    Ok(())
}

fn print_plan(root: &Path, p: &manifest::Plan, verbose: bool) {
    println!("Source: {}", display_path(root));
    println!();

    println!("EXCLUDED: not student content");
    for rule in manifest::EXCLUDED {
        let n = p.excluded.iter().filter(|(_, r)| r.prefix == rule.prefix).count();
        if n > 0 {
            println!("  {:<32} {:>3} file(s)   {}", rule.prefix, n, rule.reason);
        }
    }
    if verbose {
        println!();
        for (path, _) in &p.excluded {
            println!("    - {path}");
        }
    }

    println!();
    println!("INCLUDED: {} file(s), {}", p.included.len(), human(p.total_bytes()));

    // Group by top-level folder so the shape is visible at a glance.
    let mut groups: Vec<(String, usize, usize)> = Vec::new();
    for e in &p.included {
        let top = match e.path.split_once('/') {
            Some((head, rest)) => match rest.split_once('/') {
                Some((mid, _)) if head == "courseware" => format!("courseware/{mid}/"),
                _ => format!("{head}/"),
            },
            None => "(root files)".to_string(),
        };
        match groups.iter_mut().find(|(g, _, _)| *g == top) {
            Some(g) => {
                g.1 += 1;
                g.2 += e.size();
            }
            None => groups.push((top, 1, e.size())),
        }
    }
    groups.sort();
    for (g, n, bytes) in &groups {
        println!("  {:<32} {:>3} file(s)   {}", g, n, human(*bytes));
    }

    if p.binary_count() > 0 {
        println!();
        println!(
            "  {} binary file(s) will be uploaded individually; the rest go in one request.",
            p.binary_count()
        );
    }
}

/// `canonicalize` yields Windows extended-length paths (`\\?\C:\...`), which are
/// correct but ugly to print. Strip the prefix for display only.
fn display_path(p: &Path) -> String {
    let s = p.display().to_string();
    s.strip_prefix(r"\\?\").unwrap_or(&s).to_string()
}

fn human(bytes: usize) -> String {
    const KB: usize = 1024;
    const MB: usize = KB * 1024;
    if bytes >= MB {
        format!("{:.1} MB", bytes as f64 / MB as f64)
    } else if bytes >= KB {
        format!("{:.0} KB", bytes as f64 / KB as f64)
    } else {
        format!("{bytes} B")
    }
}

// ---------------------------------------------------------------------------
// push
// ---------------------------------------------------------------------------

#[allow(clippy::too_many_arguments)]
fn push(
    root: &Path,
    repo_spec: &str,
    branch: &str,
    message: Option<&str>,
    create: bool,
    public: bool,
    yes: bool,
    dry_run: bool,
) -> Result<()> {
    let (owner, repo) = github::split_repo(repo_spec)?;
    let plan = manifest::build(root)?;

    if plan.included.is_empty() {
        bail!("nothing to export from {}", display_path(root));
    }

    // Refuse anything GitHub will reject, before uploading 100 MB of it.
    for e in &plan.included {
        if e.size() > LARGE_FILE_MAX {
            bail!(
                "{} is {}: over GitHub's {} per-file limit",
                e.path,
                human(e.size()),
                human(LARGE_FILE_MAX)
            );
        }
        if e.size() > LARGE_FILE_WARN {
            eprintln!("warning: {} is {}; this will be slow to upload", e.path, human(e.size()));
        }
    }

    print_plan(root, &plan, false);
    println!();
    println!("TARGET  {}", github::context_for(&owner, &repo));
    println!("BRANCH  {branch}");

    let default_msg = match github::source_revision(root) {
        Some(sha) => format!("Update course content (source {sha})"),
        None => "Update course content".to_string(),
    };
    let message = message.unwrap_or(&default_msg);
    println!("COMMIT  {message}");

    if dry_run {
        println!();
        println!("Dry run: nothing was sent to GitHub.");
        return Ok(());
    }

    if !yes {
        println!();
        println!("This REPLACES the branch contents: files not listed above are removed there.");
        print!("Proceed? [y/N] ");
        std::io::stdout().flush().ok();
        let mut answer = String::new();
        std::io::stdin().read_line(&mut answer)?;
        if !matches!(answer.trim().to_lowercase().as_str(), "y" | "yes") {
            println!("Canceled.");
            return Ok(());
        }
    }

    let client = github::Client::new(stored_token()?);
    println!();
    let login = client.whoami().context("could not verify the stored token")?;
    println!("Authenticated as {login}.");

    if !client.repo_exists(&owner, &repo)? {
        if !create {
            bail!(
                "{}/{} does not exist. Re-run with --create to make it \
                 (private by default; add --public to override).",
                owner,
                repo
            );
        }
        let private = !public;
        println!(
            "Creating {}/{} ({})...",
            owner,
            repo,
            if private { "private" } else { "PUBLIC" }
        );
        client.create_repo(
            &login,
            &owner,
            &repo,
            private,
            "JavaScript & TypeScript Essentials: course content for enrolled students.",
        )?;
    }

    let head = client.head(&owner, &repo, branch)?;

    // Binary files become blobs; text goes inline in the tree request.
    let mut entries = Vec::with_capacity(plan.included.len());
    let binary_total = plan.binary_count();
    let mut uploaded = 0usize;

    for e in &plan.included {
        if e.is_text {
            let text = std::str::from_utf8(&e.bytes).expect("checked at scan time");
            entries.push(json!({
                "path": e.path,
                "mode": e.mode,
                "type": "blob",
                "content": text,
            }));
        } else {
            uploaded += 1;
            print!("\r  uploading binary {uploaded}/{binary_total}: {:<50}", truncate(&e.path, 50));
            std::io::stdout().flush().ok();
            let sha = client
                .create_blob(&owner, &repo, &e.bytes)
                .with_context(|| format!("uploading {}", e.path))?;
            entries.push(json!({
                "path": e.path,
                "mode": e.mode,
                "type": "blob",
                "sha": sha,
            }));
        }
    }
    if binary_total > 0 {
        println!("\r  uploaded {binary_total} binary file(s).{:<50}", "");
    }

    println!("  building tree...");
    let tree = client.create_tree(&owner, &repo, entries)?;

    // Nothing changed? Do not add an empty commit.
    if let github::Head::At { tree: ref current, .. } = head {
        if *current == tree {
            println!();
            println!("Already up to date: no commit created.");
            return Ok(());
        }
    }

    let parent = match &head {
        github::Head::At { commit, .. } => Some(commit.as_str()),
        github::Head::Empty => None,
    };
    println!("  committing...");
    let commit = client.create_commit(&owner, &repo, message, &tree, parent)?;

    let creating_ref = matches!(head, github::Head::Empty);
    client.set_ref(&owner, &repo, branch, &commit, creating_ref)?;

    println!();
    println!("Exported {} file(s) to {}", plan.included.len(), github::context_for(&owner, &repo));
    println!("Commit {}", &commit[..commit.len().min(7)]);
    Ok(())
}

fn truncate(s: &str, n: usize) -> String {
    if s.chars().count() <= n {
        return s.to_string();
    }
    let tail: String = s.chars().skip(s.chars().count() - (n - 1)).collect();
    format!("…{tail}")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn repo_spec_must_be_owner_slash_name() {
        assert!(github::split_repo("owner/name").is_ok());
        assert!(github::split_repo("nameonly").is_err());
        assert!(github::split_repo("a/b/c").is_err());
        assert!(github::split_repo("/name").is_err());
    }

    #[test]
    fn repo_spec_tolerates_a_git_suffix() {
        let (o, r) = github::split_repo("owner/name.git").unwrap();
        assert_eq!((o.as_str(), r.as_str()), ("owner", "name"));
    }

    #[test]
    fn agent_and_instructor_paths_are_excluded() {
        for p in [
            "AGENTS.md",
            "CLAUDE.md",
            "standards/AGENTS.base.md",
            "courseware/instructor/TEACHING-GUIDE.md",
            "courseware/validations/package.json",
            "courseware/validations/eslint.config.mjs",
            "courseware/utils/build.sh",
            "courseware/slides/utils/entrypoint.sh",
            "courseware/slides/.marp-src/17-promises-Slides.md",
        ] {
            assert!(manifest::excluded_by(p).is_some(), "{p} should be excluded");
        }
    }

    /// The concept diagrams are student course content: the SVG sources as much
    /// as the PNG/PDF exports, since a student can open any of them in a browser.
    /// Nothing in `EXCLUDED` may ever widen to swallow this folder.
    #[test]
    fn concept_diagrams_do_ship() {
        for p in [
            "courseware/diagrams/README.md",
            "courseware/diagrams/svg/event-loop.svg",
            "courseware/diagrams/png/event-loop.png",
            "courseware/diagrams/pdf/event-loop.pdf",
        ] {
            assert!(manifest::excluded_by(p).is_none(), "{p} should ship to students");
        }
    }

    /// The repo root is student-facing, so it stays bare. These files do not
    /// exist at the root today; the rules guard against one reappearing there.
    #[test]
    fn stray_root_tooling_would_not_ship() {
        for p in [
            "package.json",
            "package-lock.json",
            "eslint.config.mjs",
            ".prettierrc.json",
            ".prettierignore",
            "index.html",
        ] {
            assert!(manifest::excluded_by(p).is_some(), "root {p} should be excluded");
        }
    }

    /// Each demo and activity is its own VS Code project, so its package.json and
    /// lint configs are course content and must ship: the root rules above are
    /// exact-path and must never widen into a basename match.
    #[test]
    fn per_folder_project_files_do_ship() {
        for p in [
            "courseware/demos/03_objects/package.json",
            "courseware/demos/03_objects/eslint.config.mjs",
            "courseware/demos/03_objects/.prettierrc",
            "courseware/activities/03_objects/package.json",
            "courseware/activities/03_objects/eslint.config.mjs",
            "courseware/activities/03_objects/.prettierrc",
        ] {
            assert!(manifest::excluded_by(p).is_none(), "{p} should ship to students");
        }
    }

    /// ...but a lock file from someone's `npm install` never ships, at any depth.
    #[test]
    fn nested_lock_files_never_ship() {
        for p in [
            "package-lock.json",
            "courseware/demos/03_objects/package-lock.json",
            "courseware/activities/03_objects/package-lock.json",
            "courseware/validations/package-lock.json",
        ] {
            assert!(manifest::excluded_by(p).is_some(), "{p} should be excluded");
        }
    }

    #[test]
    fn student_content_is_included() {
        for p in [
            "README.md",
            "LICENSE",
            "courseware/docs/README.md",
            "courseware/demos/01_types-and-variables/index.js",
            "courseware/activities/01_types-and-variables/README.md",
            "courseware/assessments/module-01-exit-ticket.md",
            "courseware/diagrams/README.md",
            "courseware/setup/setup.sh",
            "courseware/slides/md/01-types-and-variables-Slides.md",
            "courseware/slides/pdf/01-types-and-variables-Slides.pdf",
            "courseware/outline/md/JavaScriptEssentials_Outline.md",
        ] {
            assert!(manifest::excluded_by(p).is_none(), "{p} should be included");
        }
    }

    #[test]
    fn utils_prefix_does_not_swallow_sibling_folders() {
        // `courseware/utils/` must not match `courseware/utilsomething/`.
        assert!(manifest::excluded_by("courseware/utilities/thing.md").is_none());
    }

    #[test]
    fn human_sizes_read_sensibly() {
        assert_eq!(human(512), "512 B");
        assert_eq!(human(2048), "2 KB");
        assert_eq!(human(5 * 1024 * 1024), "5.0 MB");
    }
}

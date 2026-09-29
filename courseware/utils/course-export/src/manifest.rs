//! Decides what counts as *student* course content.
//!
//! The rule, in the course owner's words: students get everything except the
//! instructor folder, the AI-agent instructions, and the little utility scripts
//! (slide generation and friends).
//!
//! That makes this a **deny list**: anything new is exported by default. That is
//! the right default for course *content*: a new module or demo ships without
//! anyone remembering to allow-list it, but it does mean a new folder of
//! instructor material would ship too. Two things guard against that:
//!
//!   * every exclusion below is grouped and commented with WHY it is excluded, so
//!     adding a sibling is an obvious edit; and
//!   * `course-export plan` prints the full include/exclude split, and `push`
//!     refuses to run without either `--yes` or an interactive confirmation.

use std::path::Path;

/// A path prefix that is never exported, and the reason why.
pub struct Rule {
    pub prefix: &'static str,
    pub reason: &'static str,
}

/// Ordered so the printed plan groups sensibly.
pub const EXCLUDED: &[Rule] = &[
    // --- AI agent instructions -------------------------------------------
    Rule { prefix: "AGENTS.md", reason: "AI agent instructions" },
    Rule { prefix: "AGENTS.course.md", reason: "AI agent instructions (source)" },
    Rule { prefix: "CLAUDE.md", reason: "AI agent instructions" },
    Rule { prefix: ".github/", reason: "AI agent instructions + CI config" },
    Rule { prefix: "standards/", reason: "AI agent instruction sources + assembler" },
    // --- Instructor-only material ----------------------------------------
    Rule { prefix: "courseware/instructor/", reason: "instructor planning material" },
    // --- Support tooling --------------------------------------------------
    Rule { prefix: "courseware/validations/", reason: "test harness" },
    Rule { prefix: "courseware/utils/", reason: "build scripts + this exporter" },
    Rule { prefix: "courseware/slides/utils/", reason: "slide generation pipeline" },
    Rule { prefix: "courseware/outline/utils/", reason: "outline generation pipeline" },
    // The slide container preprocesses each deck into this scratch dir. It has to
    // live inside the mounted volume so `../../diagrams/png/…` resolves, and the
    // entrypoint deletes it on a clean run, but this walk reads the working tree,
    // not git, so an interrupted run would otherwise ship 35 Marp-scaffolded decks.
    Rule { prefix: "courseware/slides/.marp-src/", reason: "slide pipeline scratch dir" },
    // --- Repo tooling, not course content ---------------------------------
    // The repo root is deliberately bare: students open each demo and activity
    // as its own project, so a root package.json or lint config would read as
    // part of the course. None of these files exist **at the root** today: the
    // rules stay as a guard, because a stray `npm init` or an editor writing a
    // config into the root would otherwise ship it to students by default.
    //
    // These rules are root-exact on purpose (see `excluded_by`). Every demo and
    // activity now carries its own package.json + eslint.config.mjs + .prettierrc
    // so it can be opened as its own VS Code project, and those SHOULD ship.
    Rule { prefix: "package.json", reason: "root must stay bare (per-folder ones do ship)" },
    Rule { prefix: "eslint.config.mjs", reason: "root must stay bare (per-folder ones do ship)" },
    Rule { prefix: ".prettierrc.json", reason: "root must stay bare (per-folder ones do ship)" },
    Rule { prefix: ".prettierignore", reason: "root must stay bare (per-folder ones do ship)" },
    Rule { prefix: "index.html", reason: "root must stay bare (no app lives at the repo root)" },
    Rule { prefix: ".vscode/", reason: "editor settings" },
];

/// Excluded **wherever they appear**, not just at the repo root.
///
/// Every demo and activity is its own npm project, so an `npm install` in any of
/// the 70 folders writes a lock file beside its package.json. Those are
/// per-machine noise, and this is a deny list, so without a rule here they would
/// all ship to students. (`node_modules/` needs no rule: `ALWAYS_SKIP` stops the
/// walk from descending into it. A lock file is a plain file, so it does not.)
const EXCLUDED_ANYWHERE: &[Rule] = &[
    Rule { prefix: "package-lock.json", reason: "per-machine npm lock file" },
];

/// Never walked into at all: build output, VCS internals, OS noise.
const ALWAYS_SKIP: &[&str] = &[".git", "node_modules", "target", "dist"];

/// True when a directory should not even be descended into.
pub fn skip_dir(name: &str) -> bool {
    ALWAYS_SKIP.contains(&name)
}

/// The matching exclusion rule for a repo-relative, forward-slashed path.
///
/// `EXCLUDED_ANYWHERE` matches on basename at any depth; `EXCLUDED` matches a
/// directory prefix when it ends in `/`, and is otherwise an exact root-relative
/// path: which is what keeps the per-folder package.json / lint configs shipping
/// while the root-level guards still fire.
pub fn excluded_by(rel: &str) -> Option<&'static Rule> {
    if let Some(rule) = EXCLUDED_ANYWHERE
        .iter()
        .find(|r| rel == r.prefix || rel.ends_with(&format!("/{}", r.prefix)))
    {
        return Some(rule);
    }
    EXCLUDED.iter().find(|r| {
        if r.prefix.ends_with('/') {
            rel.starts_with(r.prefix)
        } else {
            rel == r.prefix
        }
    })
}

/// A file selected for export.
pub struct Entry {
    /// Repo-relative path with forward slashes: also the path in the export repo.
    pub path: String,
    pub bytes: Vec<u8>,
    /// True when the bytes are valid UTF-8 and can go inline in a tree request.
    pub is_text: bool,
    /// Git file mode. Shell scripts must stay executable after a clone.
    pub mode: &'static str,
}

impl Entry {
    pub fn size(&self) -> usize {
        self.bytes.len()
    }
}

/// What a walk of the repository found.
pub struct Plan {
    pub included: Vec<Entry>,
    /// Everything deliberately left out, paired with the rule that excluded it.
    /// Keyed by the rule's `prefix`, not its `reason`: several rules share a
    /// reason, so counting by reason would over-report each of them.
    pub excluded: Vec<(String, &'static Rule)>,
}

impl Plan {
    pub fn total_bytes(&self) -> usize {
        self.included.iter().map(|e| e.size()).sum()
    }

    pub fn binary_count(&self) -> usize {
        self.included.iter().filter(|e| !e.is_text).count()
    }
}

/// Walk `root` and split it into what ships and what does not.
pub fn build(root: &Path) -> anyhow::Result<Plan> {
    let mut included = Vec::new();
    let mut excluded = Vec::new();

    let walker = walkdir::WalkDir::new(root)
        .into_iter()
        .filter_entry(|e| {
            // Prune noise directories before descending.
            if e.file_type().is_dir() && e.depth() > 0 {
                let name = e.file_name().to_string_lossy();
                return !skip_dir(&name);
            }
            true
        });

    for entry in walker {
        let entry = entry?;
        if !entry.file_type().is_file() {
            continue;
        }

        let rel_path = entry.path().strip_prefix(root)?;
        let rel = rel_path.to_string_lossy().replace('\\', "/");

        if rel == ".DS_Store" || rel.ends_with("/.DS_Store") {
            continue;
        }

        if let Some(rule) = excluded_by(&rel) {
            excluded.push((rel, rule));
            continue;
        }

        let bytes = std::fs::read(entry.path())?;
        let is_text = std::str::from_utf8(&bytes).is_ok();
        // Shell scripts need the executable bit or `./setup.sh` fails after a clone.
        let mode = if rel.ends_with(".sh") { "100755" } else { "100644" };

        included.push(Entry { path: rel, bytes, is_text, mode });
    }

    included.sort_by(|a, b| a.path.cmp(&b.path));
    excluded.sort_by(|a, b| a.0.cmp(&b.0));

    Ok(Plan { included, excluded })
}

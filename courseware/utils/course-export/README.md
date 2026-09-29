# course-export

A Rust CLI that publishes the **student-facing** course content to a GitHub repository, leaving behind
the instructor material, the AI-agent instructions, and the build/validation tooling.

This working repository holds three kinds of material. Only the first belongs anywhere a student can
see:

| | |
|---|---|
| **The course** | docs, demos, activities, assessments, setup, slides, outline, diagrams |
| **Instructor material** | `courseware/instructor/`: teaching guide, course map |
| **Tooling** | agent instructions, `standards/`, `validations/`, `utils/`, the slide and outline pipelines |

## Build

```bash
cd courseware/utils/course-export
cargo build --release
```

The binary lands at `target/release/course-export` (`.exe` on Windows). Nothing else in the courseware
depends on Rust; this is the only crate in the repository.

## First run

```bash
course-export auth login
```

It prompts for a **GitHub personal access token** with input hidden (these sessions are often
screen-shared), verifies it against the API, and only then writes it to:

```
~/.course-export/credentials.json     # 0600 on macOS/Linux
```

Every later command reads it from there. The token is never echoed back; `auth status` shows only the
first and last four characters, enough to tell *which* token is stored.

**Scope needed:** `repo` on a classic token, or **Contents: read and write** on a fine-grained one.
Create at <https://github.com/settings/tokens>.

```bash
course-export auth status     # is a token stored, and whose?
course-export auth logout     # delete it
```

Set `COURSE_EXPORT_HOME` to store the file somewhere other than `~/.course-export`.

## Look before you push

```bash
course-export plan            # what would ship, grouped by folder
course-export plan --verbose  # ...and every excluded file, individually
```

`plan` never contacts GitHub. Run it after any change to what the course contains.

## Push

```bash
# First time - create the repo (private unless you say otherwise)
course-export push --repo my-org/js-essentials-students --create

# Later
course-export push --repo my-org/js-essentials-students

# See exactly what would happen, without doing it
course-export push --repo my-org/js-essentials-students --dry-run
```

| Flag | Effect |
|------|--------|
| `--repo owner/name` | target repository (required) |
| `--create` | create it if missing |
| `--public` | make a **newly created** repo public; see the warning below |
| `--branch <name>` | branch to update (default `main`) |
| `-m, --message` | commit message (default names the source revision) |
| `-y, --yes` | skip the confirmation prompt |
| `--dry-run` | do everything except commit |
| `--root <dir>` | course root (default: walk up from the working directory) |

> **New repositories are private by default, deliberately.** The course `LICENSE` states that the
> documents are "provided exclusively for students enrolled in this course and are not to be shared".
> `--public` exists, but think before using it.

## How the push works

One commit, built through the Git Data API, no `git` binary required:

1. verify the token (`GET /user`)
2. create the repo if `--create` and it is missing
3. read the branch head, or detect an empty repository
4. upload each **binary** file as a blob; **text** files go inline
5. create a tree, **with no `base_tree`**
6. create a commit and move the branch

Step 5 is the important one. Because the tree has no base, it is the *complete* content of the
repository, so a file you delete here disappears there on the next push, rather than lingering
forever. That also means the branch update is forced, and **the push replaces the branch**: do not
hand-edit the export repo and expect it to survive.

If the resulting tree matches what is already there, no commit is created and the tool says
`Already up to date`.

## Changing what ships

The include/exclude rules live in one place: the `EXCLUDED` table at the top of
[`src/manifest.rs`](./src/manifest.rs). Each rule carries the reason it exists, and `plan` prints them.

It is a **deny list**: anything not named there ships. That is the right default for course *content*
(a new module or demo needs no ceremony to be published) but it does mean a new folder of instructor
material would ship unless you add a rule. Two things guard against that: every rule is grouped and
commented so adding a sibling is obvious, and `push` shows the full split and asks before sending
anything.

After changing the rules, run the tests; several assert that specific paths are on the correct side:

```bash
cargo test
```

## Notes

- **Shell scripts keep their executable bit.** `*.sh` is written with mode `100755`, so `./setup.sh`
  works for a student straight after cloning the export.
- **Large files.** Anything over 25 MB warns; over 100 MB is refused, because GitHub rejects it. The
  slide decks are the only things close: the whole export is around 115 MB, nearly all `pptx`/`pdf`.
- **The upload is not incremental.** Every push re-uploads the binaries. That is a few minutes on a
  normal connection; the text half is a single request.

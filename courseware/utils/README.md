# Utils: build and export tooling

| Tool | What it does |
|------|--------------|
| [`build.sh` / `build.ps1`](#run) | Build the projects that can be built: today, the TypeScript pairs |
| [`course-export/`](./course-export/) | Rust CLI that publishes the **student-facing** course to a GitHub repo |

Nothing in this folder is student content; the exporter deliberately excludes it.

---

## Build scripts

Build scripts for the courseware's buildable projects.

> **Most of this course has no build step, on purpose.** The demos and activities are plain JavaScript
> and HTML that run straight from source; students should be debugging the language, not a toolchain.
> The only projects that *can* be built are the **TypeScript pairs**, and even those run directly with
> `tsx` during class. These scripts exist to prove the TypeScript compiles, and to produce real `.js`
> when you want to show what the compiler actually emits.

## Run

```bash
./build.sh              # type-check + emit every project
./build.sh --check      # type-check only, emit nothing
./build.sh --clean      # remove every dist/ folder
./build.sh --list       # list what would be built
```

```powershell
.\build.ps1             # Windows (PowerShell 7+)
.\build.ps1 -Check
.\build.ps1 -Clean
.\build.ps1 -List
```

Both scripts are equivalent; keep them in step when you change either.

## What gets built

Discovered from disk, so adding a TypeScript pair needs no edit here:

| Pattern | What it is |
|---------|------------|
| `demos/NN_slug/index.ts` | the demo the instructor performs |
| `activities/NN_slug/solution/index.ts` | the activity's reference answer |

`begin/` and `end/` are **never** built; they are scaffolds full of `TODO`s and are meant to be
incomplete. Output goes to a `dist/` beside each source file, which is git-ignored.

There are currently **10** such projects (5 demos + 5 activity solutions): pairs **27-30** and **35**.

## Two things worth knowing

**One `tsc` invocation per file.** The teaching `.ts` files are standalone scripts with no
`import`/`export`. Compiling several of them in a single program would put them all in one global
scope, where they would collide on duplicate identifiers (`Shape`, `Task`, …). Compiling one at a time
sidesteps that entirely, which is also why `tsconfig.build.json` has no `include`.

**`--check` mirrors the validation harness.** It uses the same compiler options as
[`validations/tsconfig.typecheck.json`](../validations/tsconfig.typecheck.json), so a project that
passes here passes `npm run validate` too. The harness is still the authority; this is the fast local
loop.

## Adding another buildable project type

If the course ever gains something else that builds:

1. Add its discovery pattern to **both** scripts (they each have a clearly marked *Discover* section).
2. Make sure its output directory is covered by the `dist/` rule in the root `.gitignore`.
3. Note it in the table above and in [`AGENTS.md`](../../AGENTS.md).

Keep the scripts **dependency-free**; they resolve `tsc` from the validation harness's
`node_modules` when it is installed and fall back to `npx`, so there is nothing to `npm install`
before building.

---

## course-export

A Rust CLI that publishes the student-facing course to GitHub, leaving behind the instructor folder,
the agent instructions, and this tooling. See [`course-export/README.md`](./course-export/README.md)
for the full story; the short version:

```bash
cd course-export && cargo build --release

course-export auth login                              # once - stores a token in ~/.course-export/
course-export plan                                    # what would ship
course-export push --repo owner/name --create         # private by default
```

The include/exclude rules are the `EXCLUDED` table in
[`course-export/src/manifest.rs`](./course-export/src/manifest.rs), and `cargo test` asserts that
specific paths land on the correct side. **If you add a folder of instructor-only material, add a rule
for it**; the manifest is a deny list, so anything unnamed ships.

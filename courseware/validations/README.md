# Validations

The automated test harness for the courseware's runnable folders. It exercises every
[demo](../demos/) and every [activity](../activities/) so that broken code, structural drift, or a
scaffold that has diverged from its starter are caught early.

Everything is **discovered from disk**: the harness enumerates the numbered `NN_slug` folders, so
adding or removing a paired demo/activity needs no change here.

> **Two traps worth knowing before you edit courseware.**
>
> 1. **Discovery only sees top-level `^\d{2}_` folders**, and Tier 1 requires the numbers to be
>    contiguous from `01`. That is why the reserve pairs (`31`-`35`) are the numeric tail
>    rather than a `reserve/` subdirectory; a subdirectory would be silently skipped, losing *all* of its
>    coverage while the suite stayed green.
> 2. **The literal phrase "expected output" is a magic marker.** The Tier 2 output check scans the
>    *entire* activity README (case-insensitively) for that phrase followed by a fenced block, and
>    asserts the block against the solution's real output. So a `## Stretch goal` section, which is
>    deliberately *not* implemented in `solution/`, must never contain it. Use `Sample output:` instead.

## What it checks (three tiers)

**Tier 1: structure (fast, no code runs).** [`tiers/tier1-structure.test.mjs`](./tiers/tier1-structure.test.mjs)
- The demo and activity folder sets are identical and numbered contiguously from `01`.
- Every activity has `README.md`, `package.json`, `begin/`, `end/`, and `solution/`.
- **Every activity's `begin/` and `end/` are byte-for-byte identical**; `end/` must ship as a pristine
  copy of `begin/` for students to work in.
- Every demo and every activity `solution/` has a recognizable entry point.
- Every demo and activity README links to a doc chapter that exists (*Related reading*).
- **Slide decks pair 1:1 with the folders.** `slides/md/NN-<slug>-Slides.md` must share its number and
  slug with `demos/NN_<slug>/`, no orphan deck, no pair without one. Each deck must also open its front
  matter on line 1 (`preprocess.mjs` silently renders a deck titled "Untitled" otherwise), carry no `#`
  divider slides, and hold **at most 14 `##` slides** so it renders within the 15-page budget. Nothing
  else catches these: the slide pipeline is glob-driven and builds whatever it finds, and the Marp theme
  **clips** an overflowing deck rather than failing.


**Tier 1: language mechanics (fast, no code runs).** [`tiers/tier1-language.test.mjs`](./tiers/tier1-language.test.mjs)
  Two scopes, because the rules differ for prose and for code.
- **Every Markdown file in the repository**, not just the courseware, fails on an em dash, an en dash,
  or a `--` standing in for one, and on any British spelling, reporting `file:line:column` and the
  offending token.
- Only **prose** is checked there. [`lib/strip-fences.mjs`](./lib/strip-fences.mjs) blanks fenced
  blocks, inline code spans, YAML front matter, HTML comments, table rules, link targets, and bare URLs
  first, preserving line and column so the report still points at the right spot. `--no-build` is a
  flag, not a defect.
- **Course source files** are scanned too, because a student reads them: `demos/`, `activities/`,
  `setup/`, `utils/`, and `standards/utils/`. Those must carry no British spelling anywhere, and the
  demo and activity sources must additionally carry no dashes, since their comments are projected in
  class. This folder is **not** scanned for spellings, because the forbidden words are its own data;
  that exemption is three files, named in `SELF_EXEMPT`.
- The word list is **exact inflections**, never prefixes, because `realis\w*` would match "realistic"
  and `programme` as a prefix would match "programmer". False positives teach people to ignore a check.
- The generated `AGENTS.md` is skipped; the assembler already guarantees it matches its two sources.
- Escape hatch for quoted third-party prose that cannot live in a fence: put
  `<!-- language-check-ignore -->` on the line before it.
- The rules it enforces are stated in *Voice, register, and mechanics* in `AGENTS.md`.
**Tier 2: runs & checks the code.** Three complementary checks:
- **Scripts run** ([`tiers/tier2-scripts.test.mjs`](./tiers/tier2-scripts.test.mjs)), runs every **Node**
  and **TypeScript** demo and every activity `solution/` and asserts it exits cleanly (code `0`, no
  timeout). TypeScript entries run via `tsx`.
- **TypeScript type-checks** ([`tiers/tier2-typecheck.test.mjs`](./tiers/tier2-typecheck.test.mjs)):
  `tsx` strips types **without checking them**, so this runs `tsc --noEmit --strict` (via
  [`tsconfig.typecheck.json`](./tsconfig.typecheck.json)) over every `.ts` demo and solution. A reference
  solution with a type error fails here even though it "runs."
- **Output matches the README** ([`tiers/tier2-output.test.mjs`](./tiers/tier2-output.test.mjs)), for
  every Node/TS activity solution, each **Expected output** block in its README must appear in the
  solution's actual terminal output (stdout + stderr merged in order, so `console.error` counts). Catches
  a solution that runs but prints the wrong thing.
- `begin/`/`end/` are **not** run (they are scaffolds with TODOs and may be intentionally incomplete;
  Tier 1 already pins them). Browser folders are covered by Tier 3.

**Tier 3: browser E2E (Playwright).** [`e2e/browser.spec.mjs`](./e2e/browser.spec.mjs)
- Serves the whole courseware tree on `:8080` and a `json-server` on `:3000`, then loads every browser
  demo (`index.html`) and every browser activity `solution/` and asserts the page runs with **no
  uncaught page error and no `console.error`**. A page exposing a `#locate` button is clicked to drive
  an async path (geolocation permission and a fixed position are granted in the config).
- The fetch demo/activity (23) is backed by a **combined fixture** ([`e2e/fixtures/db.seed.json`](./e2e/fixtures/db.seed.json))
  holding both the demo's `colors` and the activity's `books` collections. A fresh, gitignored runtime
  copy (`e2e/fixtures/db.json`) is regenerated from the seed on every run so `json-server`'s persisted
  POSTs never dirty the repo.

## How to run

```bash
cd courseware/validations
npm install                 # first time only
npm run validate            # Tier 1 + Tier 2 (Vitest) - fast, no browser

# Browser E2E (Tier 3):
npm run e2e:install         # first time only - downloads the Chromium build
npm run validate:e2e        # Tier 3 (Playwright); starts http-server + json-server itself

npm run validate:full       # everything (Vitest, then Playwright)
```

`npm run validate:watch` runs Tiers 1-2 in Vitest watch mode while you edit.

> Windows-first: commands are the same in PowerShell. Node's current Active LTS is assumed (the repo is
> developed on Node 24).

## Lint and format

This folder also carries the repo's **ESLint + Prettier** setup: [`eslint.config.mjs`](./eslint.config.mjs),
[`.prettierrc.json`](./.prettierrc.json), [`.prettierignore`](./.prettierignore):

```bash
cd courseware/validations
npm run lint                # ESLint over the harness
npm run format              # Prettier --write
npm run format:check        # Prettier --check (no writes)
```

It lives here rather than at the repo root for two reasons. First, **the root of a courseware repo is
student-facing**: students open each demo and activity as its own project, so a root `package.json` or
lint config reads as part of the course and invites `npm install` in the wrong place. Second, the
harness is **the only application-grade JavaScript in the repo**: the demos, activities, and docs are
teaching code, hand-formatted with aligned output comments and the occasional deliberate `var`, and are
intentionally neither linted nor auto-formatted. Keep it that way; don't point these tools at
`courseware/demos/`, `courseware/activities/`, or `courseware/docs/`, and don't reintroduce a root
`package.json`.

## Maintaining the harness

- **Adding/removing a paired demo + activity** needs no edit here; discovery and the pairing/numbering
  checks pick it up automatically. Run `npm run validate` to confirm it stays green.
- **A new browser folder** is exercised automatically too (it's detected by its `index.html`). If it
  fetches a new `json-server` collection, add that collection to
  [`e2e/fixtures/db.seed.json`](./e2e/fixtures/db.seed.json).
- **A demo that legitimately prints nothing** (teaches purely through code the instructor steps through)
  is fine; Tier 2 only requires a clean exit, not stdout.
- Layout: [`lib/`](./lib/) holds discovery, the recursive byte-for-byte directory compare, and the
  timeout-guarded script runner; [`tiers/`](./tiers/) holds the Vitest suites; [`e2e/`](./e2e/) holds the
  Playwright spec, its config, and fixtures.

## Related

- [Activities](../activities/README.md) · [Demos](../demos/README.md): the folders under test.

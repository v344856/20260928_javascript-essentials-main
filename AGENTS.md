<!-- GENERATED FILE: do not edit. Assembled from AGENTS.course.md + standards/AGENTS.base.md
     by standards/utils/assemble.(sh|ps1). Edit those sources and re-run. -->

<!--
  [THIS COURSE] PROFILE: course-specific values for *JavaScript & TypeScript Essentials*.

  Cross-course conventions live in standards/AGENTS.base.md. This file holds only what is
  specific to this course. The two are combined into the generated AGENTS.md by
  standards/utils/assemble.sh / standards/utils/assemble.ps1. Edit these sources, not AGENTS.md.
-->

# JavaScript & TypeScript Essentials: Agent Guide

This guide orients an AI agent (Claude Code, GitHub Copilot, Codex, Grok, or any assistant) working on
this courseware repository. It documents **how the course is designed, how the parts relate, and the
conventions every change must preserve**; read it before editing anything. The **course profile**
below is specific to this course; the **shared standards** that follow apply to every course in the
program. Where the two disagree, this course profile wins.

---

## What this repository is

- **Course:** *JavaScript & TypeScript Essentials*
- **Duration:** 5 days (Mon-Fri, 8:30 am-4:30 pm ET)
- **Audience:** Working developers with **general programming experience in another language** who are
  **new to JavaScript**. Comfort with variables, functions, loops, and the command line is assumed;
  prior JavaScript is **not**. TypeScript is taught at the end of the week (the `Module-12` chapters and
  the Day-5 material) and assumes only the JavaScript built earlier in the course.
- **Goal:** Write modern (ES2015+) JavaScript with confidence: types and variables, control flow,
  arrays and functions, objects/classes/prototypes/`this`, error handling, asynchronous code
  (callbacks, promises, `async`/`await`, timers), modules, the DOM and browser APIs, built-in objects,
  forms, and JSON, then add static typing with **TypeScript**.
- **Delivery:** Instructor-led and **taught with live coding and live drawing**: the instructor writes
  the code in front of the class while explaining, and students apply the same ideas themselves through
  the activities. The written docs are a **reference**, not a script read aloud. The demos are the
  **finished reference versions** of what gets built live; keep them working and current with modern
  JavaScript.

This is a **content repository**, not a single shipped application. There is **no** single reference
app: the runnable code lives as **many small self-contained folders** (one per demo and one per
activity). There is no build/test suite for the courseware itself; the only automated pipelines are the
**slide** and **outline** generators (two parallel containerized `md → pdf` toolchains). "Correctness"
here means pedagogical soundness, internal consistency, conformance to the conventions below, and, for
the runnable folders, that each **actually runs** and produces the output its README describes.

---

## Repository map

```
/
├── README.md                 # Public landing page: schedule, day-by-day outline, links, license
├── LICENSE                   # MIT for instructor code; docs are for enrolled students only
├── AGENTS.md                 # GENERATED - assembled from AGENTS.course.md + standards/AGENTS.base.md
│                             #   (run standards/utils/assemble.* to (re)build it; do not hand-edit)
├── AGENTS.course.md          # ⭐ SOURCE - this course profile (hand-edited)
├── CLAUDE.md                 # Shim: imports `@AGENTS.md` (Claude Code reads only CLAUDE.md)
│                             # NOTE: the root is deliberately BARE - no package.json, lock file, lint
│                             #   or format config, and no index.html. Students open each demo and
│                             #   activity as its own project, so root tooling would read as part of
│                             #   the course. ESLint + Prettier live in courseware/validations/.
├── standards/                # Shared cross-course standards (intended as a git submodule)
│   ├── AGENTS.base.md        # ⭐ SOURCE - reusable [PATTERN] conventions
│   ├── utils/                # assemble.sh / assemble.ps1 → build AGENTS.md from the two sources
│   └── README.md             # How to edit + promote standards/ to a submodule
├── .github/copilot-instructions.md   # Thin pointer to AGENTS.md
└── courseware/
    ├── instructor/           # Instructor-facing planning material (not for students)
    │   ├── TEACHING-GUIDE.md #   Day-by-day flow: day → outline sections → pairs → exit tickets
    │   └── COURSE-MAP.md     #   The join table: slide ↔ doc ↔ demo ↔ activity ↔ diagram, both directions
    ├── setup/                # Student machine setup - run BEFORE day 1
    │   ├── setup-student-machines.md  # ⭐ The instructions (software, permissions, troubleshooting)
    │   ├── setup.ps1         #   Windows installer (winget + nvm-windows); -Check is read-only
    │   └── setup.sh          #   macOS/Linux installer (brew/apt/dnf + nvm); --check is read-only
    ├── utils/                # Build + export tooling (never student content)
    │   ├── build.ps1 / .sh   #   Build what CAN be built (the TypeScript pairs);
    │   │                     #     --check / --clean / --list modes
    │   ├── tsconfig.build.json  # Compiler options, mirroring validations/tsconfig.typecheck.json
    │   └── course-export/    #   Rust CLI (clap): publish the STUDENT-facing course to GitHub.
    │                         #     Deny list in src/manifest.rs decides what ships.
    ├── diagrams/             # The 30 concept diagrams, generated with the diagram-builder tool
    │   ├── README.md         #   Index: name, punchline, day, doc chapters, pairs each one serves
    │   ├── svg/              #   ⭐ SOURCE - <slug>.svg, edited ONLY through the tool
    │   ├── png/              #   GENERATED - what docs, slides and pair READMEs embed
    │   └── pdf/              #   GENERATED - vector copies for printing/handouts
    ├── docs/                 # The reading - chapters grouped into twelve Module-NN-Name/ folders
    │   ├── README.md         # Ordered index (TOC) listing every chapter under its module heading
    │   └── Module-NN-Name/   # One folder per module (01..12); inside: MM-topic-slug.md chapters,
    │                         #   MM = zero-padded reading order restarting at 01 within each module
    ├── activities/           # 35 hands-on exercises - one per demo, same concept / fresh challenge
    │   ├── README.md         # Sectioned index of the 35 activities (01-30 core, 31-35 reserve)
    │   └── NN_topic/         #   README.md + package.json + begin/ + end/ + solution/
    ├── demos/                # 35 runnable demos - one per activity, each a self-contained folder
    │   ├── README.md         # Sectioned index of the 35 demos (01-30 core, 31-35 reserve)
    │   └── NN_topic/         #   README.md + the runnable source (index.js / index.ts / browser files)
    ├── assessments/          # Per-module formative exit tickets - one per module (twelve)
    │   ├── README.md         # The suite: purpose, how to run, and the module→ticket table
    │   └── module-NN-exit-ticket.md  # 3 mixed Qs + Muddiest Point + Connect It + collapsed answer key
    ├── validations/          # Automated test harness for the runnable folders (Vitest + Playwright):
    │                         #   Tier 1 structure + byte-for-byte begin/==end/, Tier 2 runs every
    │                         #   node/ts demo & solution, Tier 3 Playwright E2E over browser folders.
    │                         #   ALSO holds the repo's ESLint + Prettier setup (eslint.config.mjs,
    │                         #   .prettierrc.json, .prettierignore) - it lints this harness only
    ├── outline/              # Course outline - its own md → pdf pipeline (mirrors slides/)
    │   ├── README.md         # Folder TOC: the twelve sections → docs, slides, days
    │   ├── md/               # ⭐ SOURCE outline Markdown (JavaScriptEssentials_Outline.md) - hand-edited
    │   ├── pdf/              # GENERATED PDF (the repo README links here) - do not hand-edit
    │   └── utils/            # Containerized md → styled-HTML → pdf toolchain (marked + headless Chrome)
    └── slides/
        ├── README.md         # Folder TOC: deck→module, deck→outline-section, authoring rules
        ├── md/               # ⭐ SOURCE: one deck per PAIR (01..35), max 15 pages each
        ├── pptx/             # GENERATED - do not hand-edit
        ├── pdf/              # GENERATED (incl. the merged all-decks PDF) - do not hand-edit
        └── utils/            # Containerized md → pptx → pdf → merged-pdf toolchain
```

> Notes on current state:
> - **Docs are organized into twelve `Module-NN-Name/` folders** (`Module-01`..`Module-12`), each holding
>   `MM-topic-slug.md` chapters numbered per module (`MM` restarts at 01 in each folder). `docs/README.md`
>   is the ordered TOC, listing every chapter under its module heading.
> - **`courseware/instructor/TEACHING-GUIDE.md` is the day-by-day instructor map**: it maps each of the 5 days to
>   its outline sections, the specific demo/activity pair numbers taught that day (the pairs follow topic
>   modules, not calendar order, so a day pulls from several number ranges), the doc modules, and the
>   exit tickets that come due. Keep it in sync when you add, remove, or renumber a pair, or re-theme a
>   ticket. The root `README.md` still carries the shorter day-by-day outline summary.
> - **There is no single reference app.** Demos and activities are **standalone, self-contained folders**
>   (see *Pedagogical spine* below); most run with plain Node, a few TypeScript ones run with `tsx`, and
>   a few browser ones are served with `http-server` (demo/activity **23** also needs a `json-server`
>   mock REST API).
> - **`courseware/validations/` is the automated test harness for the runnable folders** (its own
>   Vitest + Playwright npm project; see its `README.md`). Three tiers, all discovered from disk,
>   plus a prose check:
>   **Tier 1** structural invariants: matching/contiguous demo↔activity numbering, required activity
>   files, and a **byte-for-byte check that every activity's `begin/` and `end/` are identical** (`end/`
>   ships as a pristine copy of `begin/`); **Tier 2** runs every Node/TypeScript demo and each activity
>   `solution/` and checks three things: it **exits cleanly**, the TypeScript **type-checks** under
>   `tsc --noEmit --strict` (since `tsx` runs `.ts` without type-checking), and each activity solution's
>   output **matches the Expected-output block(s)** in its README (browser folders and `begin/`/`end/`
>   scaffolds are excluded); **Tier 3** Playwright E2E loads every browser demo/solution against a real `http-server` +
>   `json-server` and asserts no runtime errors. Run `npm run validate` (Tiers 1-2, fast) and
>   `npm run validate:e2e` / `npm run validate:full` (browser E2E; needs `npm run e2e:install` once).
>   **Keep it green and in sync**; adding/removing a paired demo+activity needs no code change here
>   (discovery is automatic), but it **does** now need its slide deck in the same change, because Tier 1
>   asserts deck↔pair parity; and a new `json-server` collection must be added to
>   `validations/e2e/fixtures/db.seed.json`.
> - **The language check** (`validations/tiers/tier1-language.test.mjs`) runs with Tier 1 and enforces
>   the mechanical half of *Voice, register, and mechanics*, in two scopes. In **every** `.md` file in
>   the repository it fails on an em dash, an en dash, a `--` standing in for one, or a British
>   spelling, all **outside code**: fences, inline spans, YAML front matter, HTML comments, table
>   rules, and link targets are blanked by `validations/lib/strip-fences.mjs`, which preserves line
>   and column so the report stays accurate. In **course source files** (`demos/`, `activities/`,
>   `setup/`, `utils/`, `standards/utils/`) it fails on any British spelling at all, and in `demos/`
>   and `activities/` on dashes too, because those comments are projected in class. `validations/`
>   itself is not spell-scanned, since the forbidden words are the checker's own data; that
>   exemption is three files, named in `SELF_EXEMPT`. The generated `AGENTS.md` is skipped, because
>   the assembler already guarantees it matches its two sources. For the rare quoted third-party
>   line that must keep its original spelling or punctuation outside a fence, put
>   `<!-- language-check-ignore -->` on the line before it.
> - The **slides/ and outline/ pipelines are already migrated to this course.** Slides source is 35
>   decks `slides/md/NN-<pair-slug>-Slides.md` (01..35, one per pair); the merged name (`COMBINED_NAME` in
>   `slides/utils/entrypoint.sh`) is `JavaScript-and-TypeScript-Essentials-All-Slides.pdf`. The outline
>   source is `outline/md/JavaScriptEssentials_Outline.md`, generating
>   `outline/pdf/JavaScriptEssentials_Outline.pdf` (both linked from the root `README.md`).

---

## The day / topic layout

The root `README.md` is the authoritative day-by-day outline. In summary:

| Day | Focus |
|-----|-------|
| 1 | Setup & VS Code · what JavaScript/ECMAScript is · statements, variables & types · strings, numbers, `Math`, dates · blocks & scope · conditionals · loops · functions · error handling |
| 2 | Objects · arrays · maps & sets · built-in objects · `window`/`location` · DOM events · adding/removing/styling DOM nodes · forms (inputs, submission, validation, feedback) |
| 3 | Ways to create objects · classes · constructor functions · `this` · prototype inheritance · callbacks & anonymous functions · arrow functions · closures · JSON (syntax, vs XML, parsing) |
| 4 | Asynchronous programming · the event loop · callbacks · promises · `async`/`await` · timers · AJAX & the Fetch API · modular JavaScript (static & dynamic modules) |
| 5 | TypeScript: static vs dynamic / strong vs loose typing · type coercion · variable & parameter types · type aliases · interfaces · abstract classes · generics · utility types |

The **docs** (`docs/README.md`) are organized into twelve modules: `Module-01` Getting Started ·
`Module-02` JavaScript Fundamentals · `Module-03` Arrays and Functions · `Module-04` Classes, `this` &
Error Handling · `Module-05` Asynchronous JavaScript · `Module-06` JavaScript Modules · `Module-07` The
DOM · `Module-08` Browser APIs · `Module-09` Built-In Objects · `Module-10` JavaScript and Forms ·
`Module-11` JSON · `Module-12` TypeScript. **The module order groups the material by topic and does not
map one-to-one onto calendar days**: for example strings/numbers/`Math`/dates are taught on Day 1 but
live in `Module-09` (Built-In Objects), and classes are taught on Day 3 but live in `Module-04`. Don't
assume a one-to-one doc↔day mapping.

---

## Pedagogical spine

### Progression

The week builds **language core → objects & the browser → objects/async/JSON → async & modules → typing**:

- **JavaScript core (Day 1)**: tooling and VS Code, the language's dynamic type system, variables and
  scope, operators, control flow, functions, and error handling.
- **Objects, the DOM & forms (Day 2)**: objects/arrays/maps/sets and built-in objects, then the
  browser: `window`/`location`, DOM selection/events/manipulation/styling, and working with forms.
- **Objects, `this`, closures & JSON (Day 3)**: the several ways to create objects, classes and
  constructor functions, prototype inheritance, how `this` is decided, arrow functions, closures, and JSON.
- **Async & modules (Day 4)**: the event loop, callbacks, promises, `async`/`await`, timers, the Fetch
  API, and static/dynamic ES modules.
- **TypeScript (Day 5)**: static typing on top of the JavaScript already learned: annotations, aliases,
  interfaces, abstract classes, generics, and utility types.

Because the audience already programs, examples use **real, runnable code from the start**; there is no
pseudocode band. Keep examples correct, idiomatic, and current (see *Currency* below).

### Demos and activities: parallel, not cumulative

There is **no single running theme and no cumulative build.** The material is delivered as **35
matched demo/activity pairs**, numbered `01`..`35` in course order: **`01`-`30` are the core set the
course always covers**, and **`31`-`35` are held in reserve**, run in number order only if a delivery
finishes the core thirty. Nothing later depends on a reserve pair, so stopping at `30` leaves no
loose ends.

**Know what a reserve pair carries before you move anything into or out of that tail.** Three of the
five are the *only* coverage of an outline item (`31` maps-and-sets for **IV.G**, `32` dates-and-intl
for **IV.F**, `34` dynamic-import for **IX.D**), and three are the only pair behind an exit-ticket
question (**M09 Q3**, **M06 Q2**, **M12 Q2**). That is a known, accepted gap: the docs cover all of it,
and the teaching guide tells the instructor how to close each in about two minutes inside a
neighboring core pair. **Check any new reserve candidate against the outline (`outline/md/`) and the
twelve exit tickets, and record what it carries in the teaching guide** rather than labeling it
simply skippable:

- **A demo and its same-numbered activity teach the same concept on *different content*.** The demo
  (`demos/NN_topic/`) is the finished code the instructor performs; the paired activity
  (`activities/NN_topic/`) applies the **same concept to a fresh, unrelated challenge**, not a repeat
  of the demo. Keep this "same concept, different content" relationship when editing either side, and
  keep the two folders' numbers and topic slugs aligned.
- **Each folder is standalone and self-contained.** Nothing carries over from the previous number: a
  change to one demo/activity does **not** ripple into the next. There is no `begin[N] == solution[N-1]`
  chain, no `_starter` project, and no `BUILD-PLAN.md`.
- **Activities are project folders** with `README.md`, a shared `package.json`, and `begin/` / `end/` /
  `solution/` directories. Students work in **`end/`** (a pristine copy of `begin/`); `begin/` is the
  scaffold with TODOs; `solution/` is the finished reference. Each activity is sized for **15-20 minutes**
  (a few of the shorter ones are 10-15) and its `README.md` follows the on-disk template (challenge
  intro, **Estimated time**, **Setup**, **Tasks** with an **Expected output** block, **What You'll
  Learn**, **Stretch goal**, **Related reading**).
- **Every activity carries a `## Stretch goal`** for students who finish early, placed between
  **What You'll Learn** and **Related reading**. It must be **additive** and never reflected in
  `solution/`; README-only, with no matching edit to `begin/`/`end/`/`solution/`.
  **Never write the phrase "expected output" inside a stretch section:** the Tier 2 validator
  (`validations/tiers/tier2-output.test.mjs`) scans the *whole* activity README for that phrase followed
  by a fenced block and asserts it against the solution's real output. Use `Sample output:` instead.
- **Demos are single-purpose folders** with a `README.md` (title, one-paragraph description, a **Run**
  block, and a **What it demonstrates** list) plus the runnable source.

**How the runnable folders run** (Windows-first; PowerShell is the default shell):

- **Node script folders** (the majority): `node index.js`; activities also expose `npm start` (and
  `npm run solution` for the reference answer).
- **The modules folder (20)**: includes a tiny `{ "type": "module" }` `package.json`. Its `index.js` is
  an ES module that reaches a CommonJS `.cjs` file through `createRequire(import.meta.url)`, so a single
  run demonstrates both module systems. Keep it to **one** entry point (`index.js`).
- **TypeScript folders (27-30, 35)**: run the `.ts` directly with `tsx` (`npx tsx index.ts`; activities
  via `npm start`), no build step. Each **must stay a single-file `index.ts`**: `validations/
  tsconfig.typecheck.json` globs only `*/index.ts`, so a second `.ts` file would run under `tsx` without
  ever being type-checked.
- **Browser folders (21-23, 25)**: served over http (`npx http-server -o`; open DevTools console
  with F12). Pair **21** ends with `navigator.geolocation` and exposes a `#locate` button, which the
  Playwright spec clicks to exercise an async path; keep that id if you rework the page.
  **Demo/activity 23** additionally needs a mock REST API in a separate terminal:
  `npx json-server db.json --port 3000` (activity 23 exposes it as `npm run api`). Note that Tier 2 does
  **not** see browser folders at all, so their README output blocks are unvalidated prose; verify them
  by hand in DevTools, and never `console.error` on a normal path (Tier 3 counts that as a failure).

Keep every demo and every activity `solution/` runnable and producing the output its README states.

### Currency

Teach the **current JavaScript/TypeScript baseline**. When adding or updating content, keep these
accurate (verify version-specific claims with a quick check before asserting them):

- **JavaScript:** modern **ES2015+** style. Prefer `const`/`let` over `var`; template literals; arrow
  functions where lexical `this` is wanted; destructuring, rest/spread; `class` syntax with `#private`
  fields; native array iteration (`map`/`filter`/`reduce`/`for…of`); `===` over `==`; ES modules
  (`import`/`export`) as the default, with CommonJS shown only where the module chapter contrasts them.
- **Async:** promises and `async`/`await` as the primary model; callbacks shown for understanding the
  event loop and older APIs; `fetch` for network access (no `XMLHttpRequest` except as historical
  context).
- **TypeScript:** current stable TypeScript; strict mode; avoid `any`, prefer `unknown` when the type is
  uncertain; lean on inference when the type is obvious; run examples with **`tsx`** (no separate build
  step in the courseware).
- **Node.js:** target the current **Active LTS** line (Node 24 in 2026) with `npm`. Runnable folders are
  small npm projects; browser folders serve with `http-server`, and the fetch example uses `json-server`.
- **Browser/DOM:** standard DOM APIs (`getElementById`/`querySelector`, `addEventListener`, `dataset`,
  `FormData`, `navigator.geolocation`), no jQuery or framework.

---

## The supporting folders

Four folders exist alongside the teaching artifacts. None are student *reading*; they are what makes
the course runnable, plannable, and drawable.

### `courseware/instructor/`: planning material

Two files, deliberately split by the question they answer:

- **`TEACHING-GUIDE.md`** answers *"what am I doing on Wednesday?"*: the day-by-day flow, the pacing
  rationale, which pairs run each day, and which exit tickets come due.
- **`COURSE-MAP.md`** answers *"what backs this topic?"*: the join table where **slide deck ↔ doc
  chapter ↔ demo ↔ activity ↔ diagram** meet, given both per-day and per-artifact (deck → pairs,
  diagram → pairs, doc module → pairs).

**Keep the map current in the same change as the thing it maps.** It is the only place all five
artifact types are cross-referenced, which makes it the first file to rot. Any add/remove/renumber of
a pair, deck, chapter, or diagram touches it. Two sources outrank it: the **outline**
(what the course promises) and the **exit tickets** (what it assesses): a topic in either with no row
in the map is a coverage gap, and the gap is what to fix.

### `courseware/setup/`: student machine setup

`setup-student-machines.md` is the authority; `setup.ps1` (Windows) and `setup.sh` (macOS/Linux) are
the automation. Rules for changing them:

- **Both scripts stay equivalent.** If one gains a package, a flag, or a check, so does the other.
- **Keep them idempotent and keep the read-only mode** (`-Check` / `--check`). It is what an instructor
  runs on a room of machines without changing anything, and what a student runs to prove they are ready.
- **Node is installed through a version manager** (nvm-windows on Windows, nvm elsewhere), never the
  bare installer. It leaves an existing Node alone and lets a student switch versions without admin
  rights. Target the **Active LTS**.
- **Prefer the platform package manager** (`winget`, `brew`, `apt`/`dnf`) over downloading installers.
  On Linux, where VS Code and Chrome are not in the default repos, *print a manual instruction* rather
  than silently adding third-party repositories to a student's machine.
- If the software list changes, update the table in the markdown **and** both scripts.

### `courseware/utils/`: build scripts

`build.ps1` / `build.sh` build everything in the course that *can* be built: today only the
**TypeScript pairs** (`demos/*/index.ts` and `activities/*/solution/index.ts`, currently 10 projects).

- **Most of the course has no build step on purpose.** Do not add one. Students should debug the
  language, not a toolchain; the TS pairs still run directly with `tsx` in class.
- **One `tsc` invocation per file.** The teaching `.ts` files have no `import`/`export`, so compiling
  several in one program puts them in a shared global scope where they collide on duplicate
  identifiers. This is also why `tsconfig.build.json` has no `include`.
- **`--check` must stay in step with `validations/tsconfig.typecheck.json`**: anything that builds
  here has to pass the harness.
- `begin/` and `end/` are **never** built; they are scaffolds full of TODOs.
- Output goes to a git-ignored `dist/` beside each source. Discovery is from disk, so a new TS pair
  needs no edit here.

**`utils/course-export/`: the student export.** A Rust CLI (clap + the GitHub Git Data API) that
publishes only the student-facing course to a GitHub repository, as a single commit.

- **The split it enforces:** students get the course (docs, demos, activities, assessments, setup,
  slides, outline, diagrams). They do **not** get `courseware/instructor/`, the agent instructions
  (`AGENTS*.md`, `CLAUDE.md`, `.github/`, `standards/`), or the tooling (`validations/`, `utils/`, the
  slide and outline pipelines).
- **The rules live in exactly one place:** the `EXCLUDED` table at the top of `src/manifest.rs`, each
  entry carrying the reason it exists. `cargo test` asserts specific paths land on the correct side;
  extend those tests when you change the table.
- **Some rules guard a file that does not exist.** The root-tooling entries (`package.json`,
  `package-lock.json`, `eslint.config.mjs`, `.prettierrc.json`, `.prettierignore`, `index.html`) are
  there because the repo root is kept bare on purpose: they catch a stray `npm init` or an editor
  dropping a config into the root before it reaches students. Do not prune them as dead rules.
- **It is a deny list, so anything new ships by default.** That is right for course content and wrong
  for instructor material: **if you add an instructor-only folder, add a rule for it in the same
  change.** This is the one failure mode of this tool that matters.
- **The push replaces the branch.** The tree is created without a `base_tree`, so deleting content here
  deletes it there. Never hand-edit the export repo.
- New repositories are **private by default**: the course `LICENSE` restricts the documents to
  enrolled students. `--public` exists but should be a deliberate choice.
- The token lives in `~/.course-export/credentials.json` (0600 on unix), is verified before it is
  stored, and is never printed in full.

### `courseware/diagrams/`: the concept diagrams

**Thirty diagrams, generated in-repo.** They used to live on a Miro board with this folder as a mere
index; that is retired. The `.svg` files in `svg/` are now the source of truth, and `README.md` is the
index, a row per diagram giving its punchline, day, doc chapters, and pairs.

- **The SVG is the source, and it is only editable through the diagram-builder tool.** The tool stores
  its scene graph inside the file's metadata, so hand-editing the XML corrupts the source and every
  later tool call on it. Build with a single atomic `apply_ops`, then `render` and **look at the
  returned PNG** before moving on.
- **`png/` and `pdf/` are exports.** Change a diagram and you re-export all three, or the copy embedded
  in a doc and a deck silently goes stale.
- **Named by slug, never by number**: `event-loop.svg`, not `01-event-loop.svg`. The old Miro set was
  numbered 1-6; nothing keys on a diagram number any more.
- **The path is the same from all three consumers**, because docs chapters, slide decks, and
  demo/activity READMEs all sit exactly two levels below `courseware/`:

  ```text
  ../../diagrams/png/<slug>.png
  ```

  from `docs/Module-NN-Name/`, from `slides/md/`, and from `demos/NN_slug/` or `activities/NN_slug/`.
- **Diagrams stay general.** No demo folder, activity name, or variable from one exercise may appear on
  a diagram; that is what makes them survive a renumber. (The same rule the course outline follows.)
- They exist because the course is taught with **live drawing**: each is the finished reference version
  of something the instructor sketches, not slide decoration. Being in the repo now means the same
  drawing is also the picture in the reading and on the slide.
- **Decks `04` (conditionals), `05` (loops) and `24` (string/number/math) have no diagram on purpose.**
  They are code-and-run topics where a picture would only restate the bullets. That is a decision, not
  a gap; do not "complete the set".
- When adding one, add its row to `diagrams/README.md` **and** the diagram column in `COURSE-MAP.md`.

---

## Course-specific conventions

These are the concrete values the shared standards below refer to:

- **The repo root stays bare.** No `package.json`, no lock file, no `eslint.config.mjs`,
  `.prettierrc.json`, `.prettierignore`, `.vscode/`, or `index.html` at the top level: only
  `README.md`, `LICENSE`, the agent files, `.gitignore`, `standards/`, `.github/`, and `courseware/`.
  Students open **each demo and activity as its own project**, so anything JavaScript-shaped at the
  root reads as part of the course and invites `npm install` in the wrong place. **Never add a root
  `package.json`**: put node tooling in the folder it serves.
  `courseware/utils/course-export` keeps guard rules for each of these paths so a stray one can never
  ship; they are **exact-path** rules, so the per-folder equivalents below are unaffected.
- **Every demo and activity is its own project, with its own tooling.** Each of the 70 folders carries
  a `package.json`, and every non-browser one also carries `eslint.config.mjs` + `.prettierrc`, so the
  folder can be opened in its own VS Code window and the ESLint/Prettier extensions bind to it. The
  configs **mirror the ones the course teaches** in `docs/Module-01-Getting-Started/03-linters-and-formatters.md`:
  the same flat-config shape, the same `no-unused-vars: warn` / `no-undef: error` pair, the same
  `.prettierrc` values, so a student recognizes the file from the chapter. Notes that matter when editing them:
  - **`.prettierrc` must keep `"endOfLine": "auto"`.** The working tree is CRLF with
    `core.autocrlf=true` and no `.gitattributes`; under Prettier's `"lf"` default, `--write` rewrites
    every file in the repo.
  - **Browser pairs (`21`, `22`, `23`, `25`) get Prettier but no ESLint.** Their JavaScript is 100%
    inline `<script>` inside `index.html`, so `eslint .` would lint zero files and report success,
    which is worse than absent. They have no `lint` script.
  - **TypeScript pairs (`27`-`30`, `35`) add `typescript-eslint`**, without which every `.ts` file is a
    fatal parse error. Its peer range caps at `typescript <6.1.0`, which is why those folders stay on
    `typescript@^5.6.0` rather than the version `validations/` uses.
  - **Never add `"type": "module"` to a plain-Node demo.** Absent means CommonJS; adding it turns on
    ES-module strict mode and makes deliberate demonstrations throw (e.g. `demos/03_objects` assigns to
    a frozen object to show the assignment is *silently* ignored). Only `20`, `34` and the five TS
    folders carry it.
  - **Activity configs live at the activity root**, not in `begin/`/`end/`/`solution/`, and ignore
    `begin/**`: it is a byte-identical copy of `end/`, so linting both doubles every message.
  - `no-undef` stays an **error** on purpose: in an activity's `end/`, the errors land on exactly the
    functions the student still has to write, so the error list doubles as the to-do list.
  - Where a rule fires on a **deliberate teaching construct** in finished demo code, disable it in that
    folder's own `eslint.config.mjs` with a comment saying why, not with an inline `eslint-disable`,
    which the course never teaches.
  - Do **not** add `no-var`, `eqeqeq`, or `no-console`. None is in `js.configs.recommended`, and they
    would flag 4, 6, and ~900 deliberate teaching sites respectively.
- **No single running theme; no cumulative chain.** The course uses **35 parallel demo/activity pairs**
  (same concept per number, different content). This course does **not** use a single reference app that
  the activities build, and it does **not** chain `begin[N]` to `solution[N-1]`. Each folder stands alone.
- **Core versus reserve.** Pairs **`01`-`30` are the core set** the course always covers; pairs
  **`31`-`35` are held in reserve** and run in number order only if a delivery finishes the core
  thirty. Reserve status is expressed in *prose only*: a
  `### In reserve, going deeper (run only if the class finishes 01-30)` section in both folder
  indexes, a `> **Reserve pair.** …` callout as the first body line of each of the ten reserve READMEs
  (five demos + five activities), and the *In reserve* column in the teaching guide. It is **not**
  encoded in the folder name, and reserve pairs must stay in the same contiguous `01`..`n` numbering as
  everything else: the validation harness discovers only top-level `^\d{2}_` folders and requires the
  numbers to equal `[1..n]`, so a `reserve/` or `bonus/` subdirectory would be silently skipped and
  lose all its coverage, including the deck-parity check, since every pair still needs its deck.
- **Activities:** **35 project folders** (`activities/NN_topic/`, `NN` = `01`..`35`), one per demo,
  indexed by `activities/README.md`. Each holds `README.md` + `package.json` + `begin/` + `end/` +
  `solution/`, all plain JavaScript (or TypeScript for 27-30 and 35). Students work in `end/` (a pristine
  copy of `begin/`); `solution/` is the finished result. Match the on-disk activity `README.md` template
  when adding one, including its `## Stretch goal`.
- **Demos (one per activity):** **35 self-contained folders** (`demos/NN_topic/`) mirroring the
  **same-numbered** activity's concept, each with a description + **Run** steps + **What it demonstrates**
  `README.md`, and an H1 of the form `# NN. Title` matching the folder number. Keep every demo runnable
  and current with modern JS/TS.
- **`package.json` `"name"` is the bare topic slug** (no number), so a renumber never leaves it stale.
- **Renumbering a pair also touches `instructor/COURSE-MAP.md` and `diagrams/README.md`**, both of
  which key on the pair number: the course map in its per-day tables and its *Diagram → pairs* table,
  the diagram index in its *Pairs* column. (Diagram *filenames* are slugs and never move.) It also
  touches the `../../diagrams/png/…` links in the renamed pair's two READMEs, which stay valid only
  because the depth is unchanged. All of this is easy to forget because no test covers it.
- **Docs:** organized into twelve `Module-NN-Name/` folders (`Module-01`..`Module-12`), each with
  `MM-topic-slug.md` chapters numbered per module (`MM` restarts at 01 per folder), indexed in reading
  order by `docs/README.md`. Adding, renumbering, or re-moduling a chapter touches the file(s), its module
  folder, and `docs/README.md`; nothing references docs by number/path elsewhere.
- **Git is not taught in this course**: no Git chapter, activity, slide, or outline entry. (The
  repository's own default branch is still `main`.)
- **Assessments = one exit ticket per module (twelve total).**
  `courseware/assessments/module-NN-exit-ticket.md`, indexed by `assessments/README.md`. Each is
  formative and non-punitive (~5 min, not graded): three recap questions (a mix of multiple choice, short
  answer, and one "explain in your own words") grounded in **that module's actual doc chapters**, a
  *Muddiest Point*, a *Connect It* that ties the module to the learner's prior programming experience,
  and a collapsed Instructor Answer Key. **Keep exactly one ticket per `docs/Module-NN` folder**, twelve
  tickets for twelve modules, and re-ground a ticket's questions whenever its module's chapters change.
- **Slides are one deck per PAIR.** `slides/md/NN-<slug>-Slides.md` shares its number *and* slug with
  `demos/NN_<slug>/` and `activities/NN_<slug>/`, 35 decks, none unpaired. Neither the docs modules
  nor the outline's Roman-numeral sections are the axis: one outline section maps to several decks,
  and that mapping lives in `slides/README.md` and `outline/README.md`. Adding a pair means adding its
  deck in the same change.
- **A deck renders to at most 15 pages.** `preprocess.mjs` generates a title slide from the front
  matter, so the budget is **≤14 authored `##` slides**. Pair decks carry **no `#` dividers**: the
  title slide already names the topic, and dropping the divider buys back a page. If a topic will not
  fit, cut it; do not split one pair across two decks.
- **Tier 1 now enforces the deck rules**, so adding a pair without its deck (or vice versa) fails
  `npm run validate`: deck↔pair number/slug parity, front matter on line 1, no `#` dividers, and the
  ≤14-slide budget. What it cannot check is **per-slide overflow**: the theme clips rather than
  shrinking, so a single slide with too many bullets or too long a code block passes the count check
  and still loses content off the bottom.
- **Decks can carry a concept diagram**, written as a plain Markdown image directly under the `##`
  heading it illustrates:

  ```markdown
  ## The Event Loop

  ![Call stack, microtask queue and task queue feeding the stack](../../diagrams/png/event-loop.png)

  - Sync code first, then **every** microtask, then **one** task
  ```

  Four things make that path work, and breaking any one of them breaks every image at once, silently:
  - `convert.sh` / `convert.ps1` mount **`courseware/`** at `/work` (not `courseware/slides/`) and pass
    `SLIDES_DIR=/work/slides`, so `diagrams/` is visible inside the container at all.
  - `entrypoint.sh` writes preprocessed Markdown to `$SLIDES_DIR/.marp-src`, which sits at the **same
    depth as `md/`**, so one relative path is correct in both the authored deck and the processed
    copy. It used to be a `mktemp -d` outside the mount, which resolved every image against `/tmp`.
  - Both `marp` invocations pass **`--allow-local-files`**; without it Chrome refuses to read the PNG
    and the slide renders an empty box.
  - `courseware.css` caps images with `section img { max-width: 100%; max-height: 400px }`. **Author a
    plain `![alt](…)`.** Do not hand-size with Marp's `![w:760]` syntax, or the cap and the keyword
    fight each other.

  Because `entrypoint.sh` is baked into the container image, that first bullet-point set only holds
  after a **rebuild**; see the `-NoBuild` warning below.
- **A slide with a diagram gets the heading, the image, and at most two short bullets.** A 400px-tall
  image plus the `##` rule leaves roughly one bullet's worth of the content box. One image per slide,
  never two. Embed the **PNG**, never the SVG; the PPTX export rasterizes anyway.
- **Nothing validates image paths.** Tier 1's export check (`tier1-structure.test.mjs:149-176`) matches
  `![alt](path)` and fails only if the target lands under a *course-export-excluded* prefix;
  `courseware/diagrams/` is not excluded, so a **typo'd filename passes every test** and shows up as a
  blank box in the rendered PDF. Grep the image links and confirm each file exists on disk.
- **Checking for clipping is the agent's job, and it is a VISUAL check.** After changing any deck or
  rebuilding `slides/pdf/`, rasterize the pages and *look at them*. Do not skip this on the grounds
  that it needs a human; it does not.
  - **Rasterize:** `pdftoppm -png -r 110 -f <page> -l <page> slides/pdf/<deck>.pdf <out-prefix>`, then
    read the PNG. (`Read` also renders a PDF's `pages` directly when `pdftoppm` is on `PATH`.) Poppler
    provides `pdftoppm`; on Windows it is `winget install oschwartz10612.Poppler`, and winget's shim
    directory may not be on an already-running shell's `PATH`. Call the `.exe` by full path if so.
  - **Shortlist first, then look.** 35 decks is ~370 pages, too many to eyeball one at a time. Render
    each page to grayscale **PGM** (`pdftoppm -gray -r 60`), a format that is a short ASCII header
    plus raw bytes, so it parses with no image library. Then find the lowest row containing ink above
    the footer band (the bottom ~9%). Pages whose ink reaches the content-area boundary are the
    candidates; open only those as PNGs. **Every deck's page 1 is a false positive**: the generated
    title slide has a full-bleed background, so it always shows ink at the boundary. Ignore page 1.
  - **Do NOT try to detect clipping from extracted text.** `pdftotext` reports words that are painted
    but invisible, re-wraps long lines, and returns overflowing runs out of document order. Comparing
    the authored Markdown against extracted page text produces false positives on essentially every
    deck. `-clip` does not separate this case either. Pixels are the only reliable evidence. This has
    been tried; do not repeat it.
  - **Diagrams are now the likeliest cause of clipping.** An image is 400px of solid vertical space
    that no amount of terse wording shrinks. Re-run the sweep after every deck change that touches one.
  - **The reliable signal is ink in the bottom ~2.5% of the page**, below the footer text. Marp cuts
    overflow at the slide edge, so clipped content bleeds into that band. Do *not* flag on "ink
    reaches the content boundary" alone: a normal full slide does that, and the check then returns
    every diagram page.
  - **Last audit (all 35 decks, 401 pages, 32 of them carrying a diagram): no clipping.** The tightest
    slide is still `25-forms-and-validation` page 15 ("FormData: Convert and Send"), which has no
    diagram and no headroom. Every diagram slide follows the same shape (heading, 400px image, two
    bullets) and lands with room to spare.
  - **Nine decks sit at the 14-slide maximum** (`01`, `16`, `20`, `21`, `22`, `24`, `25`, `26`, `27`), so a
    diagram added to any of them must go **onto an existing slide, displacing bullets**, never onto a
    new one. `25-forms-and-validation` page 15 ("FormData: Convert and Send") is the single tightest
    slide in the course: the second code block's bottom border sits flush against the footer rule with
    zero headroom. Never add anything to that slide.
- **Some material deliberately has no deck.** The Day-1 setup / VS Code / linters / debugging
  sections (outline §I.C-G) are taught hands-on and from the docs. Do not "restore" them to the
  slide set; the docs are the record.
- **Two decks carry framing that belongs to no pair,** because it is lecture-shaped and the outline
  promises it: deck `01` opens with "what is JavaScript / ECMAScript" (§I.A-B) and deck `27` opens
  with "what is TypeScript / static vs dynamic / coercion" (§XII.A-D). Both sit at exactly 14
  slides, so anything added to either has to displace something. Do not move this framing into a
  deck of its own; that would break one-deck-per-pair.
- **Renaming or removing a deck means purging `slides/pdf/` and `slides/pptx/` first.** The merge step
  in `entrypoint.sh` globs the *output* directory, not the input list, so an orphaned PDF is silently
  merged into the combined deck. Check the combined page count afterwards (≈35 titles + total content
  slides); roughly double that means this bit you.
- **`entrypoint.sh` changed when diagrams landed** (scratch dir moved inside the mount,
  `--allow-local-files` added), and it is **baked into the container image**. The first run after
  pulling those changes must be a full `.\convert.ps1` / `./convert.sh`; `-NoBuild` would run the old
  entrypoint and render every diagram as an empty box. `courseware.css` is the exception: it is read
  from the mounted volume, so theme tweaks need no rebuild.
- **Do not use `convert.ps1 -NoBuild` / `convert.sh --no-build` when correctness matters.** The image
  tag `webdev-slides:latest` is **shared by every courseware repo**, and `entrypoint.sh` (which sets
  `COMBINED_NAME`) is baked into the image rather than read from the repo. If another course rebuilt
  that tag more recently, `-NoBuild` runs *its* entrypoint and the merged deck is written under *that*
  course's filename. The tell is a combined PDF named for a different course; re-run without the flag.
- **Slide-merge filename:** already set by `COMBINED_NAME` in `slides/utils/entrypoint.sh` to
  `JavaScript-and-TypeScript-Essentials-All-Slides.pdf` (the name the root `README.md` links to). The
  generated course-outline PDF is `JavaScriptEssentials_Outline.pdf` (likewise linked from the root
  `README.md`).

---

<!-- ===== Shared cross-course standards (standards/AGENTS.base.md) ===== -->

<!--
  SHARED COURSEWARE STANDARDS: the reusable [PATTERN] base for every course in this
  training program. It is combined with a per-course AGENTS.course.md to produce each
  repo's AGENTS.md (run standards/utils/assemble.sh or standards/utils/assemble.ps1).

  Edit CROSS-COURSE conventions here. Edit COURSE-SPECIFIC values in AGENTS.course.md.
  Never edit the generated AGENTS.md directly.

  This base states conventions that hold ACROSS courses, and defers concrete structure
  (folder shapes, numbering scheme, how demos and activities relate, themes) to the
  per-course profile. Courses differ: some group docs into module folders, others number
  them flat; some ship one demo per activity, others a single reference app the activities
  build. Read the course profile above for THIS course's specifics; where the profile and
  this base disagree, the profile wins.

  This folder is intended to become a git submodule shared across courses. See
  standards/README.md for how to promote it.
-->

## How the material is organized (the artifact model)

A course in this program is one body of material seen through a few artifact types. **They are
cross-referenced, not independent**; a change to one usually implies a change to others. Not every
course uses every artifact; the course profile says which exist and where they live.

| Artifact | Typical folder | Audience | Purpose |
|----------|----------------|----------|---------|
| **Docs (topics)** | `courseware/docs/` | Student (reference) | The prose "textbook": one chapter per topic |
| **Slides** | `courseware/slides/md/` | Instructor (projected) | The lecture spine: one deck per section or module, as the course profile defines |
| **Demos** | `courseware/demos/` | Instructor (performs) | Runnable code shown live: per-activity demos or a single reference app (the profile says which) |
| **Activities** | `courseware/activities/` | Student (does) | Hands-on exercises that apply the docs |
| **Assessments** | `courseware/assessments/` | Both | End-of-module formative checks (one exit ticket per module) |
| **Diagrams** | `courseware/diagrams/` | Both | Concept drawings embedded in docs and slides: `svg/` is the source, `png/`+`pdf/` are exports |
| **Teaching guide** | wherever the course profile says (often `courseware/instructor/`) | Instructor | Day-by-day flow, and a course map joining slide↔doc↔demo↔activity↔diagram, *only if the course has one* |

### The relationship graph

- **`docs/README.md` is the docs' table of contents.** It lists every chapter in reading order. When
  you add, remove, or renumber a chapter, update it in the same change. Whether chapters are numbered
  flat or grouped into module folders is set by the course profile. Docs are typically **not** referenced
  by number from anywhere else, so renumbering usually touches only the files themselves and this index.
- **`slides/README.md` and `outline/README.md` are the tables of contents for those folders** (parallel
  to `docs/README.md`). `slides/README.md` maps each deck to its outline section; `outline/README.md`
  lists the outline's sections. They describe folder *content*, distinct from the `slides/utils/` and
  `outline/utils/` READMEs, which document the build pipeline. Adding, removing, or renumbering a slide
  deck or an outline section means updating the matching folder README in the same change.
- **Demos and activities teach the same ideas.** *How* they relate is course-specific: some courses pair
  a self-contained demo one-to-one with each activity (same concept, taught on *different content* per
  the profile's themes); others provide a **single reference app** that the activities build up
  incrementally. Follow the course profile: keep whatever pairing and **theme(s)** it names, and don't
  cross themes the profile says to keep separate.
- **Activities may be cumulative, standalone, or a mix**; the course profile says which. **Where a
  cumulative chain exists, each step continues from the previous step's finished state** (whether that is
  a previous activity's `solution/` folder or the shared reference app). **Preserve that chain when
  editing**: a change to an early step ripples forward. Where the profile uses `begin/`/`end/`/`solution/`
  folders, keep `## Stretch goal` sections **additive** (never reflected in `solution/`) so the next
  step's starting point is unaffected.
- **Assessments are keyed to modules, not days.** The `assessments/` suite is one **formative exit
  ticket per module**, indexed by its own `README.md`. Each ticket's questions are grounded in that
  module's docs, so a change to a module's chapters may mean updating its ticket. The number of tickets
  must match the number of modules the profile defines; keep the per-module framing (never "daily/per-day").
  Assessments are for-the-learner-first and **never graded or ranked**.
- **Index tables must agree.** Every index that lists shared material (the root `README.md` outline,
  `docs/README.md`, `activities/README.md`, and, where the course has them, `demos/README.md`,
  `slides/README.md`, `outline/README.md`, `assessments/README.md`, `diagrams/README.md`, and the
  teaching guide) describes the same material. Treat divergence as a bug. Update only the indexes the
  course actually has.
- **A diagram serves several artifacts at once.** The same drawing is typically embedded in a doc
  chapter, shown on a slide, and linked from a demo/activity README. Changing what a diagram says means
  re-exporting all three formats and re-reading every place it appears; `diagrams/README.md` is the
  list of those places.
- **Cross-link demos and activities back to the docs.** Each demo/activity README should end with a
  *Related reading* (or *Reinforces*) link to its paired doc chapter(s); each assessment ticket draws its
  questions from, and can link back to, its module's doc chapters.

## Cross-cutting voice

- **Plain-English, encouraging, example-driven.** Short paragraphs; small, runnable code blocks with
  results shown in `// comments`.
- **Assume the audience's stated starting point** (see the course profile): define jargon the first
  time it appears; don't assume knowledge the profile says they lack.
- **Windows-first platform voice** (see *Platform & tooling* below).

## Voice, register, and mechanics

The **mechanics** below (spelling, dashes, punctuation, machine-writing tells) are **repo-wide**: they
apply to every Markdown file, including this one, the root `README.md`, and the agent instruction
sources. The **teaching register** applies to teaching content; meta documentation keeps a professional
technical-documentation register instead, held to the same prohibitions on glibness.

**Register: a composed professional trainer.** Warm, unhurried, explanatory, never glib. Complete
sentences with visible connectives (*because, which means, so that, whereas, once, until*), so the
argument structure lives in the grammar rather than in juxtaposition. Vary sentence length, with the
center of gravity between 15 and 30 words. Prefer paragraphs of three to five sentences developing one
idea, and merge orphaned one-sentence paragraphs into the argument they belong to. Keep the second
person and keep contractions. State limitations and trade-offs in the same sentence as the claim they
qualify. Do not become academic, bureaucratic, or passive; do not hedge claims the course makes
deliberately; and do not flatten encouragement into neutrality, because a trainer still reassures an
anxious learner. What changes is that the reassurance becomes reasoned rather than chanted.

**American English**, in prose only. Never change spelling inside a fenced block or inline code span, or
in an identifier, path, URL, package name, or quoted third-party text or program output. Image alt text
is prose, and it is usually duplicated across a doc chapter, a slide deck, and a pair README: fix every
copy, not just the first.

**No dashes.** Remove every em dash and every `--` standing in for one from prose, and convert en dashes
to hyphens, so exactly one dash character survives anywhere in the repo. Do not substitute a comma by
reflex, which produces comma splices; pick the replacement that fits the job the dash was doing:

- joining two independent clauses: a period, or a semicolon when they are tightly linked;
- introducing an explanation, expansion, or list: a colon;
- setting off a parenthetical: a pair of commas, or parentheses when the aside is incidental;
- trailing an afterthought: promote it to its own sentence with a connective, or delete it;
- landing a punchline: delete it, and absorb the point using the zinger rule below.

Often the honest fix is to restructure the sentence rather than re-punctuate it: if a sentence needs a
dash to hold together, it is usually two sentences. **Headings need care,** because heading text
generates the anchor other files link to. Collapse the whitespace the dash leaves behind (a stray double
space slugs to a double hyphen), update every link targeting the changed anchor in the same change, run
the link check, and leave the heading's meaning, numbering, and identifying text intact.

**No zingers.** A zinger is a short sentence or fragment deployed for rhetorical punch rather than to
carry information. The nine patterns: the fragment closer ("That's it."); the two-beat contrast ("Not
luck. Discipline."); the staccato imperative stack; the rhetorical setup ("Here's the thing:"); the
dismissive minimizer ("No magic."); the question-and-answer drumbeat; the one-line section closer
("Let's write some code."); the reassurance sign-off ("You belong here."); and the dash punchline.
**Deleting one is not enough,** because deletion leaves a hole where an argument used to be. Absorb its
claim into a complete sentence that also supplies the reason the zinger left implicit. Preserve every
fact, number, example, analogy, and technical claim: this is re-prosing, not re-scoping.

**Machine-writing tells.** Remove minimizers ("simply", "just", "easy", "easily", "obviously", "of
course", "all you have to do is") wherever they describe how hard a task is. Beyond being filler they
are pedagogically harmful for a learning audience, because someone stuck on a step labeled simple reads
their difficulty as a personal deficiency; keep "just" only in its temporal or restrictive senses. Also
remove: uniform `**Term:** explanation` bullets where every item has the identical shape (vary the
construction, or convert the list to prose, unless an artifact template mandates the shape); stock
phrasing ("it's not just X, it's Y", "at its core", "fundamentally", "think of it as", "let's dive in",
"in the world of X", "the beauty of X is"); the reflexive rule of three; closing sentences whose only
job is to restate the section; and decorative emoji in headings and body prose.

**Other mechanics.** Serial comma. Straight double quotes in prose. Ellipses only where something is
genuinely elided. No exclamation points in body prose. Bold reserved for defined terms and genuine
warnings, never emphasis-as-shouting. Do not introduce `---` horizontal rules while editing, because in
a slide deck they create unintended slide breaks.

**Slides are constrained by rendering, not only by register.** Marp clips rather than shrinking, so a
bullet must never grow. Every replacement listed above is shorter than the dash it replaces; keep it
that way, and if applying the register would lengthen a slide, leave it and note it. A terse bullet is
not a zinger.

**CI enforces the mechanical half.** A language check fails the build on any em or en dash and on any
British spelling outside code, reporting `file:line:column` and the offending token. Run it with the
rest of the validation suite, and never add prose that it would reject.

## Authoring conventions per artifact

Match the existing template exactly when adding a new file. The quickest and most reliable way to conform
is to **copy the nearest existing sibling and adapt it**; the profile names the concrete scheme, but the
files on disk are the ground truth.

### Doc chapter (`courseware/docs/…`)
- Single H1 title. Prose-first "textbook chapter" with `##`/`###` structure and `---` horizontal rules
  between major sections.
- Many small, focused fenced code blocks; show output/results as `// comments`.
- **No YAML front matter.** A chapter may carry a **concept diagram** where one earns its place (see
  *Diagrams* below); the prose must still read correctly with the image removed. End with a
  `## Summary` bullet list.
- File it under the numbering scheme the profile defines (flat `NN_topic-slug.md`, or `MM-topic-slug.md`
  inside a module folder) and add it to `docs/README.md` in reading order.

### Activity (`courseware/activities/…`)
- Follow the course profile's activity format. Two common shapes:
  - **Project-folder activities:** a folder with `README.md`, `package.json`, and `begin/`/`end/`/
    `solution/` directories (students work in `end/`; `begin/` is a pristine copy; `solution/` is the
    finished result). Cumulative activities inherit the previous activity's `solution/` as their `begin/`.
  - **Instruction-file activities:** a single `activity_NN.md` of steps that students carry out against a
    shared or scaffolded project (the finished reference living in the course's demo app).
- Optional `## Stretch goal` sections are **additive and must not be reflected in any committed `solution/`**.
- Content uses the **theme(s)** named in the course profile.

### Demo (`courseware/demos/…`)
- A runnable project the instructor performs, using the **theme** named in the course profile. Depending
  on the profile this is either **one self-contained project per activity** (mirroring that activity's
  concept) or **a single reference application** the activities build toward. Include a `README.md`
  (concept + talking points + a **demo trail**, meaning the specific files/code the instructor points
  out, and a *Related reading* link to the doc) and keep it runnable (`npm start` / `ng serve`, and any tests
  green).

### Exit ticket (`courseware/assessments/module-NN-exit-ticket.md`)
- **One per module** (`NN` = the module number), plus an `assessments/README.md` indexing the suite. The
  count of tickets must equal the number of modules the profile defines.
- **Formative and non-punitive:** ~5 minutes, **not graded**, anonymous is fine. Never rank or score.
- Structure: an H1 title (`# Module <N> Exit Ticket: <Module Title>`), a scope + `~5 minutes · Not
  graded` line, one friendly framing line, then **Quick Recap** (exactly 3 questions, a mix of multiple
  choice, short answer, and one "explain in your own words", all **grounded in that module's actual
  docs**, no invented content), a **Muddiest Point** prompt, a **Connect It** prompt (tie to the
  learner's prior work or the course's running project), and a **collapsed Instructor Answer Key**
  (`<details>`) that, for open-ended questions, says *what to listen for* rather than one right answer and
  closes with a short note on what the signals tell the instructor.
- Match the course voice (plain-English, encouraging). Run at the **end of each module**, not per day.

### Slide deck (`courseware/slides/md/NN-Section-Name-Slides.md`), see *The build pipelines*
- YAML front matter (`title`, `subtitle`, `author`) → title slide.
- Authored in a plain, tool-agnostic convention that the pipeline's `preprocess.mjs` maps to Marp:
  `#` = section-divider slide (title only); `##` = content slide (bullets/code/tables beneath it are its
  body). You do **not** hand-write Marp front matter or `---` separators; the preprocessor adds them.
- **No `---` rules**; headings alone drive slide breaks. Keep bullets terse.
- **A slide may carry one concept diagram** (see *Diagrams* below), placed directly under its `##`
  heading. An image eats vertical space exactly like a code block does, so a slide that has one keeps
  the heading, the image, and at most two short bullets. Never put two images on one slide.
- **All content must fit on its slide.** Marp does not shrink to fit; content taller than the slide is
  clipped. The theme comfortably holds ~9 bullets or a ~16-line code block; split an overflowing slide
  into two `##` slides. Verify by eye after regenerating (the rendered PDFs are the check).
- **Code/terminal blocks** are styled by the theme as bordered, smaller-monospace boxes. Use normal
  fenced code blocks with a language tag.
- **One deck per unit**, where the course profile decides whether a "unit" is an outline section or a
  docs module; the two are not always the same shape. Name files so they sort in teaching order; the
  pipeline merges PDFs in filename order. Record the deck ↔ outline mapping in `slides/README.md`,
  because when the two schemes differ it is not guessable from the filenames.

### Diagrams (`courseware/diagrams/`)

**When a diagram is worth drawing.** Reach for one when the idea is a **structure**, a **sequence**, or
a **decision** that the prose keeps re-describing in words: a chain that is walked, a queue that is
drained, a value that flows through stages, a rule that branches. If the bullets already carry the
idea, skip it: a diagram that only restates the text is decoration, and decoration costs a slide's
worth of vertical space. Err toward *fewer, better* drawings, each with one punchline it makes
unmistakable.

**How to build one.** Use the **diagram-builder MCP tool**, never hand-write or hand-edit the SVG.
The tool embeds its scene graph in the file's metadata, so editing the XML by hand corrupts the
source and later tool calls will not understand it.

- Build the whole diagram in a single atomic `apply_ops` call; op *N* can reference an element created
  by op *N-1*.
- Then call `render` and **look at the returned PNG**. This is not optional; it is how you catch
  overflowing labels, crossing arrows, and boxes that collide. Fix what you see with `update_element`
  and look again. `validate` additionally reports off-page elements, overlaps, and text overflow.
- Prefer the blue / orange / teal / indigo palette entries; they stay distinguishable for colorblind
  viewers. Use the `mono` font for code identifiers and `sans` for prose labels.

**Four things the renderer does that will surprise you.** Each one has cost a rebuild:

- **The `mono` font has programming ligatures.** `==` comes out as one long bar and `===` as a triple
  bar, ruinous on a diagram whose whole point is telling them apart. A zero-width non-joiner does not
  break them. **Set `font: "sans"` for any text containing `==`, `===`, `!==`, `=>`, `<=`, `>=` or
  `??`.** (The slide theme disables these ligatures in CSS for the same reason; the diagram tool has no
  such switch.)
- **Connectors are drawn behind shapes.** An arrow that crosses a filled box vanishes underneath it.
  Give any container a connector passes through `fill: "none"` and an explicit `stroke`.
- **`text: null` does not clear text**; it means "leave unchanged". Pass `""` to actually empty a
  shape. Nested container boxes need their label as a separate `add_label` at the top-left anyway,
  because shape text is vertically centered and lands behind the inner boxes.
- **Runs of whitespace collapse, and so do blank lines.** You cannot column-align with spaces or space
  paragraphs apart inside one shape. Use separate shapes, or a visible separator such as `→`.

**Where the files go.** Three formats, one basename:

| Folder | Format | Role |
|--------|--------|------|
| `diagrams/svg/` | `.svg` | **The source.** Built and edited only through the tool |
| `diagrams/png/` | `.png` | What docs, slides, and READMEs embed |
| `diagrams/pdf/` | `.pdf` | Vector copy for printing and handouts |

Re-export **all three** whenever a diagram changes, or the embedded PNG silently goes stale.

**Conventions.**

- **Name files by slug, not number** (`event-loop.svg`, not `01-event-loop.svg`), so inserting a
  diagram never renumbers the rest.
- **Diagrams stay general.** No demo folder, activity name, file name, or per-exercise variable may
  appear on a diagram; that is what lets it survive a renumber. (The same rule the course outline
  follows.)
- **Every image needs real alt text** that carries the content, not `![diagram]`. In docs, follow the
  image with a one-line italic caption stating the punchline.
- **The prose must stand without the picture.** A diagram sharpens an explanation; it never replaces
  one.
- Adding a diagram means adding its row to `diagrams/README.md` **and** the diagram column of the
  course map, in the same change.

## Platform & tooling

- **Primary teaching platform is Windows.** Terminal examples default to **PowerShell**.
- **Runnable folders are small npm projects.** Static folders serve with `http-server` (`npm start`);
  script folders run with Node (`npm start`); Angular/CLI projects use `ng serve` / `ng test`.
- **Containers use podman by default** for the build pipelines (Docker supported via
  `CONTAINER_ENGINE=docker`).
- **Line endings:** files executed *inside* the Linux build containers (`entrypoint.sh`, `*.mjs`,
  `convert.sh`, `Containerfile`) are forced to **LF** via each `utils/.gitattributes`. Do not let them
  become CRLF.

## The build pipelines (md → pdf)

The course has two **containerized `md → pdf` toolchains**, one for **slides**
(`slides/utils/`) and one for the **outline** (`outline/utils/`). Both are **file-driven**, share a
`marpteam/marp-cli` base image, and are built and run the same way (podman by default; `docker` via
`CONTAINER_ENGINE`):

```bash
./convert.sh              # macOS/Linux: build image (first run) + convert
./convert.sh --no-build   # re-convert only
```
```powershell
.\convert.ps1             # Windows (PowerShell 7+)
.\convert.ps1 -NoBuild    # re-convert only
```

- **Slides:** `slides/md/*.md` → *(preprocess.mjs)* → Marp → `slides/pptx/*.pptx` + `slides/pdf/*.pdf`
  → a merged all-decks PDF (filename set by `COMBINED_NAME` in `slides/utils/entrypoint.sh`). Theme lives
  in `slides/utils/courseware.css`.
- **Outline:** `outline/md/*.md` → *(marked + puppeteer-core / headless Chrome)* → `outline/pdf/*.pdf`.
- **Generated `pptx`/`pdf` outputs are never hand-edited**; edit the Markdown source and re-run the
  pipeline. A running container engine is required (`podman machine start` the first time).

## Working rules for an agent editing this repo

1. **The outline is the source of record.** Its PDF (which the root `README.md` links to) is
   **generated** from the outline Markdown via the containerized toolchain: edit the `.md` and
   regenerate; **never hand-edit the PDF.** `docs/README.md`, the root `README.md` outline, and the
   folder `README.md` indexes are the maps. Reconcile them last.
2. **Conform to the nearest sibling.** Copy an existing file/folder of the same type and adapt; do not
   invent a new structure. *Authoring conventions per artifact* plus the course profile are the checklist.
3. **Keep the index tables in sync.** Any add/remove/renumber of a doc, activity, demo, assessment,
   slide deck, outline section, or diagram means editing every index that lists it (only those the
   course has). Divergence is a defect. Keep exactly one assessment ticket per module and keep the
   framing per-module (not per-day).
4. **Preserve the theme(s)** the course profile names (and any separation it requires).
5. **Preserve any cumulative activity chain** the profile describes.
6. **Keep content current**; verify version-specific claims with a quick web check against the course
   profile's currency baselines.
7. **Never hand-edit generated outputs** (`pptx/`, `pdf/`, `AGENTS.md`); edit the source and re-run the
   pipeline or assembler.
8. **Follow *Voice, register, and mechanics* above.** It is normative, not advisory: the composed
   professional-trainer register, American English, no em or en dashes, no zingers, none of the
   listed machine-writing tells, and the punctuation rules. Read it before editing any prose, and
   remember the mechanical half is enforced by a language check that fails the build.
9. **Renumbering docs** touches the files (and their module folders, if any) and `docs/README.md`; docs
   are not referenced by number/path elsewhere. Renumbering an activity/demo means renaming its folder/file
   and updating its README index (and keeping any demo↔activity numbering the profile requires aligned).
10. **Diagrams are generated, never hand-written.** Build and change them only through the
    diagram-builder tool, **look at the rendered PNG** before moving on, and re-export `svg` + `png` +
    `pdf` together so the embedded copies cannot go stale.

## Adapting the standards to a course

- **Course-specific values** (title, audience, day layout, themes, currency, the repo map, numbering
  scheme, how demos/activities relate, filenames) live in `AGENTS.course.md`. **Cross-course conventions**
  live here in `standards/AGENTS.base.md`.
- After editing either source, regenerate the combined `AGENTS.md` with `standards/utils/assemble` (see
  `standards/README.md`). `CLAUDE.md` imports the generated `AGENTS.md`; the Copilot instructions point at
  it; Codex, Grok, Cursor, Gemini and other tools read `AGENTS.md` natively.
- When re-deriving a sibling course, **re-build the repository map, numbering scheme, and demo/activity
  model from what is actually on disk**; courses differ structurally. Do not carry over structure that
  isn't present, and update the course profile before assuming any layout.

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

# JavaScript & TypeScript Essentials: Slides

**One deck per demo/activity pair**: 35 Markdown decks, rendered to PDF and PPTX by the
containerized pipeline in [`utils/`](./utils/).

| Folder | What it is |
|--------|------------|
| [`md/`](./md/) | ⭐ **Source.** Hand-edited Markdown; the only thing you edit. |
| `pdf/` | **Generated.** One PDF per deck, plus the merged all-decks PDF. Never hand-edit. |
| `pptx/` | **Generated.** One PowerPoint per deck. Never hand-edit. |
| [`utils/`](./utils/) | The `md → pptx → pdf` toolchain (podman/docker). See its own README. |

## The rule

A deck **shares its number and slug with its pair**, so there is nothing to look up:

```
demos/17_promises/  +  activities/17_promises/  →  slides/md/17-promises-Slides.md
```

**Every deck renders to at most 15 pages**: the pipeline generates a title slide from the front
matter, so that is a title plus **≤14 authored `##` slides**. A deck is one sitting, not something to
scroll through looking for the section you need.

Each deck's paired [demo](../demos/README.md) and [activity](../activities/README.md) cover the same
concept, and both link on to the doc chapters behind it. The Day → decks table below says which decks
run when.

## Decks

| Day | Decks |
|-----|-------|
| 1 | `01` types-and-variables · `02` operators-and-strings · `04` conditionals · `05` loops · `08` functions · `24` string-number-math-methods |
| 2 | `03` objects · `06` arrays · `07` arrays-map-filter-reduce · `09` destructuring-rest-spread · `21` dom-window-and-selecting · `22` dom-events-and-styling · `25` forms-and-validation |
| 3 | `10` closures · `11` classes · `12` classes-inheritance · `13` this-binding · `14` constructors-and-prototypes · `15` error-handling · `26` json |
| 4 | `16` callbacks-and-timers · `17` promises · `18` async-await · `19` concurrent-promises · `20` modules · `23` fetch-api |
| 5 | `27` ts-type-annotations · `28` ts-interfaces-and-aliases · `29` ts-classes-and-abstract · `30` ts-generics-and-utility-types |
| reserve | `31` maps-and-sets · `32` dates-and-intl · `33` recursion · `34` dynamic-import · `35` ts-narrowing-and-discriminated-unions |

Deck numbers follow **topic order**, not calendar order (the same as the pairs), so a day draws from
several ranges.

## What is *not* on slides

Some material is deliberately taught without slides, because it is hands-on: installing Node and VS
Code, configuring ESLint and Prettier, and driving the DevTools debugger (outline §I.C-G). It lives
in [Module 01 of the docs](../docs/README.md) and is demonstrated live.

The two pieces of framing that *are* lecture-shaped keep their slides, folded into the deck that
follows them so they stay within one deck each:

- **"What is JavaScript / ECMAScript"** (outline §I.A-B) opens deck `01` types-and-variables.
- **"What is TypeScript / static vs dynamic / coercion"** (outline §XII.A-D) opens deck `27`
  ts-type-annotations.

Both decks sit at exactly 14 slides as a result, so anything added there has to displace something.

## Authoring

Decks are written in a plain, tool-agnostic convention that `utils/preprocess.mjs` maps to Marp:

- **YAML front matter** (`title`, `subtitle`, `author`) becomes the title slide.
  It **must start on line 1**; a leading blank line or BOM makes the parser silently fall back to
  a deck titled "Untitled" with the body rendered as content.
- **`##`** = a content slide; the bullets, code and tables beneath it are its body.
- **No `#` dividers.** With one deck per topic the auto title slide already names it, and skipping
  the divider buys back a page against the 15-page budget.
- **No `---` rules**; headings alone drive the slide breaks. You do not write Marp front matter or
  separators; the preprocessor adds them.
- **One concept diagram per slide, at most**, written as a plain Markdown image directly under the
  `##` heading:

  ```markdown
  ## The Event Loop

  ![Call stack, microtask queue and task queue feeding the stack](../../diagrams/png/event-loop.png)

  - Sync code first, then **every** microtask, then **one** task
  ```

  Embed the **PNG** from [`../diagrams/png/`](../diagrams/png), never the SVG. Write the path plainly
  and let the theme size it; `courseware.css` caps images at 400px tall, so Marp's `![w:760]` sizing
  keywords only fight the cap. Give every image real alt text.

**Everything must fit on its slide.** Marp does not shrink to fit, so anything taller than the slide
is clipped. The theme comfortably holds about **9 bullets** or a **~16-line code block**; split an
overflowing slide into two. A diagram is 400px of solid height, so a slide carrying one holds the
heading, the image, and **at most two short bullets**; nothing more. The rendered PDFs are the
check: look at them after a build.

## Building

```powershell
cd utils
.\convert.ps1            # build the image (first run) + convert
.\convert.ps1 -NoBuild   # re-convert only
```

```bash
cd utils
./convert.sh
./convert.sh --no-build
```

Needs a running container engine (podman by default; `CONTAINER_ENGINE=docker` for Docker).
Expect a few minutes; it is two headless-Chrome renders per deck, serially.

> **Be careful with `-NoBuild` / `--no-build`.** The image tag `webdev-slides:latest` is **shared
> across every courseware repo**, and `entrypoint.sh`, which sets `COMBINED_NAME`, is baked into
> the image, not read from this folder. If another course rebuilt that tag more recently, skipping
> the build silently runs *its* entrypoint and your merged deck comes out under *its* filename.
> If the combined PDF has the wrong name, that is what happened: re-run without the flag.

> **If you rename or remove a deck, delete `pdf/` and `pptx/` before rebuilding.** The merge step
> globs the *output* directory, not the input list, so an orphaned PDF from the old name is silently
> merged into the combined deck. The page count is the tell: it should be about 35 titles plus the
> total content slides, and nothing like double that.

> **Rebuild after every source change.** `pdf/` and `pptx/` are generated, so an edit to `md/` is
> invisible to anyone until you re-run the pipeline, and a stale render still looks finished.

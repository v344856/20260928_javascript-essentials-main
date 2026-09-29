# JavaScript & TypeScript Essentials: Course Outline

The outline is the **source of record** for what this course covers. When the outline, the docs, and
the demo/activity pairs disagree about whether a topic is in the course, the outline wins; everything
else is an implementation of it.

| Folder | What it is |
|--------|------------|
| [`md/`](./md/) | ⭐ **Source.** `JavaScriptEssentials_Outline.md`, hand-edited. |
| `pdf/` | **Generated.** `JavaScriptEssentials_Outline.pdf`, linked from the root README. Never hand-edit. |
| [`utils/`](./utils/) | The `md → styled HTML → pdf` toolchain (marked + headless Chrome). |

## The sections

Slide decks are numbered by **pair**, not by outline section, so one section maps to several decks.

| § | Section | Docs | Slide decks | Day |
|---|---------|------|-------------|-----|
| I | Getting Started | Module 01 | 01 (§I.A-B only; C-G are taught live) | 1 |
| II | JavaScript Types, Variables & Objects | Modules 02, 03 | 01, 02, 03, 06, 08 | 1-2 |
| III | Code Blocks | Modules 02, 04 | 04, 05, 15 | 1, 3 |
| IV | Working with Built-In Objects and Arrays | Modules 09, 03 | 24, 31, 32, 06, 07 | 1-2 |
| V | Browser Object Model | Module 07 | 21 | 2 |
| VI | Document Object Model (DOM) | Module 07 | 21, 22 | 2 |
| VII | Using JavaScript with Forms | Module 10 | 25 | 2 |
| VIII | JavaScript Objects | Modules 02, 04 | 03, 11, 12, 13, 14 | 3 |
| IX | Code Organization | Module 06 | 20, 34 | 4 |
| X | JSON | Module 11 | 26 | 3 |
| XI | Asynchronous Programming | Modules 05, 08, 03 | 16, 17, 18, 19, 23, 10, 08, 21 | 3-4 |
| XII | TypeScript | Module 12 | 27, 28, 29, 30, 35 | 5 |

Section numbering is **not** the teaching order: §XI covers closures and arrow functions (Day 3) as
well as promises and fetch (Day 4), and §IV's built-ins are split between Day 1 and Day 2. For the
day-by-day sequence, see the outline summary in the [course README](../../README.md); the `Day` column
above gives the same mapping per section.

## Two rules when editing

**Edit the Markdown, never the PDF.** The PDF is generated, and the root README links it, so a change
that skips the rebuild ships nothing.

**Adding a section is a commitment.** Every lettered item in the outline is something the course
promises to cover, and the exit tickets assess against it. Before adding one, decide which doc chapter
owns it and which demo (if any) shows it; an outline item with no home is a coverage gap that will
surface as a question you cannot answer in class. Removing one is the same decision in reverse.

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

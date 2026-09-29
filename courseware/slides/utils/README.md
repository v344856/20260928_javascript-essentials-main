# Slide Toolchain

Containerized pipeline that turns the Markdown slide decks in [`../md`](../md)
into PowerPoint and PDF using [Marp](https://marp.app/). Everything runs inside a
small Linux container, so the exact same toolchain works on macOS, Windows, and
Linux with no local installs beyond a container engine.

```
md/*.md  ──preprocess.mjs──►  Marp Markdown  ──marp──►  pptx/*.pptx + pdf/*.pdf  ──pdfunite──►  pdf/…-All-Slides.pdf
```

The decks are authored in a clean, tool-agnostic convention (YAML front matter,
`#`/`##` headings, no `---` rules, see below). At build time `preprocess.mjs`
converts each deck into Marp-ready Markdown, and Marp renders it with the
[`courseware.css`](courseware.css) theme. Authors never write Marp scaffolding by
hand.

## Prerequisites

- [podman](https://podman.io/) (default) **or** Docker.
  - On Windows/macOS, start the machine once: `podman machine init` then
    `podman machine start` (only needed the first time).
- Nothing else; Node, Marp, a headless Chrome, and poppler live inside the image.

## Usage

From this `utils/` folder:

**macOS / Linux**

```bash
./convert.sh              # build the image (first run) + convert all decks
./convert.sh --no-build   # skip the build, just re-convert
```

**Windows (PowerShell 7+)**

```powershell
.\convert.ps1             # build the image (first run) + convert all decks
.\convert.ps1 -NoBuild    # skip the build, just re-convert
```

**Use Docker instead of podman**

```bash
CONTAINER_ENGINE=docker ./convert.sh
```
```powershell
$env:CONTAINER_ENGINE = 'docker'; .\convert.ps1
```

Outputs land in [`../pptx`](../pptx) and [`../pdf`](../pdf). The merged deck is
`../pdf/JavaScript-and-TypeScript-Essentials-All-Slides.pdf`.

> The `.pptx` files are **image-based** (each slide is rendered as a picture).
> That is expected; the generated decks are for projecting, not hand-editing.
> The PDF is the primary deliverable.

## Files

| File | Role |
|------|------|
| `Containerfile` | Defines the image: the official Marp CLI image + poppler-utils + fonts. |
| `entrypoint.sh` | Runs **inside** the container: preprocess → Marp (pptx + pdf) → merge. |
| `preprocess.mjs` | Converts an authored deck into Marp-ready Markdown (front matter, slide breaks, section/title classes). |
| `courseware.css` | The Marp theme, professional look + bordered code/terminal blocks. |
| `convert.sh` | Host wrapper for macOS/Linux: builds the image and runs the container. |
| `convert.ps1` | Host wrapper for Windows. |
| `.gitattributes` | Forces LF endings so the container scripts run under Linux. |

## Adding or editing a deck

1. Add/edit a `NN-Module-Name-Slides.md` in [`../md`](../md) (one deck per docs module, e.g.
   `01-Getting-Started-Slides.md` … `12-TypeScript-Slides.md`).
2. Re-run `./convert.sh` (or `.\convert.ps1`).

The pipeline is file-driven: every `*.md` in `md/` is converted, and the PDFs
are merged in filename (section-number) order, so no script edits are needed.

### Slide Markdown conventions

Decks are authored in a plain, readable convention that `preprocess.mjs` maps to Marp:

- A YAML block at the top (`title`, `subtitle`, `author`) becomes the **title slide**.
- `#` headings are **section-divider** slides (title only, rendered on a dark background).
- `##` headings start a **content** slide; bullets/code/tables under it are the body.
- **No `---` rules**; headings drive the slide breaks. The preprocessor inserts
  the Marp `---` separators for you and is fence-aware, so a `#` comment *inside*
  a ```` ``` ```` code block is never mistaken for a heading.
- **Concept diagrams** are plain Markdown images referencing
  [`../../diagrams/png/`](../../diagrams/png), at most one per slide:
  `![alt text](../../diagrams/png/event-loop.png)`.

Keep bullets terse and code blocks reasonably short. The theme comfortably fits
~9 bullets or a ~16-line code block per slide; if a slide would overflow, split it
into two `##` slides. (Marp does not shrink content to fit; content that exceeds
the slide is clipped.) A slide carrying a diagram has room for the heading, the
image, and about two short bullets.

### How image paths resolve

Three things in this folder cooperate to make `../../diagrams/png/x.png` work, and
breaking any one of them blanks every image without failing the build:

1. `convert.sh` / `convert.ps1` mount **`courseware/`** at `/work` and pass
   `SLIDES_DIR=/work/slides`, so `diagrams/` exists inside the container. (They
   used to mount `courseware/slides/` alone.)
2. `entrypoint.sh` writes the preprocessed Markdown to `$SLIDES_DIR/.marp-src`:
   deliberately **the same depth as `md/`**, so one relative path is correct both
   in the deck you author and in the copy Marp actually reads. It used to use a
   `mktemp -d` outside the mount, which resolved every image against `/tmp`.
3. Both `marp` calls pass **`--allow-local-files`**; without it headless Chrome
   refuses to read the file and renders an empty box.

`entrypoint.sh` is baked into the image, so items 2 and 3 only take effect after a
rebuild, **do not use `--no-build` / `-NoBuild` on your first run after pulling.**

## Theming

The look is controlled entirely by [`courseware.css`](courseware.css), read from
this folder at build time (no image rebuild needed to tweak it, just re-run
`convert`). Highlights:

- Dark title and section-divider slides; light content slides with an accent
  underline under each heading and a course-name footer + slide number.
- **Code blocks** render as bordered boxes in a smaller monospace font. Shell /
  terminal fences (```` ```bash ````, `sh`, `console`, `powershell`, …) render on
  a dark "terminal" background; other languages render light.
- Fira Code **ligatures are disabled** so JavaScript operators (`=>`, `===`,
  `!==`, `??`) render exactly as typed, important for a teaching deck.
- **Images are capped** at `max-width: 100%` / `max-height: 400px` and centered, so
  a full-page concept diagram cannot push a slide past the fold. Author a plain
  `![alt](path)` and let the cap do the sizing; Marp's `![w:760]` keywords only
  fight it.

To change fonts or colors, edit the CSS variables at the top of the file.

## Troubleshooting

- **`podman` not found / machine not running**: run `podman machine start`.
- **`Error: invalid option type` naming a Windows path ending in `/work`**: you ran `convert.sh` from
  Git Bash, whose MSYS layer rewrites the `-v ...:/work` volume mount into a Windows path. Use
  `convert.ps1` from PowerShell instead, or prefix the command with `MSYS_NO_PATHCONV=1`.
- **Permission denied on the volume (SELinux Linux hosts)**: add `:Z` to the
  volume mount in `convert.sh` (`-v "$SLIDES_DIR":/work:Z`).
- **A code slide is clipped at the bottom**: the slide has too much content;
  split it into two `##` slides (Marp does not auto-shrink).
- **Fonts look off in the PDF**: add more font packages to the `Containerfile`
  (e.g. `fonts-noto`) and rebuild.

# Setup Instructions for JavaScript & TypeScript Essentials

Everything a student machine needs, and two scripts that install it.

**Please have this done before the first morning.** The class opens with roughly ninety minutes of
setup and orientation, and that time is far better spent on VS Code and the debugger than on waiting
for downloads.

---

## The quick way: run the script

The scripts are **idempotent**: they report what is already installed and skip it, so they are safe to
run on a machine that is half-configured, and safe to run twice.

### Windows (the primary teaching platform)

Open **PowerShell 7+ as Administrator** in this folder:

```powershell
.\setup.ps1 -Check    # report what's installed, change nothing
.\setup.ps1           # install whatever is missing
```

### macOS / Linux

```bash
./setup.sh --check    # report what's installed, change nothing
./setup.sh            # install whatever is missing
```

> **Open a new terminal afterwards.** Both scripts change `PATH` (and install `nvm`), and neither can
> alter the shell that launched them.

Both scripts install the **Active LTS** Node by default. If your organization needs a specific line,
override it; the option is spelled per platform:

```powershell
.\setup.ps1 -NodeVersion 24        # PowerShell parameter
.\setup.ps1 -SkipExtensions        # install nothing into VS Code
```

```bash
NODE_VERSION=24 ./setup.sh         # environment variable
./setup.sh --no-ext                # install nothing into VS Code
```

Then confirm:

```bash
git --version
node --version     # Active LTS - v24.x, or v26.x from late Oct 2026
npm --version
code --version
```

---

## What gets installed

| Software | Why the course needs it |
|----------|------------------------|
| **Google Chrome** | DevTools is used constantly from Day 1: console, debugger, the Elements panel. Any Chromium browser works, but the instructor demonstrates in Chrome. |
| **Visual Studio Code** | The editor the course is taught in. |
| **Node.js** (Active LTS, **via nvm**) | Runs the demos and activities. Also fetches each folder's own ESLint + Prettier on Day 1, and `tsx`, `http-server` and `json-server` on Days 4-5. |
| **Git** | Used to clone this repository. Git itself is **not taught** in this course. |

### Why nvm rather than the Node installer

The scripts install Node through a version manager (**nvm-windows** on Windows, **nvm** on
macOS/Linux) instead of the plain installer, for three reasons:

- A machine that already has a different Node for other work is left undisturbed.
- Students can switch versions afterwards without an uninstall/reinstall.
- If a corporate image ships an old Node, `nvm install --lts` fixes it in one command instead of
  requiring admin rights to remove the existing one.

If your environment forbids version managers, installing the Active LTS from
[nodejs.org](https://nodejs.org) works fine; nothing in the course depends on nvm itself.

### VS Code extensions

Installed by the scripts (skip with `-SkipExtensions` / `--no-ext`):

| Extension | Used for |
|-----------|----------|
| `dbaeumer.vscode-eslint` | Inline lint feedback; Module 01 covers linters |
| `esbenp.prettier-vscode` | Formatting; same chapter |
| `ritwickdey.liveserver` | One-click static server, a friendly alternative to `npx http-server` |

> **No TypeScript extension is needed.** VS Code ships with TypeScript built in, so Day 5 works out of
> the box. In particular, do **not** add *JavaScript and TypeScript Nightly*
> (`ms-vscode.vscode-typescript-next`); it replaces the editor's TypeScript with the nightly build,
> which can report errors the stable `tsc` this course runs does not. Its own marketplace page says it
> is for advanced users and that you do not need it.

---

## Permissions students need

This is the part that most often blocks a corporate laptop. Students need to be able to:

- **Install VS Code extensions.**
- **Run `npm install` and `npx`.** This is needed from **Day 1**, not just later in the week: every
  demo and activity is its own project with its own ESLint + Prettier, and `npm install` in the folder
  is what makes the VS Code ESLint extension work there (Module 01 covers this). Days 4-5 additionally
  fetch `tsx`, `http-server`, and `json-server` on first use.
- **Reach `registry.npmjs.org`.** If the network uses a proxy or an internal mirror, set it before
  class: `npm config set registry https://your-mirror/`.
- **Run a local web server on `localhost:8080` and `localhost:3000`.** The browser demos and the
  `fetch` demo bind those ports. A firewall prompt on first run is normal; allow it.
- **Allow geolocation for `localhost`.** One demo calls `navigator.geolocation`; the browser will
  prompt, and declining is a supported path (the demo handles it), so this is not a blocker.

---

## Manual install, if you prefer

- Google Chrome: <https://www.google.com/chrome>
- Visual Studio Code: <https://code.visualstudio.com>
- Node.js, Active LTS: <https://nodejs.org>
  (or nvm: [nvm-windows](https://github.com/coreybutler/nvm-windows) · [nvm](https://github.com/nvm-sh/nvm))
- Git: <https://git-scm.com/>

---

## Verifying a machine is class-ready

Beyond the version checks above, this proves the toolchain end to end:

```bash
cd courseware/demos/01_types-and-variables
node index.js                 # should print a page of type/scope output

cd ../27_ts-type-annotations
npx tsx index.ts              # first run downloads tsx - that is the npx check

cd ../21_dom-window-and-selecting
npx http-server -o            # should open a page; F12 shows console output
```

If all three work, the machine is ready for the whole week.

## Troubleshooting

**`node` not found after running the script.** The terminal predates the `PATH` change. Open a new
one. On macOS/Linux also confirm your shell profile sources nvm; the installer appends to
`~/.bashrc` or `~/.zshrc`, which only a new shell reads.

**`nvm use` says the version is not installed.** Run `nvm install --lts` first (Windows:
`nvm install lts`), then `nvm use`.

**`npx` hangs or fails behind a proxy.** Set `npm config set proxy` / `https-proxy`, or ask IT to
allowlist `registry.npmjs.org`.

**`code` is not a recognized command (macOS).** In VS Code press `Cmd+Shift+P` and run
*Shell Command: Install 'code' command in PATH*, then re-run the setup script to add the extensions.

**Port 8080 or 3000 already in use.** Something else is bound to it. `npx http-server -p 8081` works
for the static demos; for the `fetch` demo the port is referenced in the page, so stop the other
process instead.

# Setting Up Your Development Environment

Before you can write and run JavaScript, you need two things installed: a way to **run** JavaScript
outside the browser (Node.js) and a good **editor** to write it in (Visual Studio Code). This chapter
walks through installing both on Windows, adding a few helpful editor extensions, and running your first
JavaScript code in three places: from the terminal, in the browser console, and from a file.

The examples use **Windows** and **PowerShell**, the default terminal on Windows. The commands are the
same on macOS and Linux; only the way you open a terminal differs.

---

## Installing Node.js and npm

**Node.js** lets you run JavaScript on your computer (see [What Is JavaScript and ECMAScript?](./01-what-is-javascript-and-ecmascript.md)). Installing Node.js also
installs **npm**, the **N**ode **P**ackage **M**anager, which downloads and manages the reusable
libraries (called *packages*) that your projects depend on. You get both from one installer.

### Which Version?

Node.js publishes releases on two tracks:

- **LTS** (Long-Term Support): the stable, recommended line for most people.
- **Current**: the newest features, but shorter support.

**Install the LTS release.** Through most of 2026 the Active LTS line is **Node 24**; **Node 26**
takes over in late October 2026, when Node 24 moves to maintenance. Either is fine for this course.
Download it from [nodejs.org](https://nodejs.org), run the installer, and accept the defaults.
The site offers the current LTS by default, so you do not have to work the version out yourself.

### Verify the Install

Open a new PowerShell window and check the versions:

```powershell
node --version
# v24.x.x  (or v26.x.x once Node 26 becomes the Active LTS)

npm --version
# 11.x.x  (or newer)
```

If both commands print a version number, you are ready to go. If PowerShell says the command is not
recognized, close and reopen the terminal so it picks up the new settings. If it still fails,
re-run the installer.

---

## Managing Dependencies with npm

npm does two jobs: it runs scripts, and it installs **packages**, which is code other people wrote that you
do not want to write yourself. A project keeps track of what it uses in `package.json`, created with:

```powershell
npm init -y
```

Adding a package records it there and downloads it into `node_modules/`:

```powershell
npm install date-fns              # a dependency: needed when the app RUNS
npm install --save-dev prettier   # a devDependency: needed only while you WORK
```

The distinction matters when someone deploys your project: a production install can skip everything
under `devDependencies`. Formatters, linters, test runners and type checkers are all dev
dependencies; a date library your code imports at runtime is not.

```json
{
  "dependencies":    { "date-fns": "^4.1.0" },
  "devDependencies": { "prettier": "^3.4.0" }
}
```

### Version numbers and the lockfile

`^4.1.0` is a **range**, not an exact version. Package versions are `MAJOR.MINOR.PATCH`, and the
caret means "any release that does not change MAJOR", so `4.2.0` is allowed, `5.0.0` is not,
because a new major number signals a breaking change.

That flexibility would make installs unpredictable, so npm also writes **`package-lock.json`**
recording the exact version of everything it installed. Commit it. Then:

```powershell
npm install    # obeys the ranges; may update the lockfile
npm ci         # installs EXACTLY what the lockfile says - use this in CI
```

`node_modules/` is **never** committed, because it is large, machine-specific, and fully reproducible from
the two JSON files. That is why every project has it in `.gitignore`.

### Useful commands

```powershell
npm ls --depth=0     # what is installed at the top level
npm outdated         # what has newer versions available
npm uninstall pkg    # remove a package and drop it from package.json
npx some-tool        # run a tool without installing it globally
```

`npx` is the one you will use most in this course: it fetches a tool on demand, runs it, and leaves
nothing behind, which is how the later chapters run `tsx`, `http-server`, and `json-server`.

---

## Installing Visual Studio Code

**Visual Studio Code** (usually just **VS Code**) is a free, lightweight code editor from Microsoft. It
is the most popular editor for JavaScript and the one this course assumes.

Download it from [code.visualstudio.com](https://code.visualstudio.com), run the installer, and accept
the defaults. During installation on Windows, it is worth ticking **"Add to PATH"** and **"Open with
Code"** so you can launch the editor from the terminal and the right-click menu.

Once installed, you can open any folder as a project. From a terminal:

```powershell
code my-project
```

Or open VS Code and choose **File → Open Folder**. Opening a *folder* (not a single file) is important:
it gives you the file explorer, the integrated terminal, and project-wide features.

---

## Useful Extensions

VS Code is deliberately minimal out of the box; you add capabilities through **extensions**. Open the
Extensions view with the square icon in the sidebar (or `Ctrl+Shift+X`) and search by name. A few worth
installing early:

- **ESLint**: highlights problems in your code as you type (covered in [Linters and Formatters](./03-linters-and-formatters.md)).
- **Prettier - Code formatter**: automatically formats your code (also next chapter).
- **JavaScript (ES6) code snippets**: shortcuts for common patterns.
- **Path Intellisense**: autocompletes file paths in `import` statements.
- **Live Server**: serves an HTML file in the browser and reloads it whenever you save.

You do not need all of these on day one. ESLint and Prettier are the two that matter most, and we set
them up properly in [Linters and Formatters](./03-linters-and-formatters.md).

---

## Running JavaScript

There are three everyday ways to run JavaScript. You will use all three during the course.

### 1. Running a File with `node`

Create a file named `hello.js` with a single line:

```js
console.log("Hello from Node!");
```

Then run it from the terminal:

```powershell
node hello.js
# Hello from Node!
```

This is how you run scripts, try out ideas, and execute the demos in this course. `console.log(...)`
prints a value to the terminal, and it is your most-used tool for seeing what your code is doing.

### 2. The Node REPL

If you run `node` with **no file**, you get an interactive prompt called the **REPL** (Read-Eval-Print
Loop). Type an expression, press Enter, and see the result immediately:

```powershell
node
> 2 + 2
4
> "abc".toUpperCase()
'ABC'
> .exit
```

The REPL is great for quickly checking how something behaves. Type `.exit` (or press `Ctrl+C` twice) to
leave.

### 3. The Browser Console

Every browser has a built-in JavaScript console. Open your browser, press **F12** (or right-click the
page and choose **Inspect**), and click the **Console** tab. You can type JavaScript directly:

```js
console.log("Hello from the browser!");
2 + 2; // 4
```

The browser console is the place to experiment with code that touches the page (`document`, `window`,
and so on), which Node cannot do. We use it heavily in the DOM and Browser API modules later.

---

## The Integrated Terminal

You do not need a separate terminal window while working in VS Code; it has one built in. Open it with
**Terminal → New Terminal** from the menu, or press ``Ctrl+` `` (the backtick key). On Windows this
opens **PowerShell** by default, already pointed at your project folder.

Having the terminal inside the editor means you can edit a file and run it without switching windows:

```powershell
node hello.js
```

You can open several terminals at once (the `+` button) and split them side by side, which helps when
you want to run a server in one and commands in another. If you ever need to choose which shell opens, use the
dropdown next to the `+` and pick PowerShell.

---

## Summary

- Install the **Node.js Active LTS** release (Node 24, or Node 26 from late October 2026) from
  nodejs.org; it includes **npm**. Verify with `node --version` and `npm --version`.
- Track packages in **`package.json`**: `dependencies` are needed when the app runs, `devDependencies`
  only while you work. `^4.1.0` allows any non-breaking release; **`package-lock.json`** pins the exact
  versions and belongs in source control, while `node_modules/` never does. `npm ci` installs exactly
  the lockfile; `npx` runs a tool without installing it.
- Install **VS Code** from code.visualstudio.com and open your work as a **folder**, not a single file.
- Add the **ESLint** and **Prettier** extensions first; others (Live Server, snippets) are nice extras.
- Run JavaScript three ways: `node file.js` (run a file), the **`node` REPL** (interactive), and the
  **browser console** (F12 → Console) for page-related code.
- Use VS Code's **integrated terminal** (``Ctrl+` ``), PowerShell by default on Windows, to run
  commands without leaving the editor.

# Linters and Formatters

Two tools do a lot of quiet work to keep JavaScript projects healthy: a **linter** and a **formatter**.
They solve different problems, they work together, and both take only a few minutes to set up. This
chapter explains what each one is, then walks through installing and configuring **ESLint** and
**Prettier**, the standard pairing in the JavaScript world.

---

## Linting vs. Formatting

It is easy to lump these two together, but they answer different questions:

- A **linter** asks *"is this code likely to be a bug or a bad practice?"* It looks at the **meaning** of
  your code (an unused variable, a comparison that always returns the same value, a `case` that falls
  through by accident) and warns you.
- A **formatter** asks *"does this code look consistent?"* It cares only about **appearance**
  (indentation, quote style, spacing, line length) and rewrites your code to a single agreed-upon style.

Most projects want both, because they address different failure modes: the linter finds mistakes in
what the code does, while the formatter takes style off the list of things a team has to argue about.
Used together, they let you stop thinking about trivia and focus on the actual program.

**ESLint** is the standard linter, and **Prettier** is the standard formatter.

---

## A Project to Configure

Both tools install as **dev dependencies**, meaning packages your project needs while you *develop*, but not
when it *runs*. First, make sure your project has a `package.json` (the file npm uses to track
dependencies and scripts). If it does not, create one:

```powershell
npm init -y
```

That gives you a `package.json`, which the next two sections add ESLint and Prettier to.

---

## Setting Up ESLint

Install ESLint as a dev dependency:

```powershell
npm install --save-dev eslint
```

The `--save-dev` flag records ESLint under `devDependencies` in `package.json`. Modern ESLint (v9 and
later) uses **flat config**, a single, plain JavaScript file that exports an array of configuration
objects. Create it in your project root and name it **`eslint.config.mjs`**:

```js
// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
];
```

That configuration does four things: it turns on ESLint's **recommended** rule set, tells ESLint to
expect modern (`latest`) module syntax, declares which **globals** exist, and adds two rules of our
own: warn on unused variables, error on undefined ones.

The `globals` line matters more than it looks. `no-undef` flags any name ESLint has not been told
about, and that includes `console`. Without it, the very first file you lint reports
*"'console' is not defined"*. `globals.node` declares Node's globals; use `globals.browser` for
front-end code, or spread both if a project has each.

> **Why `.mjs` and not `.js`?** The config above uses `import` and `export default`. `npm init -y`
> creates a `package.json` with no `"type"` field, which means Node treats a plain `.js` file as
> CommonJS, and `npx eslint .` would fail with *"Cannot use import statement outside a module"*.
> The `.mjs` extension tells Node this one file is an ES module, whatever the rest of the project is.
> (The alternative is adding `"type": "module"` to `package.json`, but that changes **every** `.js`
> file in the project, which is a much bigger decision.)

For the two imports to work, install them too:

```powershell
npm install --save-dev @eslint/js globals
```

Now run the linter over your code:

```powershell
npx eslint .
```

`npx` runs a locally installed tool. The `.` means "check every file in this folder." ESLint prints any
problems it finds, with the file, line, and rule name so you know exactly what to fix.

---

## Setting Up Prettier

Install Prettier as a dev dependency:

```powershell
npm install --save-dev prettier
```

Prettier works well with **zero configuration**, but most projects add a small **`.prettierrc`** file to
lock in a couple of preferences so the whole team formats identically. Create `.prettierrc` in the
project root:

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "printWidth": 80
}
```

This says: end statements with semicolons, use double quotes, indent with two spaces, and wrap lines
around 80 characters.

**These are preferences, not rules.** None of them is more correct than its opposite: single quotes
are just as good as double, and the test harness that checks this course happens to use
`"singleQuote": true` with a wider `printWidth`. What matters is that *everyone on the project uses the
same file*, so formatting stops being a matter of opinion.

You will find this exact `.prettierrc`, and the `eslint.config.mjs` above, in **every demo and activity
folder**, which is what lets you open any one of them as its own project and get the same feedback we
just set up. Run `npm install` in a folder once and both `npm run lint` and `npm run format` work
there. One addition you will notice: the shipped files also set `"endOfLine": "auto"`, which tells
Prettier to leave each file's existing line endings alone, which is useful on Windows, where files are
stored with CRLF. (The code samples in these chapters are hand-formatted to make a teaching point, so don't be
surprised if Prettier would lay some of them out differently.)

One option worth knowing about is `trailingComma`. Prettier 3 defaults it to `"all"`, which adds a
comma after the last item wherever modern JavaScript allows one. This keeps diffs clean, because
adding a line no longer edits the line above it. Older guides set `"es5"`; there is rarely a reason to
now.

Format your code with:

```powershell
npx prettier --write .
```

The `--write` flag tells Prettier to actually rewrite the files (without it, Prettier only checks). Run
this once and every file is reformatted to match `.prettierrc`.

> **ESLint and Prettier stay in their lanes.** Let **Prettier** own formatting and **ESLint** own code
> quality. Because recent ESLint no longer includes formatting rules by default, the two do not fight,
> so you rarely need extra glue between them.

---

## Format on Save in VS Code

Running Prettier by hand gets tedious. VS Code can format **every time you save** instead. With the
**Prettier - Code formatter** extension installed (previous chapter), open your settings (`Ctrl+,`) and
enable two options, or add them directly to your project's `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

Now every save cleans up the file automatically. The ESLint extension, meanwhile, underlines problems in
your editor as you type, so you see lint warnings and get automatic formatting without ever leaving the
editor. Committing the `.vscode/settings.json` file means every teammate who opens the project gets the
same behavior.

---

## npm Scripts

Typing the full `npx` commands every time is a chore, and not everyone remembers the exact flags. The fix
is to add named **scripts** to `package.json` so anyone can run them the same way:

```json
{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

Now the whole team has two simple, memorable commands:

```powershell
npm run lint     # check code quality with ESLint
npm run format   # reformat everything with Prettier
```

These scripts also become the hooks that automated systems (like a continuous-integration server) use to
enforce quality on every change, which is a good reason to define them even on small projects.

---

## Summary

- A **linter** (ESLint) catches likely **bugs and bad practices**; a **formatter** (Prettier) enforces a
  consistent **appearance**. Use both, because they solve different problems.
- Install both as **dev dependencies** (`npm install --save-dev eslint prettier`) in a project that has a
  `package.json`.
- Configure ESLint with a flat-config **`eslint.config.mjs`** and Prettier with **`.prettierrc`**.
- Enable **format on save** in VS Code (`editor.formatOnSave` + the Prettier default formatter) so files
  clean themselves up as you work.
- Add **`lint`** and **`format`** npm scripts so the commands are short, shared, and easy to automate.

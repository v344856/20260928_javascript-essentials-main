# Activity: Geometry Helpers with Modules

Same concepts as the demo (ES `import`/`export`, then reaching a CommonJS file from an ES module), applied to a small geometry toolkit. You will build a `shapes.js` module with named exports and a `format.js` module with a default export, combine them in `index.js`, then pull in a legacy `.cjs` file alongside them.

**Estimated time:** 15-20 minutes

## Setup

Your working files are in `end/`. Open `end/index.js`, `end/shapes.js`, and `end/format.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

> This activity's `package.json` contains `"type": "module"`, which is what makes Node treat the `.js` files here as ES modules.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: Named export `rectangleArea`

In `shapes.js`, add `export function rectangleArea(w, h)` that returns `w * h`.

### Task 2: Named export `rectanglePerimeter`, plus a constant

In `shapes.js`, add `export function rectanglePerimeter(w, h)` returning `2 * (w + h)`, and `export const SHAPE = "rectangle"`, because a named export does not have to be a function.

### Task 3: Default export `format`

In `format.js`, default-export a function `format(label, value)` that returns `<label>: <value>`.

### Task 4: Import and combine

In `index.js`, use a named import for the shape exports (renaming `rectanglePerimeter` to `perimeter` with `as`) and a default import for `format`. Then log all three lines. Remember the `.js` extension in the path: Node requires it in an ES module.

**Expected output:**
```
Area: 20
Perimeter: 18
Shape: rectangle
```

### Task 5: Reach a CommonJS module

`legacy-units.cjs` is written in CommonJS, and there is no `require` in an ES module. Import `createRequire` from `node:module`, build a `require` with `createRequire(import.meta.url)`, and use it to load `./legacy-units.cjs`. Log the width in inches to two decimals.

**Expected output:**
```
Width: 3.94in
```

### Task 6: Top-level await

Because this is an ES module, `await` works at the top level with no `async` wrapper. Await `Promise.resolve("modules loaded")` and log the result. (CommonJS cannot do this.)

**Expected output:**
```
modules loaded
```

## What You'll Learn

- Declaring multiple named exports, including a non-function value.
- Declaring a default export, and the two matching import forms.
- Renaming an import with `as`.
- Enabling ES modules in Node via `"type": "module"`, and why the `.js` extension is required.
- Why `require` does not exist in an ES module, and how `createRequire` bridges to CommonJS.
- That a `.cjs` file stays CommonJS even inside a `"type": "module"` package.
- Top-level `await` as an ES-module-only capability.

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Add a `circle.js` module and load it **dynamically** with `await import("./circle.js")` inside an `if`, so it is only fetched when a `shape` variable says you need it. Log something before and after the import to prove it happened at that point in the program rather than being hoisted like a static `import`. Then try building the path from a variable, something a static `import` cannot do at all.

Sample output:

```
before dynamic import
Circle area: 78.54
after dynamic import
```

## Related reading

- [Why Modules? An Overview](../../docs/Module-06-JavaScript-Modules/01-js-modules.md)
- [Static (ES2015) Modules](../../docs/Module-06-JavaScript-Modules/02-js-static-modules.md)
- [Node.js and JavaScript Modules](../../docs/Module-06-JavaScript-Modules/05-nodejs-modules.md)
- Diagram: [The Module Graph](../../diagrams/png/module-graph.png)
- Diagram: [Page and Script Lifecycle](../../diagrams/png/page-and-script-lifecycle.png)

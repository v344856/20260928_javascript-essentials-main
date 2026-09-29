# Why Modules? An Overview

As a program grows, keeping everything in one file (or juggling many files that all share one global scope) stops working. Names collide, load order becomes fragile, and it gets hard to see what depends on what. **Modules** solve this: each file is its own scope, and you say explicitly what it shares (`export`) and what it needs (`import`).

This chapter is a short orientation. The chapters that follow cover each piece in depth.

![A static import graph resolved up front, beside a dynamic import fetched on demand](../../diagrams/png/module-graph.png)

*`import` is resolved before anything runs; `import()` happens later and returns a promise.*

---

## Before Modules: Multiple `<script>` Elements

Before modules, the only way to split browser code across files was to add several `<script>`
elements to the page:

```html
<script src="helpers.js"></script>
<script src="cart.js"></script>
<script src="app.js"></script>
```

Two things are worth understanding about this classic setup, because they're exactly what modules fix:

- **They run in document order.** The browser executes the scripts top to bottom, so `app.js` can only
  use something from `helpers.js` if `helpers.js` is listed **first**. Get the order wrong and you get a
  `ReferenceError`. (The `defer` attribute delays scripts until the HTML is parsed and keeps their
  order; `async` runs each as soon as it downloads, in *no* guaranteed order.)
- **They all share one global scope.** Every non-module script runs in the same global (`window`)
  space. A top-level `const total` in `cart.js` is visible to `app.js`, convenient at first, but it
  means any two files can **collide** on the same name and quietly overwrite each other, and it's never
  obvious which file depends on which.

That's the fragility the intro mentioned: order-sensitive, collision-prone, and implicit. Modules
replace this with per-file scope and explicit `import` / `export`, so a file states exactly what it
needs and shares nothing by accident. In the browser you opt in by marking your entry script
`type="module"` (covered in [Browsers and JavaScript Modules](./04-browser-modules.md)).

---

## What a Module Gives You

- **Its own scope.** Variables and functions in a module are private unless you export them, so there are no accidental globals.
- **Explicit dependencies.** `import` statements make it obvious, at the top of a file, what that file relies on.
- **Reuse.** The same module can be imported anywhere without copy-pasting.
- **Tooling.** Because dependencies are declared, editors, bundlers, and TypeScript can follow them.

A short example, with one file exporting and another importing:

```js
// math.js
export function add(a, b) {
  return a + b;
}
```

```js
// main.js
import { add } from "./math.js";

console.log(add(2, 3)); // 5
```

---

## Two Flavors of Module Loading

JavaScript modules come in two forms, and this module covers both:

- **Static modules**: `import` / `export` at the top of a file, resolved before the code runs. This is the everyday form for code you always need. (See [Static (ES2015) Modules](./02-js-static-modules.md).)
- **Dynamic modules**: `import()` called at runtime, returning a Promise, so you can load code **on demand**, when a button is clicked or a feature is first used. (See [Dynamic (ES2020) Modules](./03-js-dynamic-modules.md).)

---

## Where Modules Run

The same `import`/`export` syntax works in both places the course uses, with a small setup difference in each:

- **In the browser**: load your entry file with `<script type="module">`. (See [Browsers and JavaScript Modules](./04-browser-modules.md).)
- **In Node.js**: mark the package as ES modules with `"type": "module"` (or use the `.mjs` extension). (See [Node.js and JavaScript Modules](./05-nodejs-modules.md).)

---

## The Road Ahead

The rest of this module works through modules in order:

1. **Static (ES2015) Modules**: named exports, default exports, renaming, re-exports.
2. **Dynamic (ES2020) Modules**: `import()`, Promises, and `await` for on-demand loading.
3. **Browsers and JavaScript Modules**: `<script type="module">`, paths, and caching.
4. **Node.js and JavaScript Modules**: ES modules vs. CommonJS (`require`), `.mjs` / `.cjs`, and interop.

---

## Summary

- Modules split code into files that each have their own scope and share code through `export` / `import`.
- They replace fragile globals with explicit, tool-friendly dependencies.
- **Static** modules (`import`/`export`) load up front; **dynamic** modules (`import()`) load on demand at runtime.
- The same syntax runs in the browser (`<script type="module">`) and in Node.js (`"type": "module"` or `.mjs`).
- The following chapters cover static modules, dynamic modules, browser modules, and Node.js modules in turn.

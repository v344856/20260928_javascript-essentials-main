# Activity: Dynamic import() to Load Tools on Demand

> **Reserve pair.** The class works through `01`-`30` first; this one runs only if there is time.

Same concept as the demo (loading a module at runtime with `await import()`), applied to a new task: instead of importing one fixed module, you decide WHICH modules to load from a list at runtime and run each one on demand.

**Estimated time:** 10-15 minutes

## Setup

Your working files are in `end/`. Open `end/index.js`, `end/total.js`, and `end/average.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: Default-export `run` in `total.js`

In `total.js`, default-export a function `run(nums)` that returns the sum of the array.

### Task 2: Default-export `run` in `average.js`

In `average.js`, default-export a function `run(nums)` that returns the average (sum divided by length).

### Task 3: Load each module on demand

In `index.js`, loop over the `tools` array. For each `name`, `await import(`./${name}.js`)`, call the module's default export (`mod.default`) with `numbers`, and log `<name>: <result>`.

**Expected output:**
```
total: 12
average: 4
```

## What You'll Learn

- `import()` is a function that returns a promise for the module namespace object.
- The default export is reached through `mod.default` on that namespace.
- Building the module path at runtime lets you choose modules dynamically.
- Top-level `await` (allowed in an ES Module) lets you await the load at the top level.

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Add a name to the `tools` array that has no matching file and wrap each `import()` in `try`/`catch`, reporting the failure and carrying on. A static `import` could never fail at this point, because it is resolved before the program runs. Then load all the tools **concurrently** with `Promise.all` over the `import()` calls instead of awaiting them one at a time, and confirm a module imported twice is only evaluated once (add a `console.log` at the top of `total.js` and import it twice).

Sample output:

```
total: 12
average: 4
missing: could not load ./nope.js
```

## Related reading

- [JavaScript Dynamic (ES2020) Modules](../../docs/Module-06-JavaScript-Modules/03-js-dynamic-modules.md)
- Diagram: [The Module Graph](../../diagrams/png/module-graph.png)

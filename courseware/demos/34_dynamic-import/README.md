# 34. Dynamic `import()`

> **Reserve pair.** The class works through `01`-`30` first; this one runs only if there is time.

This demo shows loading a module at runtime with the dynamic `import()` function instead of a static `import` statement. `index.js` uses top-level `await import('./utils.js')` to get the module, then calls `utils.add(2, 3)` and logs `5`.

## Run

This folder includes a `package.json` containing exactly `{ "type": "module" }` so Node treats the file as an ES Module, enabling top-level `await` and dynamic `import()`:

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- `import()` is a function that returns a promise for the module namespace.
- Top-level `await` lets you await that module load at the top of an ES Module.
- Dynamic import loads a module on demand, unlike a static `import` at the top of the file.
- Requires `"type": "module"` in `package.json` (top-level await needs an ES Module).

## Related reading

- [JavaScript Dynamic (ES2020) Modules](../../docs/Module-06-JavaScript-Modules/03-js-dynamic-modules.md)
- Diagram: [The Module Graph](../../diagrams/png/module-graph.png)

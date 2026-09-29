# 20. JavaScript Modules

Both module systems, side by side, in one runnable folder. **ES modules** first, the modern default: named exports imported by matching name, a single default export the importer can name freely, renaming with `as`, and `import * as` for the whole namespace, plus the details that catch people out (the `.js` extension is required in Node, and `import` is *static*, meaning hoisted, analyzable, and unable to build a path at runtime). Then **CommonJS**: the folder is `{ "type": "module" }`, so `require` does not exist; `createRequire(import.meta.url)` manufactures one, which is also how real code bridges the two worlds. The `.cjs` file it loads announces itself when required, making the runtime-versus-static difference visible. A comparison table and a working top-level `await` close it out.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- Named exports and imports, and that the braces are import syntax rather than destructuring.
- A single default export per module, named by the importer.
- Renaming with `as`, and `import * as` to capture every export as a namespace object.
- That Node requires the `.js` extension in an ES module path.
- CommonJS `exports.x` / `require`, and how a `.cjs` file opts out of `"type": "module"`.
- `createRequire(import.meta.url)` bridging ES module code into CommonJS.
- Static `import` (hoisted, path must be a literal) versus dynamic `require` (runs in place, path can be computed).
- Top-level `await`, which works in an ES module and not in CommonJS.

## Related reading

- [Why Modules? An Overview](../../docs/Module-06-JavaScript-Modules/01-js-modules.md)
- [Static (ES2015) Modules](../../docs/Module-06-JavaScript-Modules/02-js-static-modules.md)
- [Node.js and JavaScript Modules](../../docs/Module-06-JavaScript-Modules/05-nodejs-modules.md)
- Diagram: [The Module Graph](../../diagrams/png/module-graph.png)
- Diagram: [Page and Script Lifecycle](../../diagrams/png/page-and-script-lifecycle.png)

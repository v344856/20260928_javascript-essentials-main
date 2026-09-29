# 31. Maps and Sets

> **Reserve pair.** The class works through `01`-`30` first; this one runs only if there is time.

The two keyed collections that objects and arrays do not cover well. **`Map`** holds key/value pairs like an object, but its keys keep their type (an object or a number stays one, where an object property is always coerced to a string), it remembers insertion order, and it has a real `size`. The demo covers `set`/`get`/`has`/`delete`, iteration with `for…of` destructuring and `keys()`/`values()`/`forEach`, using an object as a key, and converting between a Map, an array of pairs, and a plain object. **`Set`** holds unique values (adding a duplicate is silently ignored), which makes `[...new Set(array)]` the standard dedupe and `new Set(array).size` the standard distinct-count. It ends with the modern set-math methods `intersection`, `union`, and `difference`.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- `Map` basics: `set` (chainable), `get`, `has`, `delete`, and the `size` property.
- Iterating a Map in insertion order, destructuring `[key, value]` in `for…of`.
- `keys()`, `values()`, and `forEach` (which passes the *value* first).
- Using an object as a Map key, which is impossible with a plain object.
- Why an object's numeric key becomes a string while a Map's stays a number.
- Building a Map from an array of pairs, and back with `Object.fromEntries`.
- `Set` ignoring duplicates, and `add`/`has`/`delete`/`size`.
- The array dedupe idiom `[...new Set(arr)]` and the distinct count `new Set(arr).size`.
- `intersection`, `union`, and `difference` (ES2025; Baseline since mid-2024).

## Related reading

- [Maps and Sets](../../docs/Module-09-Built-In-Objects/06-maps-and-sets.md)
- Diagram: [Map and Set vs Object and Array](../../diagrams/png/map-set-vs-object.png)

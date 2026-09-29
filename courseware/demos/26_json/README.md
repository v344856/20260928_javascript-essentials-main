# 26. JSON.parse and JSON.stringify

Builds a plain order object (including a `Date`) and serializes it three ways with `JSON.stringify`: compact, pretty-printed with `space`, and with a `replacer` that drops the `password` field. It then parses the text back with `JSON.parse` using a `reviver` that revives ISO strings into `Date` objects, verifies a round-trip, and highlights the classic pitfall that a `Date` comes back as a string.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- `JSON.stringify(value)` for a compact JSON string
- The `space` argument (`JSON.stringify(value, null, 2)`) for readable, pretty-printed output
- The `replacer` argument to omit a field (returning `undefined` for `password`)
- `JSON.parse(text, reviver)` to transform values while parsing, reviving ISO date strings into `Date` objects
- Round-tripping an object through `stringify` then `parse`
- The pitfall that `Date` values serialize to strings and do **not** come back as `Date` without a reviver

## Related reading

- [JSON: Syntax and Serialization](../../docs/Module-11-JSON/01-json-syntax-and-serialization.md)
- Diagram: [The JSON Round Trip](../../diagrams/png/json-round-trip.png)

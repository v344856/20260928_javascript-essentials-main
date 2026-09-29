# 03. Objects

Walks through the object literal as JavaScript's core key/value structure: dot vs. bracket access, adding/updating/deleting properties, testing for a key with `Object.hasOwn`, shorthand and computed property names, the `Object.keys`/`values`/`entries` trio, copying with spread, and locking an object with `Object.freeze`.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- Declaring objects with the `{}` literal and reading properties via `obj.key` and `obj["key"]`
- Bracket access when the key lives in a variable
- Adding, updating, and `delete`-ing properties after creation
- Testing for a property with `Object.hasOwn`, and that a missing property reads as `undefined` rather than throwing
- Shorthand properties (`{ price, inStock }`) and computed keys (`{ [field]: value }`)
- `Object.keys` / `Object.values` / `Object.entries` and looping entries with `for...of`
- Copying and extending an object with the spread operator (`{ ...base }`)
- `Object.freeze` to make an object read-only, checked with `Object.isFrozen`

## Related reading

- [JavaScript Objects](../../docs/Module-02-JavaScript-Fundamentals/06-js-objects.md)
- Diagram: [Value vs Reference](../../diagrams/png/value-vs-reference.png)

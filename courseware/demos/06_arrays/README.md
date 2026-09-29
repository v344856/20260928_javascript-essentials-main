# 06. Arrays

Three passes over JavaScript's ordered collection. First, what an array can hold (numbers, strings, objects, other arrays, even functions you then call by index), plus reading by index and the fact that a missing index is `undefined` rather than an error. Then mutation: assigning to an index, `push`/`pop`, `unshift`/`shift`, and `splice` doing insert, remove, and replace in one call, all working fine on a `const` array, because `const` fixes the binding, not the contents. Finally searching and conversion: `split`/`join` between strings and arrays, `includes` versus `indexOf`, and `slice` as the non-destructive counterpart to `splice`.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- Arrays hold mixed types, including objects, nested arrays, and functions.
- Reading by index, and that an out-of-range index reads as `undefined`.
- Why a `const` array can still be mutated.
- `push`/`pop` returning the new length and the removed element respectively.
- `unshift`/`shift` at the front, and why they cost more than `push`/`pop`.
- `splice` for inserting, removing, and replacing in place.
- `split` and `join` converting between strings and arrays.
- `includes` (is it there?) versus `indexOf` (where is it?).
- `slice` copying a section without touching the original, in contrast with `splice`.

## Related reading

- [JavaScript Arrays](../../docs/Module-03-Arrays-and-Functions/01-js-arrays.md)
- Diagram: [map, filter, reduce](../../diagrams/png/array-pipeline.png)

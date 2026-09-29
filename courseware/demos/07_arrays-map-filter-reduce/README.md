# 07. Array map, filter, reduce

Introduces the higher-order array methods that drive functional-style JavaScript. It first shows `forEach` with the full `(value, index, array)` callback signature (as both an arrow function and a function expression), then `map` to double every number into a new array, `filter` to keep only the even numbers, and `reduce` to sum the array down to a single value. Commented-out prototype implementations show how each method works internally, and the logs confirm `map`/`filter` do not mutate the source array.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- The `(value, index, array)` callback signature shared by these methods
- `map` transforms each element into a new array
- `filter` keeps only elements whose callback returns truthy
- `reduce` collapses an array to a single accumulated value
- `map`, `filter`, and `reduce` return new values without mutating the original array

## Related reading

- [JavaScript Arrays](../../docs/Module-03-Arrays-and-Functions/01-js-arrays.md)
- Diagram: [map, filter, reduce](../../diagrams/png/array-pipeline.png)

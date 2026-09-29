# 05. Loops

Walks every way JavaScript repeats work, over the same small array each time so the differences stand out rather than the data. It starts with the copy-paste version (no loop at all), then the classic `for` loop forwards and backwards, `while` for when the number of passes is not known up front, `do…while` (including a case where the condition is false from the start and the body still runs once), and finally the modern `for…of` and `forEach`. It closes with `break` and `continue`.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- The three parts of a `for` loop: initial value, terminating condition, and the change on each iteration.
- Iterating in reverse, which is where an index-based `for` loop still beats `for…of`.
- `while` versus `do…while`, and the guarantee that `do…while` runs its body at least once.
- `for…of` as the modern default when you only need the values.
- `forEach`, which takes a callback and supplies both the element and its index.
- `continue` to skip a single pass and `break` to leave the loop entirely.

## Related reading

- [JavaScript Iteration Statements (Loops)](../../docs/Module-02-JavaScript-Fundamentals/05-js-iteration-statements.md)

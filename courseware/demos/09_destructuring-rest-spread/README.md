# 09. Destructuring, Rest and Spread

Covers both halves of destructuring and the two jobs the `...` operator does. **Arrays** unpack by *position*: rest gathering the tail, empty holes skipping positions you do not want, defaults for positions that do not exist, spread building a new array, and the one-line variable swap. **Objects** unpack by *name*: rest gathering the remaining properties, renaming on the way out, defaults for absent keys, and object spread as the idiomatic copy-and-override. It closes on where destructuring pays off most: destructuring a parameter directly in a function's signature so the call site reads like named arguments.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- Array destructuring by position, with `...rest`, skipped holes, and defaults.
- The same `...` as the **spread** operator, building a new array from existing ones.
- Swapping two variables in one line with `[x, y] = [y, x]`.
- Object destructuring by name, with `...rest`, renaming (`age: years`), and defaults.
- Object spread as copy-and-override, and that later keys win.
- Destructuring a parameter in a function signature to get named-argument ergonomics.

## Related reading

- [Object & Array Destructuring, Rest & Spread](../../docs/Module-03-Arrays-and-Functions/03-js-destructure-rest-spread.md)
- Diagram: [Destructuring, Rest and Spread](../../diagrams/png/destructuring-shapes.png)
- Diagram: [Value vs Reference](../../diagrams/png/value-vs-reference.png)

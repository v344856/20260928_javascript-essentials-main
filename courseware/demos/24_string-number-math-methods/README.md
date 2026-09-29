# 24. Strings, Numbers and Math

A tour of the three built-in objects you reach for constantly. **Strings**: `trim`, `slice` (including negative indexes), `indexOf`, `includes`/`startsWith`, `replace` versus `replaceAll`, `split`/`join`, `padStart`/`padEnd`, `repeat`, and `at`, all returning new strings, because strings are immutable. **Numbers**: `parseInt` with an explicit radix versus `Number()`, `toFixed`, `toString(radix)`, the coercion-free `Number.isInteger`/`Number.isNaN` checks, the classic `0.1 + 0.2 !== 0.3` floating-point gotcha with two ways to handle it, and `Intl.NumberFormat` for money. **Math**: the rounding family (`round`/`floor`/`ceil`/`trunc`), `abs`, `pow`/`sqrt`, `min`/`max` including spreading an array into them, `Math.PI`, and a reusable `randomInt` helper built on `Math.random()`.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- Strings are immutable: every string method returns a new string.
- Extracting and testing substrings: `slice`, negative indexes, `indexOf`, `includes`, `startsWith`.
- `replace` (first match) versus `replaceAll` (every match).
- `split` and `join` as inverses of each other.
- Reading numbers out of text with `parseInt`/`parseFloat`, and why `Number("42px")` is `NaN`.
- `toFixed` returning a **string**, and `Number.isInteger`/`Number.isNaN` avoiding coercion.
- Why `0.1 + 0.2 !== 0.3`, and fixing it by rounding or comparing within `Number.EPSILON`.
- `Intl.NumberFormat` for human-readable currency.
- The `Math` rounding family and how `trunc` differs from `floor` for negatives.
- Spreading an array into `Math.max`/`Math.min`.
- Building a `randomInt(min, max)` helper on top of `Math.random()`.

## Related reading

- [Working with Strings](../../docs/Module-09-Built-In-Objects/02-string-methods.md)
- [Working with Numbers](../../docs/Module-09-Built-In-Objects/03-number-methods.md)
- [The Math Object and Randomness](../../docs/Module-09-Built-In-Objects/04-math-and-random.md)

# 10. Closures

A closure is a function that remembers variables from the scope where it was created. This demo shows four uses: a counter factory with independent private state, a bank account exposing only `deposit`/`withdraw`, the classic `var`-in-loop pitfall fixed two ways (`let` and an IIFE), and a `memoize` wrapper that caches results.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- A factory function returning an inner function that keeps private state alive
- Independent closures: two counters don't share their `count`
- Encapsulation: `balance` is reachable only through the returned methods
- The `var`-in-loop bug (all callbacks see the final value) and fixes with `let` and an IIFE
- `memoize`: a closure over a `Map` cache so expensive calls run once per input

## Related reading

- [JavaScript Closures](../../docs/Module-03-Arrays-and-Functions/04-js-closures.md)
- Diagram: [Scope Chain and Closures](../../diagrams/png/scope-chain-and-closures.png)

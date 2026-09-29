# 17. Promises

Motivated by the problem it solves. The demo opens with three `setTimeout` calls nested inside each other (the **callback pyramid** you get when async steps must run in order), then rebuilds the same sequence with promises. `new Promise` hands you `resolve` and `reject`, wrapping async work in a value you can return and pass around. Returning a promise from inside `.then()` makes the next `.then()` wait for it, so the steps stay ordered but the nesting disappears: the chain is flat. It closes on failure: a rejection skipping every `.then()` until a single `.catch()` (which covers *every* step above it, something nested callbacks cannot do), `.finally()` running either way, and the `Promise.resolve`/`Promise.reject` shortcuts for already-settled promises.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- The nested "callback pyramid" that promises were invented to flatten.
- `new Promise((resolve, reject) => ...)` wrapping async work in a value.
- That a promise settles exactly once.
- `.then()` chaining, and how returning a promise makes the next link wait.
- One `.catch()` at the end of a chain handling a rejection from any step.
- A rejection skipping the intervening `.then()` handlers entirely.
- `.finally()` for cleanup that must run on both paths.
- `Promise.resolve` / `Promise.reject` for already-settled values.

## Related reading

- [JavaScript Promises](../../docs/Module-05-Asynchronous-JavaScript/03-js-promises.md)
- [JavaScript Callbacks](../../docs/Module-05-Asynchronous-JavaScript/02-js-callbacks.md)
- Diagram: [Promise States](../../diagrams/png/promise-states.png)
- Diagram: [The Event Loop](../../diagrams/png/event-loop.png)
- Diagram: [The Async Progression](../../diagrams/png/async-progression.png)

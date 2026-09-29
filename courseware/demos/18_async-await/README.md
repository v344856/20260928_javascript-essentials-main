# 18. `async` / `await`

`async`/`await` as a readable surface over the promises from the previous demo, not new machinery. The `.then()` chain is shown commented out directly above its `await` equivalent so the translation is obvious. From there: error handling, where a rejected promise makes `await` **throw**, so ordinary `try`/`catch`/`finally` replaces `.catch()`/`.finally()`; the fact that an `async` function always returns a promise, so `getValue()` is `Promise { 42 }` while `await getValue()` is `42`; and the single most common beginner bug, which is forgetting `await` and logging a pending promise instead of a value.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- `await` pausing an `async` function until a promise settles, so the code reads top to bottom.
- The direct translation from a `.then()` chain to sequential `await`s.
- A rejected promise throwing at the `await`, making `try`/`catch` the natural error handler.
- `finally` running on both paths, exactly as `.finally()` does.
- That an `async` function always returns a promise, whatever you `return` from it.
- That top-level `await` is available inside ES modules.
- The forgotten-`await` bug and what a pending promise looks like when logged.

## Related reading

- [JavaScript Async/Await](../../docs/Module-05-Asynchronous-JavaScript/04-js-async-await.md)
- [JavaScript Promises](../../docs/Module-05-Asynchronous-JavaScript/03-js-promises.md)
- Diagram: [The Async Progression](../../diagrams/png/async-progression.png)
- Diagram: [Promise States](../../diagrams/png/promise-states.png)
- Diagram: [Sequential vs Concurrent](../../diagrams/png/sequential-vs-concurrent.png)

# Activity: Reading Async Code with `async`/`await`

Same concepts as the demo, where `async`/`await` is a readable surface over the promises you just wrote, with `try`/`catch` in place of `.catch()`. Here you await steps one at a time, handle a step that fails, and prove that an `async` function always hands back a promise.

**Estimated time:** 15-20 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: Await three steps in order

Make `loadSteps` an `async` function that awaits `"step 1"`, `"step 2"`, `"step 3"` in sequence (50ms each), logging each result. Each `await` pauses the function until that promise settles.

**Expected output:**
```
step 1
step 2
step 3
```

### Task 2: Handle a failure with try/catch

In `loadOptional`, await `resolveAfter("bonus", 20, true)`, which rejects. Because a rejected promise **throws** at the `await`, wrap it in `try`/`catch` and log `"caught:"` with the error's `message`. Add a `finally` that logs `"finally: done trying"`.

**Expected output:**
```
caught: bonus unavailable
finally: done trying
```

### Task 3: An async function returns a promise

Write `async function getTotal()` whose whole body is `return 60`. Then log `getTotal() instanceof Promise` (`true`, because you got a promise, not a number) and `await getTotal()` (`60`, the resolved value).

**Expected output:**
```
without await: true
with await:    60
```

### Task 4: Compose with main

Make `main` await `loadSteps()`, then `loadOptional()`, then the two logs from Task 3, then log `"finished"`. Call `main()`.

**Expected output:**
```
finished
```

## What You'll Learn

- `await` pausing an `async` function until a promise settles, so code reads top to bottom.
- Sequential awaits running one promise after another.
- A rejected promise throwing at the `await`, so ordinary `try`/`catch` works.
- `finally` running on both the success and failure paths.
- That an `async` function always returns a promise, whatever you `return`.
- Awaiting async functions inside a `main` to order the whole program cleanly.

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Write `withTimeout(promise, ms)` that resolves with the promise's value if it settles in time, and otherwise rejects with a `"timed out"` error. You will need `Promise.race` between the original promise and a timer that rejects. Then call it twice, once with a fast step that succeeds and once with a slow one that times out, handling both with `try`/`catch`.

Sample output:

```
fast: step 1
slow: timed out after 30ms
```

## Related reading

- [JavaScript Async/Await](../../docs/Module-05-Asynchronous-JavaScript/04-js-async-await.md)
- [JavaScript Promises](../../docs/Module-05-Asynchronous-JavaScript/03-js-promises.md)
- Diagram: [The Async Progression](../../diagrams/png/async-progression.png)
- Diagram: [Promise States](../../diagrams/png/promise-states.png)
- Diagram: [Sequential vs Concurrent](../../diagrams/png/sequential-vs-concurrent.png)

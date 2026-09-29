# Activity: Launch Countdown with Promises

Same concepts as the demo (wrapping async work in a promise, chaining with `.then()`, and handling failure with `.catch()`/`.finally()`), applied to a launch countdown. The demo showed you the nested callback version first; here you write only the flat one, then break it on purpose to watch a rejection travel down the chain.

**Estimated time:** 15-20 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: A promise factory

Write `step(name, ms, shouldFail = false)` that returns a `new Promise`. After `ms` milliseconds it should `reject(new Error(name + " failed"))` when `shouldFail` is true, and `resolve(name)` otherwise.

### Task 2: Chain the countdown

Call `step("3...", 100)` and chain `.then()` handlers that log each result and **return** the next `step(...)`. Returning the promise is what makes the next `.then()` wait for it; without the `return` they all fire at once.

### Task 3: Finish the sequence

In the last `.then()`, log `"Liftoff!"` and return `runAbort()`.

**Expected output:**
```
Preparing launch...
3...
2...
1...
Liftoff!
```

### Task 4: A step that fails

In `runAbort`, call `step("ignition", 50, true)` and chain a `.then()` that logs something. It never runs, because a rejection skips every `.then()` between it and the nearest `.catch()`.

### Task 5: Catch and finally

Add a `.catch()` that logs `"caught:"` and the error's `message`, then a `.finally()` that logs `"finally: systems safed"`. `.finally()` runs on both the success and the failure path, which is what makes it the right home for cleanup.

**Expected output:**
```
--- abort sequence ---
caught: ignition failed
finally: systems safed
```

## What You'll Learn

- Wrapping asynchronous work in `new Promise((resolve, reject) => ...)`.
- Why you must **return** a promise from inside `.then()` to make the chain wait.
- That chaining keeps the steps in order without nesting them.
- A rejection skipping intervening `.then()` handlers to reach `.catch()`.
- Reading the failure through `error.message`.
- `.finally()` running regardless of outcome.

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Add `withRetry(makeStep, attempts)` that runs a failing step up to `attempts` times before giving up, logging each retry. Because a promise settles only once, you cannot retry the same promise object; you have to call the factory again for a fresh one, which is exactly the point of passing `makeStep` rather than a promise.

Sample output:

```
attempt 1 failed: ignition failed
attempt 2 failed: ignition failed
attempt 3 succeeded
```

## Related reading

- [JavaScript Promises](../../docs/Module-05-Asynchronous-JavaScript/03-js-promises.md)
- [JavaScript Callbacks](../../docs/Module-05-Asynchronous-JavaScript/02-js-callbacks.md)
- Diagram: [Promise States](../../diagrams/png/promise-states.png)
- Diagram: [The Event Loop](../../diagrams/png/event-loop.png)
- Diagram: [The Async Progression](../../diagrams/png/async-progression.png)

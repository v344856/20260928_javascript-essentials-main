# Activity: Load a Dashboard Concurrently

Same concept as the demo (run independent async tasks together with `Promise.all` instead of awaiting them one at a time), applied to loading a dashboard's widgets. You start every widget at once, wait for the whole group, then handle a partial failure with `Promise.allSettled`.

**Estimated time:** 10-15 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: Load all widgets at once

Use `Promise.all` to start `loadWidget("chart", 300)`, `loadWidget("feed", 200)`, and `loadWidget("profile", 250)` **together**, and destructure the results into `chart`, `feed`, and `profile`.

### Task 2: Report them in order

Log `Loaded: chart, feed, profile` using each widget's `name`. Notice the results come back in the **order you listed them**, not the order they finished (`feed` finishes first, but `chart` is still first).

### Task 3: Tolerate a failure with allSettled

Use `Promise.allSettled` on `loadWidget("stats", 100)` and `Promise.reject(new Error("ads failed"))`. Count how many **fulfilled** and log `Extras: 1 of 2 loaded`.

**Expected output:**
```
Loading dashboard...
Loaded: chart, feed, profile
Extras: 1 of 2 loaded
```

## What You'll Learn

- `Promise.all` runs independent promises concurrently and resolves with an **ordered** results array.
- Concurrent loading costs the **slowest** task, not the **sum** of all of them.
- `Promise.allSettled` waits for every promise and reports each outcome, so one failure doesn't sink the rest.
- This is the concurrent counterpart to the strictly sequential nesting in the previous activity.

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Prove the timing claim rather than taking it on trust. Time the `Promise.all` version with `Date.now()`, then load the same three widgets with three sequential `await`s and time that too. Print both durations rounded to the nearest 50ms. The concurrent run should cost about the slowest widget (~300ms) while the sequential run costs the sum (~750ms). Then add `Promise.race` to report which widget arrived first.

Sample output:

```
concurrent: ~300ms
sequential: ~750ms
first back: feed
```

## Related reading

- [JavaScript Promises](../../docs/Module-05-Asynchronous-JavaScript/03-js-promises.md)
- Diagram: [Sequential vs Concurrent](../../diagrams/png/sequential-vs-concurrent.png)
- Diagram: [The Event Loop](../../diagrams/png/event-loop.png)

# Activity: Passing Callbacks and Driving Timers

Same concepts as the demo (functions passed as arguments, then callbacks handed to the event loop), applied to a "run this N times" helper and a self-stopping stopwatch. You will write a higher-order function, feed it three different callbacks, then watch the event loop reorder your output.

**Estimated time:** 15-20 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: A higher-order function

Write `times(n, action)` that calls `action(i)` for `i` = 1 through `n` and returns an array of the results.

### Task 2: Named callbacks

Write `square(x)` and `label(x)` (returning `"hi #" + x`), then pass each **by reference** to `times`, as in `times(3, square)`, not `times(3, square(3))`.

**Expected output:**
```
[ 1, 4, 9 ]
[ 'hi #1', 'hi #2', 'hi #3' ]
```

### Task 3: An inline arrow

Call `times(3, ...)` again with an inline arrow function that multiplies by 10.

**Expected output:**
```
[ 10, 20, 30 ]
```

### Task 4: The event loop reorders you

Schedule a `setTimeout` with a delay of `0` that logs `"queued, runs last"`, then immediately log `"synchronous, runs first"`. Even a zero delay loses, because the call stack has to empty before a queued callback can run.

**Expected output:**
```
synchronous, runs first
queued, runs last
```

### Task 5: A self-stopping stopwatch

Use `setInterval` to log `"Tick 1"`, `"Tick 2"`, `"Tick 3"`, then call `clearInterval` to stop it. Without that call the timer would repeat forever and the program would never exit.

### Task 6: One last message

From inside the tick where you stop the interval, use `setTimeout` to log `"All done!"` after a short delay, so it lands after the final tick.

**Expected output:**
```
Tick 1
Tick 2
Tick 3
All done!
```

## What You'll Learn

- Writing a higher-order function that accepts behavior as a parameter.
- Passing a function by reference versus calling it.
- Using a named callback or an inline arrow interchangeably.
- Why synchronous code always finishes before any queued callback, even at `setTimeout(..., 0)`.
- Repeating work with `setInterval` and ending it with `clearInterval`.
- Why an uncleared interval keeps a Node process alive.

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Write `delay(ms, callback)` and use it to run three named steps strictly in order by scheduling each from inside the previous one, building the "callback pyramid". Then add an error path: give each callback the Node-style `(error, result)` signature, make the second step fail, and confirm the third never runs.

Sample output:

```
Step 1 done
Step 2 failed: sensor offline
```

## Related reading

- [JavaScript Callbacks](../../docs/Module-05-Asynchronous-JavaScript/02-js-callbacks.md)
- [The Event Loop](../../docs/Module-05-Asynchronous-JavaScript/01-js-event-loop.md)
- [Timers](../../docs/Module-05-Asynchronous-JavaScript/05-js-timers.md)
- Diagram: [The Event Loop](../../diagrams/png/event-loop.png)
- Diagram: [The Async Progression](../../diagrams/png/async-progression.png)

# 16. Callbacks and Timers

Where asynchronous JavaScript starts. First a **callback** with nothing async about it: `mathOp` receives a *function* as an argument and calls it, showing that passing `add` (a reference) is different from passing `add(...)` (a result), and that `map` is the same idea you already use. Then **`setTimeout`**, where the callback is handed to the event loop instead: two timers are scheduled and the synchronous line written *after* them still prints first, because the call stack has to empty before any queued callback runs; a delay is a minimum wait, not a promise. Finally **`setInterval`**/`clearInterval` counting down and stopping itself (without the `clearInterval` the program would never exit), and a **`setTimeout` chain** where each step schedules the next from inside its own callback, producing the nested shape that promises were invented to flatten.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- A callback is an ordinary function passed as an argument; higher-order functions take or return functions.
- Passing `add` versus calling `add(...)`: reference versus result.
- Inline arrow functions as callbacks, and `map` as a higher-order function you already use.
- `setTimeout` queueing a callback for the event loop rather than running it inline.
- Why synchronous code always finishes before any timer callback, regardless of source order.
- That a shorter delay runs first, and that a delay is a *minimum*, not a guarantee.
- `setInterval` repeating until `clearInterval` stops it, and that an uncleared interval keeps the process alive.
- Chaining `setTimeout` calls to force strict ordering, and the nesting ("callback pyramid") that results.

## Related reading

- [JavaScript Callbacks](../../docs/Module-05-Asynchronous-JavaScript/02-js-callbacks.md)
- [The Event Loop](../../docs/Module-05-Asynchronous-JavaScript/01-js-event-loop.md)
- [Timers](../../docs/Module-05-Asynchronous-JavaScript/05-js-timers.md)
- Diagram: [The Event Loop](../../diagrams/png/event-loop.png)
- Diagram: [The Async Progression](../../diagrams/png/async-progression.png)

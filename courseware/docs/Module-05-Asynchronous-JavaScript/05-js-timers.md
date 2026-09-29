# JavaScript Timers

**Timers** let you schedule code to run **later**: after a delay, or repeatedly on an interval.
They were JavaScript's original asynchronous tool, and they're still everywhere: debouncing input,
polling for updates, animations, retries, and simple "run this in a moment" needs.

Timers are provided by the **host environment** (the browser or Node.js), not by the JavaScript
language itself, which is why they cooperate with the event loop rather than blocking it.

---

## `setTimeout`: Run Once, Later

`setTimeout(callback, delay)` schedules a function to run **once**, after at least `delay`
milliseconds.

```js
console.log("start");

setTimeout(() => {
  console.log("later");
}, 1000); // wait ~1000 ms (1 second)

console.log("end");

// start
// end
// later   <- printed about 1 second after the others
```

Notice `end` prints **before** `later`. `setTimeout` doesn't pause your code; it registers the
callback and moves on. The delay is a **minimum**, not a guarantee; the callback runs once the delay
has passed *and* the call stack is free.

### Passing arguments

Extra arguments after the delay are handed to the callback:

```js
setTimeout((name) => {
  console.log("Hello, " + name);
}, 500, "Alice");
// Hello, Alice
```

### Canceling with `clearTimeout`

`setTimeout` returns an **id** you can pass to `clearTimeout` to cancel it before it fires.

```js
const id = setTimeout(() => {
  console.log("you will never see this");
}, 1000);

clearTimeout(id); // canceled before it runs
```

---

## `setInterval`: Run Repeatedly

`setInterval(callback, delay)` runs a function **again and again**, roughly every `delay`
milliseconds, until you stop it.

```js
let count = 0;

const id = setInterval(() => {
  count++;
  console.log("tick " + count);

  if (count === 3) {
    clearInterval(id); // stop after 3 ticks
  }
}, 1000);

// tick 1   (~1s)
// tick 2   (~2s)
// tick 3   (~3s, then stops)
```

**Always keep the id** so you can call `clearInterval(id)`. An interval you never clear runs forever
and is a common source of memory leaks and runaway timers.

---

## `queueMicrotask`: Run Very Soon, But Not Now

`queueMicrotask(callback)` schedules a function to run on the **microtask queue**, the same
high-priority queue promises use. Microtasks run **after the current code finishes but before any
timer**, even a `setTimeout(..., 0)`.

```js
console.log("1: sync");

setTimeout(() => console.log("2: timeout"), 0);

queueMicrotask(() => console.log("3: microtask"));

console.log("4: sync");

// 1: sync
// 4: sync
// 3: microtask   <- microtasks run before timers
// 2: timeout
```

Reach for `queueMicrotask` when you want to defer work to "right after the current operation" without
waiting a full turn of the timer queue.

---

## Timers and the Event Loop

Timers make sense once you connect them to the event loop (see [The Event Loop](./01-js-event-loop.md)):

* `setTimeout`/`setInterval` callbacks go on the **task (macrotask) queue**.
* `queueMicrotask` (and promise `.then`) callbacks go on the **microtask queue**.
* After each task, the event loop drains **all microtasks** before running the next task.

That ordering explains the example above: synchronous code first, then all microtasks, then timers.

It also means a timer's delay is a **floor, not a ceiling**. If the call stack is busy with heavy
synchronous work, your `setTimeout(fn, 100)` will fire *later* than 100 ms; the event loop can't run
your callback until the stack is clear.

```js
setTimeout(() => console.log("done"), 10);

// Blocking loop hogs the thread for ~2 seconds:
const stop = Date.now() + 2000;
while (Date.now() < stop) {
  // busy work
}
// "done" prints after ~2 seconds, not after 10 ms
```

---

## Common Pitfalls

### Timer drift with `setInterval`

`setInterval` does **not** guarantee perfectly even spacing. If a callback takes a while, or the
thread is busy, ticks bunch up and slowly **drift** away from the clock. For accuracy over time,
prefer a **self-correcting** chain of `setTimeout` calls that measures real elapsed time.

```js
function everySecond(callback) {
  let expected = Date.now() + 1000;

  function tick() {
    const drift = Date.now() - expected; // how late we actually are
    callback();
    expected += 1000;
    setTimeout(tick, Math.max(0, 1000 - drift)); // correct for the drift
  }

  setTimeout(tick, 1000);
}
```

### Closures in loops with timers

Combining timers with `var` in a loop hits the classic closure trap: `var` is shared across all
iterations, so every callback sees the **final** value.

```js
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 4
// 4
// 4   <- all print 4, the value of i after the loop ends
```

Use `let`, which creates a fresh binding per iteration:

```js
for (let i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 1
// 2
// 3
```

### Forgetting to clear

Every `setInterval` (and any repeating `setTimeout` chain) should have a clear plan for **stopping**.
In UI code especially, clear your timers when a component goes away, or they'll keep firing against
things that no longer exist.

---

## Summary

* **`setTimeout(fn, delay)`** runs `fn` once after a minimum delay; **`clearTimeout(id)`** cancels it.
* **`setInterval(fn, delay)`** repeats until **`clearInterval(id)`** stops it, so always keep the id.
* **`queueMicrotask(fn)`** runs on the microtask queue, **before** any timer callback.
* Timer delays are a **minimum**, not exact; blocking synchronous code pushes callbacks later.
* Watch for **interval drift** (self-correct with `setTimeout`) and the **`var`-in-a-loop** closure
  trap (use `let`).
* Always have a way to **clear** repeating timers so they don't run forever.

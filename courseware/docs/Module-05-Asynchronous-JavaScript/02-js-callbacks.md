# JavaScript Callbacks

A **callback** is a function you hand to another function so it can be called *later*.
That small idea is the foundation of how JavaScript does asynchronous work: because functions
are values, you can pass one along and let the event loop decide when to run it.

![The same three steps written as nested callbacks, then a flat promise chain, then async/await](../../diagrams/png/async-progression.png)

*Same three steps three ways: nesting, then a flat chain, then top-to-bottom.*

---

## Basic idea of a callback

Since functions are values in JavaScript, you can pass one into another function just like you'd
pass a number or a string:

```js
function greet(name) {
  console.log("Hello, " + name);
}

function doTwice(callback) {
  callback("Alice");
  callback("Bob");
}

doTwice(greet);
```

Here `greet` is the callback passed into `doTwice`, which then calls it twice. This is a
**synchronous** callback: it runs immediately, right inside `doTwice`, before `doTwice`
returns.

---

## Asynchronous callbacks

Callbacks get more interesting when they run **later** instead of immediately. This is where the
event loop enters the picture. Consider a callback handed to `setTimeout`:

```js
console.log("Start");

setTimeout(function () {
  console.log("Inside timeout");
}, 1000);

console.log("End");
```

Tracing what happens shows why the order isn't top-to-bottom:

1. `"Start"` is logged.
2. `setTimeout` tells the browser: "run this callback after 1000 ms".
3. `"End"` is logged.
4. After about a second, the browser puts the callback into a **task queue**.
5. The **event loop** sees the call stack is empty, pulls the callback off the queue, and runs it -> `"Inside timeout"`.

So the callback runs later, only once the event loop picks it up, which is why `"End"` prints
before `"Inside timeout"`.

---

## Callbacks and DOM events

Event listeners work the same way: the function you register is a callback the browser calls when
the event happens.

```js
button.addEventListener("click", function () {
  console.log("Button was clicked!");
});
```

The flow mirrors the timer example. You register the callback with `addEventListener`, and the
browser watches for clicks outside the JS engine. When a click happens, the browser drops the
callback into the **task queue**; the event loop moves it onto the call stack when the stack is
free, and the callback finally runs and logs the message. As before, the event loop decides
**when** the callback actually runs.

---

## Callbacks and "callback hell"

Callbacks are powerful, but chaining several async ones tends to push your code sideways into deep
nesting:

```js
doStep1(function () {
  doStep2(function () {
    doStep3(function () {
      console.log("All done");
    });
  });
});
```

This drift into ever-deeper indentation is often called **"callback hell."** It's one of the main
reasons modern code reaches for **Promises** and `async/await` instead; they still rely on the
event loop underneath, but give you a much cleaner syntax to work with.

---

## Summary

* A **callback** is a function passed to another function to be called later.
* Callbacks can be **synchronous** (run immediately) or **asynchronous** (run later).
* Async callbacks (timers, events, etc.) rely on the **event loop**, which:

  * Puts them into a **queue** when they're ready
  * Runs them when the **call stack** is free
* Understanding callbacks + the event loop helps you reason about **when** your code runs, not just **what** it does.

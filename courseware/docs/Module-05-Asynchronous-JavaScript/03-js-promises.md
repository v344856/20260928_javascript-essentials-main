# JavaScript Promises

A **promise** is JavaScript's answer to the tangled, deeply nested "callback hell" that plain
callbacks can lead to. Promises let you write async code that's easier to read, chain, and reason
about, especially once you understand how they cooperate with the **event loop**.

![Pending resolving to fulfilled or rejected, both settled permanently, and a chain of new promises](../../diagrams/png/promise-states.png)

*Settled is permanent, and every `.then` returns a **new** promise.*

---

## What is a promise?

A promise is an object that stands in for a value you'll get **now**, **later**, or **never** (if
something fails). At any moment a promise is in one of three states: `pending` while it's still
working, `fulfilled` once it finishes successfully, or `rejected` if it finishes with an error.

The following example creates a promise, settles it, and attaches handlers for both outcomes:

```js
const promise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("It worked!");
  } else {
    reject(new Error("Something went wrong"));
  }
});

promise
  .then((value) => {
    console.log("Success:", value);
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });
```

> **Always reject with an `Error`, not a string.** `reject("oops")` is legal, but the value you catch
> is then just text: no `.message`, no `.stack`, and nothing that `instanceof Error` will recognize.
> Every rejection in this course carries a real `Error`, matching the `throw new Error(...)` habit
> from [Error Handling](../Module-04-Classes-this-and-Errors/03-js-error-handling.md).

The two arguments to the executor do the settling: calling `resolve` moves the promise to
**fulfilled**, while `reject` moves it to **rejected**. On the consuming side, `.then` handles a
successful value and `.catch` handles an error.

---

## Promises vs callbacks

To see what promises buy you, it helps to compare the two styles side by side.

### Classic callback style

The traditional pattern passes a callback that receives an error first and a result second:

```js
doSomething((error, result) => {
  if (error) {
    console.error("Error:", error);
    return;
  }
  console.log("Result:", result);
});
```

This works, but plain callbacks have some rough edges. They grow quickly into **nested pyramids**
(callback hell), error handling gets repetitive because every callback checks for its own error,
and returning values or chaining several steps together is awkward.

### Promise style

The same sequence written with promises reads as a flat chain instead of a pyramid:

```js
doSomething()
  .then((result) => {
    console.log("Result:", result);
    return doSomethingElse(result);
  })
  .then((nextResult) => {
    console.log("Next:", nextResult);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

The advantages show up right away. Each `.then` returns a new promise, so you can **chain** steps
one after another; a single `.catch` at the end gives you **central error handling** for the whole
chain; and the overall flow stays flatter and more readable than nested callbacks. This is also
the foundation `async/await` builds on later: it sits on top of promises, not callbacks.

### `.finally` - cleanup on both paths

There is a third handler alongside `.then` and `.catch`. **`.finally`** runs whichever way the promise
settled, which makes it the right home for cleanup you owe regardless of the outcome, such as hiding
a spinner, closing a connection, or re-enabling a button:

```js
setLoading(true);

fetchUser()
  .then((user) => render(user))
  .catch((error) => showError(error))
  .finally(() => setLoading(false)); // runs on success AND on failure
```

Two details make it behave differently from the other two:

* **It receives no argument.** `.finally` is not told whether things went well or badly, and it cannot
  see the value or the error. That is deliberate: it exists for work that does not depend on the
  outcome.
* **It passes the result straight through.** Whatever the chain had before `.finally` is what it still
  has after, so inserting one never disturbs the value:

```js
const value = await Promise.resolve(42).finally(() => console.log("cleaning up"));
console.log(value); // 42 - untouched
```

The one exception: if the `.finally` callback itself **throws**, that error does replace the outcome.
Keep the body simple.

### `Promise.resolve` and `Promise.reject`

Sometimes you need a promise you already know the answer to. These two build one immediately:

```js
Promise.resolve({ name: "Ada" });        // an already-fulfilled promise
Promise.reject(new Error("network down")); // an already-rejected one
```

They are most useful for keeping a function's return type consistent: a cached path can return a
value without the caller needing to know it never went to the network:

```js
function loadUser(id) {
  if (cache.has(id)) {
    return Promise.resolve(cache.get(id)); // still a promise, so callers can .then() it
  }
  return fetch(`/users/${id}`).then((r) => r.json());
}
```

As always, **reject with an `Error`**, not a string; `Promise.reject("oops")` gives whoever catches
it no `.message` and no stack to work from.

---

## How promises use the event loop

Promise callbacks (`.then`, `.catch`, and `.finally`) **never run immediately**. When a promise
settles, its handlers are placed on the **microtask queue** rather than being called on the spot.

Here's the rough sequence of events:

1. Your code calls `resolve` or `reject`.
2. The promise becomes settled (fulfilled or rejected).
3. Any `.then`/`.catch` callbacks are scheduled as **microtasks**.
4. The **event loop** then:

   * Finishes the current task (the current script or callback)
   * Runs **all microtasks**, including your promise handlers
   * Only afterward moves on to the next task (like `setTimeout` callbacks or UI events)

Two consequences follow from that ordering: promise handlers usually run **before** a
`setTimeout(..., 0)` callback, but they still wait until the current synchronous code has finished.
The next example makes both points concrete:

```js
console.log("A");

Promise.resolve().then(() => {
  console.log("Promise");
});

setTimeout(() => {
  console.log("Timeout");
}, 0);

console.log("B");
```

The synchronous lines run first, then the microtask, then the timer, giving this order:

1. `A`
2. `B`
3. `Promise` (microtask)
4. `Timeout` (macro task)

---

## Converting callbacks to promises

Because promises play so well with modern syntax, it's common to wrap an old callback-based
function in one. Start with a function that reports its result through a callback:

```js
function loadData(callback) {
  setTimeout(() => {
    callback(null, "Data loaded");
  }, 1000);
}
```

The promise version returns a promise and calls `resolve` (or `reject`) instead of invoking a
callback:

```js
function loadData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data loaded");
      // or reject(new Error("Failed to load"));
    }, 1000);
  });
}

loadData()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
```

Wrapped this way, `loadData` now fits neatly into the rest of the promise ecosystem: `.then` and
`.catch`, combinators like `Promise.all` and `Promise.race`, and `async/await`.

---

## Sequential vs. concurrent tasks

When you have several independent async jobs, *how* you await them decides how long the whole thing
takes. Awaiting one, then the next, then the next runs them **sequentially**, so the total time is the
**sum** of all of them:

```js
// Sequential: each await waits for the previous one to finish.
const a = await fetchUser(1);   // 1s
const b = await fetchUser(2);   // + 1s
const c = await fetchUser(3);   // + 1s
// ~3 seconds total
```

> The `await` keyword is covered properly in the [next chapter](./04-js-async-await.md). For now,
> read it as "wait for this promise and give me its value". These snippets assume you are at the top
> level of an **ES module** (or inside an `async` function); in a plain CommonJS script a bare
> `await` is a syntax error.

If the jobs don't depend on each other, that's wasted time. Start them **all at once** and wait for
the group with `Promise.all`, and the total time is the **slowest single job**, not the sum:

```js
// Concurrent: all three start immediately; we wait for the group.
const [a, b, c] = await Promise.all([
  fetchUser(1),
  fetchUser(2),
  fetchUser(3),
]);
// ~1 second total
```

`Promise.all` returns a single promise that fulfills with an **array of results** in the same order
you passed the promises (regardless of which finished first). If **any** promise rejects, the whole
`Promise.all` rejects immediately with that error, so the call is all-or-nothing.

### Choosing a combinator

`Promise.all` is the one you'll reach for most, but the promise combinators cover different needs:

* **`Promise.all([...])`**: wait for **all** to fulfill; reject as soon as **any** rejects. Use it
  when you need every result and one failure should fail the batch.
* **`Promise.allSettled([...])`**: wait for **all** to finish and get back an array describing each
  outcome (`{ status: "fulfilled", value }` or `{ status: "rejected", reason }`). Nothing short-circuits;
  use it when one failure shouldn't sink the others.
* **`Promise.race([...])`**: settle as soon as the **first** promise settles (fulfilled *or*
  rejected). Handy for timeouts ("whichever finishes first: the fetch or a 5-second timer").
* **`Promise.any([...])`**: fulfill with the **first** promise that *fulfills*, ignoring rejections
  until they've all failed. Use it for "try several sources, take the first that works."

A rule of thumb: if the tasks are independent, prefer running them **concurrently** with `Promise.all`
rather than awaiting them one at a time.

---

## Summary

* **Callbacks**: functions passed to be called later; can be sync or async; can become messy when nested.
* **Promises**: objects representing future values; support chaining and centralized error handling.
* **`.finally`** runs on both paths, takes no argument, and passes the result through; use it for
  cleanup you owe either way.
* **`Promise.resolve(v)`** / **`Promise.reject(err)`** build an already-settled promise, handy for
  cached paths that must still return a promise. Always reject with an `Error`.
* With the **event loop**:

  * Promise handlers go into the **microtask queue**
  * They run **after** current code, but **before** most other async callbacks (like `setTimeout`)
* **Concurrency**: run independent tasks together with `Promise.all` (total time = the slowest, not the
  sum); reach for `Promise.allSettled`, `Promise.race`, or `Promise.any` when you need different
  all/first semantics.
* Understanding promises plus the event loop helps you predict **when** async logic runs and avoid callback hell.

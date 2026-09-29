# JavaScript Async/Await

`async/await` is syntax that lets you write **asynchronous** code that *looks* and *feels* like
ordinary, step-by-step code. Under the hood it's still built on **promises** and still works with
the **event loop**, but it reads far more naturally than nested callbacks or long `.then` chains.

![Three one-second fetches taking three seconds in sequence versus one second started together](../../diagrams/png/sequential-vs-concurrent.png)

*Awaiting in a loop is a queue; `Promise.all` is a starting gun.*

---

## From callbacks -> promises -> async/await

The clearest way to appreciate `async/await` is to watch the same task (load a user, then load
that user's posts) written three ways.

### Callback style

With callbacks, each step nests inside the previous one, and every level repeats its own error
check:

```js
loadUser((error, user) => {
  if (error) {
    console.error(error);
    return;
  }
  loadPosts(user.id, (error, posts) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log("User:", user);
    console.log("Posts:", posts);
  });
});
```

It works, but it gets deeply nested and repetitive fast.

### Promise style

Promises flatten some of that nesting and let one `.catch` cover the whole chain:

```js
loadUser()
  .then((user) => {
    return loadPosts(user.id).then((posts) => {
      console.log("User:", user);
      console.log("Posts:", posts);
    });
  })
  .catch((error) => {
    console.error(error);
  });
```

This is better, though there's still a fair amount of `.then` plumbing and a nested function to
keep both `user` and `posts` in scope.

### async/await style

With `async/await`, the same logic reads top to bottom, like synchronous code:

```js
async function showUserAndPosts() {
  try {
    const user = await loadUser();
    const posts = await loadPosts(user.id);

    console.log("User:", user);
    console.log("Posts:", posts);
  } catch (error) {
    console.error(error);
  }
}

showUserAndPosts();
```

There's no nesting to track: wait for `loadUser`, then wait for `loadPosts`, then use both
results.

---

## How async/await works

Two rules cover almost everything you need to know. First, a function marked `async` **always
returns a promise**. Second, `await` is normally used **inside** an `async` function, where it pauses
that function until the awaited promise settles and then either returns the fulfilled value or throws
the rejection as an error.

There is one important exception to that second rule: at the **top level of an ES module**, `await`
works with no enclosing function at all. This is *top-level await*, added in ES2022:

```js
// Only inside an ES module - a .mjs file, or a .js file in a package
// with "type": "module" set, or a <script type="module"> in the browser.
const response = await fetch("/api/config");
const config = await response.json();
```

Try the same thing in a plain CommonJS script and you get
`SyntaxError: await is only valid in async functions`. When in doubt, wrap the code in an `async`
function; that works everywhere.

This small example shows the first rule in action:

```js
async function getNumber() {
  return 42; // actually returns Promise.resolve(42)
}

async function demo() {
  const value = await getNumber();
  console.log(value); // 42
}

demo();
```

Even though `getNumber` appears to just return `42`, the `async` keyword wraps that value in a
promise, which is why `demo` can `await` it.

---

## async/await and the event loop

Because `await` is really promises in disguise, it follows the same event-loop rules. When
execution reaches an `await`, the current `async` function **pauses**, and the rest of that
function is scheduled as a **microtask**, much like a `.then` callback. In the meantime the event
loop is free to run other tasks, such as timeouts or click handlers. Once the awaited promise
settles, the event loop puts the paused continuation back on the call stack and resumes it right
where it left off.

The takeaway is that `async/await` is essentially **"nice syntax for promises"**: it still leans on
promise behavior and the microtask queue underneath.

---

## Error handling is simpler

One of the biggest wins of `async/await` is how it handles errors. Comparing the three styles
again makes the improvement obvious.

### With callbacks

Each callback has to receive and check its own error by hand:

```js
loadData((error, data) => {
  if (error) {
    console.error("Error:", error);
    return;
  }
  // use data
});
```

Every callback needs its own `if (error)` logic.

### With promises

Promises consolidate that into a single `.catch` at the end of the chain:

```js
loadData()
  .then((data) => {
    return processData(data);
  })
  .then((result) => {
    console.log("Result:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

That's a real improvement (one `.catch` can handle many `.then`s), but mixing `.then` and
`.catch` with branching logic can still get tricky.

### With async/await

With `async/await`, you fall back on plain `try`/`catch`, exactly as you would in synchronous code:

```js
async function run() {
  try {
    const data = await loadData();
    const result = await processData(data);
    console.log("Result:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

run();
```

Any rejected promise inside the `try` block behaves like a thrown error, so a single `catch` can
handle them all. And when you need finer control, nothing stops you from using more than one
`try`/`catch`:

```js
async function run() {
  let data;

  try {
    data = await loadData();
  } catch (error) {
    console.error("Failed to load data:", error);
    return;
  }

  try {
    const result = await processData(data);
    console.log("Result:", result);
  } catch (error) {
    console.error("Failed to process data:", error);
  }
}
```

Splitting the error handling this cleanly is something that's genuinely hard to express with nested
callbacks or chained promises.

---

## Summary

* **Callbacks**: powerful but can get messy and deeply nested.
* **Promises**: cleaner chaining and central error handling with `.catch`.
* **async/await**:

  * Built on top of promises
  * Makes async code look like normal synchronous code
  * Uses `try`/`catch` for **easy error handling**
  * Still works with the event loop via the promise microtask queue

Whenever you're writing new async code in modern JavaScript, `async/await` is usually the clearest, most readable option.

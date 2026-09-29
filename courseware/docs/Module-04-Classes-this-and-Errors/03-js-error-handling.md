# JavaScript Error Handling

Error handling in JavaScript comes down to two habits:

1. **Avoiding** errors when you can
2. **Dealing with** errors gracefully when they happen anyway

In the browser, most errors come from a small number of sources: the DOM (an element that is not
there), user input, network calls, and mistakes in your own code. Handling them well means that when
one of those fails, the rest of the page keeps working.

This article covers:

* Defensive checks (such as "did I actually get a DOM element?")
* `try` / `catch` / `finally`
* Error objects and `throw`
* Console logging (`console.error` and friends)
* Async errors (Promises and `async`/`await`)
* A few general best practices

![A throw unwinding past two frames to the nearest try/catch, with async and finally notes](../../diagrams/png/error-propagation.png)

*A throw unwinds the stack to the nearest `catch`; `finally` always runs.*

---

## Defensive checks: don't assume things exist

A common early mistake looks like this:

```js
const button = document.getElementById('submit');
button.addEventListener('click', () => {
  // ...
});
```

If there's **no** element with `id="submit"`, then `button` is `null`, and the next line throws:

> Cannot read properties of null (reading 'addEventListener')

The fix is to **check the value before you use it**:

```js
const button = document.getElementById('submit');

if (!button) {
  console.error('Submit button not found in the DOM');
} else {
  button.addEventListener('click', () => {
    console.log('Clicked!');
  });
}
```

### Why `if (!button)`?

In JavaScript, `null`, `undefined`, `0`, `''`, and `false` are all **falsy**. When `button` is `null`,
`!button` is `true`, so this one check catches the missing element cleanly.

### Short-circuit early return

You'll often see the same idea written as an early return, which keeps the "happy path" un-indented:

```js
function setupButton() {
  const button = document.getElementById('submit');
  if (!button) {
    console.error('Submit button missing; skipping setup.');
    return; // stop here, don't run the rest
  }

  button.addEventListener('click', () => {
    console.log('Clicked!');
  });
}

setupButton();
```

The early return keeps the rest of the function at one level of indentation, and because it stops
before the listener is attached, the runtime error never happens at all.

---

## `try` / `catch` / `finally`: catching runtime errors

Some errors slip past even careful code:

* parsing invalid JSON
* touching something you don't control
* a bug you did not foresee

For those, **wrap the risky code** in a `try` block and handle whatever it throws:

```js
try {
  // Code that might throw an error
} catch (error) {
  // Handle the error
} finally {
  // Optional: always runs (success or error)
}
```

### Example: parsing JSON safely

```html
<script>
  const badJson = '{ "name": "Alice", }'; // invalid JSON

  try {
    const data = JSON.parse(badJson);
    console.log('Parsed:', data);
  } catch (error) {
    console.error('Failed to parse JSON:', error.message);
  }
</script>
```

If `JSON.parse` throws, the `catch` block runs instead, and the rest of your script **keeps going**.

### Using `finally` for cleanup

The `finally` block runs no matter what, whether the `try` succeeded or an error was thrown, which
makes it the natural home for cleanup:

```js
let loading = true;

try {
  console.log('Doing something risky...');
  // some risky operation
} catch (error) {
  console.error('Error happened:', error);
} finally {
  loading = false;
  console.log('Done (success or fail), loading =', loading);
}
```

Resetting a flag, closing a resource, and hiding a spinner all have to happen on both the success
path and the failure path, which is the job `finally` exists to do.

---

## The Error object

When something throws, you usually receive an `Error` object, and it carries useful details:

```js
try {
  throw new Error('Something went wrong');
} catch (error) {
  console.log(error.name);    // "Error"
  console.log(error.message); // "Something went wrong"
  console.log(error.stack);   // stack trace (where it happened)
}
```

There are several specialized kinds, such as `TypeError` and `ReferenceError`, but you catch and
inspect them all the same way.

---

## Throwing your own errors

Sometimes **you** are the one who needs to signal that something is wrong. Use `throw`:

```js
function getUserName(user) {
  if (!user || !user.name) {
    throw new Error('User object must have a name');
  }
  return user.name;
}

try {
  const name = getUserName({}); // missing name
  console.log(name);
} catch (error) {
  console.error('Could not get user name:', error.message);
}
```

Why throw your own errors instead of quietly returning `undefined`?

* it makes bugs easier to find ("User object must have a name" beats a vague failure three functions later)
* it hands the decision to the calling code, which can retry, show a message, or fall back, rather than guessing on its behalf

### Keeping the original error: `cause`

A common situation: you catch a low-level error, but the message it carries would mean nothing to the
caller. You want to re-throw something clearer **without losing** what actually went wrong.

`Error` takes a second argument for exactly this:

```js
function parseConfig(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error('Could not read the config file', { cause: error });
  }
}

try {
  parseConfig('{ not json }');
} catch (error) {
  console.log(error.message);       // "Could not read the config file"
  console.log(error.cause.name);    // "SyntaxError"  - the real reason, kept
  console.log(error.cause.message); // the JSON parser's own message, with the position
}
```

The caller gets a message in their terms; you keep the technical detail one property away for the
debugger and the logs. Without `cause` you have to choose between the two.

It works with custom error classes too, as long as you pass the options object straight through to `super`:

```js
class ValidationError extends Error {
  constructor(field, message, options) {
    super(message, options);   // forwards { cause: ... }
    this.name = 'ValidationError';
    this.field = field;
  }
}

throw new ValidationError('age', 'age is invalid', { cause: originalError });
```

If you do not pass one, there is no `cause` property at all, so check `error.cause` before you
use it.

---

## Using the console for error logging

The browser console is where most debugging actually happens, and it offers considerably more than
`console.log` alone.

### `console.log`

General-purpose logging (info, debugging):

```js
console.log('User data:', user);
```

### `console.error`

Use this for genuine problems rather than routine tracing:

```js
if (!button) {
  console.error('Submit button not found');
}
```

Messages logged with `console.error` are usually styled differently and easier to spot in a busy console.

### `console.warn`

Use this for conditions that are not errors yet but are likely to cause trouble later:

```js
if (!user.email) {
  console.warn('User has no email; some features may not work.');
}
```

### `console.table`

For arrays and objects this is easier to read than `console.log`, because it renders the values as a grid:

```js
console.table(users); // renders as a readable grid
```

### `console.assert`

Logs an error **only if a condition is false**:

```js
console.assert(user.age >= 0, 'User age should not be negative', user);
```

When the condition is true nothing is logged, so an assertion only makes noise when it fails.

---

## Guarding DOM interactions

A large share of browser errors are some form of "Cannot read properties of null/undefined", which
happens whenever a lookup returns nothing and the next line uses the result anyway. Checking the
result before you use it prevents most of them.

### Guarding DOM before use

```js
const title = document.querySelector('.title');

if (!title) {
  console.error('No .title element found');
} else {
  title.textContent = 'Hello!';
}
```

### Guarding functions and data

```js
function renderUser(user) {
  if (!user) {
    console.error('renderUser called without a user');
    return;
  }

  // safe to use user now
}
```

Validating inputs at the top of a function like this is often called **defensive programming**.

---

## Handling async errors (Promises and async/await)

Not every error happens right away. Network requests, timers, and many other APIs finish *later*,
using **Promises** and **async/await**, so their errors have to be caught in the matching style.

### Promises with `.catch`

```js
fetch('/api/user')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    return response.json();
  })
  .then(data => {
    console.log('User data:', data);
  })
  .catch(error => {
    console.error('Failed to load user:', error);
  });
```

A single `.catch` at the end handles an error thrown anywhere earlier in the `.then` chain.

### `async`/`await` with `try`/`catch`

With `async`/`await`, you get to use the familiar `try`/`catch` you already know:

```js
async function loadUser() {
  try {
    const response = await fetch('/api/user');
    if (!response.ok) {
      throw new Error('Network error: ' + response.status);
    }

    const data = await response.json();
    console.log('User:', data);
  } catch (error) {
    console.error('Could not load user:', error);
  } finally {
    console.log('Finished trying to load user.');
  }
}

loadUser();
```

Here:

* `await` pauses inside the function until the Promise settles (resolves or rejects)
* a rejected Promise throws, so the ordinary `try`/`catch` catches it

---

## Event handlers and errors

If an error is thrown inside an event listener, it surfaces in the console as an uncaught error. You
can contain it with a local `try`/`catch`:

```js
button.addEventListener('click', () => {
  try {
    riskyOperation();
  } catch (error) {
    console.error('Click handler failed:', error);
  }
});
```

That way one misbehaving handler doesn't take unrelated parts of your script down with it.

---

## Global error handling (a peek ahead)

Larger apps sometimes add global handlers to catch anything that slips through, usually so it can be logged to a server:

```js
window.addEventListener('error', (event) => {
  console.error('Global error:', event.message);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});
```

You won't need these on day one, but it's good to know they're there for when a project grows.

---

## Summary

* **Check DOM elements** before using them (`if (!el) { ... }`).
* Wrap code that can fail in `try` / `catch` / `finally`.
* Write informative messages, both in `console.error` and when you `throw`.
* When re-throwing, keep the original with **`new Error(msg, { cause: originalError })`**, which gives
  the caller a clear message while preserving the technical detail on `error.cause`.
* Guard your functions: validate inputs early and return if something's wrong.
* For async code:
  * use `.catch` for Promises
  * use `try`/`catch` inside `async` functions

# JavaScript Promise

JavaScript is single‑threaded, but modern applications need to handle asynchronous tasks:

- Fetching data from APIs
- Reading files
- Timers
- Database queries
- User interactions<br

Before Promises, developers relied on callbacks, which often led to callback hell. <br>
Promises were introduced to solve this problem by providing a cleaner, more predictable way to handle async operations. <br>

## Learning Objectives

1. Define what a Promise is
2. Understand Promise states
3. Create Promises
4. Use .then(), .catch(), .finally()
5. Chain Promises
6. Use Promise.all, Promise.race, Promise.allSettled
7. Connect Promises to async/await

## What is a Promise ?

A Promise is an object representing the eventual completion or failure of an asynchronous operation.

### Three States of Promise

1. **pending** - operation not finished
2. **fulfilled** - operation succeeded
3. **rejected** - operation failed<br>

- Once fulfilled or rejected, the state becomes settled and cannot change.

### Creating a Promise

```javascript
// createPromise.js
const myPromise$ = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Operation completed");
  } else {
    reject("Something went wrong");
  }
});
```

### Consuming a Promise

```javascript
myPromise$
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

### Promise Chaining

```javascript
fetchUser()
  .then((user) => {
    console.log("User:", user);
    return user.name;
  })
  .then((name) => {
    console.log("Name:", name);
  })
  .catch((err) => console.error(err));
```

Each **.then()** receives the result of the previous one

### finally() - Always Runs

```javascript
fetchUser().finally(() => console.log("Done"));
```

Useful for cleanup:

1. Stop loading spinner
2. Close connection
3. Reset UI state

## Complete Promise with .then(), .cath() and .finally()

```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    console.log("Starting request...");

    setTimeout(() => {
      const ok = Math.random() > 0.5; // simulate success/failure

      if (ok) {
        resolve("Data loaded successfully");
      } else {
        reject("Network error: failed to load data");
      }
    }, 1000);
  });
}

fetchData()
  .then((result) => {
    console.log("✔️ THEN:", result);
  })
  .catch((error) => {
    console.log("❌ CATCH:", error);
  })
  .finally(() => {
    console.log("🔚 FINALLY: Request completed (cleanup, stop spinner, etc.)");
  });
```

## Promise Utilities

1. Promise.all()
   Runs multiple Promises in parallel; fails if any fail.

```javascript
Promise.all([p1, p2, p3])
  .then((results) => console.log(results))
  .catch((err) => console.error(err));
```

2. Promise.allSettled()
   Waits for all Promises, regardless of success or failure.

```javascript
Promise.allSettled([p1, p2, p3]).then((results) => console.log(results));
```

3. Promise.race()
   Returns the result of the first Promise to settle.

```javascript
Promise.race([p1, p2]).then((result) => console.log(result));
```

4. Promise.any()
   Returns the first fulfilled Promise; ignores rejections.

```javascript
Promise.any([p1, p2]).then((result) => console.log(result));
```

## Promise Using async/await (Modern Syntax)

- async/await is built on top of Promises.

```javascript
async function loadUser() {
  try {
    const user = await fetchUser();
    console.log(user);
  } catch (error) {
    console.error("Error:", error);
  }
}

loadUser();
```

### Why async/await is popular

1. Looks synchronous
2. Easier to read
3. Easier to debug
4. Avoids deep .then() chains

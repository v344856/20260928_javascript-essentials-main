// Activity: Closures
// Complete the TODOs, then run `npm start` from the activity folder.

// TODO Task 1: write `makeMultiplier(factor)` that returns a function which
// multiplies its argument by the captured `factor`.
// Create double = makeMultiplier(2) and triple = makeMultiplier(3).
// Log double(5) and triple(5).
// Expected: 10
//           15

// TODO Task 2: write `createCounter()` that keeps a private `count` and returns
// an object with increment() (adds 1, returns count) and reset() (sets count to
// 0, returns count). Show that `count` itself is not reachable from outside.
// Log counter.increment(), counter.increment(), counter.reset(), counter.count.
// Expected: 1
//           2
//           0
//           undefined

// TODO Task 3: write `once(fn)` that returns a function which runs `fn` only the
// first time it is called (and returns fn's result every time afterward).
// Wrap a function that logs "Setting up..." and returns "ready", then call the
// wrapper twice.
// Expected: Setting up...
//           ready
//           ready

# Activity: Closures in Practice

Same concept as the demo (functions that remember their scope), with fresh
challenges: a multiplier factory, a private counter, and a `once` wrapper.

**Estimated time:** 10-15 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: A multiplier factory

Write `makeMultiplier(factor)` that returns a function multiplying its argument by
the captured `factor`. Create `double = makeMultiplier(2)` and
`triple = makeMultiplier(3)`, then log `double(5)` and `triple(5)`.

**Expected output:**
```
10
15
```

### Task 2: A private counter

Write `createCounter()` that keeps a private `count` and returns an object with
`increment()` (adds 1, returns count) and `reset()` (sets count to 0, returns
count). Log `counter.increment()`, `counter.increment()`, `counter.reset()`, and
`counter.count` (which is `undefined` from outside).

**Expected output:**
```
1
2
0
undefined
```

### Task 3: Run something only once

Write `once(fn)` that returns a function which runs `fn` only the first time it is
called, returning `fn`'s result every time afterward. Wrap a function that logs
`"Setting up..."` and returns `"ready"`, then call the wrapper twice.

**Expected output:**
```
Setting up...
ready
ready
```

## What You'll Learn

- A factory function returning an inner function that captures an argument
- Independent closures that do not share state
- Encapsulation: private state reachable only through returned methods
- Using a closure over a flag to run work exactly once

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Write `memoize(fn)` that caches results in a private `Map` the returned function closes over, so a repeated call with the same argument never re-runs `fn`. Wrap a deliberately slow function that logs each time it actually computes, then call it three times with two distinct arguments to prove the cache works.

Sample output:

```
computing 5
25
25
computing 6
36
```

## Related reading

- [JavaScript Closures](../../docs/Module-03-Arrays-and-Functions/04-js-closures.md)
- Diagram: [Scope Chain and Closures](../../diagrams/png/scope-chain-and-closures.png)

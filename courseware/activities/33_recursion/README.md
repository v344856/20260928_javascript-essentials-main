# Activity: Recursion Warm-Ups

> **Reserve pair.** The class works through `01`-`30` first; this one runs only if there is time.

Same concept as the demo (a function that calls itself, with base cases that stop it), applied to two new classic problems instead of Fibonacci: factorial and a running total.

**Estimated time:** 10-15 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: `factorial(n)`

Write a recursive `factorial` where `factorial(n)` is `n * factorial(n - 1)`. Use the base case `n <= 1` returns `1`. Log `factorial(5)` and `factorial(6)`.

### Task 2: `sumTo(n)`

Write a recursive `sumTo(n)` that adds `1 + 2 + ... + n`. The base case `n <= 0` returns `0`, otherwise return `n + sumTo(n - 1)`. Log `sumTo(5)` and `sumTo(10)`.

**Expected output:**
```
120
720
15
55
```

## What You'll Learn

- A recursive function calls itself on a smaller subproblem
- Base cases stop the recursion so it does not run forever
- Different problems (factorial, running total) share the same recursive shape

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Write `flatten(arr)` that turns an arbitrarily nested array into a flat one, recursing whenever `Array.isArray(item)` is true. This is where recursion genuinely beats a loop, because you do not know the nesting depth in advance. Then write `deepCount(obj)` that counts every leaf value in a nested object, recursing on any value that is itself an object.

Sample output:

```
[ 1, 2, 3, 4, 5 ]
leaves: 4
```

## Related reading

- [JavaScript Functions](../../docs/Module-03-Arrays-and-Functions/02-js-functions.md)
- Diagram: [The Recursion Call Tree](../../diagrams/png/recursion-call-tree.png)

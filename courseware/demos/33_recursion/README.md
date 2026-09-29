# 33. Function Recursion

> **Reserve pair.** The class works through `01`-`30` first; this one runs only if there is time.

Contrasts an iterative and a recursive solution to the same problem: computing the nth Fibonacci number. The first `fibonacci` function uses a `for` loop, while `fibonacciRecursive` calls itself for `n - 1` and `n - 2`, with base cases for `n <= 0` and `n === 1`. Both log `55` for `fibonacci(10)`.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- A recursive function calling itself to solve a smaller subproblem
- Base cases that stop the recursion
- The same result achieved iteratively (loop) and recursively
- The Fibonacci sequence as a classic recursion example

## Related reading

- [JavaScript Functions](../../docs/Module-03-Arrays-and-Functions/02-js-functions.md)
- Diagram: [The Recursion Call Tree](../../diagrams/png/recursion-call-tree.png)

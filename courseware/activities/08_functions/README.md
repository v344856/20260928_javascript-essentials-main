# Activity: Discount Calculator, Several Ways

Same concepts as the demo (declarations versus expressions versus arrows, hoisting, and parameter handling), applied to a discount calculator instead of a physics formula. You will write the same small calculation three ways, then put default, rest, and spread parameters to work.

**Estimated time:** 15-20 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: function declaration

Write `applyDiscount(price, percent)` as a **function declaration** that returns the price minus that percentage. Leave it *below* the two `console.log` calls that use it; declarations hoist, so this works.

**Expected output:**
```
80
45
```

### Task 2: function expression

Write the same logic again as a **function expression** assigned to `const applyDiscountExpr`. This one does not hoist, so it must appear above its call.

**Expected output:**
```
80
```

### Task 3: arrow function

Write it a third time as an **arrow function** with an implicit return, meaning no braces and no `return` keyword.

**Expected output:**
```
80
```

### Task 4: default parameter

Write `quote(price, percent = 10)` that returns the discounted price as a string like `"$150"`. Calling it without a percent should fall back to 10.

**Expected output:**
```
$150
$180
```

### Task 5: rest parameter

Write `sumAll(...numbers)` that accepts any number of arguments and returns their total.

**Expected output:**
```
6
100
```

### Task 6: argument spread

Call `sumAll` with the `prices` array spread into individual arguments using `...`.

**Expected output:**
```
50
```

## What You'll Learn

- The three ways to define a function and how they differ.
- Why a hoisted declaration can be called before it is written, and an expression cannot.
- Arrow syntax and the implicit return of a single-expression body.
- Default parameters standing in for missing arguments.
- Collecting arguments with `...rest` and unpacking an array with `...` spread.

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Write `bestPrice(price, ...percents)` that applies every discount in `percents` one after another (each one applied to the already-discounted price) and returns the final amount rounded to two decimals. Reuse `applyDiscount` inside it.

Sample output:

```
68.4
100
```

## Related reading

- [JavaScript Functions](../../docs/Module-03-Arrays-and-Functions/02-js-functions.md)
- Diagram: [Scope Chain and Closures](../../diagrams/png/scope-chain-and-closures.png)

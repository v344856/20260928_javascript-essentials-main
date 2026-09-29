# Activity: Operators at Work

Same concepts as the demo (arithmetic operators, strict versus loose equality, and string building), applied to a handful of small calculations instead of one running variable. You will use exponentiation, division, and the remainder operator to produce real answers, then assemble a receipt line two different ways.

**Estimated time:** 15-20 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: exponentiation

Set `area` to `side` raised to the power of 2 using the `**` operator.

**Expected output:**
```
16
```

### Task 2: division and remainder

Split `totalSeconds` (1000) into whole minutes and leftover seconds. Use `%` to get the leftover `seconds`, then `(totalSeconds - seconds) / 60` for `minutes`.

**Expected output:**
```
16m 40s
```

### Task 3: even or odd

Set `isEven` to `true` when `count` divides evenly by 2, that is, when `count % 2 === 0`.

**Expected output:**
```
7 is even: false
```

### Task 4: strict versus loose

Compare `count` to the *string* `"7"` twice (once with `===` and once with `==`) and print both results. `===` compares value and type; `==` coerces the string to a number first.

**Expected output:**
```
strict: false
loose:  true
```

### Task 5: two ways to build a string

Build the receipt line `3 bags = $12` twice: once with `+` concatenation, once with a template literal. Note that `*` binds tighter than `+`, so `quantity * price` is calculated before it is joined to the string.

**Expected output:**
```
3 bags = $12
3 bags = $12
```

## What You'll Learn

- The arithmetic operators `**` (exponentiation), `/` (division), and `%` (remainder).
- Using `%` to extract a leftover amount and to test divisibility.
- Why `===` is the comparison to reach for, and what `==` does differently.
- Concatenating with `+` versus interpolating with a template literal.

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Write a `formatDuration(totalSeconds)` function that returns `"1h 6m 40s"` for `4000`, dropping any leading unit that is zero (so `100` returns `"1m 40s"`, not `"0h 1m 40s"`). Reuse `%` and `/` the same way Task 2 does.

Sample output:

```
1h 6m 40s
1m 40s
40s
```

## Related reading

- [JavaScript's Type System](../../docs/Module-02-JavaScript-Fundamentals/02-js-types.md)
- [Working with Strings](../../docs/Module-09-Built-In-Objects/02-string-methods.md)
- Diagram: [Coercion and Equality](../../diagrams/png/coercion-and-equality.png)

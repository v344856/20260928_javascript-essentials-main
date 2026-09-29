# Activity: Number Games

Same concepts as the demo (`for`, `while`, `do…while`, `for…of`, and `forEach`), applied to five small problems instead of one array. Each task deliberately calls for a different loop, so you get a feel for which one fits which shape of problem.

**Estimated time:** 15-20 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: FizzBuzz with a for loop

Loop from 1 to 15. Print `"FizzBuzz"` when the number divides evenly by 15, `"Fizz"` when it divides by 3, `"Buzz"` when it divides by 5, and otherwise the number itself. Check 15 *first*; otherwise 15 never reaches the FizzBuzz branch.

**Expected output:**
```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
```

### Task 2: sum with a while loop

Add up the numbers 1 through 10 using a `while` loop and a counter you increment yourself.

**Expected output:**
```
Sum 1..10 = 55
```

### Task 3: count down with a do-while loop

Print 5, 4, 3, 2, 1 using a `do…while` loop.

**Expected output:**
```
5
4
3
2
1
```

### Task 4: total with a for-of loop

Add up every value in `prices` with `for…of`, with no index needed.

**Expected output:**
```
Total: $18.5
```

### Task 5: labels with forEach

Use `forEach` to print a numbered label for each price. The callback receives both the element and its index; the label is 1-based, so add 1 to the index.

**Expected output:**
```
Item 1: $4.5
Item 2: $2.25
Item 3: $8
Item 4: $3.75
```

## What You'll Learn

- Writing a `for` loop's initial value, terminating condition, and per-pass change.
- Using `while` when you drive the counter yourself.
- Why `do…while` always runs its body at least once.
- Reaching for `for…of` when you only need the values.
- Passing a callback to `forEach` and using the index it supplies.

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Rewrite Task 1 so the FizzBuzz rules live in an array of `{ divisor, word }` objects that you loop over to build each line. Adding a new rule (say `{ divisor: 7, word: "Bazz" }`) should then take one line and no new `if`.

Sample output:

```
1
2
Fizz
4
Buzz
Fizz
Bazz
8
```

## Related reading

- [JavaScript Iteration Statements (Loops)](../../docs/Module-02-JavaScript-Fundamentals/05-js-iteration-statements.md)
- [JavaScript Arrays](../../docs/Module-03-Arrays-and-Functions/01-js-arrays.md)

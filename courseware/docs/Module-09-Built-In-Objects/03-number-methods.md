# Working with Numbers

JavaScript has a single `number` type for both integers and decimals. The `Number` object and a few
number methods give you parsing, formatting, and safety checks. This chapter also covers the
floating-point surprises that trip up every developer at least once.

---

## Number literals

You can write numbers several ways:

```js
let count = 42;        // integer
let price = 4.5;       // decimal
let big = 1_000_000;   // underscores as visual separators (ignored by JS)
let hex = 0xff;        // 255   (hexadecimal)
let binary = 0b1010;   // 10    (binary)
let scientific = 1.5e3; // 1500 (1.5 x 10^3)
```

The underscore separators are purely cosmetic (`1_000_000` and `1000000` are the same value), but
they make large numbers far easier to read.

---

## Parsing text into numbers

Input from forms, files, and URLs arrives as **strings**. You need to convert it.

The cleanest conversion is the `Number()` function, which requires the **whole** string to be a valid
number:

```js
Number("42");    // 42
Number("4.5");   // 4.5
Number("42px");  // NaN   (trailing junk is not allowed)
Number("");      // 0
```

`Number.parseInt` and `Number.parseFloat` are more forgiving: they read as far as they can and stop
at the first character that does not fit.

```js
Number.parseInt("42px", 10); // 42    (stops at "p")
Number.parseInt("3.9", 10);  // 3     (integer only - truncates, not rounds)
Number.parseFloat("4.5rem"); // 4.5

Number.parseInt("ff", 16);   // 255   (parse as hexadecimal)
```

> Always pass the **radix** (base) as the second argument to `parseInt`, usually `10`. Without it,
> edge cases involving leading zeros can behave unexpectedly.

These are the same functions as the old global `parseInt`/`parseFloat`; the `Number.`-prefixed
versions are preferred in modern code because they are explicit about where they come from.

---

## `NaN`: Not-a-Number

When a numeric operation fails, JavaScript produces `NaN`. Its most infamous trait is that it is not
equal to anything, including itself:

```js
Number("hello"); // NaN
NaN === NaN;     // false (!)
```

So you cannot test for it with `===`. Use `Number.isNaN`:

```js
let result = Number("hello");
Number.isNaN(result); // true
```

There is also an older global `isNaN()`, but it coerces its argument first and gives misleading
results (`isNaN("hello")` is `true`). Prefer **`Number.isNaN`**, which only returns `true` for an
actual `NaN` value.

---

## Formatting: `toFixed`

`toFixed(n)` rounds to `n` decimal places and returns a **string**, which suits money and
percentages:

```js
let price = 4.5;
price.toFixed(2); // "4.50"   (a string!)

(3.14159).toFixed(2); // "3.14"
(2.005).toFixed(2);   // "2.00" (floating-point quirk - see below)
(1000).toFixed(0);    // "1000"
```

Because it returns a string, do not do math on the result; format only at the moment of display.

For locale-aware formatting (thousands separators, currency symbols), use `Intl.NumberFormat`:

```js
new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format(1234.5); // "$1,234.50"

new Intl.NumberFormat("en-US").format(1000000); // "1,000,000"
```

---

## Checking for integers

`Number.isInteger` tells you whether a value is a whole number, with no coercion:

```js
Number.isInteger(10);   // true
Number.isInteger(10.0); // true  (10.0 is exactly 10)
Number.isInteger(10.5); // false
Number.isInteger("10"); // false (a string, not a number)
```

---

## Safe integers

JavaScript numbers are 64-bit floating point, so they can only represent integers exactly up to a
limit. Beyond it, math silently goes wrong.

```js
Number.MAX_SAFE_INTEGER; // 9007199254740991  (2^53 - 1)
Number.MIN_SAFE_INTEGER; // -9007199254740991

9007199254740991 + 1; // 9007199254740992 (correct)
9007199254740991 + 2; // 9007199254740992 (WRONG - should be ...993)

Number.isSafeInteger(9007199254740991); // true
Number.isSafeInteger(9007199254740993); // false
```

If you need integers larger than this (database IDs or nanosecond timestamps, say), use the
`bigint` type (write the literal with an `n` suffix: `9007199254740993n`).

---

## Converting a number to a string with a radix

`toString(radix)` renders a number in another base, which is useful for hex colors or binary output:

```js
let n = 255;
n.toString();    // "255"  (base 10, the default)
n.toString(16);  // "ff"   (hexadecimal)
n.toString(2);   // "11111111" (binary)

(3735928559).toString(16); // "deadbeef"
```

---

## Floating-point gotchas

This is the classic surprise, and it is **not** a bug in JavaScript: it affects every language that
uses IEEE 754 floating point:

```js
0.1 + 0.2;         // 0.30000000000000004
0.1 + 0.2 === 0.3; // false
```

Numbers like `0.1` cannot be stored exactly in binary, just as `1/3` cannot be written exactly in
decimal. Tiny rounding errors accumulate.

Two practical fixes:

```js
// 1. Round for display with toFixed:
(0.1 + 0.2).toFixed(2); // "0.30"

// 2. Compare with a small tolerance (epsilon) instead of exact equality:
Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON; // true
```

For money, a robust approach is to **work in the smallest unit**, storing cents as integers and only
dividing by 100 when displaying:

```js
let cents = 450;               // $4.50 stored as an integer
(cents / 100).toFixed(2);      // "4.50"
```

---

## Summary

* JavaScript has one `number` type; literals can use `_` separators, hex (`0xff`), and binary
  (`0b...`).
* Parse strings with `Number()` (strict) or `Number.parseInt`/`parseFloat` (lenient), and always pass a
  radix to `parseInt`.
* `NaN` is never equal to itself; test with **`Number.isNaN`**, not `===`.
* `toFixed(n)` rounds to a fixed number of decimals and returns a **string**; use `Intl.NumberFormat`
  for currency and thousands separators.
* `Number.isInteger` checks for whole numbers; `Number.MAX_SAFE_INTEGER` marks the limit of exact
  integer math (use `bigint` beyond it).
* `toString(radix)` renders in another base (e.g. hex).
* Floating-point math is inexact (`0.1 + 0.2 !== 0.3`), so round for display or compare with a
  tolerance, and store money as integer cents.

# The `Math` Object and Randomness

`Math` is a built-in namespace of mathematical helpers. Unlike `Date` or `Map`, it is **not** a
constructor; you never write `new Math()`. Everything on it is **static**: you call it directly as
`Math.something(...)`. It also holds a few useful constants like `Math.PI`.

```js
Math.PI; // 3.141592653589793
Math.E;  // 2.718281828459045
```

---

## Rounding: `round`, `floor`, `ceil`, `trunc`

These four all turn a decimal into an integer, but each rounds in a different direction. Knowing which
is which prevents subtle off-by-one bugs.

```js
Math.round(4.5); // 5   - nearest integer (.5 rounds up)
Math.round(4.4); // 4
Math.round(4.6); // 5

Math.floor(4.9); // 4   - always DOWN toward negative infinity
Math.ceil(4.1);  // 5   - always UP toward positive infinity
Math.trunc(4.9); // 4   - just drops the decimal part
```

The difference between `floor` and `trunc` shows up with **negative** numbers:

```js
Math.floor(-4.1); // -5   (down = more negative)
Math.trunc(-4.1); // -4   (chops the ".1", stays closer to zero)
Math.ceil(-4.9);  // -4   (up = less negative)
```

Note that `Math.round` rounds half **up**, so `Math.round(-2.5)` is `-2`, not `-3`.

---

## Absolute value: `abs`

`abs` strips the sign, giving the distance from zero. It is the standard way to get the size of a
difference regardless of order:

```js
Math.abs(-7);  // 7
Math.abs(7);   // 7

let a = 3, b = 10;
Math.abs(a - b); // 7   (same result whichever way you subtract)
```

---

## Smallest and largest: `min` and `max`

These take **any number of arguments** and return the extreme value:

```js
Math.max(3, 7, 2, 9, 1); // 9
Math.min(3, 7, 2, 9, 1); // 1
```

To use them on an **array**, spread it with `...`:

```js
let temps = [61, 72, 58, 80, 66];
Math.max(...temps); // 80
Math.min(...temps); // 58
```

A handy trick is **clamping** a value into a range:

```js
// Keep volume between 0 and 100:
let volume = 130;
let clamped = Math.min(100, Math.max(0, volume)); // 100
```

---

## Powers and roots: `pow`, `sqrt`, and friends

```js
Math.pow(2, 10); // 1024   (2 to the 10th power)
Math.sqrt(144);  // 12     (square root)
Math.cbrt(27);   // 3      (cube root)
Math.hypot(3, 4); // 5     (sqrt(3^2 + 4^2) - straight-line distance)
```

In modern JavaScript the **exponentiation operator** `**` is often cleaner than `Math.pow`:

```js
2 ** 10; // 1024   (same as Math.pow(2, 10))
```

Other occasionally useful members:

```js
Math.sign(-5); // -1   (-1, 0, or 1 depending on sign)
Math.sign(5);  // 1
```

---

## Random numbers: `Math.random()`

`Math.random()` returns a floating-point number that is **greater than or equal to 0 and less than
1**, meaning the range is `[0, 1)`, so it never quite reaches 1.

```js
Math.random(); // e.g. 0.3746... (different every call)
```

On its own this is rarely what you want. You scale it into a useful range.

### A random decimal in a range

To get a number from `min` up to (but not including) `max`:

```js
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

randomInRange(10, 20); // e.g. 14.83...
```

### A random integer in a range (the reusable helper)

The pattern to memorize. This returns a **whole number** from `min` to `max`, **inclusive** of both
ends:

```js
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

randomInt(1, 6);   // a dice roll: 1, 2, 3, 4, 5, or 6
randomInt(0, 255); // a color channel: 0..255
```

Why it works, step by step:

1. `Math.random()` gives `[0, 1)`.
2. Multiplying by `(max - min + 1)` stretches it to `[0, count)` where `count` is how many integers
   are in range.
3. `Math.floor` drops it to a whole number `0 .. count - 1`.
4. Adding `min` shifts the range to `min .. max`.

### Picking a random array element

```js
function pickRandom(array) {
  return array[randomInt(0, array.length - 1)];
}

pickRandom(["espresso", "latte", "mocha"]); // e.g. "latte"
```

> **Not for security.** `Math.random()` is fine for games, sampling, and shuffling, but it is **not**
> cryptographically secure. For tokens, passwords, or anything security-sensitive, use
> `crypto.getRandomValues()` (browser) or the `node:crypto` module (Node).

---

## Summary

* `Math` is a **static namespace**: call `Math.x(...)` directly, never `new Math()`.
* Rounding: `round` (nearest), `floor` (down), `ceil` (up), `trunc` (drop decimals); `floor` and
  `trunc` differ on negatives.
* `abs` gives distance from zero; `min`/`max` take many arguments (spread an array with `...`).
* Powers and roots: `pow`/`sqrt`/`cbrt`/`hypot`, or the `**` operator for exponentiation.
* `Math.random()` returns `[0, 1)`; scale it. The key helper is
  `Math.floor(Math.random() * (max - min + 1)) + min` for an inclusive random integer.
* `Math.random()` is **not** secure, so use the `crypto` APIs for anything sensitive.

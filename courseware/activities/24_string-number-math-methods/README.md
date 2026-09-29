# Activity: Profile Card Formatting

Same built-in toolkits as the demo (String methods, Number parsing and formatting, and `Math`), applied to fresh profile data. Instead of touring the methods, you write six small reusable helpers that a profile card would actually need.

**Estimated time:** 15-20 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: slugify

Return a URL-friendly slug: `trim` the whitespace, lowercase it, then swap every space for a hyphen with `replaceAll`.

### Task 2: initials

Split the full name on spaces, take the first character of each part, uppercase it, and `join` the results back into one string.

### Task 3: maskEmail

Find the `@` with `indexOf`, then use `slice` to keep the first letter and the domain, joining them with `***` in between.

**Expected output:**
```
slug: my-profile-page
initials: AGL
masked: a***@example.com
```

### Task 4: parse and format numbers

Write `parseAmount(label)` that pulls the leading number out of a string like `"42 followers"`, remembering the radix. Then write `formatMoney(n)` using the `Intl.NumberFormat` instance already created for you.

**Expected output:**
```
amount: 42
money: $1,250.50
```

### Task 5: clamp

Keep a value inside a range. Return `Math.min(Math.max(value, min), max)` so anything below `min` becomes `min` and anything above `max` becomes `max`.

**Expected output:**
```
clamp(120, 0, 100): 100
clamp(-5, 0, 100): 0
```

### Task 6: roundTo and randomInt

For `roundTo`, multiply by `10 ** decimals`, `Math.round` it, then divide back. For `randomInt`, return an integer from `min` to `max` inclusive using `Math.random` and `Math.floor`. Because the roll is random, the script prints whether it landed in range (always `true`) rather than the number itself.

**Expected output:**
```
roundTo(3.14159, 2): 3.14
roll in range 1-6: true
```

## What You'll Learn

- Chaining String methods (`trim`, `toLowerCase`, `replaceAll`, `split`, `join`, `slice`), each returning a new string.
- Locating a substring with `indexOf` and cutting around it with `slice`.
- Reading a number out of text with `parseInt` and an explicit radix.
- Formatting currency for humans with `Intl.NumberFormat`.
- Combining `Math.min` and `Math.max` to clamp a value.
- Rounding to a chosen number of decimals, and generating a random integer in a range.

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Write `summarize(text, maxLength)` that returns `text` untouched when it already fits, and otherwise truncates it at the last space *before* `maxLength` and appends `"…"`, so words are never cut in half. Use `slice` and `lastIndexOf`.

Sample output:

```
Short enough
A slightly longer sentence…
```

## Related reading

- [Working with Strings](../../docs/Module-09-Built-In-Objects/02-string-methods.md)
- [Working with Numbers](../../docs/Module-09-Built-In-Objects/03-number-methods.md)
- [The Math Object and Randomness](../../docs/Module-09-Built-In-Objects/04-math-and-random.md)

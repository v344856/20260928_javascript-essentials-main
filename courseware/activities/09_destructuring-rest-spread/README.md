# Activity: Ranking Scores and Cataloging a Book

Same concepts as the demo (array destructuring by position, object destructuring by name, and the two jobs of `...`), applied to a score table and a book record. You will unpack both shapes, rename and default on the way out, and rebuild new values with spread.

**Estimated time:** 15-20 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: Top score and the rest

Destructure `scores` so the first element lands in `top` and everything after it gathers into `others` with `...`.

**Expected output:**
```
95
[ 88, 72, 60, 41 ]
```

### Task 2: Skip a position

Destructure `gold` (first) and `bronze` (third), skipping silver with an empty hole, which is two commas in a row.

**Expected output:**
```
95
72
```

### Task 3: Spread into a new array

Build `withPerfect` as a new array with `100` in front of every existing score. The original `scores` must not change.

**Expected output:**
```
[ 100, 95, 88, 72, 60, 41 ]
```

### Task 4: Pull properties by name

Destructure `title` and `author` out of `book`, gathering the remaining properties into `details`.

**Expected output:**
```
Dune
Frank Herbert
{ year: 1965, genre: 'Sci-Fi' }
```

### Task 5: Rename and default

Destructure `year` but call the variable `published`, and destructure `pages` with a default of `0`; `book` has no `pages` key, so the default fires.

**Expected output:**
```
1965
0
```

### Task 6: Spread and override

Spread `details` into a new `reissue` object that overrides `genre` to `"Classic"`. Later keys win.

**Expected output:**
```
{ year: 1965, genre: 'Classic' }
```

### Task 7: Destructure a parameter

Write `label({ title: t, genre = "Unknown" })` that returns `"<title> [<genre>]"`. Destructuring happens in the parameter list itself, so a missing `genre` falls back to the default.

**Expected output:**
```
Dune [Sci-Fi]
Untitled [Unknown]
```

## What You'll Learn

- Unpacking arrays by position, including `...rest` and skipped holes.
- Unpacking objects by name, including `...rest`, renaming, and defaults.
- The difference between `...` as rest (gathering) and as spread (unpacking).
- Copy-and-override with object spread, and why later keys win.
- Destructuring a function parameter to get named-argument ergonomics.

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Write `podium(scores)` that returns an object `{ gold, silver, bronze, rest }` using a single destructuring statement inside the function, then destructure that returned object at the call site to print a medal table. Handle a short array gracefully with defaults.

Sample output:

```
Gold 95, Silver 88, Bronze 72 (2 others)
Gold 50, Silver -, Bronze - (0 others)
```

## Related reading

- [Object & Array Destructuring, Rest & Spread](../../docs/Module-03-Arrays-and-Functions/03-js-destructure-rest-spread.md)
- Diagram: [Destructuring, Rest and Spread](../../diagrams/png/destructuring-shapes.png)
- Diagram: [Value vs Reference](../../diagrams/png/value-vs-reference.png)

# Activity: Word Stats

Same concept as the map/filter/reduce demo (transform, keep, and collapse an array), applied to a list of words instead of numbers. You will measure, filter, and total the words.

**Estimated time:** 10-15 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: Measure with map

Use `map` to build an array of each word's length, then log it.

**Expected output:**
```
[ 3, 5, 3, 8, 3 ]
```

### Task 2: Keep the short words with filter

Use `filter` to keep only words with length 3 or less, then log the result.

**Expected output:**
```
[ 'sky', 'sun', 'sea' ]
```

### Task 3: Total the letters with reduce

Use `reduce` to add up the total number of letters across all words, then log it.

**Expected output:**
```
22
```

## What You'll Learn

- Transforming every element into a new array with `map`
- Keeping only matching elements with `filter`
- Collapsing an array to a single value with `reduce` and an accumulator

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Chain all three in one statement: filter out the short words, map the survivors to uppercase, and reduce them into a single comma-separated string, with no intermediate variables. Then use `reduce` a second time to build an object that tallies how many words there are of each length.

Sample output:

```
CLOUD, MOUNTAIN
{ '3': 3, '5': 1, '8': 1 }
```

## Related reading

- [JavaScript Arrays](../../docs/Module-03-Arrays-and-Functions/01-js-arrays.md)
- Diagram: [map, filter, reduce](../../diagrams/png/array-pipeline.png)

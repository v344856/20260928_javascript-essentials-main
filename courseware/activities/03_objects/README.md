# Activity: Building a Movie Object

Same concepts as the demo (creating and working with objects), applied to a movie record instead of a book. You will build an object literal, read it two ways, mutate it, compute from its values, loop its entries, and copy/freeze objects.

**Estimated time:** 15-20 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: Create and read a movie

Create a `movie` object literal with `title`, `director`, and `year`. Read `title` with dot notation and `director` with bracket notation. Then read `year` using the `key` variable; bracket access is the only form that works when the key lives in a variable.

**Expected output:**
```
Inception
Nolan
2010
```

### Task 2: Mutate, then test membership

Add a `rating` property, update the `year`, and `delete` the `director`. Log the object. Then use `Object.hasOwn` to check for `"director"` (now gone) and `"title"` (still there).

**Expected output:**
```
{ title: 'Inception', year: 2011, rating: 5 }
false
true
```

### Task 3: Average the scores

Given `const scores = { acting: 9, plot: 8, music: 10 };`, use `Object.values` to get an array of the numbers, then compute and log the average.

**Expected output:**
```
Average score: 9
```

### Task 4: Loop the entries

Use `Object.entries` with a `for...of` loop and array destructuring to print each category and its score.

**Expected output:**
```
acting: 9
plot: 8
music: 10
```

### Task 5: Spread and freeze

Given `const settings = { quality: "HD", subtitles: false };`, use the spread operator to make a copy that overrides `subtitles` to `true`, and log it. Then `Object.freeze` an object `{ region: "US" }`, try to change `region` to `"EU"`, and log `region` (it stays `"US"`).

**Expected output:**
```
{ quality: 'HD', subtitles: true }
US
```

## What You'll Learn

- Declaring objects with the `{}` literal and reading properties via `obj.key` and `obj["key"]`
- Why bracket access is required when the key is held in a variable
- Adding, updating, and `delete`-ing properties after creation
- Testing for a property with `Object.hasOwn`
- Turning an object into arrays with `Object.values` / `Object.entries` and processing them
- Copying and overriding with the spread operator (`{ ...base }`)
- Locking an object with `Object.freeze`

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Write `pick(obj, keys)` that returns a new object containing only the named keys, skipping any the object does not actually have (`Object.hasOwn` again). Build it from `Object.entries` plus `filter`, or from a loop, whichever you prefer.

Sample output:

```
{ title: 'Inception', rating: 5 }
```

## Related reading

- [JavaScript Objects](../../docs/Module-02-JavaScript-Fundamentals/06-js-objects.md)
- Diagram: [Value vs Reference](../../diagrams/png/value-vs-reference.png)

# Activity: Build a Bookshelf

Same concepts as the demo (what arrays hold, mutating them in place, and searching/converting them), applied to a bookshelf, a playlist, and a tag string. You will build arrays of several shapes, rearrange one with `splice`, and pull a string apart and back together.

**Estimated time:** 15-20 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: Create the arrays

Create `titles` (three strings) and `books` (three objects, each with a `title` and a `read` boolean).

### Task 2: Read by index

Print the first title, the `title` of the second book, and `titles[99]`; an out-of-range index is `undefined`, not an error.

**Expected output:**
```
Dune
1984
undefined
```

### Task 3: An array of functions

Put two functions in an `actions` array (one logging `"Opening the book..."`, one logging `"Closing the book..."`), then call them by index.

**Expected output:**
```
Opening the book...
Closing the book...
```

### Task 4: Mutate the playlist

Replace the element at index 2 with `"Chorus"` and log the array. Then `push` `"Encore"` (log the returned new length) and `pop` it back off (log the returned element).

**Expected output:**
```
[ 'Intro', 'Verse', 'Chorus', 'Outro' ]
5
Encore
```

### Task 5: Rearrange with splice

Insert `"Solo"` at index 2 without removing anything, then remove one element at index 1. Log the array after the insert, the array `splice` returns, and the final array.

**Expected output:**
```
[ 'Intro', 'Verse', 'Solo', 'Chorus', 'Outro' ]
[ 'Verse' ]
[ 'Intro', 'Solo', 'Chorus', 'Outro' ]
```

### Task 6: Split, join, and search

Split `tagString` on `";"`, join the result with `" > "`, then search it with `includes` and `indexOf`. Remember `indexOf` returns `-1` when the value is absent.

**Expected output:**
```
[ 'javascript', 'html', 'css', 'node' ]
javascript > html > css > node
true
3
-1
```

## What You'll Learn

- Arrays hold anything: strings, objects, even functions you call by index.
- Reading by index, and that an out-of-range read is `undefined`.
- Mutating in place with index assignment, `push`, and `pop`, and what each returns.
- Using `splice` to insert, remove, and rearrange.
- Converting between strings and arrays with `split` and `join`.
- Searching with `includes` versus `indexOf`.

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Write `move(array, from, to)` that relocates one element within an array and returns the array, using `splice` twice, once to remove and once to insert. Then prove it did not disturb anything else by moving `"Outro"` to the front.

Sample output:

```
[ 'Outro', 'Intro', 'Solo', 'Chorus' ]
```

## Related reading

- [JavaScript Arrays](../../docs/Module-03-Arrays-and-Functions/01-js-arrays.md)
- Diagram: [map, filter, reduce](../../diagrams/png/array-pipeline.png)

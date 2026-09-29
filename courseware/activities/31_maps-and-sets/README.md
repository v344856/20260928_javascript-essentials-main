# Activity: Tallying Tags and Skills

> **Reserve pair.** The class works through `01`-`30` first; this one runs only if there is time.

Same concepts as the demo (`Map` for keyed counting, `Set` for uniqueness), applied to tallying tags and comparing skill lists. Both collections do in one line what an object or array needs a loop for.

**Estimated time:** 15-20 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: Tally with a Map

Write `tally(tags)` that returns a `Map` from each tag to how many times it appears. The idiom is `counts.set(tag, (counts.get(tag) || 0) + 1)`, because `get` returns `undefined` for a key you have not seen, so the `|| 0` seeds it.

### Task 2: Read the tally

Log `counts.get("js")` and `counts.size`. `size` is a property, not a method.

**Expected output:**
```
js count: 3
distinct tags: 3
```

### Task 3: Iterate, then convert

Loop the Map with `for...of` and array destructuring; it comes back in **insertion order**, which a plain object does not guarantee for all key types. Then convert it with `Object.fromEntries`.

**Expected output:**
```
  js: 3
  css: 2
  html: 1
as object: { js: 3, css: 2, html: 1 }
```

### Task 4: Dedupe with a Set

Write `unique(arr)` returning a new array with duplicates removed. `[...new Set(arr)]` is the whole implementation.

### Task 5: Intersection

Write `shared(a, b)` returning the values present in both arrays, using `new Set(a).intersection(new Set(b))`.

### Task 6: Distinct count

Write `distinctCount(arr)` returning how many distinct values the array holds, using `new Set(arr).size` with no loop needed.

**Expected output:**
```
unique: [ 'html', 'css', 'js' ]
shared: [ 'js', 'css' ]
distinct count: 3
```

## What You'll Learn

- Using a `Map` as a counter, and why `get` on an unseen key returns `undefined`.
- `Map.size` as a property, and iteration in guaranteed insertion order.
- Converting a `Map` to a plain object with `Object.fromEntries`.
- The `[...new Set(arr)]` dedupe idiom.
- Set math with `intersection`, and `Set.size` as a one-line distinct count.

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Extend `tally` into `topN(tags, n)` that returns the `n` most common tags with their counts, sorted highest first. You will need to get the Map into an array (`[...counts]`), `sort` by the count, and `slice`. Then try using an **object** as a Map key: tally a list of user objects by identity and confirm two objects with identical contents are still counted separately, which is exactly what a plain object cannot do.

Sample output:

```
[ [ 'js', 3 ], [ 'css', 2 ] ]
distinct users: 2
```

## Related reading

- [Maps and Sets](../../docs/Module-09-Built-In-Objects/06-maps-and-sets.md)
- Diagram: [Map and Set vs Object and Array](../../diagrams/png/map-set-vs-object.png)

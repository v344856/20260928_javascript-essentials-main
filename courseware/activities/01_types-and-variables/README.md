# Activity: Types and Variables

Same concepts as the demo (`let`/`const`, expression evaluation, and the `typeof` operator), applied to a new task: total up a small coffee order, prove that copying a variable copies its *value*, then write a helper that reports each value's real type, fixing the famous `typeof null` quirk along the way.

**Estimated time:** 15-20 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: const and let

`TAX_RATE` and `PRICES` never change, so declare them with `const`. `subtotal` is rebuilt on every pass of the loop, so declare it with `let`. Then change `order.size` to `"large"` and notice that mutating a `const` object is allowed: `const` fixes the binding, not the value.

**Expected output:**
```
Subtotal: 12
Tax: 0.84
Order: Latte (large)
```

### Task 2: copy the value, not the variable

Assign `subtotal` to `snapshot`, then set `subtotal` to `100`. Because the right-hand side is *evaluated* before it is stored, `snapshot` keeps the old value.

**Expected output:**
```
Snapshot: 12
Subtotal now: 100
```

### Task 3: kindOf

Complete `kindOf(value)` so it returns the same string as `typeof`, except it returns `"null"` when the value is `null` (because `typeof null` reports the misleading `"object"`).

### Task 4: isReference

Complete `isReference(value)` so it returns `true` for reference types (values whose `kindOf` is `"object"` or `"function"`) and `false` for primitives. The loop below is already written; once Tasks 3 and 4 work it prints each value's kind and category and counts the reference types.

**Expected output:**
```
number -> primitive
string -> primitive
null -> primitive
object -> reference
object -> reference
boolean -> primitive
Reference types: 2
```

## What You'll Learn

- When to reach for `const` and when you genuinely need `let`.
- That `const` freezes the binding, not the object it points at.
- That assignment evaluates the right-hand side first, so copying a variable copies its current value.
- The `typeof` operator and the strings it returns for primitives and reference types.
- Why `typeof null === "object"` and how to work around it.

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Add a `describe(value)` helper that returns a friendlier label than `kindOf` does: `"array"` for arrays (use `Array.isArray`), `"date"` for `Date` instances, and otherwise whatever `kindOf` returns. Run it over the same `samples` array and print the results.

Sample output:

```
number
string
null
object
array
boolean
```

## Related reading

- [JavaScript Variables](../../docs/Module-02-JavaScript-Fundamentals/03-js-variables.md)
- [JavaScript's Type System](../../docs/Module-02-JavaScript-Fundamentals/02-js-types.md)
- Diagram: [Value vs Reference](../../diagrams/png/value-vs-reference.png)
- Diagram: [Hoisting and the Temporal Dead Zone](../../diagrams/png/hoisting-and-tdz.png)

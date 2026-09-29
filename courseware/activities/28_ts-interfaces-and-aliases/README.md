# Activity: Model a Library Catalog

Same concept as the demo (interfaces vs. type aliases), applied to a fresh scenario: a library catalog instead of users. You will declare a `Book` interface, name types aliases cannot describe, and combine types two ways.

**Estimated time:** 10-15 minutes

## Setup

Your working files are in `end/`. Open `end/index.ts` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: Declare the Book interface

Give `Book` a `readonly id: number`, a `title: string`, and an optional `subtitle?: string`.

**Expected output:**
```
Dune
Effective TypeScript: 62 Ways
```

### Task 2: Add type aliases

Make `ISBN` an alias for `string`, `Genre` a union of `"fiction" | "science" | "history"`, and `Shelf` the tuple `[Genre, number]`.

**Expected output:**
```
ISBN 978-0441013593 | shelf science #3
```

### Task 3: Extend and intersect

Make `Ebook extends Book` (so it inherits `id`/`title`), and make `CatalogEntry` the intersection `Book & Audit`.

**Expected output:**
```
Deep Learning is 24MB
Sapiens added 2026-07-01
```

## What You'll Learn

- Declaring an object shape with `interface`, including `readonly` and optional (`?`) members
- Using type aliases for unions, primitives, and tuples that interfaces cannot express
- Extending an interface with `extends`
- Combining type aliases with the intersection operator `&`

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Explore the one thing `interface` does that `type` cannot: **declaration merging**. Declare the same interface twice with different members and confirm TypeScript combines them, then try the same with two `type` aliases and read the error. Then add an **index signature** (`[key: string]: unknown`) to one interface so it accepts arbitrary extra fields, and notice what that costs you in type safety on the members you did declare.

Sample output:

```
Sapiens by Harari (2011)
extra field: hardcover
```

## Related reading

- [Type Aliases and Interfaces](../../docs/Module-12-TypeScript/03-type-aliases-and-interfaces.md)
- Diagram: [The TypeScript Type Space](../../diagrams/png/ts-type-space.png)

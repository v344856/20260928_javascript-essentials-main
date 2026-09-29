# Activity: Narrow a Mixed Field, Handle App Events

> **Reserve pair.** The class works through `01`-`30` first; this one runs only if there is time.

Same concepts as the demo (type guards, then a discriminated union), applied to formatting mixed setting values and handling app events. You will convince TypeScript which member of a union you are holding, first with guards, then by tagging the union so a `switch` does it for you.

**Estimated time:** 15-20 minutes

## Setup

Your working files are in `end/`. Open `end/index.ts` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: Narrow with typeof

Write `show(value: string | number)` that returns `"text: HELLO"` for a string (uppercased) and `"num: 3.14"` for a number (two decimals). Inside the `typeof` check, TypeScript knows which one you have, so `.toUpperCase()` and `.toFixed()` are only available in their own branch.

**Expected output:**
```
text: HELLO
num: 3.14
```

### Task 2: Narrow with instanceof

Write `explain(x: unknown)` returning `"date: <year>"` when `x` is a `Date` and `"other: <value>"` otherwise. Note the parameter is `unknown`, not `any`; `unknown` will not let you touch the value until you have proved its type.

**Expected output:**
```
date: 2026
other: nope
```

### Task 3: Narrow with truthiness

Write `label(name?: string)` returning `"unnamed"` when `name` is missing or empty, and the trimmed name otherwise. After the `if (!name) return ...`, TypeScript knows `name` is a definite `string`.

**Expected output:**
```
unnamed
Ada
```

### Task 4: Declare a discriminated union

Declare `type AppEvent` as a union of three object types, each carrying a literal `type` tag: `"click"` with `x`/`y`, `"key"` with `key`, and `"scroll"` with `delta`.

### Task 5: Switch on the tag

Write `render(e: AppEvent)` with a `switch (e.type)`. Each `case` narrows `e` to exactly one member, so only that member's properties are reachable. Try using `e.x` in the `"key"` branch to watch the compiler stop you.

**Expected output:**
```
click at (10, 20)
key Enter
scroll -5
```

### Task 6: Add an exhaustiveness check

Add a `default` branch that calls `assertNever(e)`, and write `assertNever(value: never): never` that throws. Then add a fourth member to `AppEvent` *without* adding its `case`: the `default` stops compiling, because `e` is no longer `never` there. That is the compiler finding your missing case for you.

## What You'll Learn

- Narrowing a union with `typeof` so each branch has one concrete type.
- Why `unknown` is safer than `any`, and how `instanceof` unlocks it.
- Truthiness checks narrowing away `undefined` and empty values.
- Building a discriminated union with a shared literal tag.
- `switch` on the discriminant giving each branch exactly one member's properties.
- Using an `assertNever` helper so a forgotten case becomes a compile error rather than a runtime bug.

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Write a **user-defined type guard**: `function isClickEvent(e: AppEvent): e is { type: "click"; x: number; y: number }`. The `e is ...` return type is what makes it a guard, so callers get narrowing from a plain function call. Use it with `filter` and notice that plain `filter` would *not* narrow the resulting array's type, while a guard-typed one does.

Sample output:

```
clicks: 2
first click x: 10
```

## Related reading

- [Variable and Function Types](../../docs/Module-12-TypeScript/02-variable-and-function-types.md)
- [Type Aliases and Interfaces](../../docs/Module-12-TypeScript/03-type-aliases-and-interfaces.md)
- Diagram: [Narrowing and Discriminated Unions](../../diagrams/png/narrowing-discriminated-unions.png)
- Diagram: [The TypeScript Type Space](../../diagrams/png/ts-type-space.png)

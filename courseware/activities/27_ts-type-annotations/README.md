# Activity: Annotate a Trip Planner

Same concept as the demo (type annotations), applied to a fresh scenario: a tiny trip planner. You will annotate variables and a function, define a literal union, and make an `unknown` value safe.

**Estimated time:** 10-15 minutes

## Setup

Your working files are in `end/`. Open `end/index.ts` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: Annotate the variables

Add a type annotation to `city`, `distanceKm`, and `isCapital`.

**Expected output:**
```
Reykjavik is 4200 km away (capital: true)
```

### Task 2: Type a function and a literal union

Annotate `celsiusToF`'s parameter and return type as `number`. Change `Season` into a literal union of `"spring" | "summer" | "fall" | "winter"`.

**Expected output:**
```
10C is 50F
Packing for winter
```

### Task 3: Type an array and a tuple

Annotate `highs` as `number[]` and `coords` as the tuple `[string, number]`.

**Expected output:**
```
warmest high: 6
Reykjavik sits at latitude 64
```

### Task 4: Make an unknown value safe

Change `rawInput`'s annotation from `string` to `unknown`. The existing `typeof` guard then lets you read `.length` safely.

**Expected output:**
```
input has 2 characters
```

## What You'll Learn

- Annotating variables with `: string`, `: number`, and `: boolean`
- Typing a function's parameters and return type
- Restricting a value with a literal union type
- Declaring typed arrays and fixed-length tuples
- Why `unknown` must be narrowed before use

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Delete a few of the annotations you just added and watch TypeScript infer the same types anyway; hover a variable in the editor to see what it decided. That is the rule of thumb: annotate function *signatures* (where inference cannot see the caller) and let inference handle obvious local variables. Then add an optional parameter and a default parameter to `celsiusToF` and see which one TypeScript marks as possibly `undefined`.

Sample output:

```
10C is 50F
default unit: C
```

## Related reading

- [Variable and Function Types](../../docs/Module-12-TypeScript/02-variable-and-function-types.md)
- Diagram: [The TypeScript Pipeline](../../diagrams/png/typescript-pipeline.png)
- Diagram: [Coercion and Equality](../../diagrams/png/coercion-and-equality.png)

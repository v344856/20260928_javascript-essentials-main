# Activity: A Rectangle Constructor and Shapes on a Shared Prototype

Same concepts as the demo (constructor functions with methods on `.prototype`, then `Object.create` delegation), applied to shapes. You will build objects the pre-`class` way, then build them again with no constructor at all, and watch an own property shadow an inherited one.

**Estimated time:** 15-20 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: The constructor function

Write `function Rectangle(width, height)` that assigns both to `this`. Capitalized by convention, because it is meant to be called with `new`.

### Task 2: Methods on the prototype

Add `area()` and `scale(factor)` to `Rectangle.prototype`, not inside the constructor. That way every instance shares one copy of each function.

### Task 3: Build and inspect

Create `r1` (3 x 4) and `r2` (5 x 5) with `new`, log both areas, `scale` `r1` by 2 and log its area again. Then log `r1.area === r2.area`, `r1 instanceof Rectangle`, and `Object.getPrototypeOf(r1) === Rectangle.prototype`, all of which are `true`.

**Expected output:**
```
12
25
48
true
true
true
```

### Task 4: A plain object as a prototype

Create a `shape` object literal with a `describe()` returning `"A <name> shape."` and an `area()` returning `0`. No constructor and no `class`, just an object.

### Task 5: Delegate to it with Object.create

Make `square` with `Object.create(shape)`, give it `name` and `side`, and give it its **own** `area()` that returns `side * side`. Make a second object `blob` the same way but with only a `name`. Log `square.describe()`, `square.area()`, and `blob.area()`.

**Expected output:**
```
A square shape.
16
0
```

`square.describe()` works even though `square` has no `describe`, because the engine walks up to `shape`. `square.area()` uses its own version, while `blob.area()` falls back to the inherited one.

### Task 6: Own versus inherited

Log `Object.getPrototypeOf(square) === shape`, then use `Object.hasOwn` to check `"area"` and `"describe"` on `square`, and `"area"` on `blob`.

**Expected output:**
```
true
true
false
false
```

## What You'll Learn

- Writing a constructor function and what `new` does with `this`.
- Why shared methods belong on `.prototype` rather than inside the constructor.
- Checking type with `instanceof` and the prototype link with `Object.getPrototypeOf`.
- Building a prototype chain with `Object.create` and no constructor at all.
- Delegation, and how an own property shadows an inherited one.
- Telling own properties from inherited ones with `Object.hasOwn`.

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Wire up inheritance between two constructor functions the old-fashioned way: write `function Square(side)` that calls `Rectangle.call(this, side, side)`, then set `Square.prototype = Object.create(Rectangle.prototype)` and repair `Square.prototype.constructor`. Confirm `new Square(4) instanceof Rectangle` is `true` and that `area()` still works. Then write the same thing in three lines with `class Square extends Rectangle` and compare.

Sample output:

```
16
true
true
```

## Related reading

- [Function Constructors and Prototypes](../../docs/Module-04-Classes-this-and-Errors/04-js-function-constructors-and-prototypes.md)
- Diagram: [The Prototype Chain](../../diagrams/png/prototype-chain.png)

# Activity: The Call Site Decides `this`

Same concepts as the demo (call-site `this`, lexical `this`, and keeping `this` through a callback), applied to a ship's crew. One function will give you three different answers depending only on how you call it, and then you will fix the case where the answer is wrong.

**Estimated time:** 15-20 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

> The file starts with `"use strict";`, and you should leave it there. It is what makes a bare call's `this` `undefined` instead of the global object.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: reportRole

Write a regular function `reportRole()` that returns `this.role` when it has an owner, and the string `"(no owner)"` when it does not.

### Task 2: Same function, two owners

Attach `reportRole` to both `captain` and `cook` using shorthand property syntax, then call it as a method on each. Log both results, then log `captain.reportRole === cook.reportRole` to prove it really is one function.

**Expected output:**
```
captain
cook
true
```

### Task 3: Lose the binding

Assign `captain.reportRole` to a plain variable `loose` and call it. There is no object to the left of a dot any more, so `this` is `undefined`.

**Expected output:**
```
(no owner)
```

### Task 4: Set `this` yourself

Call `reportRole.call(cook)` to borrow the function for one call, then build a permanently bound copy with `reportRole.bind(captain)` and call that.

**Expected output:**
```
cook
captain
```

### Task 5: Lexical `this` in a callback

Give `ship` a `roster(crew)` method that returns `crew.map(...)` producing `"<ship name>: <role>"` for each member. Use an **arrow function** inside `map`: it has no `this` of its own, so it sees `roster`'s. (A regular `function` there would break.)

**Expected output:**
```
[ 'Endeavor: captain', 'Endeavor: cook' ]
```

### Task 6: Keep `this` through a callback

Give the `Watch` class a `ring` **class field holding an arrow function** that increments `this.count` and logs it. Because an arrow field captures `this` at construction, it still works when `runCallback` invokes it with no receiver.

**Expected output:**
```
bells rung 1 time(s)
bells rung 2 time(s)
```

## What You'll Learn

- That the call site decides `this`, so one function can give several answers.
- Why strict mode makes a bare call's `this` `undefined`.
- The "lost `this`" bug that appears when a method is detached from its object.
- Borrowing a function for one call with `call`, and fixing it permanently with `bind`.
- Why an arrow function inside a method sees the method's `this`.
- Using a class arrow-function field so a method survives being passed as a callback.

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Add a normal (non-arrow) `chime()` method to `Watch` and confirm it breaks when passed to `runCallback`. Then fix it *three* ways without changing the method: bind it in the constructor, bind it at the call site, and wrap it in an arrow at the call site. Print which technique produced each line so the trade-offs are visible.

Sample output:

```
constructor bind: chimed
call-site bind:   chimed
arrow wrapper:    chimed
```

## Related reading

- [Call-Site This versus Lexical This](../../docs/Module-04-Classes-this-and-Errors/02-js-call-site-vs-lexical-this.md)
- Diagram: [How this Is Decided](../../diagrams/png/this-binding.png)

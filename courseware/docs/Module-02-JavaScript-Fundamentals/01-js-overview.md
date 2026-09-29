# A Brief Overview of JavaScript

The Getting Started module covered what JavaScript is, the ECMAScript standard, and where it runs
(the browser and Node.js). This chapter is the bridge from *understanding* the language to *writing* it:
a quick map of the pieces you will use constantly, and the order the fundamentals chapters cover them.

You already program, so most of this will feel familiar. The goal here is just to name the pieces and
set the stage; the deep dives come next.

---

## What the Language Gives You

Almost everything you write in JavaScript is built from a small set of pieces:

- **Variables** hold values. Modern JavaScript uses `let` and `const`.
- **Types** describe values: numbers, strings, booleans, objects, and a few more. JavaScript is
  *dynamically typed*, so a variable's type comes from its current value.
- **Control flow** decides what runs: branching with `if`/`else` and `switch`, repeating with loops.
- **Functions** package up reusable behavior, and are themselves values you can pass around.
- **Objects and arrays** structure your data.

Here is a first taste of a few of those pieces working together:

```js
const name = "Ada";           // a constant
let count = 3;                // a variable you can reassign

function greet(who) {          // a function...
  return `Hello, ${who}!`;     // ...returning a template literal
}

if (count > 0) {               // control flow
  console.log(greet(name));    // "Hello, Ada!"
}
```

This is standard, cross-platform JavaScript; it behaves the same in the browser and in Node.js. Only
when code reaches for the DOM or a server API does the environment start to matter.

---

## The Road Ahead

The rest of this module walks through the fundamentals one at a time, each in its own chapter:

1. **Types**: the value types JavaScript has, and how coercion and equality work.
2. **Variables**: `let`, `const`, `var`, scope, and naming.
3. **Branching statements**: `if`/`else`, `switch`, and the ternary operator.
4. **Iteration statements**: `for`, `while`, `for...of`, `for...in`, and loop control.
5. **Objects**: grouping data and behavior into objects.

From there the course builds outward: arrays and functions, classes, asynchronous code, modules, the
DOM and browser APIs, the built-in standard library, forms, JSON, and finally TypeScript. This
chapter is the map; the next ones are the territory.

---

## Summary

* Getting Started covered *what* JavaScript is and *where* it runs; this module is where you start
  **writing** it.
* The language is built from a few core pieces: **variables, types, control flow, functions, and
  objects/arrays**.
* That core is the same everywhere, browser or Node.js; only environment-specific APIs like the DOM
  differ.
* The chapters ahead cover the fundamentals in order: **types, variables, branching, iteration, and
  objects**.

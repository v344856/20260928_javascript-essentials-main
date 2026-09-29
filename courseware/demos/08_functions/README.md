# 08. Functions

Builds the whole picture of a JavaScript function around one running example, the force calculation `F = m * a`. It opens with the copy-pasted version the function replaces, then writes the same operation three ways: a hoisted **function declaration** (called on lines *above* where it is defined), a **function expression** assigned to a `const` (which does not hoist, so the calls must follow it), and an **arrow function** with an implicit single-expression return. It closes on parameters: default values, the `...rest` parameter that collects leftover arguments into a real array, and the spread operator that unpacks an array back into separate arguments.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- The repetition a function removes, which is the motivation before the syntax.
- Function declarations hoist, so they can be called before they appear in the file.
- Function expressions assigned to `const` do not hoist; the assignment runs in place.
- Arrow function syntax, including the implicit return of a single-expression body.
- Default parameter values filling in for missing arguments.
- The `...rest` parameter collecting remaining arguments into an array.
- Why passing an array is one argument, and how `...` spread turns it back into many.

## Related reading

- [JavaScript Functions](../../docs/Module-03-Arrays-and-Functions/02-js-functions.md)
- Diagram: [Scope Chain and Closures](../../diagrams/png/scope-chain-and-closures.png)

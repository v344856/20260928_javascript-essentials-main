# 01. Types and Variables

Three passes over the foundations of the language. First it declares variables with `let`, `const`, and the legacy `var`, showing that `const` protects the binding rather than the value, and that `var` leaks out of the block `let`/`const` respect. Then it shows how assignment really works: the right-hand side is an *expression* that gets evaluated first, so copying a variable copies its value, not a link to it. Finally it reassigns a single variable through every JavaScript type in turn and logs `typeof` after each change, covering the primitives (number, string, boolean, `undefined`, symbol, `BigInt`, `null`), then an object, a function, and a class, which highlights dynamic typing and the historical quirk that `typeof null` reports `"object"`.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- `let` vs. `const` vs. `var`: block scope, reassignment, and why `var` is avoided.
- That `const` freezes the *binding*, not the object it points at.
- Expression evaluation: `let d = a + 2` evaluates the right side, then assigns the result.
- That assigning one variable to another copies the value, so later changes do not propagate.
- Dynamic typing: one variable can hold values of different types as the program runs.
- The `typeof` operator and the strings it returns for each primitive and reference type.
- The well-known gotcha that `typeof null === "object"`, and that functions and classes both report `"function"`.

## Related reading

- [JavaScript Variables](../../docs/Module-02-JavaScript-Fundamentals/03-js-variables.md)
- [JavaScript's Type System](../../docs/Module-02-JavaScript-Fundamentals/02-js-types.md)
- Diagram: [Value vs Reference](../../diagrams/png/value-vs-reference.png)
- Diagram: [Hoisting and the Temporal Dead Zone](../../diagrams/png/hoisting-and-tdz.png)

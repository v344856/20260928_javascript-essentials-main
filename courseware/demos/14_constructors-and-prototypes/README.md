# 14. Constructors and Prototypes

What `class` is actually built on. First the **constructor function**, the pre-ES6 way to make objects: a Capitalized function that `new` calls with a fresh `this`, with shared methods assigned to its `.prototype` so every instance points at one copy rather than carrying its own. Then **`Object.create`**, which drops the constructor entirely: a plain object serves as a prototype and other objects *delegate* to it for anything they do not have themselves, with an own property shadowing an inherited one. `Object.hasOwn` separates the two. It ends by showing that an ES6 `class` produces exactly the same prototype wiring (`Object.getPrototypeOf(car) === Vehicle.prototype`), so the syntax is sugar, not a different object model.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- Constructor functions, the Capitalized naming convention, and what `new` does to `this`.
- Putting shared methods on `.prototype` so instances share one function object.
- `instanceof` and the `constructor` back-reference.
- `Object.create` building a prototype chain with no constructor involved.
- Delegation: a missing property is looked up the chain, and an own property shadows an inherited one.
- `Object.hasOwn` distinguishing own from inherited properties.
- Walking the chain with `Object.getPrototypeOf`, ending at `Object.prototype`.
- That `class` compiles down to the same prototype machinery.

## Related reading

- [Function Constructors and Prototypes](../../docs/Module-04-Classes-this-and-Errors/04-js-function-constructors-and-prototypes.md)
- Diagram: [The Prototype Chain](../../diagrams/png/prototype-chain.png)

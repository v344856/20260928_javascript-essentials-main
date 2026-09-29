# 11. Classes and Encapsulation

Two passes over the `class` keyword. First the basics: a `constructor` that assigns instance properties, a method every instance shares, `instanceof`, and the proof that methods live on the prototype rather than being copied per object (`person.greet === person2.greet` is `true`). Then encapsulation: `#private` fields that genuinely cannot be reached from outside the class body, `get`/`set` accessors that read like properties but run code, validation living in the setter where nothing can bypass it, and computed getters that derive a value rather than store one. The setter's rejection is caught so the demo keeps running, and `Object.keys` shows that `#` fields never appear.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- `class` syntax: `constructor`, instance properties, and methods.
- Creating instances with `new` and checking type with `instanceof`.
- That methods are shared on the prototype, not duplicated per instance.
- `#private` fields, and that they are unreachable (and invisible to `Object.keys`) from outside.
- `get` / `set` accessors that look like properties from the caller's side.
- Putting validation in a setter so no code path can skip it.
- Computed getters (`fullName`, `salaryFormatted`) that derive rather than store.

## Related reading

- [JavaScript Classes](../../docs/Module-04-Classes-this-and-Errors/01-js-classes.md)
- Diagram: [Class Anatomy](../../diagrams/png/class-anatomy.png)
- Diagram: [The Prototype Chain](../../diagrams/png/prototype-chain.png)

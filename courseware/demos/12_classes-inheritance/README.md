# 12. Class Inheritance, Overriding and Statics

Extends the `Person` class from the previous demo into an `Employee` and follows every consequence. `extends` plus a `super(...)` call reuses the parent constructor before the subclass adds its own field. Redefining `greet()` in the subclass **overrides** the parent's, and `super.greet()` calls back up to it, so both run. Alongside the instance members, `static` fields and a `static` factory method show what belongs to the *class* rather than to any object made from it (and that instances cannot see them). It closes by walking the prototype chain that `instanceof` actually consults: instance → `Employee.prototype` → `Person.prototype` → `Object.prototype` → `null`, read with `Object.getPrototypeOf`.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- `extends` to build a subclass, and why `super(...)` must run before the subclass assigns its own fields.
- Overriding an inherited method, and calling the parent's version with `super.method()`.
- `static` fields and methods living on the class, not on instances (`employee1.species` is `undefined`).
- A `static` factory method as a named alternative to `new`.
- That a subclass's `super()` call still runs the parent constructor, so a shared counter counts both.
- `instanceof` returning `true` all the way up the chain, and `false` for an unrelated class.
- The prototype chain itself, walked with `Object.getPrototypeOf` and terminating at `null`.

## Related reading

- [JavaScript Classes](../../docs/Module-04-Classes-this-and-Errors/01-js-classes.md)
- [Function Constructors and Prototypes](../../docs/Module-04-Classes-this-and-Errors/04-js-function-constructors-and-prototypes.md)
- Diagram: [The Prototype Chain](../../diagrams/png/prototype-chain.png)
- Diagram: [Class Anatomy](../../diagrams/png/class-anatomy.png)

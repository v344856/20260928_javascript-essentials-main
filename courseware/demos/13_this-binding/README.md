# 13. Call-Site `this` versus Lexical `this`

The single most confusing thing about JavaScript, taken in three passes. First, **call-site `this`**: one function object, called four different ways (bare, which is `undefined` in strict mode; as a method on two different objects; and detached back into a plain variable), proving that the *call*, not the definition, decides `this`, with `call`/`bind` setting it explicitly. Then **lexical `this`**: a nested regular function gets its own `this` (the bug the old `const that = this;` trick worked around), while an arrow function has none of its own and therefore sees the enclosing scope's. Finally, where this actually bites in real code: passing a method as a callback. A normal method loses `this`; a class field holding an arrow function keeps it, and `bind` fixes the normal method.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- That `this` is decided at the call site, so the same function gives different answers depending on how it is invoked.
- Strict mode making a bare call's `this` `undefined` rather than the global object.
- The "lost `this`" bug that appears the moment a method is pulled off its object.
- `call` and `bind` setting `this` explicitly.
- Arrow functions having no `this` of their own, so they inherit the enclosing scope's.
- Why `const that = this;` used to exist, and what replaced it.
- A class arrow-function field surviving being passed as a callback, and the warning not to make every method one.

## Related reading

- [Call-Site This versus Lexical This](../../docs/Module-04-Classes-this-and-Errors/02-js-call-site-vs-lexical-this.md)
- Diagram: [How this Is Decided](../../diagrams/png/this-binding.png)

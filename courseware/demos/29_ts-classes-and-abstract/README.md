# 29. Classes and Abstract Classes

Builds a `Shape` abstract base class that implements a `Describable` interface, declares an abstract `area()` method, and shares a concrete `describe()` method. Two concrete subclasses (`Circle` and `Rectangle`) supply their own `area()`, and the demo uses them polymorphically through the interface type.

## Run

```bash
npx tsx index.ts
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- `abstract class`: a base you cannot instantiate, with abstract methods subclasses must implement
- A class fulfilling an interface contract with `implements`
- Access modifiers: `public`, `protected`, and `private`
- `readonly` fields and `private` parameter properties (declare + assign in the constructor signature)
- Polymorphism, meaning treating different subclasses uniformly through a shared type

## Related reading

- [Classes and Abstract Classes](../../docs/Module-12-TypeScript/04-abstract-classes.md)
- Diagram: [Class Anatomy](../../diagrams/png/class-anatomy.png)
- Diagram: [The Prototype Chain](../../diagrams/png/prototype-chain.png)

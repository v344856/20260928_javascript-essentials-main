# 28. Interfaces and Type Aliases

Compares TypeScript's two ways of naming a type: the `interface` and the `type` alias. It defines a `User` interface with optional and `readonly` properties, uses type aliases for unions and tuples, and shows both extension styles: `extends` for interfaces and the intersection operator `&` for aliases.

## Run

```bash
npx tsx index.ts
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- Declaring an object shape with `interface`
- `readonly` properties and optional (`?`) properties
- Type aliases for things interfaces cannot name (unions, primitives, tuples)
- Extending an interface with `extends`
- Combining type aliases with the intersection operator `&`

## Related reading

- [Type Aliases and Interfaces](../../docs/Module-12-TypeScript/03-type-aliases-and-interfaces.md)
- Diagram: [The TypeScript Type Space](../../diagrams/png/ts-type-space.png)

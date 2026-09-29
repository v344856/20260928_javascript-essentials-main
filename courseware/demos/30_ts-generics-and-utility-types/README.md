# 30. Generics and Utility Types

Reusable types, in two halves that build on each other. **Generics** first: `<T>` as a type parameter filled in at the call site, inference doing the work so you rarely write it by hand, `extends` constraining a parameter so the body can safely use a property, a generic class `Box<T>` whose `map` can even change the contained type, and a generic interface describing an API envelope around any payload. Then **utility types**, which are themselves generic and exist so you never restate a shape you already have: `Partial` for patch-style updates, `Required` after defaults are merged, `Readonly`, `Pick` and `Omit` to derive smaller shapes, and `Record` for a lookup table over a fixed key union. It ends by composing two of them, `Partial<Omit<Product, "id">>`.

## Run

```bash
npx tsx index.ts
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- `<T>` as a type parameter, and how TypeScript infers it from the argument.
- Constraining a parameter with `extends` so the function body can safely use a property.
- A generic class holding a value of whatever type it was created with, and a `map` that changes it.
- A generic interface (`ApiResponse<T>`) wrapping any payload type.
- `Partial<T>` for updates that carry only the changed fields.
- `Required<T>` and `Readonly<T>`.
- `Pick<T, Keys>` and `Omit<T, Keys>` deriving a smaller shape from a bigger one.
- `Record<Keys, Value>` building a lookup table from a union of literal keys.
- That utility types compose, because they are just generics.

## Related reading

- [Generics](../../docs/Module-12-TypeScript/05-generics.md)
- [Utility Types](../../docs/Module-12-TypeScript/06-utility-types.md)
- Diagram: [How a Type Parameter Flows](../../diagrams/png/generics-type-flow.png)
- Diagram: [Utility Types as Transforms](../../diagrams/png/utility-types.png)

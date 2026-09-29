# 27. TypeScript Type Annotations

Shows the core building block of TypeScript: the type annotation. It annotates variables and function parameters/return types, contrasts explicit annotations with inference, and demonstrates union types, literal types, arrays, tuples, and the difference between `any` and `unknown`.

## Run

```bash
npx tsx index.ts
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- Annotating variables with `: string`, `: number`, `: boolean`
- Letting TypeScript infer a type from an initializer
- Annotating function parameters and return types (including `void`)
- Union types (`number | string`) and literal types (`"north" | "south" | ...`)
- Typed arrays (`number[]`) and fixed-length tuples (`[number, number]`)
- Why `unknown` is the safe alternative to `any`

## Related reading

- [Variable and Function Types](../../docs/Module-12-TypeScript/02-variable-and-function-types.md)
- Diagram: [The TypeScript Pipeline](../../diagrams/png/typescript-pipeline.png)
- Diagram: [Coercion and Equality](../../diagrams/png/coercion-and-equality.png)

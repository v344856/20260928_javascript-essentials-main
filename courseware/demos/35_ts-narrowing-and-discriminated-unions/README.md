# 35. Narrowing and Discriminated Unions

> **Reserve pair.** The class works through `01`-`30` first; this one runs only if there is time.

A union type is only useful once TypeScript can tell *which* member you are holding. The demo works through the four everyday **type guards**: `typeof` for primitives, `instanceof` for class instances (with an `unknown` parameter, which forces you to prove the type rather than letting `any` wave it through), `in` for telling object shapes apart by which property exists, and a plain truthiness check to narrow away `null`/`undefined`. Then it shows why `in` checks get fragile as a union grows, and replaces them with a **discriminated union**: every member carries a shared property typed as a *literal*, so a `switch` on that tag narrows each branch to exactly one member. It closes with the `assertNever` exhaustiveness trick, where adding a new union member makes the compiler point at the `switch` that forgot to handle it.

## Run

```bash
npx tsx index.ts
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- `typeof` narrowing a `number | string` union to one primitive per branch.
- `instanceof` narrowing an `unknown` value, and why `unknown` is safer than `any`.
- The `in` operator distinguishing object shapes by which property is present.
- A truthiness check narrowing an optional parameter to a definite value.
- A discriminated union: a shared literal `kind` tag across every member.
- `switch` on the discriminant narrowing each case so only that member's properties are reachable.
- An `assertNever` exhaustiveness check that turns a forgotten case into a compile error.

## Related reading

- [Variable and Function Types](../../docs/Module-12-TypeScript/02-variable-and-function-types.md)
- [Type Aliases and Interfaces](../../docs/Module-12-TypeScript/03-type-aliases-and-interfaces.md)
- Diagram: [Narrowing and Discriminated Unions](../../diagrams/png/narrowing-discriminated-unions.png)
- Diagram: [The TypeScript Type Space](../../diagrams/png/ts-type-space.png)

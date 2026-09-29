# 02. Operators and Strings

Works through JavaScript's operators in three passes. First the arithmetic operators (`+`, `*`, `-`, `/`, `**`, and `%`), reassigning a single variable so each result feeds the next. Then comparison: why `===` compares value *and* type while `==` coerces first, with the classic `5 == "5"` and `0 == ""` surprises shown side by side. Finally string building, contrasting `+` concatenation with template literals: backticks, `${}` placeholders holding arbitrary expressions, and multi-line strings.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- The arithmetic operators, including `**` (exponentiation) and `%` (remainder).
- Why `===` is the default comparison in modern JavaScript and what `==` coercion does instead.
- Concatenating strings with `+`.
- Template literals: backticks, `${expression}` placeholders, and multi-line strings.

## Related reading

- [JavaScript's Type System](../../docs/Module-02-JavaScript-Fundamentals/02-js-types.md)
- [Working with Strings](../../docs/Module-09-Built-In-Objects/02-string-methods.md)
- Diagram: [Coercion and Equality](../../diagrams/png/coercion-and-equality.png)

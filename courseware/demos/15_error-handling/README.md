# 15. Error Handling

A `divide()` function `throw`s an `Error` when the divisor is zero. The demo wraps two calls in a `try`/`catch`/`finally` block: the first succeeds and logs `5`, the second throws and is caught (logging the error message), and the `finally` block runs either way.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- Throwing an `Error` with `throw new Error(...)` to signal a failure
- Catching errors with `try`/`catch` and reading `error.message`
- The `finally` block running regardless of success or failure

## Related reading

- [JavaScript Error Handling](../../docs/Module-04-Classes-this-and-Errors/03-js-error-handling.md)
- Diagram: [Error Propagation](../../diagrams/png/error-propagation.png)

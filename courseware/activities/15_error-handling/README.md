# Activity: Age Check at the Door

Same concept as the demo (`throw` plus `try`/`catch`/`finally`), applied to a fresh scenario. The
demo threw when dividing by zero; here a `checkAge()` function throws when someone is too young, and
you handle both a passing and a failing case in a loop.

**Estimated time:** 10-15 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: Throw an error

Finish `checkAge(age)`: throw `new Error("Must be 18 or older")` when `age` is under 18. Otherwise
return the string `"Access granted for age <age>"`.

### Task 2: Handle it with try/catch/finally

For each age in the list, call `checkAge` inside a `try` block and log the result. In `catch`, log
`"Error: <message>"`. In `finally`, log `"Finished checking age <age>."` so it runs either way.

**Expected output:**
```
Access granted for age 25
Finished checking age 25.
Error: Must be 18 or older
Finished checking age 15.
```

## What You'll Learn

- Signaling failure with `throw new Error(...)`
- Catching errors with `try`/`catch` and reading `error.message`
- The `finally` block running regardless of success or failure

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Define your own `class TooYoungError extends Error` that also carries the offending `age` as a property, and throw that instead of a plain `Error`. In the `catch`, use `instanceof` to print a richer message for your custom error while still handling any other error type.

Sample output:

```
Access granted for age 25
Finished checking age 25.
TooYoungError: 15 is under 18
Finished checking age 15.
```

## Related reading

- [JavaScript Error Handling](../../docs/Module-04-Classes-this-and-Errors/03-js-error-handling.md)
- Diagram: [Error Propagation](../../diagrams/png/error-propagation.png)

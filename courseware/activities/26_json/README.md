# Activity: Serializing a Profile

Same concept as the demo (`JSON.stringify` and `JSON.parse`), applied to a user
profile. You will pretty-print, drop a secret field with a replacer, and
round-trip an object through JSON.

**Estimated time:** 10-15 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: Pretty-print

Pretty-print the provided `profile` with `JSON.stringify` using a 2-space indent
(the `space` argument). Log it under a `=== Pretty ===` heading.

**Expected output:**
```
=== Pretty ===
{
  "username": "jsmith",
  "level": 7,
  "premium": true,
  "token": "abc123",
  "tags": [
    "admin",
    "beta"
  ]
}
```

### Task 2: Drop the secret with a replacer

Stringify `profile` again, but pass a replacer function that returns `undefined`
for the `"token"` key so the secret field is dropped. Use a 2-space indent and
log it under a `=== Safe (token removed) ===` heading.

**Expected output:**
```
=== Safe (token removed) ===
{
  "username": "jsmith",
  "level": 7,
  "premium": true,
  "tags": [
    "admin",
    "beta"
  ]
}
```

### Task 3: Parse and round-trip

Parse the string `'{"username":"adoe","level":3}'` and log
`User <username> is level <level>`. Then round-trip `profile` through
`JSON.stringify` + `JSON.parse` and confirm the username survives.

**Expected output:**
```
User adoe is level 3
username survives round-trip: true
```

## What You'll Learn

- `JSON.stringify(value, null, 2)` for readable, pretty-printed output
- The `replacer` argument to omit a field (returning `undefined`)
- `JSON.parse(text)` to turn a JSON string back into an object
- Round-tripping an object through `stringify` then `parse`

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Add a `joined: new Date(...)` field to the profile and round-trip it. Notice a `Date` survives `stringify` as a string but comes back as a *string*, not a `Date`. Fix it with a **reviver** function passed to `JSON.parse` that turns any ISO-8601-looking string back into a `Date`. Then confirm with `instanceof Date` before and after.

Sample output:

```
without reviver: string false
with reviver:    object true
```

## Related reading

- [JSON: Syntax and Serialization](../../docs/Module-11-JSON/01-json-syntax-and-serialization.md)
- Diagram: [The JSON Round Trip](../../diagrams/png/json-round-trip.png)

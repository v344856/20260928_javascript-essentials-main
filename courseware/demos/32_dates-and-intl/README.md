# 32. Working with Dates

> **Reserve pair.** The class works through `01`-`30` first; this one runs only if there is time.

Creates `Date` objects several ways (now, explicit parts, ISO string), reads their components with the `getFullYear`/`getMonth`/`getDate`/`getDay`/`getHours` family, formats them for humans with `toLocaleDateString` and `Intl.DateTimeFormat`, and computes date differences by subtracting dates (which yields milliseconds), including a "days until" calculation.

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- Constructing dates with `new Date()`, explicit components, and ISO 8601 strings
- The zero-based month gotcha (`0` = January, `6` = July)
- Reading parts with `getFullYear`, `getMonth`, `getDate`, `getDay`, `getHours`, `getMinutes`
- Human-friendly formatting via `toLocaleDateString` and `Intl.DateTimeFormat`
- Subtracting dates to get a millisecond difference, then converting to days
- A "days between" and "days until" calculation

## Related reading

- [Working with Dates and Times](../../docs/Module-09-Built-In-Objects/05-dates.md)
- Diagram: [The Date and Time Model](../../diagrams/png/date-time-model.png)

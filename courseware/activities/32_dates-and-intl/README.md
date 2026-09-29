# Activity: Formatting Dates and Counting Days

> **Reserve pair.** The class works through `01`-`30` first; this one runs only if there is time.

Same `Date` toolkit as the demo, applied to a fresh set of helpers. Every date
is built from year/month/day components (month is 0-based) so the output is the
same no matter your time zone.

**Estimated time:** 10-15 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: format a date

Return a date as `"Month D, YYYY"` using `Intl.DateTimeFormat` with
`{ year: "numeric", month: "long", day: "numeric" }`.

### Task 2: weekday name

Return the weekday name (e.g. `"Tuesday"`) using
`toLocaleDateString("en-US", { weekday: "long" })`.

### Task 3: days between

Subtract two dates (which gives milliseconds), then divide by the number of
milliseconds in a day and `Math.round` the result.

**Expected output:**
```
formatted: July 7, 2026
weekday: Tuesday
days between: 14
```

## What You'll Learn

- Building dates from components with `new Date(year, monthIndex, day)` (month is 0-based)
- Formatting dates for humans with `Intl.DateTimeFormat` and `toLocaleDateString`
- Measuring the gap between two dates through millisecond math

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Write `addDays(date, n)` that returns a **new** `Date` `n` days later without mutating the original. `setDate` mutates in place, so clone first with `new Date(date)`. Prove it handles a month boundary (add 5 days to January 30) and that the original date is unchanged. Then use `Intl.RelativeTimeFormat` to render the gap from Task 3 as `"in 14 days"` rather than a bare number.

Sample output:

```
original: January 30, 2026
plus 5:   February 4, 2026
in 14 days
```

## Related reading

- [Working with Dates and Times](../../docs/Module-09-Built-In-Objects/05-dates.md)
- Diagram: [The Date and Time Model](../../diagrams/png/date-time-model.png)

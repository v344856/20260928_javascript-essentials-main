# Activity: Weather Advisor

Same concept as the conditionals demo (if/else, switch, ternary), applied to a small weather helper. You will classify a temperature, pick an activity, and choose what gear to bring.

**Estimated time:** 10-15 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: Classify the temperature

In `classifyTemp(temp)`, use an `if / else if / else` chain to return a label: "Hot" for 90 and up, "Warm" for 70 and up, "Cool" for 50 and up, otherwise "Cold".

**Expected output:**
```
Hot
Warm
Cool
Cold
```

### Task 2: Plan an activity

In `planActivity(weather)`, use a `switch` statement. "sunny" returns "Go for a hike.", "rainy" returns "Read a book.", "snowy" and "icy" both return "Stay inside." (use a fall-through), and anything else returns "Check the forecast.".

**Expected output:**
```
Go for a hike.
Stay inside.
Stay inside.
Check the forecast.
```

### Task 3: Choose your gear

Use a ternary operator to set `gear` to "umbrella" when `isRaining` is true, otherwise "sunglasses".

**Expected output:**
```
Bring your umbrella.
```

## What You'll Learn

- Branching with an `if / else if / else` chain
- Writing a `switch` with a `default` and a deliberate fall-through
- Using the ternary operator for a concise inline choice

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Write `advise(temp, weather, isRaining)` that combines all three helpers into a single sentence, and add a guard at the top that returns `"No reading available."` when `temp` is not a number (`Number.isNaN` will help). Call it with a bad temperature to prove the guard fires.

Sample output:

```
Warm day. Go for a hike. Bring your sunglasses.
No reading available.
```

## Related reading

- [JavaScript Branching Statements](../../docs/Module-02-JavaScript-Fundamentals/04-js-branching-statements.md)

# Module 9 Exit Ticket: Built-In Objects

**Module 9** · The JavaScript standard library: `String`, `Number`, `Math` and randomness, `Date`, and the `Map` / `Set` collections you reach for before writing your own.
**~5 minutes · Not graded · Anonymous is fine**

> No wrong answers to sweat here. This is just a quick gut-check so we can see what landed and what's worth a second pass. Answer from memory; a fuzzy answer is useful signal, not a mistake.

## Quick Recap (3 questions)

1. **(multiple choice)** What is the range of the number returned by `Math.random()`?
   - A) An integer from `0` to `1`.
   - B) A decimal that is `>= 0` and `< 1` (it never quite reaches 1).
   - C) A decimal that is `> 0` and `<= 1`.
   - D) A decimal that is `>= 1` and `< 2`.

2. **(short answer)** In one or two sentences: given `min` and `max`, write (or describe) the expression that produces a **random whole number from `min` to `max` inclusive**.

3. **(explain in your own words)** When would you reach for a `Map` instead of a plain object? Name at least one thing a `Map` does that a plain object doesn't handle well.

## Muddiest Point

- What's the one thing from this module that's still fuzzy? (String/number methods, `Math`, Dates, Maps/Sets, or anything else.)

## Connect It

- Think of a language you already know and its standard library or collections (Python's `dict`/`set` and `math`, Java's `Map`/`HashSet` and `Math`, C#'s `Dictionary`/`HashSet`, Ruby's `Hash`/`Set`...). What's one built-in from Module 9 that felt familiar, and one that behaves differently from what you're used to?

<details><summary><strong>Instructor Answer Key</strong> (formative, for reading the room, not grading)</summary>

- **Q1:** **B.** `Math.random()` returns a floating-point value in the half-open range `[0, 1)`, so zero is possible and one is not. A is wrong (it's a decimal, not an integer); C flips which end is inclusive; D has the wrong bounds entirely. This half-open range is exactly why the `+ 1` shows up in the random-integer helper.
- **Q2:** `Math.floor(Math.random() * (max - min + 1)) + min`. Accept close variants and plain-English descriptions: multiply the `[0,1)` value by the count of integers in range (`max - min + 1`), floor it to a whole number, then add `min` to shift it. The key details to listen for are the `+ 1` (so `max` is reachable) and the `+ min` shift.
- **Q3 (open-ended, what to listen for):** A solid answer names any of: **keys can be any type** (numbers, booleans, objects, functions stay distinct, whereas objects coerce every key to a string); **`.size` is instant** vs. `Object.keys(obj).length`; **no inherited-key surprises** (`"toString" in obj` is misleadingly true); **guaranteed insertion order** with easy built-in iteration. Rule of thumb they might echo: object for fixed known-ahead records, `Map` when keys are dynamic, non-string, or frequently added/removed. No single wording is required.

**Muddiest Point / Connect It:** Common muddy spots are floating-point inexactness (`0.1 + 0.2 !== 0.3`, round for display or compare with a tolerance) and `Date` quirks (zero-based months, `getDate()` day-of-month vs. `getDay()` day-of-week, date-only strings parsing as UTC). Also watch for the `Map`-vs-object line and that `Set`/`Map` compare objects by reference, not contents. On Connect It, listen for whether learners map JS built-ins onto their prior language; a frequent surprise is that JS has a single `number` type (no separate int/float) and that strings are immutable, so every string method returns a new string rather than mutating in place.

</details>

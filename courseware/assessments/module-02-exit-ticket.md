# Module 2 Exit Ticket: JavaScript Fundamentals

**Module 2** · The core building blocks of JavaScript: types and coercion, `let`/`const`/`var` and scope, branching, loops, and objects.
**~5 minutes · Not graded · Anonymous is fine**

> No pressure here. This is just a quick gut-check so we both know what landed and what could use another pass. Jot down what comes to mind; half-formed thoughts are welcome.

## Quick Recap (3 questions)

1. **(multiple choice)** In JavaScript, why does `0 == "0"` evaluate to `true` while `0 === "0"` evaluates to `false`?
   - A) `==` rounds numbers before comparing, but `===` does not
   - B) `==` allows type coercion (the string is converted to a number), while `===` compares type and value together without coercing
   - C) `===` only works on numbers, so it always returns `false` for strings
   - D) They should both be `true`; the difference is a known JavaScript bug

2. **(short answer)** Name three of the six falsy values in JavaScript.

3. **(explain in your own words)** Why does the course recommend using `const` and `let` in new code and avoiding `var`? Explain how their scoping behavior differs.

## Muddiest Point

- What's the one thing from this module that's still fuzzy? (A term, a rule, a quirk, or anything else.)

## Connect It

- In a language you already know well, how are variable types handled: declared up front and fixed, or free to change? Compare that to JavaScript's dynamic typing, where the value carries the type and the same variable can hold a number, then a string, then a boolean over its lifetime.

<details><summary><strong>Instructor Answer Key</strong> (formative, for reading the room, not grading)</summary>

- **Q1:** **B.** `==` coerces the string `"0"` to the number `0` before comparing, so it's `true`; `===` compares type and value together and never coerces, so a number and a string are unequal → `false`. A is wrong (no rounding is involved). C is wrong (`===` works on any types; it just requires them to match). D is wrong: this is intended coercion behavior, not a bug (the `typeof null === "object"` quirk is the actual "bug" mentioned in the chapters).
- **Q2:** Any three of: `false`, `0`, `""` (empty string), `null`, `undefined`, `NaN`. Accept close variants like "empty string" for `""`. All six is a bonus, not required.
- **Q3 (open-ended, what to listen for):** A solid answer notes that `let` and `const` are **block-scoped** (they live only inside the `{ }` that declares them), while `var` is **function-scoped** and **hoisted**, so a `var` declared inside an `if` or loop "escapes" the block. Bonus points for mentioning that this escaping/hoisting is error-prone and that `const` should be the default, with `let` only when the value needs to change. Don't require exact terminology; the idea of "predictable, contained scope vs. leaking out" is what matters.

**Muddiest Point / Connect It:** Common muddy spots for this module are `==` vs `===` and coercion, the falsy list (especially that `""`, `0`, and `NaN` are falsy), `var` vs `let`/`const` scope, value vs reference copying, and `for...of` vs `for...in`. The Connect-It answers signal whether learners are anchoring JavaScript's dynamic typing against a statically typed background, so watch for surprise that a variable's type isn't fixed, which is exactly the flexibility (and footgun) TypeScript later addresses.

</details>

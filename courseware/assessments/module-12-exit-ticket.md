# Module 12 Exit Ticket: TypeScript

**Module 12** · Adding a static type layer on top of JavaScript: annotations, `any`/`unknown`, interfaces vs. type aliases, narrowing with type guards, discriminated unions, classes, generics, and utility types.
**~5 minutes · Not graded · Anonymous is fine**

> No wrong feelings here. This is just a quick gut-check so we know what landed and what to circle back on. Answer from memory; it only takes a few minutes.

## Quick Recap (3 questions)

1. **(multiple choice)** JavaScript is *dynamically* typed and TypeScript is *statically* typed. What does that difference actually mean?
   - A) TypeScript runs faster because types make the code smaller.
   - B) TypeScript checks types *ahead of time*, before the program runs, while JavaScript only discovers type problems at runtime.
   - C) TypeScript types stay in the code and are enforced by the browser at runtime.
   - D) TypeScript variables can freely change type, but JavaScript variables cannot.

2. **(short answer)** You have a value typed `string | number`. Before you can safely call a string-only method like `.toUpperCase()` on it, what do you have to do first, and what is one way to do it in code?

3. **(explain in your own words)** Why do generics (`<T>`) exist? What problem do they solve that using `any` does not?

## Muddiest Point

- What's the one thing from this module that's still fuzzy? (Type annotations, interfaces, narrowing / type guards, discriminated unions, generics, utility types, or anything else.)

## Connect It

- Think about a typed language you already know. How does its type system compare to TypeScript's, where types are written during development, *erased* before runtime, and the actual program that runs is still plain JavaScript?

<details><summary><strong>Instructor Answer Key</strong> (formative, for reading the room, not grading)</summary>

- **Q1:** **B.** Static typing means types are checked ahead of time, before the code runs; dynamic (JavaScript) checks at runtime. A is wrong: types don't make code faster or smaller and are erased before runtime. C is wrong: types are erased; browsers/Node run plain JS and never see them. D reverses the two, because it's *dynamic* JavaScript that lets a variable change type freely.
- **Q2:** You must **narrow** it, proving which type it is with a **type guard** before using a type-specific member. One way: `if (typeof value === "string") { value.toUpperCase() }` (also `instanceof`, the `in` operator, or a truthiness check). Inside the guard TypeScript refines the type, so the member is guaranteed to exist. Accept any one valid guard; the key idea is *check first, then use*.
- **Q3 (open-ended, what to listen for):** A solid answer names both sides of the trade-off: generics give **reuse across many types** *while keeping type safety*. `any` also allows reuse but throws away all checking (the return type is unknown, so mistakes crash at runtime). Bonus if they mention `T` is a placeholder the caller/inference fills in, or cite containers like `Box<T>`/`Stack<T>`/`Array<T>`.

**Muddiest Point / Connect It:** Common muddy spots are the `any` vs. `unknown` distinction, when to pick an `interface` vs. a `type` alias (structural/shape overlap), why generics need `<T>` at all, and when to reach for a utility type instead of hand-writing a variant. On Connect It, listen for whether learners grasp that TypeScript's types are a *development-time* layer that disappears at runtime, unlike many compiled languages where types persist and drive execution, since that "types are erased" idea is the one that most often surprises people coming from another typed language.

</details>

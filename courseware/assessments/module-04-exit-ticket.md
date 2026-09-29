# Module 4 Exit Ticket: Classes, this & Error Handling

**Module 4** · Building objects with classes (fields, methods, encapsulation, inheritance), how `this` is decided by call site vs. lexically, handling errors with `try`/`catch`/`finally`, and the function-constructor-and-prototype machinery underneath `class`.
**~5 minutes · Not graded · Anonymous is fine**

> No pressure. This is just a quick gut-check so we both know what stuck and what could use another pass. Half-formed thoughts are welcome; jot down whatever comes to mind.

## Quick Recap (3 questions)

1. **(multiple choice)** Given a regular `function` (not an arrow), what decides the value of `this` when it runs?
   - A) Where the function was written (the surrounding scope it was defined in)
   - B) How the function is called: the call site (e.g. `obj.method()` vs. a bare `fn()`)
   - C) The name of the function, since capitalized names always get a fresh `this`
   - D) `this` is always the global object for every regular function

2. **(short answer)** In a `try` / `catch` / `finally` block, what is the `finally` block for, and when does it run?

3. **(explain in your own words)** The chapters say `class` is "syntax sugar" over function constructors and prototypes. Explain what the prototype chain is and how JavaScript uses it when you access a method like `alice.greet()`.

## Muddiest Point

- What's the one thing from this module that's still fuzzy? (`this`, prototypes, private `#` fields, error handling, or anything else.)

## Connect It

- In an object-oriented language you already know, methods and inheritance are usually defined by the class itself. In JavaScript, `class` is really constructors + a shared `prototype` object underneath, and `this` isn't fixed to the object, because a regular function's `this` changes based on how it's called. How does that compare to how `this`/`self` and method dispatch work in a language you know well?

<details><summary><strong>Instructor Answer Key</strong> (formative, for reading the room, not grading)</summary>

- **Q1:** **B.** For a regular `function`, `this` is decided by the call site: `obj.method()` makes `this` the object, while a bare `fn()` (or a callback the caller invokes) gives global/`undefined`. A describes the *arrow function* rule (lexical `this`), not regular functions. C is wrong: the capital-letter convention is just a visual reminder for constructors and doesn't affect `this`. D is wrong: a method call points `this` at the object, so it isn't always global.
- **Q2:** `finally` runs **no matter what**, whether the `try` succeeded or a `catch` (error) happened. It's the natural home for cleanup (resetting a flag, closing a resource, hiding a spinner). Accept close variants: "always runs," "runs on both success and failure." The key idea is *unconditional* execution, not "only on error."
- **Q3 (open-ended, what to listen for):** A solid answer describes that when you access a property, JavaScript looks on the object itself first; if it's not there, it follows the hidden link to the object's prototype, then that prototype's prototype, and so on until it's found or the chain ends at `null`. For `alice.greet()`, `greet` isn't an own property of `alice`, so the lookup finds it on `Person.prototype`, one shared copy for all instances. Bonus: data lives on the instance, behavior on the prototype; `class` methods land on `ClassName.prototype`; built-ins like `toString` come from further up (`Object.prototype`). Don't require exact terms; "it walks up a chain of parents looking for the method" is the core idea.

**Muddiest Point / Connect It:** Common muddy spots for this module are call-site vs. lexical `this` (especially why a callback loses the outer `this` and how arrow functions fix it), the prototype chain and how `class` maps onto constructors/prototypes, `#` private fields vs. public fields, and matching async error handling (`.catch` for Promises vs. `try`/`catch` in `async` functions). The Connect-It answers signal whether learners are mapping JavaScript's prototype-and-call-site model against a more rigid class-based background, so watch for surprise that `this` isn't permanently bound to the instance, which is exactly the confusion arrow functions and `.bind` exist to tame.

</details>

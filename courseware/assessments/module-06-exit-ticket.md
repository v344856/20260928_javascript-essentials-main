# Module 6 Exit Ticket: JavaScript Modules

**Module 6** · Splitting JavaScript across files with `import` / `export`: static vs. dynamic loading, and how modules run in the browser and in Node.js.
**~5 minutes · Not graded · Anonymous is fine**

> No wrong answers to worry about here. This is just a quick gut-check so we know what landed and what to revisit. Answer from memory; a fuzzy answer is useful signal, not a mistake.

## Quick Recap (3 questions)

1. **(multiple choice)** Which statement about **static** `import` / `export` is correct?
   - A) They can appear anywhere: inside a function, an `if`, or a loop.
   - B) They must sit at the **top level** of a module, so the module structure is known before the code runs.
   - C) A module may have as many `export default` statements as it likes.
   - D) `import()` written as a function call is the normal way to write a static import.

2. **(short answer)** In one or two sentences, how does a **dynamic** `import()` differ from a static `import`, what does `import()` return, and where in your code are you allowed to call it?

3. **(explain in your own words)** Why do modules exist? What problem with putting everything in one file (or many files sharing one global scope) do they solve?

## Muddiest Point

- What's the one thing from this module that's still fuzzy? (Import/export syntax, ESM vs CommonJS, dynamic `import()`, `<script type="module">` vs Node's `"type": "module"`, or anything else.)

## Connect It

- Think of a language you already know that has modules, packages, or imports (Python `import`, Java `import` / packages, C# `using`, Go packages, Ruby `require`...). What's one way JavaScript's `import` / `export` feels familiar, and one way it works differently from what you're used to?

<details><summary><strong>Instructor Answer Key</strong> (formative, for reading the room, not grading)</summary>

- **Q1:** **B.** Static `import` / `export` are top-level only, which is exactly what makes them "static": the full module structure is fixed at parse time, before any code runs. A is wrong (that describes dynamic `import()`); C is wrong (a second `export default` is a syntax error, since there is only one default per module); D is wrong (`import()` as a function call is *dynamic* import, not static).
- **Q2:** Static `import` is a top-level declaration resolved before the code runs; dynamic `import()` is a **function call** that runs at runtime, returns a **promise** (resolving to the module namespace object), and can appear **anywhere**, including inside functions, conditionals, or event handlers, so you can load code on demand. Accept close variants: "returns a promise / is async," "used with `.then()` or `async/await`," "lets you load lazily/conditionally."
- **Q3 (open-ended, what to listen for):** A solid answer touches on any of: each module has its **own scope** (no accidental globals / no name collisions), **explicit dependencies** stated up front via `import`, **reuse** without copy-pasting, and better **tooling** (editors, bundlers, TypeScript can follow declared dependencies). No single wording is required, and "keeps things private and organized" counts.

**Muddiest Point / Connect It:** Common muddy spots are static vs. dynamic (declaration up front vs. `import()` promise at runtime) and the environment setup difference: the browser uses `<script type="module">` while Node needs `"type": "module"` or an `.mjs` extension, and Node also carries the older CommonJS (`require`) system. On Connect It, listen for whether learners map JS named/default exports onto their prior language's imports; a frequent surprise is that JS default imports can be renamed freely and that static imports are top-level only (unlike, say, a `require` call they can drop anywhere).

</details>

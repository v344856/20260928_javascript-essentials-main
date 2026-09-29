# Module 1 Exit Ticket: Getting Started

**Module 1** · What JavaScript and ECMAScript are, setting up Node.js and VS Code, wiring up ESLint and Prettier, and the basics of debugging.
**~5 minutes · Not graded · Anonymous is fine**

> No wrong answers to worry about here. This is just a quick gut-check so we can see what landed and what to revisit. Answer from memory; it only takes a few minutes.

## Quick Recap (3 questions)

1. **(multiple choice)** What is the relationship between ECMAScript and JavaScript?
   - A) ECMAScript is a slower, older version of JavaScript that has been replaced
   - B) ECMAScript is the written standard (specification), and JavaScript is the language you actually write as an implementation of it
   - C) JavaScript is the standard, and ECMAScript is Google's browser-specific version
   - D) They are two unrelated languages that happen to share a name

2. **(short answer)** Name the two dev-dependency tools this module sets up for code quality and formatting, and say which one catches likely bugs/bad practices versus which one enforces a consistent appearance.

3. **(explain in your own words)** When a bug shows up, why might you reach for a breakpoint and step through the code (in DevTools or VS Code) instead of just adding more `console.log` lines? Explain what stepping through gives you that printing does not.

## Muddiest Point

- What's the one thing from this module that's still fuzzy? (A tool, a term, why a step matters, or anything else.)

## Connect It

- Think about the language and toolchain you already know. How does getting JavaScript running (installing Node.js, opening a folder in VS Code, adding ESLint/Prettier, setting breakpoints) compare to the runtime, linter/formatter, and debugger you're used to elsewhere? What felt familiar, and what felt different?

<details><summary><strong>Instructor Answer Key</strong> (formative, for reading the room, not grading)</summary>

- **Q1:** **B.** ECMAScript (ES), maintained by TC39, is the specification; JavaScript is the implementation you write. A is wrong: ES editions are the *current* standard, ship yearly (ES2015 through ES2026), and aren't a replaced language. C reverses the roles and invents a "Google version" (V8 is Google's *engine*, not a language variant). D is wrong: they're the same thing at two levels (spec vs. implementation), not unrelated.
- **Q2:** **ESLint** (the linter, which catches likely bugs and bad practices, e.g. unused variables) and **Prettier** (the formatter, which enforces consistent appearance: indentation, quotes, spacing, line length). Accept close variants like "ESLint = code quality, Prettier = style/formatting"; both tools named correctly and matched to the right job is a full answer.
- **Q3 (open-ended, what to listen for):** A solid answer touches on being able to *pause* execution and *inspect* live state without editing the code: reading the Scope/Variables panel to see every variable's value, using Watch for specific expressions, and following the Call Stack to see how the code got there. Bonus if they mention step over/into/out or that you avoid littering (and later removing) print statements. There's no single right wording.

**Muddiest Point / Connect It:** Expect common muddy spots around the ECMAScript-vs-JavaScript-vs-engine distinction, why ESLint and Prettier are *separate* tools that "stay in their lanes," flat config (`eslint.config.js`) vs. `.prettierrc`, and the mechanics of getting a Node breakpoint going (F5 / `launch.json`). Connect-It answers signal how learners are mapping JS tooling onto their prior experience. Most will find the linter/formatter/debugger concepts familiar (they've used equivalents), so listen for where the *specifics* differ (Node as the runtime, npm dev dependencies, the browser console) so you know what to reinforce.

</details>

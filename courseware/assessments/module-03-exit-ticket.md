# Module 3 Exit Ticket: Arrays and Functions

**Module 3** · Ordered lists with arrays and their methods, defining and calling functions, destructuring with rest/spread, and closures.
**~5 minutes · Not graded · Anonymous is fine**

> No pressure here. This is just a quick gut-check to see what landed and what we should revisit together. Jot down what comes to mind.

## Quick Recap (3 questions)

1. **(multiple choice)** You have `const nums = [1, 2, 3]` and want a **brand-new array** holding each number doubled, without changing `nums`. Which method fits?
   - A) `forEach`: runs a function per item but returns nothing
   - B) `map`: builds a new array from the transformed values
   - C) `filter`: keeps only items that pass a true/false test
   - D) `push`: adds an item to the end of the array

2. **(short answer)** Arrays are indexed starting at 0. Given an array named `fruits`, what expression gives you the index of the **last** item?

3. **(explain in your own words)** In a sentence or two, what is a closure, and why is it useful (for example, for keeping state private)?

## Muddiest Point

- What's the one thing from this module that's still fuzzy? (A method, destructuring, closures, or anything else.)

## Connect It

- In a language you already know, how do you transform or filter a list, and how do first-class functions or closures show up there (if at all)? How does JavaScript's `map`/`filter`/closure approach compare to what you're used to?

<details><summary><strong>Instructor Answer Key</strong> (formative, for reading the room, not grading)</summary>

- **Q1:** **B.** `map` returns a new array of transformed values and leaves the original untouched. A (`forEach`) runs a function per item but returns `undefined`, so you can't capture a new array. C (`filter`) selects items by a true/false test rather than transforming them. D (`push`) mutates the existing array and returns the new length.
- **Q2:** `fruits[fruits.length - 1]` (the last index is `fruits.length - 1`). Accept close variants such as computing `const lastIndex = fruits.length - 1` first, or just answering `fruits.length - 1` if the question is read as "the last index."
- **Q3 (open-ended, what to listen for):** A solid answer says a closure is a function that remembers (keeps access to) the variables from where it was **defined**, even after that outer function has finished running, thanks to lexical scope. Useful because those remembered variables stay private and persistent (counter, bank balance, cache), reachable only through the functions you expose. Bonus if they mention each call to the outer function creates its own separate remembered value.

**Muddiest Point / Connect It:** Common muddy spots are `map` vs `filter` vs `forEach` (transform vs select vs just-run), rest vs spread sharing the same `...` (rest gathers on the receiving side, spread scatters on the building/calling side), and *why* a closure keeps variables alive, plus the `var`-in-a-loop pitfall that `let` fixes. Connect-It answers signal how much learners can lean on prior experience: developers from Python/Java/C#/Ruby often recognize `map`/`filter` and first-class functions immediately, so you can move faster; if closures or passing functions as values feel new, slow down on the counter and private-state examples.

</details>

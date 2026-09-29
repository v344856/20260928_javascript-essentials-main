# Module 5 Exit Ticket: Asynchronous JavaScript

**Module 5** · How single-threaded JavaScript runs code "later": the event loop, callbacks, promises, running tasks concurrently, async/await, and timers.
**~5 minutes · Not graded · Anonymous is fine**

> No trick questions here. This is just a quick gut-check so we can see what landed and what still feels fuzzy. Answer from memory; a shaky answer is useful signal, not a wrong move.

## Quick Recap (3 questions)

1. **(multiple choice)** Given this code, in what order do the four lines print?

   ```js
   console.log("A");
   Promise.resolve().then(() => console.log("Promise"));
   setTimeout(() => console.log("Timeout"), 0);
   console.log("B");
   ```

   - A) A, B, Promise, Timeout
   - B) A, Promise, B, Timeout
   - C) A, B, Timeout, Promise
   - D) A, Promise, Timeout, B

2. **(short answer)** You have three independent tasks that each take about 1 second. Awaiting them one at a time takes about 3 seconds. How would you make them finish in about 1 second total, and why does that work?

3. **(explain in your own words)** In a few sentences, why does asynchronous code (like a `setTimeout` callback or a `.then` handler) run *later* instead of right where it appears in the source? Bring in the call stack and the event loop if you can.

## Muddiest Point

- What's the one thing from this module that's still fuzzy? (The event loop, the task vs. microtask queues, promises, running tasks concurrently, async/await, timer drift, or anything else.)

## Connect It

- In a language you already know, how does its concurrency or async model (threads, goroutines, `async`/`await`, futures, an event loop of its own) compare to JavaScript's single thread + event loop? What surprised you most about "one thing at a time"?

<details><summary><strong>Instructor Answer Key</strong> (formative, for reading the room, not grading)</summary>

- **Q1:** **A**, meaning A, B, Promise, Timeout. The two synchronous `console.log`s run first (A, then B). When the current script finishes, the event loop drains **all microtasks** before the next task, so the promise handler (microtask) runs before the `setTimeout` callback (macrotask), even at 0 ms. B is wrong because `B` is synchronous and can't wait behind the promise; C is wrong because it flips microtask/macrotask priority; D is wrong on both counts.
- **Q2:** Start all three **at once** and wait for the group, e.g. `await Promise.all([a(), b(), c()])` (or kick them all off, then await). Because the tasks are independent, they run **concurrently**, so the total time is the **slowest** one (~1 s), not the **sum** (~3 s). What listeners should land: awaiting one-at-a-time serializes independent work needlessly; `Promise.all` overlaps it. Accept `Promise.allSettled` if they add "and I want every result even if one fails."
- **Q3 (open-ended, what to listen for):** A solid answer touches on: JavaScript is single-threaded and runs code on the call stack one thing at a time; features like timers, network, and DOM events come from the host environment, not the language; when async work is ready its callback is placed on a queue; the event loop only pulls from the queue once the call stack is empty, so the callback runs "later," after the current synchronous code finishes. Bonus for mentioning microtasks (promises) running before macrotasks (timers).

**Muddiest Point / Connect It:** The most common muddy spots are queue ordering (why a promise beats a `setTimeout(…, 0)`) and the idea that a timer delay is a *minimum, not a guarantee*, because blocking synchronous work pushes callbacks later. Also watch for confusion that `async/await` is a new mechanism rather than "nice syntax for promises" on the same microtask queue. Connect-It answers signal each learner's mental model: people coming from multi-threaded languages often expect true parallelism and are surprised that heavy synchronous work freezes *everything*; that surprise is exactly the hook for reinforcing "keep the main thread free."

</details>

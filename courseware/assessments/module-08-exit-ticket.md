# Module 8 Exit Ticket: Browser APIs

**Module 8** · Making HTTP requests with the promise-based Fetch API and reading the user's location with the Geolocation API.
**~5 minutes · Not graded · Anonymous is fine**

> No wrong feelings here. This is just a quick gut-check so we can see what landed and what's still cloudy. Answer from memory; it's totally fine to be unsure.

## Quick Recap (3 questions)

1. **(multiple choice)** You call `fetch("https://api.example.com/users")`. What does that call give you back?
   - A) The parsed JSON data, ready to use
   - B) A promise that resolves to a `Response` object
   - C) The raw text of the response body as a string
   - D) Nothing: fetch only works inside a `.then()` callback

2. **(short answer)** After a `fetch(...)` promise resolves to a `Response`, what do you call to read the JSON body, and why can't you use the result immediately on the next line?

3. **(explain in your own words)** Why does the Geolocation API always ask the user for permission (and require a secure context like HTTPS or `localhost`) before handing your code a latitude and longitude?

## Muddiest Point

- What's the one thing from this module that's still fuzzy? (fetch, promises with fetch, `response.ok` and HTTP errors, geolocation callbacks, permissions, or anything else.)

## Connect It

- Think about how you make an HTTP call or do async I/O in a language you already know. How does that compare to fetch's promise-based, two-step flow (get the `Response`, then `await response.json()`)? What feels familiar, and what feels different?

<details><summary><strong>Instructor Answer Key</strong> (formative, for reading the room, not grading)</summary>

- **Q1:** **B.** `fetch(url, options?)` returns a promise that resolves to a `Response` object. A is wrong because the data isn't parsed yet; that's a second async step (`response.json()`). C is wrong for the same reason; you don't get the body as a string automatically. D is wrong because fetch returns a promise usable with either `.then()` or `async/await`.
- **Q2:** Call **`response.json()`**. Accept close variants like "await response.json()" or "chain another `.then()` on it." The key idea: reading the body is *also* asynchronous, because `response.json()` returns its own promise, so you must `await` it (or `.then()` it) rather than using its value on the next line.
- **Q3 (open-ended, what to listen for):** A solid answer touches on location being **sensitive/private** data, so the browser puts the user in control by prompting for Allow/Block, and the API is restricted to secure contexts (HTTPS or `localhost`) to protect that data. Bonus if they mention `PERMISSION_DENIED` firing when the user declines or the page isn't on HTTPS. There's no single perfect wording.

**Muddiest Point / Connect It:** The most common muddy spot is fetch's **two-step promise flow**: that `fetch()` resolving does *not* mean you have the data yet, and that fetch **doesn't throw on 404/500**, so you must check `response.ok` yourself. Geolocation's async **callback** style (success/error callbacks, not a promise) also trips people up. Connect-It answers that map fetch onto a language they know (blocking HTTP clients, futures/promises, callbacks) signal they're integrating the mental model rather than memorizing syntax.

</details>

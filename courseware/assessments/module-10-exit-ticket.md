# Module 10 Exit Ticket: JavaScript and Forms

**Module 10** · Handling form submissions in JavaScript, validating input with plain checks and regular expressions, and packaging fields with the `FormData` object to send to a server.
**~5 minutes · Not graded · Anonymous is fine**

> No wrong answers here. This is just a quick gut-check to see what stuck and what's still fuzzy. A minute of honesty now saves you debugging time later.

## Quick Recap (3 questions)

1. **(multiple choice)** Inside a form's `submit` handler, what does `event.preventDefault()` do?
   - A) Clears every field back to its default values
   - B) Stops the browser's default page reload and server submission so your JavaScript can handle the data
   - C) Validates all the fields automatically before submitting
   - D) Sends the form data to the server using `fetch`

2. **(short answer)** You have `const data = new FormData(form)`. Write the one line of code that reads the value of the field named `"email"` from it.

3. **(explain in your own words)** The chapter says client-side validation is "for user experience, not security." In your own words, why isn't checking input in the browser enough to trust the data, and what should you always do as well?

## Muddiest Point

- What's the one thing from this module that's still fuzzy? (Submit handling, regex, FormData, or anything else.)

## Connect It

- Think about a language or framework you already know. How did you handle form input or validate user data there (server-side checks, validation libraries, request objects), and how does that compare to intercepting the `submit` event, testing a regex, and building a `FormData` in the browser?

<details><summary><strong>Instructor Answer Key</strong> (formative, for reading the room, not grading)</summary>

- **Q1:** **B.** `event.preventDefault()` cancels the browser's default behavior (reloading the page and sending data to the form's `action`) so your code can read and act on the data instead. A is `form.reset()`; C doesn't happen automatically, since you write the validation; D is done with `fetch`, a separate step.
- **Q2:** `data.get("email")` (returns the value, or `null` if there's no such field). Accept close variants like assigning it to a variable, e.g. `const email = data.get("email");`. `getAll("email")` is not wrong conceptually but returns an array, so for a single value `get` is the expected answer.
- **Q3 (open-ended, what to listen for):** A solid answer notes that anything running in the browser can be bypassed or tampered with by a determined user (dev tools, disabling JS, crafting requests directly), so browser-side checks only improve UX with instant feedback. The key takeaway: always re-validate on the server before saving or acting on the data.

**Muddiest Point / Connect It:** Common muddy spots are (1) forgetting `preventDefault()` and wondering why the page reloads, (2) regex syntax, especially anchors `^...$`, `\d`/`\w`/`\s`, and quantifiers, and (3) `FormData` details like `get` vs `getAll`, that unchecked checkboxes and unnamed fields are skipped, and that you must NOT set `Content-Type` yourself when POSTing a `FormData`. Connect-It answers signal how learners are mapping familiar server-side or library-based validation onto the browser's event-driven, regex-and-`FormData` approach.

</details>

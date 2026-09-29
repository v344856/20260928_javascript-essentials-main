# Module 7 Exit Ticket: The DOM

**Module 7** · Reaching into the page from JavaScript: the `window`, `document`, and `location` objects, selecting and manipulating elements, handling events, and styling from code.
**~5 minutes · Not graded · Anonymous is fine**

> No trick questions here. This is just a quick gut-check so we can see what landed and what still feels fuzzy. Answer from memory; a shaky answer is useful signal, not a wrong move.

## Quick Recap (3 questions)

1. **(multiple choice)** You want to grab **every** element on the page that has the class `todo` and loop over them with `forEach`. Which line does that?

   - A) `document.getElementById('todo')`
   - B) `document.querySelector('.todo')`
   - C) `document.querySelectorAll('.todo')`
   - D) `document.querySelector('#todo')`

2. **(short answer)** Both `querySelector` and `getElementById` can fetch a single element by its id. Name one difference between them, for example in what you pass as the argument, or in how many elements each is designed to return.

3. **(explain in your own words)** In a couple of sentences, what does it mean for a click event to "bubble"? What does event **delegation** let you do by taking advantage of bubbling?

## Muddiest Point

- What's the one thing from this module that's still fuzzy? (Selecting elements, events, styling, or anything else.)

## Connect It

- In a UI framework or toolkit you've used in another language (think Swing, Qt, WPF, Android views, or anything similar), how did you find a widget and respond to a button press? How does that compare to `querySelector` + `addEventListener` here?

<details><summary><strong>Instructor Answer Key</strong> (formative, for reading the room, not grading)</summary>

- **Q1:** **C.** `querySelectorAll('.todo')` returns a NodeList of *all* matches, and a NodeList supports `.forEach`. A is wrong because `getElementById` takes a bare id string (no `.`/`#`) and returns at most one element; B and D use `querySelector`, which returns only the *first* match, and D also uses an id selector (`#`) rather than a class.
- **Q2:** Any one real difference is fine. The cleanest answers: `querySelector` takes a full **CSS selector** (so an id needs the `#` prefix, e.g. `'#main-title'`), while `getElementById` takes just the **bare id string** (no `#`). Also acceptable: `querySelector` can match by id, class, tag, or any selector and returns the first match, whereas `getElementById` only matches by id. Accept close variants that capture the selector-vs-plain-string idea.
- **Q3 (open-ended, what to listen for):** A solid answer touches on: after an event fires on the element that was actually clicked (the target), it travels back **up** through that element's ancestors (target → parent → ... → `document`), so listeners on containers also hear it; that upward travel is "bubbling." Delegation puts **one** listener on a shared parent instead of one on every child, then uses `event.target` (often with `.closest()`) to figure out which child was involved. Bonus for noting it automatically covers items added to the DOM later and uses less memory.

**Muddiest Point / Connect It:** Common muddy spots for the DOM are: `querySelector` (first match) vs. `querySelectorAll` (all matches) and the `#`/`.` prefix rules; `textContent` (safe, literal text) vs. `innerHTML` (parses markup, and the XSS risk with untrusted input); and why you can't `removeEventListener` an anonymous function (you need the same function reference you added). For styling, watch for confusion between inline `element.style` and toggling classes with `classList`, since the chapters push `classList` as the default. Connect-It answers signal each learner's mental model: people from retained-mode UI toolkits usually recognize "find a widget, attach a callback" quickly, so the newer wrinkles are CSS-selector-based lookup and event bubbling/delegation rather than the basic find-and-listen idea.

</details>

# Activity: RSVP Guest List

Same concepts as the demo (form events, event delegation, and styling from JavaScript), applied to a party RSVP list instead of a color picker. You will add guests through a form, then mark them arrived with a single delegated click listener that also restyles the row.

**Estimated time:** 15-20 minutes

## Setup

Your working files are in `end/`. Open `end/index.html` and complete the TODOs in the `<script>`.
Run `npm install` once, then `npm start` to serve the page (open DevTools console, F12).
`npm run solution` serves the reference.
The finished reference solution is in `solution/`.

> This is a browser activity, so the results are what you see on the page and in the DevTools console, not terminal output.

This folder is its own project: run `npm install` once,
then `npm run format` formats it with the Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: Handle the submit event

Add a `submit` listener to the form and call `event.preventDefault()` first, so the browser does not reload the page.

### Task 2: Add the guest

Read the field through `rsvpForm.elements['guest']` and `trim()` it. When it is not empty, create an `<li>`, set its `textContent` to the name, stamp an id onto it with `listItem.dataset.id`, append it to the list, and clear the input.

### Task 3: Update the count

Set `countSpan.textContent` to the number of `<li>` elements in the list. Adding three guests should show `3`.

### Task 4: One delegated listener

Add a **single** `click` listener to the `<ul>`, not one per guest. Return early unless `event.target.tagName` is `'LI'`, then log `event.target` and `event.currentTarget` side by side to see the difference. Because the listener lives on the parent, guests you add *after* it was attached are handled too.

### Task 5: Toggle a class

Use `classList.toggle('arrived')` to strike the guest through, and `classList.add('rounded')` for the corner. Log `classList.contains('arrived')` to confirm the state.

### Task 6: Inline style, then computed style

Set `guest.style.backgroundColor` to `'#f5f5f5'` (note the camelCase, because `background-color` will not work) and log it back. Then log `getComputedStyle(guest).padding` to see the final value the browser actually applied from the stylesheet.

## What You'll Learn

- Handling `submit` and stopping the browser's default with `preventDefault()`.
- Reading form fields through `form.elements`.
- Building elements with `createElement` / `textContent` / `appendChild` and stamping data onto them with `dataset`.
- Event delegation, with one listener on the container serving items added later.
- Why `event.target` and `event.currentTarget` differ, and why that difference is what makes delegation work.
- Restyling with `classList` (`add`/`toggle`/`contains`) versus inline `.style`.
- Reading the browser's final applied values with `getComputedStyle`.

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Give each guest a small "remove" button inside its `<li>`, and extend the *same* delegated listener to handle it: check whether `event.target` is the button (rather than the `<li>`) and remove the whole row with `.remove()`. Keep the guest count in sync, and make sure clicking the button does not also toggle "arrived" on the row behind it.

On the page, each guest should gain an × button; clicking it removes that row and decrements the count, while clicking the name still toggles the strike-through.

## Related reading

- [DOM Event Handling](../../docs/Module-07-The-DOM/06-dom-event-handling.md)
- [Manipulating Elements](../../docs/Module-07-The-DOM/05-dom-manipulating-elements.md)
- [Element Styling with JavaScript](../../docs/Module-07-The-DOM/07-dom-element-styling.md)
- Diagram: [The DOM Event Path and Delegation](../../diagrams/png/dom-event-path.png)

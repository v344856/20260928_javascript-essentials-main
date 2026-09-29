# Activity: Reading List Dashboard

Same concepts as the demo (`window`, `location`, and selecting DOM elements), applied to a personal reading list instead of a list of colors. You will read the browser environment, parse the URL's query string, then grab elements a few different ways and add a new book to the page.

**Estimated time:** 15-20 minutes

## Setup

Your working files are in `end/`. Open `end/index.html` and complete the TODOs in the `<script>`.
Run `npm install` once, then `npm start` to serve the page (open DevTools console, F12).
`npm run solution` serves the reference.
The finished reference solution is in `solution/`.

> Browser output goes to the DevTools console, so the outputs below are what you should see there, though your viewport numbers and path will differ.

This folder is its own project: run `npm install` once,
then `npm run format` formats it with the Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: Read the window

Log the viewport with `window.innerWidth` and `window.innerHeight`. Then declare a top-level `var siteName = 'My Reading List'` and log `window.siteName`; a top-level `var` becomes a property of `window` (a `let` or `const` would not).

### Task 2: Persist a value

Use `window.localStorage.setItem` to store `visitCount` as `'1'`, then read it back with `getItem` and log it.

### Task 3: Parse the URL

Log `location.pathname`. Then build a `URLSearchParams` from `location.search` and use `get('view')` and `has('debug')` to read the query string. Add `?view=unread&year=2026` to the URL and reload to see them change.

### Task 4: Select the list and count its items

Select the `<ol>` by its id `reading-list` and log it. Then use `getElementsByTagName('li')` to count how many books are in the list.

**Expected output:**
```
Total books: 3
```

### Task 5: Count the finished books, two ways

Use `getElementsByClassName('finished')` to count the finished books, then count them again with `document.querySelectorAll('#reading-list .finished')`. Both should agree.

**Expected output:**
```
Finished books: 1
Finished (querySelectorAll): 1
```

### Task 6: Add a book

Create a new `<li>` with `createElement`, give it the class `book`, set its `textContent` to `"Refactoring"`, and append it to the list with `appendChild`. Then re-count.

**Expected output:**
```
Books after adding: 4
```

### Task 7: Find the nearest library

`navigator.geolocation` is another `window` API, but the first **asynchronous** one you have met: it cannot return a value, because the browser has to ask the user first. So it takes callbacks instead.

On click of `#locate`, set the status to `"Locating…"`, then call `navigator.geolocation.getCurrentPosition` with three arguments:

- a **success callback** that reads `position.coords.latitude` / `longitude`, passes them to the provided `kmBetween(...)` helper along with `LIBRARY`, and writes `"Central Library is 12.3 km away"` (one decimal);
- an **error callback** that writes `"unavailable (<message>)"`. Always supply this, because a user declining the prompt is an expected outcome, not a bug. Use `console.warn`, not `console.error`;
- an **options object** with `{ timeout: 10000 }`.

The browser will prompt for permission the first time. Accept it to see a distance; decline it to exercise your error callback.

## What You'll Learn

- Reading the browser environment through `window`: viewport, globals, and `localStorage`.
- Why a top-level `var` lands on `window` but `let`/`const` do not.
- Breaking the current URL apart with `location` and `URLSearchParams`.
- Selecting elements by id, tag name, and class name.
- The difference between a single element and an HTMLCollection (using `.length`).
- Using `querySelectorAll` with a CSS selector as the modern alternative.
- Creating and appending a new element with `createElement` / `textContent` / `appendChild`.
- Calling an **asynchronous** browser API that takes success and error callbacks instead of returning a value.
- Reading `position.coords`, and why the error callback and a `timeout` are not optional.
- Why geolocation requires user permission and a secure context (https or `localhost`).

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Make the page respond to the URL: when `?view=unread` is present, hide every `<li class="book finished">` by setting its `style.display` to `"none"`; when `?view=all` (or nothing) is present, show them all. Read the parameter you already parsed in Task 3, and loop the elements you already selected in Task 5.

On the page, loading `?view=unread` should leave only the two unread books visible, and reloading without the parameter should bring all four back.

## Related reading

- [The Window Object](../../docs/Module-07-The-DOM/01-dom-window-object.md)
- [The Location Object](../../docs/Module-07-The-DOM/03-dom-location-object.md)
- [Selecting Elements in the DOM](../../docs/Module-07-The-DOM/04-dom-selecting-elements.md)
- [The Geolocation API](../../docs/Module-08-Browser-APIs/02-browser-geolocation.md)
- Diagram: [The DOM Tree](../../diagrams/png/dom-tree.png)
- Diagram: [Page and Script Lifecycle](../../diagrams/png/page-and-script-lifecycle.png)

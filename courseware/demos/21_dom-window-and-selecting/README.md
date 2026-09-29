# 21. The window, the location, and Selecting Elements

The browser's entry points, in one page. **`window`** is the global object: the viewport dimensions, the fact that a top-level `var` becomes a property of it, `navigator`, `localStorage`, and the timers that are really `window` methods. **`location`** breaks the current URL into `href`, `protocol`, `host`, `pathname`, and `search`, with `URLSearchParams` parsing the query string (the navigation calls are left commented out so the demo stays put). **`document`** then finds elements three classic ways (`getElementById`, `getElementsByTagName`, `getElementsByClassName`) alongside the modern `querySelector`/`querySelectorAll`, and creates an `<li>`, fills it with `textContent`, and attaches it with `appendChild`. It closes on **`navigator.geolocation`**: another `window` API, but the first *asynchronous* one in the course, because it cannot return a value while the browser has to prompt the user, so it takes success and error callbacks instead. That makes it a natural bridge to the async day.

## Run

```bash
npx http-server -o
```

Open the browser DevTools console (press **F12**) to see the logged output. Try appending `?tab=books&sort=title` to the URL and reloading to watch `location.search` and `URLSearchParams` change.

This folder is its own project: run `npm install` once,
then `npm run format` formats it with the Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- `window` as the browser's global object, and why `window.` is usually optional.
- That a top-level `var` becomes a `window` property while `let`/`const` do not.
- Reading the environment through `window.navigator` and persisting strings in `localStorage`.
- Breaking the current URL apart with `location`, and parsing the query string with `URLSearchParams`.
- Selecting by id, tag name, and class name, and the difference between one element and an HTMLCollection you must index.
- `querySelector`/`querySelectorAll` taking any CSS selector as the modern default.
- Creating and attaching a new element with `createElement` / `textContent` / `appendChild`.
- `navigator.geolocation.getCurrentPosition` taking **success and error callbacks** rather than returning a value.
- Reading `position.coords` (`latitude`, `longitude`, `accuracy`) and the options object (`timeout`, `enableHighAccuracy`).
- Why geolocation needs explicit user permission and a secure context (https or `localhost`).
- Why the error callback is not optional: a user declining the prompt is an expected outcome, not a bug.

## Related reading

- [The Window Object](../../docs/Module-07-The-DOM/01-dom-window-object.md)
- [The Location Object](../../docs/Module-07-The-DOM/03-dom-location-object.md)
- [Selecting Elements in the DOM](../../docs/Module-07-The-DOM/04-dom-selecting-elements.md)
- [The Geolocation API](../../docs/Module-08-Browser-APIs/02-browser-geolocation.md)
- Diagram: [The DOM Tree](../../diagrams/png/dom-tree.png)
- Diagram: [Page and Script Lifecycle](../../diagrams/png/page-and-script-lifecycle.png)

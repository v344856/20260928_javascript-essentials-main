# Activity: Fetch a Book Library

Same concept as the demo (using `fetch` to GET and POST against a `json-server` REST API), applied
to a book library instead of a colors list. You will read the books from the API, render them to
the page, add a new one with POST, and re-render.

**Estimated time:** 10-15 minutes

## Setup

This activity needs a mock REST API running alongside the page. Use **two terminals**.

Run `npm install` once first.

**Terminal 1**, to start the fake REST API (serves `db.json` at http://localhost:3000):
```
npm run api
```

**Terminal 2**, to serve the page (open DevTools console, F12):
```
npm start
```

Your working files are in `end/`. Open `end/index.html` and complete the TODOs in the `<script>`.
`npm run solution` serves the reference. The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run format` formats it with the Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: Fetch all books (GET)

Complete `getBooks()` so it does a `GET` on `http://localhost:3000/books`, awaits `res.json()`, and
returns the array.

### Task 2: Render the list

Complete `render(books)` so it clears `#book-list` and appends one `<li>` per book showing
`"<title> - <author>"`.

**Expected page output on load:**
```
The Hobbit - J.R.R. Tolkien
Dune - Frank Herbert
Neuromancer - William Gibson
```

### Task 3: Add a book (POST) and re-render

Complete `addBook(book)` so it `POST`s the book as JSON (with the `Content-Type: application/json`
header and `JSON.stringify`). The startup code already calls it with a new book, then re-fetches
and re-renders.

**Expected page output after the POST:**
```
The Hobbit - J.R.R. Tolkien
Dune - Frank Herbert
Neuromancer - William Gibson
The Left Hand of Darkness - Ursula K. Le Guin
```

> Note: `json-server` writes new books into `db.json`, so after running it once the list will keep
> growing. Restore `db.json` (e.g. `git checkout db.json`) to reset.

## What You'll Learn

- Calling a REST API with `fetch` (GET and POST) and `await res.json()`
- Sending a JSON body with `Content-Type: application/json` and `JSON.stringify`
- Rendering fetched data into the DOM and re-rendering after a change
- Using `async`/`await` to sequence dependent requests

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

`fetch` does **not** reject on a 404 or a 500; it only rejects when the request itself fails, so a broken URL sails straight into `res.json()` and throws something confusing there instead. Add a `checkedFetch(url, options)` wrapper that inspects `res.ok` and throws a useful `Error` with `res.status` when the response is not successful. Wrap both calls in `try`/`catch` and render the message into the page rather than only the console. Then point `getBooks` at `/nope` on purpose to prove the error path works, and stop the API server to see the difference between an HTTP error and a network failure.

On the page you should see a readable message like `Could not load books: 404 Not Found` instead of a raw JSON parse error in the console.

## Related reading

- [Browser Fetch API](../../docs/Module-08-Browser-APIs/01-browser-fetch-api.md)
- Diagram: [The Fetch Lifecycle](../../diagrams/png/fetch-lifecycle.png)
- Diagram: [The Event Loop](../../diagrams/png/event-loop.png)

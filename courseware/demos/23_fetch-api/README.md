# 23. The Fetch API

A `ColorsData` class (with a private `#baseUrl` field) wraps `fetch` to talk to a REST API: `all()`
does a GET on `/colors` and `create()` does a POST with a JSON body. The page reads the current
colors, creates a new "Purple" color, then re-reads the list, logging each step to the console.
It talks to a `json-server` instance at `http://localhost:3000/colors`.

## Run

This demo needs the REST API running first. Use **two terminals**.

**Terminal 1**, to start the fake REST API (serves the bundled `db.json`):

```bash
npx json-server db.json --port 3000
```

**Terminal 2**, to serve the page:

```bash
npx http-server -o
```

Open the browser DevTools console (press **F12**) to see the fetched colors, the created color, and
the updated list. The page calls `http://localhost:3000/colors`.

> **Worth pointing out in class: this is a cross-origin request.** The page is served from
> `localhost:8080` and calls `localhost:3000`: same machine, same hostname, **different port**, so a
> different origin. It only works because `json-server` sends `Access-Control-Allow-Origin: *` on every
> response. Say so out loud, because the first time students call a real API from their own page and
> get a CORS error, this is the moment they need to remember. See
> [Same-origin policy and CORS](../../docs/Module-08-Browser-APIs/01-browser-fetch-api.md).

This folder is its own project: run `npm install` once,
then `npm run format` formats it with the Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- Calling a REST API with `fetch` (GET and POST) and `await res.json()`
- Encapsulating data access in a class with a private `#baseUrl` field
- Sending a JSON body with `Content-Type: application/json` and `JSON.stringify`
- Chaining `.then()` promises and handling errors with `.catch()`
- A **cross-origin** call that succeeds only because the server opts in with CORS headers

## Related reading

- [Browser Fetch API](../../docs/Module-08-Browser-APIs/01-browser-fetch-api.md)
- Diagram: [The Fetch Lifecycle](../../diagrams/png/fetch-lifecycle.png)
- Diagram: [The Event Loop](../../diagrams/png/event-loop.png)

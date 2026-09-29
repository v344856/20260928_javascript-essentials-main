# Browser Fetch API

The **Fetch API** is the modern way for JavaScript in the browser to make HTTP requests, to talk
to web servers and REST APIs. Because it's built on **promises**, it fits naturally with both the
`.then()` style and `async/await`, so the async patterns you already know carry straight over.

![fetch resolving to a Response, then a second promise for the parsed body, with CORS and abort notes](../../diagrams/png/fetch-lifecycle.png)

*Two promises, not one: the body is a stream, so `.json()` is a second one.*

---

## Basic idea

`fetch(url, options?)` does three things worth committing to memory. It returns a
**promise**, that promise resolves to a `Response` object, and (this is the surprising part) it
does **not** automatically throw on HTTP errors like 404 or 500. A response that came back with an
error status is still a successful fetch as far as the promise is concerned, so it's on you to check
`response.ok` or `response.status` yourself.

---

## GET with promises

The classic `.then()` version chains two promises (one for the response, one for parsing its body)
and checks the status in between:

```js
fetch("https://api.example.com/users")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }
    return response.json(); // parse JSON body
  })
  .then((data) => {
    console.log("Users:", data);
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
```

Notice the two promises at work: `fetch(...)` returns one, and `response.json()` returns another,
which is why the body is parsed in a second `.then()`. The `if (!response.ok)` check is what turns an
HTTP error status (anything outside the 200-299 range) into a real thrown error the `.catch()` can
handle.

---

## GET with async/await

The same logic reads more linearly with `async/await`: the `await` keywords replace the `.then()`
chain, and a `try/catch` replaces the `.catch()`:

```js
async function getUsers() {
  try {
    const response = await fetch("https://api.example.com/users");

    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }

    const data = await response.json();
    console.log("Users:", data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

getUsers();
```

Each `await` pauses the function until its promise settles, and any error, whether it comes from a
network failure or from the `throw` you wrote by hand, lands in the `catch` block. Most people find
this form easier to read once there's more than one step involved.

---

## Reading the response body

`response.json()` is the one you will reach for most, but it is not the only choice. A `Response`
carries the body as a stream, and you pick how to read it:

```js
const response = await fetch(url);

await response.json();   // parse the body as JSON  -> object or array
await response.text();   // read it as a plain string
await response.blob();   // read it as binary data (images, files, downloads)
```

Two things to know about these:

* **They all return promises**, which is why each needs its own `await`. Reading the body is a second
  asynchronous step, separate from the response arriving.
* **You can only read the body once.** The stream is consumed, so calling `response.json()` after
  `response.text()` on the same response throws. If you need the raw text *and* the parsed object,
  read the text and parse it yourself:

```js
const text = await response.text();
const data = JSON.parse(text);   // now you have both
```

Reach for `text()` when the endpoint returns plain text or HTML, or when you want to see exactly what
came back while debugging a `json()` call that is failing.

---

## Common REST operations with fetch

REST APIs map the basic operations (read, create, replace, update, delete) onto HTTP
methods. The examples below assume a typical `/users` API and walk through each method in turn.

### GET (read resources)

A `GET` request reads data and needs no body. Fetching the whole collection looks like this:

```js
fetch("https://api.example.com/users")
  .then((res) => res.json())
  .then((users) => console.log(users));
```

Requesting a single user is the same call with an id on the end of the URL:

```js
fetch("https://api.example.com/users/1")
  .then((res) => res.json())
  .then((user) => console.log(user));
```

---

### POST (create a new resource)

Writing data is where the `options` argument comes in. A `POST` creates a new resource, so you set
the method, declare the body's content type, and send the data as a JSON string:

```js
async function createUser() {
  const newUser = { name: "Alice", email: "alice@example.com" };

  const response = await fetch("https://api.example.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  const created = await response.json();
  console.log("Created user:", created);
}
```

Those three details (`method: "POST"`, the `"Content-Type": "application/json"` header, and a body
turned into a string with `JSON.stringify(...)`) are the pattern for every write. The methods that
follow only change the verb and the URL.

---

### PUT (replace an existing resource)

A `PUT` targets a specific resource by id and, by convention, **replaces the entire resource** with
the object you send:

```js
async function replaceUser(id) {
  const updatedUser = { name: "Bob", email: "bob@example.com" };

  const response = await fetch(`https://api.example.com/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });

  if (!response.ok) {
    throw new Error("Failed to replace user");
  }

  const result = await response.json();
  console.log("Replaced user:", result);
}
```

In short, `PUT` usually means "replace the entire resource."

---

### PATCH (partial update)

Where `PUT` replaces everything, a `PATCH` updates only the fields you send, here just the email:

```js
async function updateUserEmail(id, email) {
  const response = await fetch(`https://api.example.com/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  const result = await response.json();
  console.log("Updated user:", result);
}
```

So `PATCH` usually means "update only these fields."

---

### DELETE (remove a resource)

A `DELETE` removes a resource and often needs nothing but the method and the URL, with no body at all:

```js
async function deleteUser(id) {
  const response = await fetch(`https://api.example.com/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }

  console.log("User deleted, status:", response.status);
}
```

Just be aware that behavior varies by API: some return JSON describing what was deleted, while others
answer `204 No Content` with an empty body.

---

## Same-origin policy and CORS

This is the part of `fetch` that surprises people first, and it is worth meeting before it bites you.

An **origin** is the combination of **scheme + host + port**. All three must match for two URLs to be
the same origin:

```text
https://example.com/a  and  https://example.com/b     same origin
https://example.com    and  http://example.com        different - scheme
https://example.com    and  https://api.example.com   different - host
http://localhost:8080  and  http://localhost:3000     different - PORT
```

That last line matters here, because it describes **this course's own fetch demo**: the page is served
on port `8080` and calls an API on port `3000`. That is the same machine and the same hostname, but a
different origin, because the port is part of the origin.

By default, browsers enforce the **same-origin policy**: JavaScript on your page may not read a
response from another origin. This is a safety rule. Without it, any page you visited could quietly
call your bank's API using cookies your browser is already sending, and read the answer.

**CORS** (Cross-Origin Resource Sharing) is how a server opts in to being called from another origin.
The server adds a response header naming who is allowed:

```text
Access-Control-Allow-Origin: *
```

That header is exactly why the course demo works. The mock API (`json-server`) sends it on every
response, so the browser permits the cross-origin read.

**The three things to remember:**

1. **CORS is enforced by the browser, and granted by the server.** There is no `fetch` option, header,
   or flag you can add on the client to grant yourself permission. If you control the API, add the
   header there. If you do not, you need a proxy on your own origin to make the call for you.
2. **The request usually still happens.** A CORS failure is the browser refusing to hand *you* the
   response, not the server refusing to answer. That is why the Network panel can show a `200` while
   your `catch` block still runs.
3. **A CORS failure looks like a network failure.** `fetch` rejects with a `TypeError` and a message
   like `Failed to fetch`, with no status code, because the browser deliberately withholds the details.
   The real explanation is in the **DevTools console**, which prints the specific CORS reason. When a
   request works in the address bar or in `curl` but fails in your page, CORS is the first suspect.

One more wrinkle you will meet as soon as you POST JSON. For "simple" requests the browser just sends
them, but adding `Content-Type: application/json` makes the request non-simple, so the browser first
sends an automatic **preflight** `OPTIONS` request asking permission:

```text
OPTIONS /users            <- browser asks first, automatically
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE
Access-Control-Allow-Headers: content-type
                          <- server answers, then the real POST is sent
```

You never write the preflight yourself. But if a `GET` works and the matching `POST` fails, the server
is very likely answering the preflight incorrectly.

---

## Canceling a request

A request you no longer need is worth stopping: the user navigated away, typed a new search term, or
the API is taking too long. `fetch` accepts a `signal`, and an **`AbortController`** produces
one:

```js
const controller = new AbortController();

// Somewhere else: stop it.
document.querySelector("#cancel").addEventListener("click", () => controller.abort());

try {
  const response = await fetch(url, { signal: controller.signal });
  const data = await response.json();
  console.log(data);
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Request canceled"); // expected - not a bug
  } else {
    throw error;
  }
}
```

An aborted `fetch` **rejects**, so it lands in your `catch` alongside real failures. Check
`error.name` to tell them apart, because canceling on purpose is not an error worth reporting to the user.

For the common "give up after N milliseconds" case there is a shorthand that needs no controller:

```js
await fetch(url, { signal: AbortSignal.timeout(5000) });
// rejects with error.name === "TimeoutError" if 5 seconds pass
```

Note the two different names: `controller.abort()` produces an **`AbortError`**, while
`AbortSignal.timeout(...)` produces a **`TimeoutError`**, so you can report a timeout differently from
a deliberate cancel.

---

## How fetch fits with the event loop

It's worth understanding where a fetch actually runs, because it explains why the rest of your code
doesn't freeze while a request is in flight. The network request itself is started by the **browser's
Web APIs**, not by JavaScript, so your call stack is free to keep going. When the response finally
arrives the promise is **resolved**, and the `.then` or `await` continuation attached to it is
scheduled as a **microtask**, which the **event loop** runs as soon as the call stack is clear.

The short mental model is this:

> "Start a network request now, run this code later when the result is ready."

---

## Summary

* The **Fetch API** is the modern, promise-based way to make HTTP requests, working with both `.then()` and `async/await`.
* `fetch(url, options?)` returns a promise that resolves to a **`Response`** object.
* Fetch does **not** throw on HTTP errors like 404 or 500, so always check `response.ok` (or `response.status`) yourself.
* Reading the body is also async: `response.json()` returns a promise, so `await` it or chain another `.then()`. `text()` and `blob()` are the other readers, and the body can only be read **once**.
* An **origin** is scheme + host + port. Reading a response from a different origin requires the *server* to send an `Access-Control-Allow-Origin` header (**CORS**); it is not something you can enable from the client. A CORS failure surfaces as a `TypeError` with no status, and the real reason is in the DevTools console.
* Cancel a request with an **`AbortController`** and `fetch(url, { signal })`; the promise rejects with an `AbortError`. `AbortSignal.timeout(ms)` is the shorthand for a deadline and rejects with a `TimeoutError`.
* For writes, set `method`, add `"Content-Type": "application/json"`, and send a stringified `body` via `JSON.stringify(...)`; the pattern covers POST, PUT, PATCH, and DELETE.
* Under the hood, `fetch` runs in the browser's Web APIs and schedules its continuations as **microtasks** on the event loop.


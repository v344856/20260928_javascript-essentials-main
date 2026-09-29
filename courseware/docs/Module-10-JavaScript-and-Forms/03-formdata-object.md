# The FormData Object

In [Working with Forms](./01-working-with-forms.md) you read form fields one at a time: `form.elements["email"].value`,
`form.elements["newsletter"].checked`, and so on. That is fine for a few fields, but it gets tedious for
a large form, and it is not the shape a server expects to receive. The **`FormData`** object solves both
problems: it scoops up every named field in a form for you, and it produces exactly the payload the
browser and servers use to transmit form submissions, including **file uploads**, which plain objects
cannot carry.

This chapter shows how to build a `FormData`, inspect and edit it, convert it to a plain object, and
send it to a server with `fetch`.

---

## Building a FormData from a form

Pass the `<form>` element to the `FormData` constructor and it collects every field that has a `name`.

```html
<form id="signup">
  <input type="text" name="username" value="ada">
  <input type="email" name="email" value="ada@example.com">
  <input type="checkbox" name="newsletter" checked>
  <button type="submit">Sign up</button>
</form>
```

```js
const form = document.getElementById("signup");
const data = new FormData(form);
```

That one line captures the current value of every named field. Fields **without** a `name` attribute are
ignored; the `name` is what becomes the key. (Unchecked checkboxes are also omitted, which matches how
real form submissions behave.)

You typically build it inside a submit handler, after preventing the default:

```js
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  // ...work with data...
});
```

---

## Reading values: `get` and `getAll`

Ask for a field by its `name`:

```js
data.get("username"); // "ada"
data.get("email");    // "ada@example.com"
data.get("missing");  // null  (no such field)
```

When several fields share a `name` (checkbox groups, multi-selects, "add another" rows), `get()`
returns only the **first** value. Use `getAll()` to get every value as an array:

```html
<input type="checkbox" name="topics" value="js" checked>
<input type="checkbox" name="topics" value="css" checked>
<input type="checkbox" name="topics" value="html">
```

```js
data.getAll("topics"); // ["js", "css"]
data.get("topics");    // "js"  (just the first)
```

---

## Editing: `append`, `set`, `has`, `delete`

A `FormData` is not frozen; you can add to it or change it before sending. This is handy for including
values that are not form fields, like a timestamp or a user id.

```js
data.append("source", "web");      // add a new field
data.append("topics", "node");     // append allows duplicate keys
data.set("username", "ada-lovelace"); // set replaces all values for a key

data.has("email");   // true
data.delete("newsletter"); // remove a field
```

The difference between `append` and `set` matters: `append` **adds** a value (keeping any existing ones,
so you can build up multi-value keys), while `set` **replaces** every existing value for that key.

---

## Looping over the contents

To see everything a `FormData` holds, iterate its `entries()`; each entry is a `[key, value]` pair.
A `for...of` loop with destructuring reads cleanly:

```js
for (const [key, value] of data.entries()) {
  console.log(key, "=", value);
}
// username = ada
// email = ada@example.com
// topics = js
// topics = css
```

There are also `data.keys()` and `data.values()` iterators if you only need one side. Because
`FormData` is directly iterable, `for (const [k, v] of data)` works too; `entries()` is just explicit.

---

## Converting to a plain object

Often you want an ordinary JavaScript object, to inspect it, store it, or send it as JSON.
`Object.fromEntries` turns the entries straight into an object:

```js
const obj = Object.fromEntries(data.entries());
console.log(obj);
// { username: "ada", email: "ada@example.com", topics: "css", source: "web" }
```

**Watch out:** `Object.fromEntries` keeps only the **last** value for any repeated key, so the two
`topics` entries collapse into one. That is fine for forms with unique names, but if you have multi-value
fields, gather those with `getAll()` yourself:

```js
const obj = Object.fromEntries(data.entries());
obj.topics = data.getAll("topics"); // ["js", "css"] - restore the full list
```

---

## Sending it with `fetch` (POST)

The real payoff: pass a `FormData` straight as the `body` of a `fetch` POST and the browser encodes it
and sets the right `Content-Type` header (`multipart/form-data`, with the boundary) for you.

```js
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);

  const response = await fetch("http://localhost:3000/signup", {
    method: "POST",
    body: data, // do NOT set Content-Type yourself - the browser does it
  });

  const result = await response.json();
  console.log("Server said:", result);
});
```

Do not add a `Content-Type` header manually when the body is a `FormData`: if you do, you overwrite the
boundary marker the browser generates and the server cannot parse the parts.

### Sending as JSON instead

If your server expects **JSON** rather than a multipart form (many REST APIs do), convert to an object
first and stringify it, and *then* you do set the JSON content type:

```js
const obj = Object.fromEntries(new FormData(form).entries());

await fetch("http://localhost:3000/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(obj),
});
```

Note that JSON cannot carry files; for uploads you must use the `FormData` body shown above.

---

## Including file inputs

This is where `FormData` really earns its place. A file input's value cannot go into a plain object or a
JSON string, but `FormData` carries the actual `File` for you.

```html
<form id="upload">
  <input type="text" name="caption">
  <input type="file" name="photo">
  <button type="submit">Upload</button>
</form>
```

```js
const form = document.getElementById("upload");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form); // includes the chosen file automatically

  const file = data.get("photo"); // a File object
  console.log(file.name, file.size, file.type);
  // "vacation.jpg" 284134 "image/jpeg"

  await fetch("http://localhost:3000/upload", {
    method: "POST",
    body: data, // multipart body carries the file bytes
  });
});
```

Because the form was built with `new FormData(form)`, the selected file is already inside it, with no extra
work. The server receives the file alongside the text fields as parts of one multipart request.

---

## Summary

* `new FormData(form)` collects every **named** field of a form in one step (unchecked checkboxes are
  skipped).
* Read values with `get(name)` (first value) and `getAll(name)` (every value, as an array).
* Modify a `FormData` with `append` (adds), `set` (replaces), `has`, and `delete`.
* Loop over `entries()`, which yields `[key, value]` pairs, to inspect everything; the object is directly iterable.
* Convert to a plain object with `Object.fromEntries(data.entries())`, remembering it keeps only the
  last value for repeated keys (use `getAll` for those).
* POST a `FormData` as a `fetch` `body` and let the browser set `Content-Type`; convert to JSON only
  when the API expects JSON. Only `FormData` can carry **file** inputs.

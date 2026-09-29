# Web Browser's Location Object

The browser's `location` object answers two big questions: **where are we right now?** (the URL of the current page) and **where should we go next?** (navigation, reloads, and redirects). In other words, you use it both to read the parts of the current URL and to change the URL from JavaScript.

---

## Where is the `location` object?

Formally, `location` is a property of `window`, so you can reach it as:

```js
window.location
```

but in everyday code you almost always just write the short form:

```js
location
```

They are the same object, as you can confirm:

```js
console.log(location === window.location); // true
```

Try printing it in the console on any page:

```js
console.log(location);
```

You will see an object full of URL pieces: `href`, `pathname`, `search`, and so on.

---

## The most useful properties of `location`

The easiest way to see what each property holds is to imagine a specific, fully-loaded URL:

```text
https://example.com:8080/shop/products?category=books&page=2#reviews
```

Given that address, `location` breaks it apart for you piece by piece:

```js
console.log(location.href);     // "https://example.com:8080/shop/products?category=books&page=2#reviews"
console.log(location.protocol); // "https:"
console.log(location.host);     // "example.com:8080"
console.log(location.hostname); // "example.com"
console.log(location.port);     // "8080"
console.log(location.pathname); // "/shop/products"
console.log(location.search);   // "?category=books&page=2"
console.log(location.hash);     // "#reviews"
console.log(location.origin);   // "https://example.com:8080"
```

In practice you will use these to display or log where the user is, to make decisions based on the current page (`if (location.pathname === '/login') ...`), to read query parameters like `?page=2`, and to react to the hash such as `#section1`.

---

## Changing the URL (navigation)

Beyond reading the URL, `location` can send the browser to a new one. There are a few ways to do it, and the differences matter.

### Set `location.href`

Assigning to `href` navigates the browser, exactly like clicking a link:

```js
location.href = 'https://example.com/profile';
```

The browser loads the new URL and adds a new entry to the history, so the Back button will return to the current page.

### Use `location.assign`

`assign` does the same thing as setting `href`:

```js
location.assign('https://example.com/profile');
```

### Use `location.replace`

`replace` also navigates, but it swaps out the current history entry instead of adding a new one:

```js
location.replace('https://example.com/login');
```

The distinction comes down to the Back button: with `assign` or `href`, Back returns to the previous page, whereas with `replace` the previous page is replaced and Back won't take you there. That is exactly what you want after a login redirect, where you don't want the user bouncing back to an intermediate page.

### Reload the page

Finally, you can reload the current page:

```js
location.reload();      // reload the current page
```

`reload()` takes **no arguments**. The `reload(true)` form you may see in older articles was
non-standard, Firefox-only, and has been removed; the argument is ignored today.

---

## Working with query parameters (`?key=value`)

The `search` part of the URL is the **query string**, everything from the `?` onward. Take this URL:

```text
https://example.com/search?q=javascript&sort=recent
```

Its query string is available as one raw string:

```js
console.log(location.search); // "?q=javascript&sort=recent"
```

### Use `URLSearchParams` to read parameters

Rather than parse that string by hand, wrap it in a `URLSearchParams` object, which gives you clean access to individual values:

```js
const params = new URLSearchParams(location.search);

console.log(params.get('q'));    // "javascript"
console.log(params.get('sort')); // "recent"
```

You can check whether a parameter is present before using it:

```js
if (params.has('page')) {
  console.log('Page is', params.get('page'));
}
```

And you can loop over every parameter at once:

```js
params.forEach((value, key) => {
  console.log(key, '=', value);
});
```

### Example: show greeting based on `?name=...`

Putting that together, here is a page that reads a `name` parameter and greets the visitor, falling back to `'Guest'` when it is missing:

```html
<p id="greeting"></p>

<script>
  const params = new URLSearchParams(location.search);
  const name = params.get('name') || 'Guest';

  const greeting = document.getElementById('greeting');
  greeting.textContent = 'Hello, ' + name + '!';
</script>
```

Load it with `...?name=Alice` and the page shows `Hello, Alice!`.

---

## Updating the query string **without** reloading (briefly)

There is a catch worth knowing: assigning to `location.search` directly triggers a full navigation:

```js
location.search = '?page=2'; // reloads the page with that query
```

Often, though (for filters, tabs, and the like), you want to change the URL *without* reloading the page. That is a job for the `history` API:

```js
const params = new URLSearchParams(location.search);
params.set('page', '2');

const newUrl = location.pathname + '?' + params.toString() + location.hash;

// This changes the URL in the address bar, no reload:
history.pushState({}, '', newUrl);
```

This uses `location` to read the current parts and `history` to update the address bar without navigating away. The rule of thumb to remember is simple: changing `location.*` navigates or reloads, while updating the URL via `history.pushState` keeps you on the same page.

---

## Working with the hash (`#section`)

The hash is the part of the URL after the `#`:

```text
https://example.com/docs#intro
------------------------^^^^^^
```

You read it just like the other pieces:

```js
console.log(location.hash); // "#intro"
```

Unlike the query string, changing the hash usually does **not** reload the page:

```js
location.hash = '#features';
```

That makes it a natural fit for scrolling to anchors (`<a href="#section-id">`) and for driving simple client-side routing in single-page apps, the pattern often called "hash routing."

### Listen for hash changes

When the hash changes, the browser fires a `hashchange` event you can react to:

```js
window.addEventListener('hashchange', () => {
  console.log('New hash:', location.hash);
});
```

Here is a small "page tabs" example that shows or hides sections based on the current hash:

```html
<nav>
  <a href="#home">Home</a>
  <a href="#about">About</a>
</nav>

<div id="home">This is home.</div>
<div id="about" style="display:none;">This is about.</div>

<script>
  function render() {
    const hash = location.hash || '#home';

    document.getElementById('home').style.display =
      hash === '#home' ? 'block' : 'none';

    document.getElementById('about').style.display =
      hash === '#about' ? 'block' : 'none';
  }

  window.addEventListener('hashchange', render);

  // First render on load
  render();
</script>
```

The `render` function reads the hash, defaults to `#home` when there is none, and toggles which section is visible, and because it also runs once on load, the page starts in the right state.

---

## Practical examples using `location`

A few short, real-world uses tie the pieces together.

### Example 1: redirect HTTP -> HTTPS

You can check the protocol and force a secure connection when the page was served over plain HTTP:

```js
if (location.protocol === 'http:') {
  location.replace('https://' + location.host + location.pathname + location.search + location.hash);
}
```

Most setups handle this on the server, but the snippet shows how the individual `location` parts snap together into a full URL.

### Example 2: show different content based on path

Reading `location.pathname` lets you branch on which page you are on:

```js
if (location.pathname === '/dashboard') {
  console.log('Dashboard page logic here');
} else if (location.pathname === '/settings') {
  console.log('Settings page logic here');
}
```

This is very common in server-rendered apps, where each path is a distinct page.

### Example 3: log basic navigation info

When you are debugging routing problems, dumping the key parts of `location` at once is a quick way to see the whole picture:

```js
console.log('Full URL:', location.href);
console.log('Origin:', location.origin);
console.log('Path:', location.pathname);
console.log('Query:', location.search);
console.log('Hash:', location.hash);
```

---

## Summary

As a JavaScript programmer, you use the `location` object to:

* **Read where you are**:

  * `location.href` - full URL
  * `location.protocol`, `host`, `hostname`, `port`
  * `location.pathname` - path (`/products`)
  * `location.search` - query string (`?page=2`)
  * `location.hash` - hash (`#section`)
* **Navigate**:

  * `location.href = 'url'` or `location.assign('url')`
  * `location.replace('url')` (no back)
  * `location.reload()`
* **Work with query parameters** using `URLSearchParams`
* **React to or control the hash** for simple routing (`hashchange`)

# Web Browser's Window Object

In the browser, almost everything lives under one big object, the `window`:

```js
window
```

As a JavaScript programmer you are using `window` all the time, even when you never type its name. It is the global environment your page runs in, and most of the browser features you reach for hang off it. This chapter walks through the practical ways you will actually touch `window`: global variables, window size and scroll position, timers (`setTimeout`, `setInterval`), navigation (`location`, `history`), window-level events (load, resize, scroll, keyboard), storage (`localStorage`, `sessionStorage`), and a few good habits to keep along the way.

---

## What is `window`?

In a browser, `window` represents the **browser tab**, the global environment for your page. It holds `document` (the DOM), navigation objects like `location` and `history`, storage like `localStorage`, and functions such as `setTimeout`, `alert`, and `addEventListener`. Open the console on any page and print it:

```js
console.log(window);
```

You will see a large object with many properties, everything the browser exposes to your script. Because `window` is the global object, a couple of other names point at the very same thing:

```js
window === this;       // true (in global script)
window === globalThis; // true (browser)
```

So `window`, `this` in a top-level script, and `globalThis` are three ways of naming one object.

---

## Globals and `window` (and why to be careful)

In browser JavaScript, **global variables** declared with `var` quietly become properties of `window`:

```js
var appName = 'My App';

console.log(window.appName); // "My App"
```

The same is true for functions declared at the top level, which are reachable through `window` as well:

```js
function sayHi() {
  console.log('Hi!');
}

window.sayHi(); // works
```

That is handy to understand, but it is not a pattern to lean on. The modern recommendation is to avoid it: use `const`/`let` and modules instead of piling things onto the global object. Still, knowing that the global "stuff" hangs off `window` explains a lot of otherwise-mysterious behavior.

---

## Window size and scroll position

You often need to know how big the window is or how far the user has scrolled, for responsive behavior, sticky headers, resizing a canvas, and so on.

### Size

The viewport dimensions come straight off `window`, in pixels:

```js
console.log(window.innerWidth);  // width of the viewport in px
console.log(window.innerHeight); // height of the viewport in px
```

These are what you reach for when you want JavaScript to react to the size of the screen.

### Scroll position

The current scroll offsets tell you how far the page has been scrolled from the top-left:

```js
console.log(window.scrollX); // horizontal scroll offset
console.log(window.scrollY); // vertical scroll offset
```

You can also move the scroll position yourself, either by a relative amount or to an absolute point:

```js
// Scroll down 200px
window.scrollBy(0, 200);

// Scroll to absolute position
window.scrollTo({
  top: 500,
  behavior: 'smooth' // nice smooth scrolling
});
```

The `behavior: 'smooth'` option animates the jump instead of snapping there instantly.

---

## Timers: `setTimeout` and `setInterval`

Timers live on `window` too, though you almost always call them without the `window.` prefix.

### `setTimeout` - run once after a delay

`setTimeout` schedules a function to run once, after a delay in milliseconds, and hands back an id you can use to cancel it:

```js
const timeoutId = window.setTimeout(() => {
  console.log('Runs after 1 second');
}, 1000);

// Optional: cancel it
window.clearTimeout(timeoutId);
```

### `setInterval` - run repeatedly

`setInterval` runs a function over and over on a fixed schedule until you stop it with `clearInterval`:

```js
let count = 0;

const intervalId = window.setInterval(() => {
  count++;
  console.log('Tick', count);

  if (count >= 5) {
    window.clearInterval(intervalId);
  }
}, 1000);
```

Here the interval cancels itself after five ticks. As with the size and scroll helpers, the `window.` prefix is optional, because the bare name and the prefixed name are literally the same function:

```js
setTimeout === window.setTimeout; // true
```

---

## Navigation: `window.location`

`window.location` tells you where you are and lets you send the browser somewhere else. Reading its parts is the quickest way to inspect the current URL:

```js
console.log(window.location.href);  // full URL
console.log(window.location.pathname); // path part (e.g. "/profile")
console.log(window.location.search);   // query string (e.g. "?page=2")
```

### Redirect to another page

Assigning to `href` navigates the browser, just as if the user had clicked a link:

```js
window.location.href = 'https://example.com';
```

### Reload the page

You can also reload the current page from JavaScript:

```js
window.location.reload();        // reload the current page
```

`reload()` takes **no arguments**. You will find `reload(true)` in older articles, described as a
"force reload from the server"; it was never standard, only Firefox implemented it, and it has since
been removed. Today the argument is silently ignored, so passing it does nothing at all. To defeat
caching, change what you request (a cache-busting query string) or set the right HTTP cache headers.

---

## History: `window.history`

The `history` object represents the browser's session history for this tab, the trail of pages behind and ahead of the current one. You can read how many entries it holds:

```js
console.log(window.history.length); // how many entries in history
```

You can also move through that trail programmatically, exactly as the Back and Forward buttons do:

```js
window.history.back();    // go back one page (same as clicking Back)
window.history.forward(); // go forward one page
```

The `go` method does the same with a numeric offset, which is convenient when you want to jump more than one step:

```js
window.history.go(-1); // back
window.history.go(1);  // forward
```

You will reach for this less often early on, but it is good to know it exists.

---

## Window-level events (load, resize, scroll, keyboard)

Many useful events fire on `window`, and you subscribe to them with `addEventListener`.

### `load` - when everything is loaded

The `load` event fires once the whole page, including images and CSS, has finished loading:

```js
window.addEventListener('load', () => {
  console.log('Page fully loaded (images, CSS, etc.)');
});
```

For most DOM work you will prefer `DOMContentLoaded` (on `document`), which fires earlier, but `load` still has its place when you genuinely need every resource in.

### `resize` - when the window size changes

The `resize` event lets you respond whenever the viewport dimensions change:

```js
window.addEventListener('resize', () => {
  console.log('New size:', window.innerWidth, window.innerHeight);
});
```

This is the hook for responsive layouts and for keeping a canvas sized to its container.

### `scroll` - when the window scrolls

The `scroll` event fires as the page scrolls:

```js
window.addEventListener('scroll', () => {
  console.log('Scroll Y:', window.scrollY);
});
```

Be careful with this one: `scroll` fires a lot, so in real apps you would usually throttle or debounce the handler. The snippet above is just the basic pattern.

### Keyboard events on `window`

You can also listen globally for key presses, which is handy for shortcuts that should work anywhere on the page:

```js
window.addEventListener('keydown', (event) => {
  console.log('Key down:', event.key);

  if (event.key === 'Escape') {
    console.log('Escape pressed - close a modal, etc.');
  }
});
```

The `event.key` property gives you the logical key, so checking for `'Escape'` is as simple as a string comparison.

---

## Simple dialogs: `alert`, `confirm`, `prompt`

The browser's built-in dialogs live on `window` too, and again you usually skip the prefix:

```js
window.alert('Hello');
```

### `alert`

`alert` shows a message and blocks everything until the user clicks OK:

```js
alert('Something happened'); // blocks until user clicks OK
```

### `confirm`

`confirm` asks a yes/no question and returns a boolean you can branch on:

```js
const shouldDelete = confirm('Are you sure?');

if (shouldDelete) {
  console.log('Deleting...');
}
```

### `prompt`

`prompt` asks the user to type something and returns the text they entered (or `null` if they cancel):

```js
const name = prompt('What is your name?');

if (name) {
  console.log('Hello,', name);
}
```

These are fine for quick tests, but real apps usually build custom modals with HTML and CSS instead, because the built-in dialogs block the whole page and are not very pretty.

---

## Storage on `window`: `localStorage` and `sessionStorage`

The browser gives you two simple key/value stores, both hanging off `window`:

```js
console.log(window.localStorage);
console.log(window.sessionStorage);
```

### `localStorage` - persists even after closing the browser/tab (per origin)

`localStorage` keeps its values around between visits, scoped to the site's origin. The API is a handful of string-based methods:

```js
// Save
localStorage.setItem('theme', 'dark');

// Read
const theme = localStorage.getItem('theme'); // "dark"

// Remove
localStorage.removeItem('theme');

// Clear everything
localStorage.clear();
```

### `sessionStorage` - cleared when the tab is closed

`sessionStorage` has the exact same API, but its values live only for the current tab session and vanish when the tab closes:

```js
sessionStorage.setItem('tabId', '123');
```

Between the two, you have an easy way to remember small settings such as a theme choice or the last opened tab.

---

## Other useful `window` properties

A few more properties you will bump into as you go.

### `document`

You already know this one: it is the DOM, and it is a property of `window`:

```js
console.log(window.document === document); // true
```

### `navigator`

`navigator` carries information about the browser and its environment:

```js
console.log(navigator.userAgent);
console.log(navigator.onLine); // true/false
```

### `requestAnimationFrame`

`requestAnimationFrame` asks the browser to run a function right before the next paint, which is the right tool for smooth animations:

```js
function step(timestamp) {
  console.log('Frame at', timestamp);
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
```

Calling it again from inside the callback keeps the loop going frame after frame.

---

## Good habits with `window`

A few practical guidelines will keep your use of `window` clean.

1. **Avoid polluting the global scope.** Don't attach lots of things to `window` by hand; prefer `const`/`let` inside modules or functions.

2. **Use `addEventListener` on `window`** instead of old-style inline attributes:

   ```js
   window.addEventListener('resize', handleResize);
   ```

   Avoid things like `onresize="..."` in your HTML.

3. **Keep UI logic and `window` usage separated.** For example, let one module handle "browser things" (scroll, size, storage) while another handles pure logic.

4. **Remember that not all environments have `window`.** If you ever run JavaScript outside the browser (Node.js, Bun, and the like), `window` does not exist. For now, just remember: `window` means browser only.

---

## Small example: show scroll progress

Here is a tiny example that pulls several of these pieces together (scroll position, viewport height, and window events) to draw a progress bar across the top of the page:

```html
<div id="progress"
     style="position:fixed; top:0; left:0; height:4px; background:tomato; width:0;"></div>

<div style="height:2000px; padding-top:20px;">
  Scroll down...
</div>

<script>
  const progress = document.getElementById('progress');

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = docHeight > 0 ? scrollTop / docHeight : 0;
    progress.style.width = (ratio * 100) + '%';
  }

  window.addEventListener('scroll', updateProgress);
  window.addEventListener('resize', updateProgress);

  // Initialize on load
  updateProgress();
</script>
```

The `updateProgress` function turns the current scroll offset into a percentage of the total scrollable height and sets the bar's width to match. In doing so it leans on `window.scrollY`, `window.innerHeight`, the `scroll` and `resize` events, and `document.documentElement.scrollHeight`, all working together through the `window` object.

---

## Summary

* `window` is the **global object** for browser JavaScript; `window`, `this` (global script), and `globalThis` all refer to it.
* Most "browser features" hang off `window`: `document`, `location`, `history`, `localStorage`/`sessionStorage`, timers, dialogs, and events.
* You usually **omit the `window.` prefix**: `setTimeout` and `window.setTimeout` are the same function.
* Use `window` for viewport info (`innerWidth`/`innerHeight`), scroll position (`scrollX`/`scrollY`), navigation (`location`, `history`), and global events (`load`, `resize`, `scroll`, `keydown`).
* Prefer `const`/`let` and modules over global `var`; register events with `addEventListener`, not inline HTML attributes.
* Remember `window` is **browser-only**; it doesn't exist in Node.js or other non-browser environments.

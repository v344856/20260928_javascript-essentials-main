# DOM Element Styling with JavaScript

Changing how a page looks from JavaScript really comes down to one move: find an element in the DOM,
then change its styles or its classes. Everything in this chapter is a variation on that idea.

We'll work through the main techniques in turn: setting inline styles with `element.style`,
switching CSS classes with `element.classList` (the preferred approach), driving CSS custom
properties from JavaScript, reading back the styles that are actually applied with
`getComputedStyle`, and a few small practical examples that tie it all together.

---

## Getting an element to style

Before you can style anything, you need a reference to the element. We'll grab a button and reuse it
throughout the examples below:

```html
<button id="btn">Click me</button>
```

```js
const btn = document.getElementById('btn'); // or querySelector('#btn')
```

---

## Changing inline styles with `element.style`

Every element carries a `style` property that stands for its **inline styles**, the same thing as
writing `style="..."` directly in the HTML.

### Example: change color and background

Assigning to properties on `style` sets those inline styles one at a time:

```js
btn.style.color = 'white';
btn.style.backgroundColor = 'blue';
btn.style.padding = '10px 20px';
```

Two things to keep in mind. Where CSS spells a property `background-color`, JavaScript uses the
**camelCase** form `backgroundColor`. And every value is a **string**, usually including its units:
`'16px'`, `'1.5rem'`, and so on.

### Setting multiple styles at once

If you'd rather set several properties in one shot, `style.cssText` accepts a whole block of CSS,
but remember it *replaces* any existing inline styles rather than adding to them:

```js
btn.style.cssText = `
  color: white;
  background-color: blue;
  padding: 10px 20px;
  border-radius: 4px;
`;
```

Keep in mind that inline styles carry **high priority** in the cascade, so they override most rules
coming from your stylesheets.

---

## Styling with classes (`classList`) - best practice

Setting inline styles works, but in most cases a cleaner pattern is to keep the actual styling in
CSS and let JavaScript do just one thing: **add and remove classes**. That way JavaScript decides
*when* a look applies while CSS still owns *what* it looks like.

### Example: toggle a "highlight" class

Define the look as a class in CSS, then flip it on and off from JavaScript with `add`, `remove`, and
`toggle`:

```html
<p id="message">Hello!</p>

<style>
  .highlight {
    color: white;
    background-color: tomato;
    padding: 4px 8px;
    border-radius: 4px;
  }
</style>
```

```js
const message = document.getElementById('message');

// Add the class
message.classList.add('highlight');

// Remove the class
message.classList.remove('highlight');

// Toggle the class (add if missing, remove if present)
message.classList.toggle('highlight');
```

This is better for a few reasons: the styles stay in CSS where they're easy to maintain and adjust,
JavaScript is left deciding only **when** a style applies, and you avoid scattering
`element.style...` assignments all over your code.

### Checking if a class is applied

When you need to know whether a class is currently set, `classList.contains` answers with a boolean:

```js
if (message.classList.contains('highlight')) {
  console.log('It is highlighted');
}
```

---

## Example: show/hide an element with a class

A very common use of this pattern is showing and hiding things. Rather than reaching for
`style.display`, define a `.hidden` class and toggle it:

```html
<button id="toggle">Toggle details</button>
<div id="details">Some extra information</div>

<style>
  #details {
    padding: 10px;
    border: 1px solid #ccc;
  }

  .hidden {
    display: none;
  }
</style>
```

```js
const toggleBtn = document.getElementById('toggle');
const details = document.getElementById('details');

toggleBtn.addEventListener('click', () => {
  details.classList.toggle('hidden');
});
```

Here JavaScript never touches `display` directly. It just toggles `.hidden`.

---

## CSS custom properties (variables) via JS

CSS variables give JavaScript a small set of "theme knobs" (colors, sizes, spacing) that it can
turn without rewriting a pile of individual rules. Change the variable once and every rule that
reads it updates.

### Step 1: define variables in CSS

Start by declaring the variables on `:root` and using them in your rules:

```html
<style>
  :root {
    --main-bg: white;
    --main-text: black;
  }

  body {
    background-color: var(--main-bg);
    color: var(--main-text);
  }
</style>
```

### Step 2: change them with JavaScript

Then set new values on the root element with `setProperty`:

```js
// Change root variables
document.documentElement.style.setProperty('--main-bg', 'black');
document.documentElement.style.setProperty('--main-text', 'white');
```

Every element that references those variables repaints with the new values, a whole "dark mode" in
two lines. You can read a variable back the same way, through `getComputedStyle`:

```js
const styles = getComputedStyle(document.documentElement);
const currentBg = styles.getPropertyValue('--main-bg').trim();
console.log(currentBg);
```

---

## Reading styles: `getComputedStyle`

The `style` property only tells you about *inline* styles. When you want the value that's **actually
applied** after every stylesheet, class, and inherited rule has been resolved, you need
`getComputedStyle`:

```html
<div id="box" class="card">Box</div>

<style>
  .card {
    padding: 20px;
    color: blue;
  }
</style>
```

```js
const box = document.getElementById('box');
const styles = getComputedStyle(box);

console.log(styles.color);       // e.g. "rgb(0, 0, 255)"
console.log(styles.paddingTop);  // e.g. "20px"
```

Reach for it whenever you need to inspect an element's current value or make a decision based on how
it's styled right now. One thing to expect: `getComputedStyle` reports **final, resolved values**
(a color comes back as `rgb(0, 0, 255)`, for instance), not necessarily the exact strings you
originally wrote in CSS.

---

## Example: button hover effect with JS (class-based)

You would normally handle a hover with the CSS `:hover` selector, but the same effect can be driven
from JavaScript by toggling a class on the `mouseenter` and `mouseleave` events:

```html
<button id="btn">Hover-like effect</button>

<style>
  #btn {
    background: #eee;
    border: 1px solid #ccc;
    padding: 8px 16px;
    transition: background 0.2s;
  }

  #btn.is-hovered {
    background: #ddd;
  }
</style>
```

```js
const btn2 = document.getElementById('btn');

btn2.addEventListener('mouseenter', () => {
  btn2.classList.add('is-hovered');
});

btn2.addEventListener('mouseleave', () => {
  btn2.classList.remove('is-hovered');
});
```

Again, JavaScript just toggles a class; CSS does the styling and animation.

---

## Example: dynamic progress bar with inline styles

Classes aren't always the right call. When a value is genuinely dynamic (a width that grows by a
computed percentage), an inline style is the natural fit:

```html
<div id="bar-wrapper" style="width: 200px; background: #eee;">
  <div id="bar" style="height: 20px; background: green; width: 0;"></div>
</div>
<button id="inc">Increase</button>
```

```js
const bar = document.getElementById('bar');
const incBtn = document.getElementById('inc');
let value = 0; // 0 to 100

incBtn.addEventListener('click', () => {
  value = Math.min(value + 10, 100); // cap at 100
  bar.style.width = value + '%';     // "10%", "20%", etc.
});
```

Because the width is recomputed on every click, setting `style.width` directly is the clearest
choice here.

---

## When to choose which approach

With three tools in hand, the question becomes which to reach for. Classes (`classList`) are your
default: use them when a style isn't unique to a single element, when you want CSS to handle
transitions or animations, and whenever you care about keeping your CSS clean and maintainable.

Inline styles (`element.style`) earn their place for one-off, computed values: a single specific
property like a dynamic width, a value calculated in JavaScript such as `width = value + '%'`, or a
tweak you won't reuse anywhere else.

CSS variables are the choice when you want a "theme" or "settings" knob: many rules depend on the
same value (a set of colors or sizes), and you want JavaScript to switch themes or adjust a few
global values at once.

---

## Summary

* Get elements first (`getElementById`, `querySelector`, etc.).
* `element.style.propertyName` changes **inline styles** (camelCase).
* `element.classList.add/remove/toggle` is usually the cleanest way to change styles.
* CSS variables (`--name`) can be set with `style.setProperty`.
* `getComputedStyle(element)` lets you inspect final applied styles.

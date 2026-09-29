# Selecting Elements in the DOM

Before you can change anything on a page, you have to *find* it. This chapter is about that first step: reaching into the DOM from JavaScript and pulling out the elements you want to work with, from a single button to every item in a list.

## The DOM and the `document` object

When the browser loads your page, it turns your HTML into a tree of objects called the DOM. JavaScript talks to that tree through the global `document` object:

```js
console.log(document.title); // shows the page title
```

To work with individual elements, you call selection methods on `document`, or, as you will see later, on other elements.

---

## Select a single element: `querySelector`

`querySelector` selects **the first element that matches a CSS selector**. Because it speaks CSS, the same selectors you already use for styling work here too.

### By ID

Prefix an id selector with `#`:

```html
<h1 id="main-title">Hello</h1>
```

```js
const title = document.querySelector('#main-title');
console.log(title.textContent); // "Hello"
```

### By class

A class selector uses a leading `.`, and when several elements share the class, you get the first one:

```html
<p class="highlight">First</p>
<p class="highlight">Second</p>
```

```js
const firstHighlight = document.querySelector('.highlight');
console.log(firstHighlight.textContent); // "First"
```

### By tag name

You can also match on the tag name itself, which again returns the first match:

```html
<button>Click me</button>
<button>Or me</button>
```

```js
const firstButton = document.querySelector('button');
console.log(firstButton.textContent); // "Click me"
```

### Using more complex selectors

Since any valid CSS selector is fair game, you can drill down through nesting and combine classes:

```html
<ul class="menu">
  <li class="item">Home</li>
  <li class="item active">About</li>
</ul>
```

```js
const activeItem = document.querySelector('.menu .item.active');
console.log(activeItem.textContent); // "About"
```

This selector says "the `active` item inside the `menu`," and `querySelector` returns exactly that element.

---

## Select multiple elements: `querySelectorAll`

When you want every match rather than just the first, `querySelectorAll` returns them all as a *NodeList*, a list that behaves like an array in the ways you will usually need, though it is not exactly one:

```html
<ul>
  <li class="todo">Learn HTML</li>
  <li class="todo">Learn CSS</li>
  <li class="todo">Learn JS</li>
</ul>
```

```js
const todos = document.querySelectorAll('.todo');
console.log(todos.length); // 3

// Loop through them
todos.forEach((item, index) => {
  console.log(index, item.textContent);
});
```

A NodeList gives you `length` and `forEach`, which covers a lot of everyday work. When you need the full set of array methods such as `map` or `filter`, convert it into a real array first with `Array.from`:

```js
const todosArray = Array.from(document.querySelectorAll('.todo'));
const uppercased = todosArray.map(el => el.textContent.toUpperCase());
console.log(uppercased);
```

---

## Older (but still used) methods

Before `querySelector` arrived, developers relied on a set of more specialized methods, and you will still meet them in existing codebases, so they are worth recognizing.

### `getElementById`

`getElementById` selects a single element by its `id`:

```html
<div id="user-card">Alice</div>
```

```js
const userCard = document.getElementById('user-card');
console.log(userCard.textContent); // "Alice"
```

Notice there is no `#` prefix here; you pass just the id string. IDs are meant to be unique within a page, so this always returns at most one element.

### `getElementsByClassName`

`getElementsByClassName` selects **all elements** with a given class and returns them as an *HTMLCollection*, which is a live list:

```html
<p class="note">A</p>
<p class="note">B</p>
```

```js
const notes = document.getElementsByClassName('note');
console.log(notes.length); // 2
console.log(notes[0].textContent); // "A"
```

### `getElementsByTagName`

`getElementsByTagName` works the same way but matches on tag name:

```js
const allDivs = document.getElementsByTagName('div');
console.log(allDivs.length);
```

The key difference from `querySelectorAll` is that `getElementsByClassName` and `getElementsByTagName` return *live* collections: if the DOM changes, the collection updates itself automatically. `querySelectorAll`, by contrast, returns a *static* NodeList that reflects the page as it was at the moment you queried it and does not change afterward. When you are starting out, it is usually easiest to stick with `querySelector` and `querySelectorAll`.

---

## Selecting relative to another element

You don't have to start every search from `document`. Any element you have already selected can be queried in turn, so you can search *inside* a specific part of the page:

```html
<div class="card">
  <h2 class="title">Card title</h2>
  <p class="body">Card content</p>
</div>
```

```js
const card = document.querySelector('.card');
const title = card.querySelector('.title'); // search *inside* the card
console.log(title.textContent); // "Card title"
```

Scoping the search to `card` keeps your selectors short and makes your intent clearer: you are asking for "the title of this card," not "some title somewhere on the page."

---

## Helpful related methods: `matches` and `closest`

Two more element methods round out your toolkit, and both are especially handy when handling events.

### `element.matches(selector)`

`matches` tests whether an element itself matches a CSS selector, returning a boolean:

```js
const el = document.querySelector('.item');

if (el.matches('.item.active')) {
  console.log('Element is active');
}
```

### `element.closest(selector)`

`closest` searches *upward* from an element, returning the nearest ancestor (parent, grandparent, and so on) that matches the selector:

```html
<ul class="menu">
  <li class="item">
    <button class="btn">Click</button>
  </li>
</ul>
```

```js
const button = document.querySelector('.btn');
const item = button.closest('.item');  // finds the <li>
const menu = button.closest('.menu');  // finds the <ul>
```

Starting from the button, `closest('.item')` walks up to the enclosing `<li>` and `closest('.menu')` continues up to the `<ul>`. This is invaluable for event handling, where you often start from whatever was clicked and need to find the meaningful container around it.

---

## Practical mini-example

Here is a small example that pulls the ideas together: it selects all the tabs, and when one is clicked, it highlights that tab and clears the highlight from the rest.

```html
<ul id="tabs">
  <li class="tab active">Home</li>
  <li class="tab">Profile</li>
  <li class="tab">Settings</li>
</ul>

<style>
  .tab { cursor: pointer; padding: 4px 8px; display: inline-block; }
  .tab.active { background: #333; color: white; }
</style>

<script>
  const tabs = document.querySelectorAll('#tabs .tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // remove active from all
      tabs.forEach(t => t.classList.remove('active'));
      // add to the clicked one
      tab.classList.add('active');
    });
  });
</script>
```

The pattern is one you will reuse constantly: select a group with `querySelectorAll`, loop over it to attach behavior, and toggle a class to reflect the current state. Try pasting it into an `.html` file and opening it in your browser.

---

## Summary

* Use `document.querySelector(selector)` to get **one** element (first match).
* Use `document.querySelectorAll(selector)` to get **many** elements.
* Select elements by:

  * `#id`
  * `.class`
  * `tag`
  * or any valid CSS selector.
* You can also call `querySelector`/`querySelectorAll` on any element, not just `document`, to search inside it.

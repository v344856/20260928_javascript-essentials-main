# Event Handling

Event handling is how your JavaScript reacts to what the user does: clicks, key presses, scrolling,
form input, and much more. Without it a page just sits there; with it, the page comes alive and
responds.

This chapter covers the essentials: how to add and remove event listeners, how an event travels
through the page in its capture and bubble phases, and how event delegation lets a single handler
serve many elements. Every example is plain HTML and JavaScript you can paste into a file and try.

![A click capturing down from document to the button, then bubbling back up](../../diagrams/png/dom-event-path.png)

*`target` is what was clicked, `currentTarget` is where you listened; that gap is delegation.*

---

## Basics: what is an event handler?

An **event** is something that happens on the page, such as a `click`. An **event handler**
(also called a listener) is a function you register to run whenever that event happens.

### `addEventListener`

The standard way to wire a handler to an element is `addEventListener`. Here we run a function every
time a button is clicked:

```html
<button id="hello-btn">Say hello</button>

<script>
  const btn = document.getElementById('hello-btn');

  function handleClick() {
    console.log('Button clicked!');
  }

  btn.addEventListener('click', handleClick);
</script>
```

The first argument is the event type as a string (`'click'`, `'input'`, `'submit'`, and so on), and
the second is the function to run when the event fires. That function can be a named function like
above, or an anonymous one written inline:

```js
btn.addEventListener('click', () => {
  console.log('Button clicked!');
});
```

---

## Removing event handlers

To detach a listener you call `removeEventListener`, passing it **the same function reference** (and
the same options) you used when you added it. In the example below, clicking Stop removes the handler
that Start installed:

```html
<button id="start">Start</button>
<button id="stop">Stop</button>

<script>
  const startBtn = document.getElementById('start');
  const stopBtn = document.getElementById('stop');

  function onStartClick() {
    console.log('Started!');
  }

  startBtn.addEventListener('click', onStartClick);

  stopBtn.addEventListener('click', () => {
    // This removes the handler from the start button
    startBtn.removeEventListener('click', onStartClick);
    console.log('Handler removed');
  });
</script>
```

This is exactly why the named function mattered a moment ago: you **cannot** remove an anonymous
function, because you never kept a reference to it to hand back:

```js
// This cannot be removed later:
startBtn.addEventListener('click', () => {
  console.log('I cannot be removed easily');
});
```

---

## Event object

Every time an event fires, the browser passes your handler an **event object** packed with details
about what happened, including the type of event, which element it hit, where the mouse was, and more:

```html
<button id="btn">Click me</button>

<script>
  const btn = document.getElementById('btn');

  btn.addEventListener('click', (event) => {
    console.log('Type:', event.type);          // "click"
    console.log('Target:', event.target);      // the element that was clicked
    console.log('Mouse X:', event.clientX);    // mouse position
  });
</script>
```

By convention the parameter is named `event` or just `e`.

---

## Event phases: capture and bubble

Here's something that surprises many people: when you click a nested element, the event does **not**
just fire on that one element. It travels through the page in three phases:

1. **Capturing**: from `window` -> `document` -> `<html>` -> `<body>` -> ... down to the target
2. **Target**: the event reaches the actual element clicked
3. **Bubbling**: then it bubbles back up from the target -> parent -> ... -> `<body>` -> `<html>` -> `document`

By default, `addEventListener` listens during the **bubbling** phase, which is the one you'll use
most.

### Simple example to see bubbling

The clearest way to see bubbling is to put a listener on both a box and the box nested inside it,
then click the inner one:

```html
<div id="outer" style="padding:20px; background:#eee;">
  Outer
  <div id="inner" style="padding:20px; background:#ccc;">
    Inner
  </div>
</div>

<script>
  const outer = document.getElementById('outer');
  const inner = document.getElementById('inner');

  outer.addEventListener('click', () => {
    console.log('Outer listener (bubble)');
  });

  inner.addEventListener('click', () => {
    console.log('Inner listener (bubble)');
  });
</script>
```

If you click the inner box, you'll see:

1. `"Inner listener (bubble)"`
2. `"Outer listener (bubble)"`

So the event is handled on the inner element, then "bubbles" up to the outer.

---

## Capturing phase

If you'd rather catch an event on its way *down* to the target, listen during the **capturing**
phase by passing an options object with `capture: true`. Mixing a capture listener with two bubble
listeners makes the ordering obvious:

```html
<div id="outer" style="padding:20px; background:#eee;">
  Outer
  <div id="inner" style="padding:20px; background:#ccc;">
    Inner
  </div>
</div>

<script>
  const outer = document.getElementById('outer');
  const inner = document.getElementById('inner');

  outer.addEventListener('click', () => {
    console.log('Outer CAPTURE');
  }, { capture: true });

  inner.addEventListener('click', () => {
    console.log('Inner BUBBLE');
  }); // default is { capture: false }

  outer.addEventListener('click', () => {
    console.log('Outer BUBBLE');
  });
</script>
```

Click inner, and the order will be:

1. `"Outer CAPTURE"`
2. `"Inner BUBBLE"`
3. `"Outer BUBBLE"`

So:

* Capture: top -> down
* Bubble: bottom -> up

For most everyday code, you only use **bubbling**.

---

## Stopping propagation and preventing default

Sometimes you want to interrupt this normal flow, either to keep an event from traveling any
further, or to cancel the browser's built-in reaction to it. Two methods on the event object handle
those two jobs.

### `event.stopPropagation()`

Calling `stopPropagation` halts the event where it is, so it never reaches the listeners above (or
below) it. Here the button stops the click before the outer div can hear it:

```html
<div id="outer" style="padding:20px; background:#eee;">
  Outer
  <button id="inner-btn">Inner button</button>
</div>

<script>
  const outer = document.getElementById('outer');
  const innerBtn = document.getElementById('inner-btn');

  outer.addEventListener('click', () => {
    console.log('Outer clicked');
  });

  innerBtn.addEventListener('click', (event) => {
    console.log('Button clicked');
    event.stopPropagation(); // outer will NOT be notified
  });
</script>
```

Click the button: only `"Button clicked"` appears.

### `event.preventDefault()`

Where `stopPropagation` controls the event's travel, `preventDefault` cancels the browser's
**default action** for that event: following a link, submitting a form, checking a checkbox. Here
the link's click is heard but the navigation is suppressed:

```html
<a href="https://example.com" id="link">Go somewhere</a>

<script>
  const link = document.getElementById('link');

  link.addEventListener('click', (event) => {
    event.preventDefault(); // don't actually navigate
    console.log('Link clicked, but default prevented');
  });
</script>
```

---

## Useful options: `once`

The options object has another handy setting: `once: true` tells the browser to fire the handler a
single time and then remove it for you automatically:

```html
<button id="once-btn">Click me once</button>

<script>
  const onceBtn = document.getElementById('once-btn');

  onceBtn.addEventListener('click', () => {
    console.log('This shows only once');
  }, { once: true });
</script>
```

The browser automatically removes the listener after the first run.

---

## Event delegation

Now that you understand bubbling, you can put it to work. **Event delegation** is a pattern that
leans on the bubble phase: instead of adding a listener to every child, you attach **one** listener
to a shared **parent**, let each child's events bubble up to it, and use `event.target` (or
`closest`) to work out which child was actually involved.

It shines whenever you have many similar elements (list items, table rows, buttons) or when
elements come and go dynamically.

### Without delegation: many listeners

First, the approach delegation replaces: looping over the items and giving each one its own
listener.

```html
<ul id="list">
  <li class="item">Apple</li>
  <li class="item">Banana</li>
  <li class="item">Cherry</li>
</ul>

<script>
  const items = document.querySelectorAll('#list .item');

  items.forEach(item => {
    item.addEventListener('click', () => {
      console.log('Clicked:', item.textContent);
    });
  });
</script>
```

This works, but it attaches a separate listener to **every** `<li>`, and it won't cover items you
add later.

### With delegation: one listener

The delegated version puts a single listener on the `<ul>` and uses `closest` to find which item was
clicked:

```html
<ul id="list">
  <li class="item">Apple</li>
  <li class="item">Banana</li>
  <li class="item">Cherry</li>
</ul>

<script>
  const list = document.getElementById('list');

  list.addEventListener('click', (event) => {
    // Find the nearest .item ancestor of the clicked element
    const item = event.target.closest('.item');

    // If the click wasn't on an .item (or inside it), ignore
    if (!item || !list.contains(item)) return;

    console.log('Clicked:', item.textContent);
  });
</script>
```

The payoff is threefold: there's only **one** listener on the `<ul>`, it automatically covers items
added later with JavaScript, and it uses less memory while being simpler to manage.

### Delegation with dynamically added items

That "covers items added later" claim is worth proving. Here new list items are created on the fly,
yet the parent's single listener handles every one of them:

```html
<button id="add">Add item</button>
<ul id="list"></ul>

<script>
  const addBtn = document.getElementById('add');
  const list = document.getElementById('list');
  let counter = 1;

  // Delegated click handler on the parent <ul>
  list.addEventListener('click', (event) => {
    const item = event.target.closest('li');
    if (!item) return;

    console.log('You clicked:', item.textContent);
  });

  addBtn.addEventListener('click', () => {
    const li = document.createElement('li');
    li.textContent = 'Item ' + counter++;
    list.appendChild(li);
  });
</script>
```

Even items added later respond to clicks because the listener is on the parent.

---

## Summary

* Use `addEventListener(type, handler, options?)` to attach handlers.
* Use `removeEventListener(type, handler, options?)` to remove them (same function + options).
* Events have phases:

  * Capturing (top -> down)
  * Target
  * Bubbling (bottom -> up, default phase for listeners)
* `event.stopPropagation()` stops the event from moving further.
* `event.preventDefault()` stops the browser's default action.
* `event.target` and `element.closest()` help you know which element was interacted with.
* Event delegation = one parent listener handles many children (including future ones).

# Manipulating DOM Elements

Manipulating the DOM means changing the actual structure of the page with JavaScript rather than
just reading it: creating new elements, updating the ones already there, and removing what you no
longer need. This is how a static page turns into a living interface that reacts to data and to the
user.

This chapter walks through the whole cycle: creating elements, adding them to the page, modifying
existing ones, and removing them. Every example is small enough to paste into an `.html` file and
run.

---

## Creating elements

A new element starts life in memory, detached from the page. The main way to create one is
`document.createElement`, which you hand a tag name:

```js
const element = document.createElement('tagName');
```

The element exists now, but nothing shows on screen until you insert it, which comes in the next
section.

### Example: create a new `<p>` element

```html
<div id="container"></div>

<script>
  const container = document.getElementById('container');

  // 1. Create element
  const p = document.createElement('p');

  // 2. Set its text
  p.textContent = 'Hello from JavaScript!';

  // 3. Add it to the page
  container.appendChild(p);
</script>
```

### Creating text nodes (less common)

Text inside an element is itself a node, and you can create it separately with `createTextNode` and
append it:

```js
const p = document.createElement('p');
const text = document.createTextNode('Hello!');
p.appendChild(text);
```

This is worth knowing exists, but most of the time setting `textContent` is simpler and does the
same job in one line.

---

## Adding elements to the DOM

Creating an element isn't enough: until you insert it somewhere, it stays invisible in memory. The
methods below differ only in *where* they drop the element relative to an existing one.

### `appendChild()` - add as the last child

`appendChild` places your element at the end of a parent's children:

```html
<ul id="list">
  <li>Existing item</li>
</ul>

<script>
  const list = document.getElementById('list');

  const newItem = document.createElement('li');
  newItem.textContent = 'New item';

  list.appendChild(newItem); // goes to the end
</script>
```

### `prepend()` - add as the first child

`prepend` is the mirror image: it puts the element at the *front* of the parent's children instead
of the end.

```js
const list = document.getElementById('list');

const firstItem = document.createElement('li');
firstItem.textContent = 'I am first now';

list.prepend(firstItem);
```

### `before()` and `after()` - insert next to an element

When you want to position an element relative to a specific sibling rather than a parent, use
`before` and `after`. Here we slip a paragraph in between two existing ones:

```html
<p id="a">Paragraph A</p>
<p id="b">Paragraph B</p>

<script>
  const b = document.getElementById('b');

  const between = document.createElement('p');
  between.textContent = 'Between A and B';

  b.before(between); // insert right before <p id="b">
</script>
```

Calling `b.after(...)` instead would place the new paragraph immediately after `<p id="b">`.

---

## Modifying DOM elements

Whether an element is brand new or already on the page, you can change its content, attributes,
classes, and styles at any time. The rest of this section covers each of those.

### Text content

Setting `textContent` replaces everything inside an element with plain text:

```html
<h1 id="title">Old title</h1>

<script>
  const title = document.getElementById('title');
  title.textContent = 'New title';
</script>
```

Reach for `textContent` whenever you want plain text; it treats the value as literal characters,
never as markup.

### HTML content (`innerHTML`)

When you actually need markup inside an element, `innerHTML` parses the string you assign as HTML:

```html
<div id="box"></div>

<script>
  const box = document.getElementById('box');
  box.innerHTML = '<strong>Bold</strong> and <em>italic</em>';
</script>
```

That power comes with a catch: never drop untrusted user input straight into `innerHTML`, because
any tags it contains will run as real HTML, a classic security hole. For anything a user typed,
stick with `textContent` or build the elements yourself with `createElement`.

### Attributes (like `src`, `href`, `alt`)

Most attributes are also plain properties on the element, so you can read and write them directly,
and `setAttribute`/`getAttribute` cover the cases where there's no matching property (such as custom
`data-` attributes):

```html
<img id="photo" src="old.png" alt="Old photo">
<script>
  const img = document.getElementById('photo');

  // Change attributes
  img.src = 'new.png';
  img.alt = 'New photo';

  // Or use setAttribute / getAttribute
  img.setAttribute('data-role', 'avatar');
  console.log(img.getAttribute('data-role')); // "avatar"
</script>
```

### Classes (`className` and `classList`)

You can overwrite the whole class attribute with `className`, but `classList` is almost always the
better tool because it adds, removes, or toggles a single class without disturbing the others:

```html
<div id="panel" class="panel"></div>

<script>
  const panel = document.getElementById('panel');

  // Replace the entire class string
  panel.className = 'panel active';

  // Better: use classList
  panel.classList.add('active');       // add class
  panel.classList.remove('active');    // remove class
  panel.classList.toggle('active');    // add if missing, remove if present
</script>
```

### Inline styles

Each element's `style` property lets you set individual CSS properties directly, using camelCase
names (`backgroundColor` for `background-color`):

```html
<p id="msg">Styled text</p>

<script>
  const msg = document.getElementById('msg');

  msg.style.color = 'red';
  msg.style.backgroundColor = 'yellow';
  msg.style.fontSize = '20px';
</script>
```

This is fine for a quick, one-off tweak, but for anything larger it's cleaner to toggle classes with
`classList` and keep the actual styling in CSS. The next chapter goes deeper on styling from
JavaScript.

---

## Removing elements

Taking nodes back out of the DOM is just as common as adding them. There are a few ways to do it,
depending on whether you have the element itself or its parent.

### `element.remove()`

The simplest option is `remove`, which an element calls on itself:

```html
<button id="close-btn">Close</button>

<script>
  const button = document.getElementById('close-btn');

  button.addEventListener('click', () => {
    button.remove(); // removes itself from the DOM
  });
</script>
```

### `parent.removeChild(child)`

The older approach asks the parent to remove one of its children. You'll still see it in existing
code, so it's worth recognizing:

```html
<ul id="tasks">
  <li>Task 1</li>
  <li id="to-remove">Task 2</li>
</ul>

<script>
  const list = document.getElementById('tasks');
  const item = document.getElementById('to-remove');

  list.removeChild(item);
</script>
```

### Clearing all children

To empty a container completely, the quickest move is to set its `innerHTML` to an empty string;
looping with `removeChild` gets you the same result one node at a time:

```html
<div id="log">
  <p>Message 1</p>
  <p>Message 2</p>
</div>

<script>
  const log = document.getElementById('log');

  // Option 1: clear HTML
  log.innerHTML = '';

  // Option 2: remove nodes one by one
  // while (log.firstChild) {
  //   log.removeChild(log.firstChild);
  // }
</script>
```

---

## Mini example: add and remove items

To see the whole cycle in one place, here's a tiny to-do list that creates an item on each click,
gives it its own remove button, and deletes the item when that button is pressed:

```html
<input id="todo-input" placeholder="New todo">
<button id="add-btn">Add</button>

<ul id="todo-list"></ul>

<style>
  li { margin: 4px 0; }
  button.remove { margin-left: 8px; }
</style>

<script>
  const input = document.getElementById('todo-input');
  const addBtn = document.getElementById('add-btn');
  const list = document.getElementById('todo-list');

  addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;

    // Create list item
    const li = document.createElement('li');
    li.textContent = text;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '×';
    removeBtn.className = 'remove';

    // Handle remove click
    removeBtn.addEventListener('click', () => {
      li.remove();
    });

    // Add button into li
    li.appendChild(removeBtn);

    // Add li to list
    list.appendChild(li);

    // Clear input
    input.value = '';
    input.focus();
  });
</script>
```

---

## Summary

* Create elements with `document.createElement('tag')`.
* Insert elements with `appendChild`, `prepend`, `before`, `after`.
* Change content with `textContent` (safe) or `innerHTML` (more powerful, but be careful).
* Modify attributes with `element.attribute` or `setAttribute`.
* Use `classList` to add/remove/toggle CSS classes.
* Remove elements with `element.remove()` or `parent.removeChild(child)`.

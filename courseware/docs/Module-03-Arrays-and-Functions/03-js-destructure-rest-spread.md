# Object & Array Destructuring, Rest & Spread

Modern JavaScript adds a few handy shortcuts for working with objects and arrays that you will see
in almost any codebase. There are three to learn here: **destructuring** pulls values out of an
object or array and into their own variables; **rest** (`...`) gathers up "the rest of the items"
into one place; and **spread** (`...`) does the opposite, spreading items out. Rest and spread share
the same `...` symbol, so the meaning comes down to **where** you use it, a distinction this
chapter will make clear.

![Object destructuring matched by name beside array destructuring matched by position, and rest versus spread](../../diagrams/png/destructuring-shapes.png)

*The pattern on the left mirrors the shape on the right; three dots collect, or expand.*

---

## Object Destructuring

Object destructuring lets you **extract properties** from an object into standalone variables in a
single line, matching by property name:

```js
const user = {
  name: "Sam",
  age: 25,
  isAdmin: false
};

const { name, age } = user;

console.log(name); // "Sam"
console.log(age);  // 25
```

### Renaming variables

Sometimes you want the variable to have a different name than the property. You can rename it as you
destructure by writing `property: newName`:

```js
const { name: userName, isAdmin: admin } = user;

console.log(userName); // "Sam"
console.log(admin);    // false
```

### Default values

If a property might be missing, you can supply a **default value** that is used only when the
property is absent:

```js
const settings = { theme: "dark" };

const { theme, layout = "grid" } = settings;

console.log(theme);  // "dark"
console.log(layout); // "grid" (default used)
```

Since `settings` has no `layout`, the default `"grid"` fills in.

### In function parameters

Destructuring is especially common right in a function's parameter list, so you can name the pieces
of an object argument up front:

```js
function greet({ name, age }) {
  console.log("Hello " + name + ", age " + age);
}

greet({ name: "Sam", age: 25 });
// "Hello Sam, age 25"
```

---

## Array Destructuring

Arrays destructure the same way, except they match by **position** rather than by property name:
the first variable gets the first item, the second gets the second, and so on:

```js
const colors = ["red", "green", "blue"];

const [first, second] = colors;

console.log(first);  // "red"
console.log(second); // "green"
```

### Skipping items

Because position is what matters, you can skip items you do not want by leaving a gap, an empty
slot between commas:

```js
const [primary, , tertiary] = colors;

console.log(primary);  // "red"
console.log(tertiary); // "blue"
```

### Default values

Just as with objects, array destructuring accepts defaults for positions that have no value:

```js
const nums = [10];

const [a = 1, b = 2] = nums;

console.log(a); // 10
console.log(b); // 2 (default)
```

### Swapping variables

One neat consequence is that you can swap two variables in a single line, with no temporary variable
needed:

```js
let x = 1;
let y = 2;

[x, y] = [y, x];

console.log(x, y); // 2 1
```

---

## Rest Operator (`...`) in Destructuring

When you destructure, the **rest** operator collects everything you did not name into a fresh array
or object.

### Array rest

Here `first` grabs the first score, and `...others` sweeps up whatever remains into a new array:

```js
const scores = [10, 20, 30, 40];

const [first, ...others] = scores;

console.log(first);  // 10
console.log(others); // [20, 30, 40]
```

### Object rest

The same idea works with objects: pull out the property you want, and let rest collect the leftover
properties into a new object:

```js
const user = { id: 1, name: "Sam", age: 25 };

const { id, ...rest } = user;

console.log(id);   // 1
console.log(rest); // { name: "Sam", age: 25 }
```

---

## Spread Operator (`...`) for Arrays

**Spread** is rest in reverse: instead of gathering items up, it takes an existing array and
**spreads** its items out into a new one.

### Copying arrays

Spreading an array into a fresh pair of brackets gives you a shallow copy, a separate array with
the same contents:

```js
const original = [1, 2, 3];
const copy = [...original];

console.log(copy); // [1, 2, 3]
```

### Merging arrays

Spread two arrays into one literal and their items join end to end:

```js
const a = [1, 2];
const b = [3, 4];

const merged = [...a, ...b];

console.log(merged); // [1, 2, 3, 4]
```

### Adding items in the middle

Because spread just drops items in place, you can surround it with other values to insert an array
between them:

```js
const base = [2, 3];

const extended = [1, ...base, 4];

console.log(extended); // [1, 2, 3, 4]
```

### Spread into function calls

Spread also works at a call site, turning an array into separate arguments, so here the three numbers
become the three parameters of `sum`:

```js
const numbers = [5, 10, 15];

function sum(a, b, c) {
  return a + b + c;
}

console.log(sum(...numbers)); // 30
```

---

## Spread Operator (`...`) for Objects

Spread is not limited to arrays; you can spread an object's **properties** into a new object too.

### Copying objects

Spreading an object into a fresh set of braces copies its properties:

```js
const user = { name: "Sam", age: 25 };
const userCopy = { ...user };

console.log(userCopy); // { name: "Sam", age: 25 }
```

### Merging and overriding

When you spread several objects together, they merge, and when two share a property name, the one
that comes **later** wins:

```js
const baseUser = { name: "Sam", age: 25 };
const extraInfo = { age: 26, isAdmin: true };

const mergedUser = { ...baseUser, ...extraInfo };

console.log(mergedUser);
// { name: "Sam", age: 26, isAdmin: true }
```

Here `extraInfo` comes second, so its `age` of `26` overrides the `25` from `baseUser`.

---

## Rest vs Spread (Same `...`, Different Use)

The two operators look identical, so it helps to keep their roles straight. **Rest** appears on the
receiving side (in a destructuring pattern or a function's parameter list), where it **collects**
leftover items into an array or object, as in `const [first, ...rest] = arr;`. **Spread** appears on
the building side (inside an array literal, an object literal, or a function call), where it
**expands** an array or object into separate items, as in `const copy = [...arr];`. In short: rest
gathers, spread scatters, and the surrounding context tells you which one you are looking at.

---

## Simple DOM Example

Putting several of these together, this page destructures a list of items, uppercases the first one,
spreads the rest back in, and renders the result to the screen:

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="list"></ul>

    <script>
      const items = ["HTML", "CSS", "JavaScript"];

      // Array destructuring
      const [first, ...others] = items;

      const allItems = [first.toUpperCase(), ...others];

      const list = document.getElementById("list");
      allItems.forEach((text) => {
        const li = document.createElement("li");
        li.textContent = text;
        list.appendChild(li);
      });
    </script>
  </body>
</html>
```

---

## Summary

* **Destructuring** pulls values out of objects and arrays in a single statement.
* **Rest (`...`)** collects the "leftover" items into an array or object.
* **Spread (`...`)** expands arrays/objects when copying, merging, or passing arguments.
* Same `...` symbol, but the meaning depends on **context** (destructuring vs building/calling).

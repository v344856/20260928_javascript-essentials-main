# Maps and Sets

Plain objects and arrays cover most needs, but the standard library adds two purpose-built
collections that are cleaner and faster for specific jobs:

- **`Map`**: a keyed collection (like an object) where keys can be **any** value and order is
  preserved.
- **`Set`**: a collection of **unique** values, ideal for deduplication and membership tests.

Both were added in ES2015 and are fully supported everywhere.

![A decision tree from what your keys are, and a comparison of Object, Map and Set](../../diagrams/png/map-set-vs-object.png)

*Pick by the key you have: any key means `Map`, no key means `Set`.*

---

## `Map`: keyed collections done right

A `Map` stores key/value pairs. You create one and use methods rather than property syntax.

```js
let prices = new Map();

prices.set("espresso", 3.5); // set(key, value)
prices.set("latte", 4.5);
prices.set("mocha", 5.0);

prices.get("latte");    // 4.5
prices.has("mocha");    // true
prices.has("tea");      // false
prices.size;            // 3   (a property, not size())

prices.delete("mocha"); // true (removed)
prices.size;            // 2

prices.clear();         // empties the whole map
```

Note `set` returns the map itself, so calls can be chained:

```js
let prices = new Map()
  .set("espresso", 3.5)
  .set("latte", 4.5);
```

You can also seed a map from an array of `[key, value]` pairs:

```js
let prices = new Map([
  ["espresso", 3.5],
  ["latte", 4.5],
]);
```

### Why choose `Map` over a plain object?

Objects work as key/value stores, but `Map` fixes several of their weak spots:

1. **Keys can be any value**, not just strings. Numbers, booleans, even objects and functions work as
   real, distinct keys.

   ```js
   let obj = {};
   obj[1] = "a";
   obj["1"] = "b";
   console.log(obj[1]); // "b"  - the number key was coerced to the string "1"!

   let map = new Map();
   map.set(1, "a");
   map.set("1", "b");
   map.get(1);   // "a"  - number and string keys stay distinct
   map.get("1"); // "b"
   ```

2. **Size is instant** via `.size`; with an object you must do `Object.keys(obj).length`.

3. **No inherited-key surprises.** A plain object always carries inherited keys like `toString` and
   `constructor`, so `"toString" in obj` is misleadingly `true`. A `Map` contains only what you put in
   it.

4. **Order is guaranteed** to match insertion order, and iteration is built in and easy.

Rule of thumb: use a plain **object** for fixed, known-ahead records (a "struct"); use a **`Map`** when
keys are dynamic, come from user data, are added/removed frequently, or are not strings.

### Iterating a `Map`

Maps are iterable in insertion order. `for...of` yields `[key, value]` pairs, which you usually
destructure:

```js
let prices = new Map([
  ["espresso", 3.5],
  ["latte", 4.5],
]);

for (let [item, price] of prices) {
  console.log(`${item}: $${price}`);
}
// espresso: $3.5
// latte: $4.5

// Just the keys or just the values:
[...prices.keys()];   // ["espresso", "latte"]
[...prices.values()]; // [3.5, 4.5]

prices.forEach((price, item) => {
  console.log(item, price); // note: value comes FIRST in the callback
});
```

---

## `Set`: collections of unique values

A `Set` holds values with **no duplicates**. Adding a value that is already present does nothing.

```js
let tags = new Set();

tags.add("coffee");
tags.add("hot");
tags.add("coffee"); // ignored - already present

tags.has("hot"); // true
tags.size;       // 2

tags.delete("hot"); // true
tags.clear();       // empty it
```

Like `Map`, `add` returns the set, so it chains, and you can seed from an array.

### Deduplicating an array

This is the single most common use of `Set`. Because a set drops duplicates automatically, wrapping an
array in `new Set(...)` and spreading it back out removes repeats in one line:

```js
let raw = [1, 2, 2, 3, 3, 3, 4];

let unique = [...new Set(raw)]; // [1, 2, 3, 4]
// or: Array.from(new Set(raw))

let words = ["a", "b", "a", "c", "b"];
[...new Set(words)]; // ["a", "b", "c"]
```

### Iterating a `Set`

A set is iterable in insertion order:

```js
let colors = new Set(["red", "green", "blue"]);

for (let color of colors) {
  console.log(color); // red, green, blue
}

[...colors]; // back to an array: ["red", "green", "blue"]
```

Sets are also good for fast **membership checks**: `set.has(x)` is efficient even for large
collections, whereas `array.includes(x)` scans the whole array each time.

### Combining sets

Once you have two sets, you often want to compare them. Doing that by hand with `filter` and spread is
fiddly, so JavaScript gained a family of **set methods** for it (standardized in ES2025, and available
in every current browser and in Node since 2024):

```js
const frontend = new Set(["html", "css", "javascript"]);
const backend  = new Set(["javascript", "sql", "python"]);

frontend.union(backend);
// Set { "html", "css", "javascript", "sql", "python" }  - everything, no duplicates

frontend.intersection(backend);
// Set { "javascript" }                                  - only what is in both

frontend.difference(backend);
// Set { "html", "css" }                                 - in frontend, NOT in backend

frontend.symmetricDifference(backend);
// Set { "html", "css", "sql", "python" }                - in one or the other, not both
```

Three more answer yes/no questions rather than returning a set:

```js
new Set(["html"]).isSubsetOf(frontend);       // true  - every value is in frontend
frontend.isSupersetOf(new Set(["css"]));      // true  - frontend contains all of it
frontend.isDisjointFrom(new Set(["rust"]));   // true  - nothing in common
```

Two things worth knowing:

* **They never mutate.** Each returns a brand-new `Set`; `frontend` and `backend` are untouched
  afterwards. That makes them safe to chain.
* **The argument must be set-like**, meaning it needs `size`, `has`, and `keys`: another `Set`, or a
  `Map`. Passing a plain array or an iterator throws a `TypeError`, so convert first:

```js
frontend.union(new Set(["rust"]));  // fine
frontend.union(["rust"]);           // TypeError - an array is not set-like
```

`difference` in particular replaces a very common piece of hand-written code: "which of these do I
have that they don't?"

---

## Equality note

Both `Map` keys and `Set` values are compared by the same rule as `===` (with the small exception that
`NaN` is treated as equal to itself). This means **objects are compared by reference**, not by
contents:

```js
let s = new Set();
s.add({ id: 1 });
s.add({ id: 1 }); // a DIFFERENT object - both are kept
s.size; // 2

let a = { id: 1 };
let s2 = new Set([a, a]); // the SAME object twice
s2.size; // 1
```

---

## A brief note on `WeakMap` and `WeakSet`

There are two "weak" cousins, `WeakMap` and `WeakSet`, for advanced memory-management scenarios.

- Their keys (WeakMap) or values (WeakSet) **must be objects**, and they are held **weakly**: if
  nothing else references that object, it can be garbage-collected and the entry disappears
  automatically.
- They are **not iterable** and have **no `.size`**, so you cannot list their contents.

The typical use is attaching private data or metadata to objects without preventing them from being
cleaned up (for example, caching computed results per object). You will not need them often, but it is
good to know they exist.

```js
let cache = new WeakMap();

function getConfig(obj) {
  if (!cache.has(obj)) {
    cache.set(obj, computeConfig(obj)); // stored until obj is gone
  }
  return cache.get(obj);
}
```

---

## Summary

* **`Map`** is a keyed collection: `set`/`get`/`has`/`delete`, the `.size` property, and guaranteed
  insertion order.
* Prefer `Map` over a plain object when keys are dynamic, non-string, or frequently changing, because its
  keys keep their real type and it avoids inherited-key surprises.
* Iterate a `Map` with `for...of` yielding `[key, value]` pairs, or `keys()`/`values()`/`forEach`.
* **`Set`** stores **unique** values: `add`/`has`/`delete`/`.size`. Deduplicate an array with
  `[...new Set(arr)]`.
* Sets give fast membership checks and iterate in insertion order.
* **Set methods** (ES2025) combine two sets without mutating either: `union`, `intersection`,
  `difference`, `symmetricDifference`, plus the predicates `isSubsetOf`, `isSupersetOf`, and
  `isDisjointFrom`. The argument must be set-like; an array throws.
* `Map`/`Set` compare with `===` semantics, so **objects match by reference**, not by contents.
* **`WeakMap`/`WeakSet`** hold objects weakly for garbage-collection-friendly metadata; they are not
  iterable and have no size.

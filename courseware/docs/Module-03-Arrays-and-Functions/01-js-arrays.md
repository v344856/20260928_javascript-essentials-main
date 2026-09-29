# JavaScript Arrays

An **array** is a special kind of object built to hold a **list of values** in order. Almost every
real program keeps collections of things (a list of names, the scores in a game, the todos a user
has added, the products sitting in a shopping cart), and the array is the tool you reach for whenever
you need to keep several values together and remember the order they came in.

![An array flowing through map, then filter, then reduce, with reduce unrolled step by step](../../diagrams/png/array-pipeline.png)

*Same length, shorter, then one value, and the original array is never changed.*

---

## Creating Arrays

The usual way to make an array is with a pair of square brackets `[]`, listing the values inside,
separated by commas. An array can be empty, hold values of one type, or mix types freely:

```js
const empty = [];                    // empty array
const numbers = [10, 20, 30];        // numbers
const names = ["Sam", "Alex", "Jo"]; // strings
const mixed = [1, "hello", true];    // different types
```

---

## Accessing Items (Indexes)

Each item in an array has a numbered position called its **index**, and JavaScript starts counting
at **0** rather than 1, so the first item is `[0]`, the second is `[1]`, and so on. You read an
item by putting its index in square brackets:

```js
const colors = ["red", "green", "blue"];

console.log(colors[0]); // "red"
console.log(colors[1]); // "green"
console.log(colors[2]); // "blue"
```

You can also assign to a position to change the value stored there:

```js
colors[1] = "yellow";
console.log(colors); // ["red", "yellow", "blue"]
```

---

## Array Length

The `.length` property tells you how many items an array currently holds:

```js
const fruits = ["apple", "banana", "orange"];

console.log(fruits.length); // 3
```

Because indexes start at 0, the last item always lives at `length - 1`:

```js
const lastIndex = fruits.length - 1;
console.log(fruits[lastIndex]); // "orange"
```

You will still meet that form everywhere, so it is worth recognizing. In new code, though, reach for
`at()`, which accepts a **negative** index counting back from the end:

```js
console.log(fruits.at(-1)); // "orange"  - last item
console.log(fruits.at(-2)); // "banana"  - second from last
console.log(fruits.at(0));  // "apple"   - same as fruits[0]
```

`fruits.at(-1)` says what you mean; `fruits[fruits.length - 1]` makes the reader do arithmetic.

---

## Adding and Removing Items

Arrays come with built-in methods for adding and removing items at either end. The four workhorses
are `push` and `pop` (the end of the array) and `unshift` and `shift` (the start):

```js
const animals = ["cat", "dog"];

// Add at the end
animals.push("bird");     // ["cat", "dog", "bird"]

// Remove from the end
const last = animals.pop(); // removes "bird"
                            // ["cat", "dog"]

// Add at the start
animals.unshift("mouse"); // ["mouse", "cat", "dog"]

// Remove from the start
const first = animals.shift(); // removes "mouse"
                               // ["cat", "dog"]
```

Notice that `pop` and `shift` hand back the item they removed, so you can capture it in a variable
as you take it off.

### `splice` - add or remove anywhere

Those four only work at the ends. **`splice`** works anywhere, and does insert, remove, and replace
with one method. The signature reads
`splice(start, deleteCount, ...itemsToInsert)`:

```js
let queue = ["ann", "bob", "cid", "dee"];

// Remove: from index 1, delete 2 items
const removed = queue.splice(1, 2);
console.log(removed); // ["bob", "cid"]  - it returns what it took out
console.log(queue);   // ["ann", "dee"]  - and changes the original
```

Delete nothing and pass items instead, and it inserts:

```js
let queue = ["ann", "bob", "cid", "dee"];
queue.splice(2, 0, "NEW");
console.log(queue); // ["ann", "bob", "NEW", "cid", "dee"]
```

Do both at once, and it replaces:

```js
let queue = ["ann", "bob", "cid", "dee"];
queue.splice(1, 1, "REPLACED");
console.log(queue); // ["ann", "REPLACED", "cid", "dee"]
```

A negative `start` counts back from the end, which makes "drop the last one" tidy:

```js
let queue = ["ann", "bob", "cid", "dee"];
queue.splice(-1);   // ["ann", "bob", "cid"]
```

**`splice` mutates; `slice` copies.** The two names are one letter apart and do opposite things, so
it is worth fixing the difference early:

```js
const original = [1, 2, 3, 4, 5];

const copy = original.slice(1, 3);
console.log(copy);     // [2, 3]           - a new array
console.log(original); // [1, 2, 3, 4, 5]  - untouched
```

`slice(start, end)` takes an **end index** (not a count) and never changes the original. If you only
want to read part of an array, `slice` is the safe one.

---

## Finding Items

When you just want to know whether a value is present, `includes` gives you a simple `true` or
`false`. When you need to know *where* it is, `indexOf` returns the index of the first match, or
`-1` if the value is not in the array at all:

```js
const letters = ["a", "b", "c", "b"];

letters.includes("b");  // true
letters.includes("z");  // false

letters.indexOf("b");   // 1 (first "b")
letters.indexOf("z");   // -1 (not found)
```

---

## Looping Over Arrays

Sooner or later you will want to visit every item in an array. There are two common ways to do it.

### `for` loop

The classic `for` loop counts an index from `0` up to `length`, giving you the index on each pass
in case you need it:

```js
const scores = [10, 20, 30];

for (let i = 0; i < scores.length; i++) {
  console.log("Score:", scores[i]);
}
```

### `for...of` loop (simpler)

When you only care about the values and not their positions, `for...of` is cleaner, because it hands
you each item directly, with no index bookkeeping:

```js
for (const score of scores) {
  console.log("Score:", score);
}
```

---

## Common Array Methods

Beyond the plain loops, arrays offer higher-level methods that take a function and apply it to every
item for you. These are the ones you will use most.

### `forEach` - run a function for each item

`forEach` runs your function once per item, passing in both the value and its index:

```js
const foods = ["pizza", "pasta", "salad"];

foods.forEach((food, index) => {
  console.log(index, food);
});
```

### `map` - create a new array with transformed values

`map` builds a **brand-new array** by transforming each item with your function, here doubling
every number. The original array is left untouched:

```js
const nums = [1, 2, 3];
const doubled = nums.map((n) => n * 2);

console.log(doubled); // [2, 4, 6]
console.log(nums);    // [1, 2, 3] - unchanged
```

### `filter` - create a new array with items that pass a test

`filter` also returns a new array, but it keeps only the items for which your function returns
`true`. Here we keep just the ages that are 18 or over:

```js
const ages = [15, 21, 18, 30];

const adults = ages.filter((age) => age >= 18);

console.log(adults); // [21, 18, 30]
```

### `reduce` - collapse an array down to a single value

`map` and `filter` both hand back an array. `reduce` is the one that hands back **one value**: a
total, a maximum, a joined string, or even an object you build up as you go.

It takes two arguments: a function, and the **starting value**. The function receives the running
result so far (conventionally called the *accumulator*) and the current item, and whatever it
returns becomes the running result for the next pass:

```js
const prices = [10, 20, 30];

const total = prices.reduce((sum, price) => sum + price, 0);
//                           ^running  ^current      ^start at 0

console.log(total); // 60
```

Walking that through: it starts at `0`, then `0 + 10` is `10`, then `10 + 20` is `30`, then
`30 + 30` is `60`.

Always pass the starting value. Without it, `reduce` uses the first item as the seed, which breaks
on an empty array:

```js
[].reduce((a, b) => a + b, 0); // 0  - fine
// [].reduce((a, b) => a + b); // TypeError: Reduce of empty array with no initial value
```

The accumulator does not have to be a number. Here it is an object, counting how many times each
word appears:

```js
const words = ["js", "css", "js"];

const counts = words.reduce((tally, word) => {
  tally[word] = (tally[word] || 0) + 1;
  return tally;
}, {});

console.log(counts); // { js: 2, css: 1 }
```

### `find`, `some`, and `every` - ask a question about the items

Where `filter` returns *all* the matches, `find` returns the **first** one, or `undefined` if
nothing matches. `some` and `every` return a plain boolean:

```js
const nums2 = [4, 9, 16, 25];

nums2.find((n) => n > 10);    // 16   - the first match, not an array
nums2.find((n) => n > 100);   // undefined

nums2.some((n) => n > 20);    // true  - is ANY of them over 20?
nums2.every((n) => n > 20);   // false - are ALL of them over 20?
```

Reach for `find` when you want one item and `filter` when you want a list. Using `filter(...)[0]`
works, but it keeps scanning after it has already found the answer.

`find` has three siblings for when you want the **position** instead of the value, or want to search
from the other end:

```js
const nums3 = [5, 12, 8, 130, 44];

nums3.findIndex((n) => n > 10);     // 1    - index of the first match
nums3.find((n) => n > 10);          // 12   - the value at that index
nums3.findLast((n) => n > 10);      // 44   - searching from the RIGHT
nums3.findLastIndex((n) => n > 10); // 4

nums3.findIndex((n) => n > 999);    // -1   - no match (not undefined)
```

Note the two different "nothing found" answers: the value-returning ones give `undefined`, the
index-returning ones give `-1`, the same convention as `indexOf`.

### `flat` and `flatMap` - collapse nested arrays

When an array contains other arrays, **`flat`** unwraps them one level deep by default:

```js
[1, [2, 3], [4, [5, 6]]].flat();
// [1, 2, 3, 4, [5, 6]]   - one level only; [5, 6] is still nested

[1, [2, 3], [4, [5, 6]]].flat(2);   // [1, 2, 3, 4, 5, 6]
[1, [2, [3, [4]]]].flat(Infinity);  // [1, 2, 3, 4]  - however deep it goes
```

**`flatMap`** is `map` followed by a single `flat`, which comes up constantly when each item expands
into several:

```js
const orders = [{ items: ["a", "b"] }, { items: ["c"] }];

orders.map((o) => o.items);      // [["a", "b"], ["c"]]  - nested, rarely what you want
orders.flatMap((o) => o.items);  // ["a", "b", "c"]      - one flat list
```

There is a second trick hiding in it: because returning `[]` contributes nothing, `flatMap` can filter
and transform in one pass:

```js
[1, 2, 3].flatMap((n) => (n % 2 ? [n] : []));  // [1, 3] - odds only
```

### `sort` - put the items in order

`sort` is the one that surprises people twice. First, it **changes the original array** rather than
returning a new one. Second, with no arguments it compares items **as strings**:

```js
const scores = [10, 9, 100, 1];

scores.sort();
console.log(scores); // [1, 10, 100, 9]  - string order, almost never what you want
```

For numbers, pass a comparison function. It should return a negative number when `a` comes first, a
positive number when `b` does, and `0` when they tie; `a - b` does exactly that:

```js
const scores2 = [10, 9, 100, 1];

scores2.sort((a, b) => a - b);
console.log(scores2); // [1, 9, 10, 100]  - ascending
scores2.sort((a, b) => b - a);
console.log(scores2); // [100, 10, 9, 1]  - descending
```

If you need the original left alone, copy it first with `toSorted` (or spread it):

```js
const original = [3, 1, 2];
const ordered = original.toSorted((a, b) => a - b);

console.log(ordered);  // [1, 2, 3]
console.log(original); // [3, 1, 2] - untouched
```

---

## Arrays of Objects

In real applications, arrays very often hold **objects** rather than simple values, such as a list of
users. You reach a property by first indexing into the array and then reading the
property off the object you get back:

```js
const users = [
  { name: "Sam", age: 25 },
  { name: "Alex", age: 30 }
];

console.log(users[0].name); // "Sam"
console.log(users[1].age);  // 30
```

---

## Simple DOM Example

To see arrays doing real work, here is a small page that turns an array of names into a list on the
screen:

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="names-list"></ul>

    <script>
      const names = ["Sam", "Alex", "Jo"];
      const list = document.getElementById("names-list");

      for (const name of names) {
        const li = document.createElement("li");
        li.textContent = name;
        list.appendChild(li);
      }
    </script>
  </body>
</html>
```

The loop walks over the `names` array and, for each name, creates a new list item and adds it to the
page, a pattern you will see again and again when displaying data.

---

## Summary

* Arrays store **ordered lists** of values.
* Index starts at **0**; `at(-1)` reads from the end without the `length - 1` arithmetic.
* Use `.length`, `push`, `pop`, `shift`, `unshift`, `includes`, `indexOf`, etc.
* Loop with `for` or `for...of`, and use methods like `forEach`, `map`, `filter`.
* `map` and `filter` return a **new array**; `reduce` collapses one to a **single value**, so always
  give it a starting value.
* `find` returns the first match (`undefined` if none); `some` and `every` return booleans.
  `findIndex`/`findLastIndex` give the **position** instead (`-1` if none), and `findLast`/
  `findLastIndex` search from the right.
* **`splice` mutates**: it inserts, removes, and replaces anywhere in the array and returns what it
  removed. **`slice` copies** a section and leaves the original alone, so two method names one letter
  apart do opposite jobs.
* `flat(depth)` unwraps nested arrays; `flatMap` is `map` + one `flat`, and returning `[]` from it
  drops an item entirely.
* `sort` **mutates** and compares as **strings** by default; pass `(a, b) => a - b` for numbers, or
  use `toSorted` to leave the original alone.
* Arrays often contain **objects**, especially in real projects.

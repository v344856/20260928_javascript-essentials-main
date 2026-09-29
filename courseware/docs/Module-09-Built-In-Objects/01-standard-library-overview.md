# The JavaScript Standard Library

Every JavaScript environment (the browser, Node.js, Deno) ships with a **standard library**: a
collection of ready-made objects and functions you can use without importing anything. These are the
**built-in global objects**. You have already used some of them (`console`, `Array`) without thinking
of them as a "library."

This chapter is a map of what is available. The following chapters zoom in on the most useful pieces.

---

## What "built-in global objects" means

A **global object** is one that is always in scope: you can type its name anywhere and it just
works, because the language defines it for you.

```js
Math.max(3, 7, 2); // 7        - Math is always available
JSON.stringify({ a: 1 }); // '{"a":1}'
Date.now(); // 1783382400000   - milliseconds since 1970
```

You did not declare `Math`, `JSON`, or `Date`. They come with the language, described by the
**ECMAScript** specification, so the same objects exist in every conforming engine.

---

## The core built-ins you will actually use

Here is the practical shortlist. Most of this module is dedicated to the ones in bold.

| Object | What it is for |
|--------|----------------|
| **`String`** | Text: searching, slicing, casing, trimming, padding |
| **`Number`** | Numeric parsing, formatting, and safe-integer checks |
| **`Math`** | Rounding, powers, roots, `Math.random()` |
| **`Date`** | Dates, times, timestamps, and formatting |
| `Array` | Ordered lists (covered in the Arrays module) |
| `Object` | Keyed records; `Object.keys`, `Object.entries`, `Object.hasOwn` |
| `JSON` | Convert between objects and text (covered in the JSON module) |
| **`Map`** | Keyed collection where keys can be any value |
| **`Set`** | Collection of unique values |
| `Boolean`, `Symbol`, `BigInt` | The remaining primitive wrappers |
| `RegExp` | Pattern matching in strings |
| `Promise` | Async results (covered in the Async module) |
| `Intl` | Locale-aware formatting of numbers, dates, and currency |

You do not need to memorize this. The goal is to recognize that when you need to manipulate text,
numbers, dates, or collections, **the tool almost certainly already exists**, so reach for the built-in
before writing it yourself.

---

## Primitives vs. objects

Recall from the types chapter that JavaScript has a handful of **primitive** values (`string`,
`number`, `boolean`, `undefined`, `null`, `symbol`, and `bigint`), and everything else is an
**object**.

A primitive is a bare value. It has no methods of its own:

```js
let name = "Alice"; // just a string value
let price = 4.5;    // just a number value
```

So how can you call a method on one?

```js
"Alice".toUpperCase(); // "ALICE"
(4.5).toFixed(2);      // "4.50"
```

---

## Wrapper objects and autoboxing

The answer is **autoboxing**. When you call a method on a primitive, JavaScript temporarily wraps the
value in its matching **wrapper object** (`String`, `Number`, or `Boolean`), runs the method, and
then throws the wrapper away.

```js
let name = "Alice";

// What JavaScript effectively does behind the scenes:
//   let temp = new String("Alice");  // wrap
//   let result = temp.toUpperCase(); // use the method
//   temp is discarded                // unwrap
name.toUpperCase(); // "ALICE"
```

This is why a plain string "has methods" even though it is a primitive. The `String`, `Number`, and
`Boolean` objects exist mainly to provide those methods and some useful **static** helpers like
`Number.isInteger` and `Number.MAX_SAFE_INTEGER`.

### Do not construct wrappers with `new`

You almost never want to create a wrapper object explicitly. It produces a genuine object, which
behaves surprisingly:

```js
let real = 5;              // number primitive
let wrapped = new Number(5); // Number object - avoid this!

typeof real;    // "number"
typeof wrapped; // "object"

real === 5;    // true
wrapped === 5; // false  (an object is never === a primitive)

if (new Boolean(false)) {
  console.log("this runs!"); // objects are always truthy
}
```

Use the wrapper names for their **static helpers** (`Number.parseInt`, `String.fromCharCode`), and
let autoboxing handle method calls on primitives. Never use `new String`, `new Number`, or
`new Boolean`.

---

## Static members vs. instance methods

Two styles of usage show up throughout the standard library, and it helps to name them:

- **Static members** live on the constructor object itself. You call them through the type name.

  ```js
  Number.isInteger(10);      // true
  Math.max(1, 2, 3);         // 3      (all of Math is "static")
  Object.keys({ a: 1 });     // ["a"]
  ```

- **Instance methods** live on a value and act on that value.

  ```js
  "hello".toUpperCase();     // "HELLO"
  [1, 2, 3].map((n) => n * 2); // [2, 4, 6]
  new Date().getFullYear();  // 2026
  ```

`Math` is unusual: it is a plain namespace of static helpers, so you never write `new Math()`.
`Date`, `Map`, and `Set`, by contrast, are constructors you instantiate with `new`.

---

## Summary

* The **standard library** is the set of **built-in global objects** every JS engine provides, with no
  import needed.
* The everyday core is `String`, `Number`, `Math`, `Date`, `Array`, `Object`, `JSON`, `Map`, and
  `Set`.
* Primitives have no methods of their own; **autoboxing** temporarily wraps them in `String`,
  `Number`, or `Boolean` so method calls work.
* Never build wrappers with `new String`/`new Number`/`new Boolean`: you get an object that fails
  `===` and is always truthy.
* Distinguish **static members** (`Number.isInteger`, `Math.max`) from **instance methods**
  (`"hi".toUpperCase()`).

# JavaScript's Type System (Simple Overview)

JavaScript has a **dynamic**, **loosely typed** type system (you will also hear it called "weakly
typed"). Two words are doing the work in that sentence:

- **Dynamic** means types are checked at **runtime**, not ahead of time. A variable takes its type
  from whatever value it currently holds.
- **Loosely typed** means JavaScript will often **convert types for you** (a behavior called type
  coercion), sometimes in surprising ways.

Understanding both is the key to reading JavaScript with confidence, so let's walk through them.

![Side-by-side decision paths for double-equals and triple-equals, with the list of falsy values](../../diagrams/png/coercion-and-equality.png)

*`==` converts before it compares; `===` never does.*

---

## Primitive Types vs Objects

JavaScript has a small set of **primitive types**, which are simple, immutable values:

- `number`
- `string`
- `boolean`
- `undefined`
- `null`
- `symbol`
- `bigint`

Everything else is an **object**: plain objects, arrays, functions, dates, and so on.

```js
let age = 30;                  // number (primitive)
let name = "Alice";            // string (primitive)
let isAdmin = false;           // boolean (primitive)
let nothing = null;            // null (primitive)
let notSet;                    // undefined (primitive)
let user = { name: "Alice" };  // object
let numbers = [1, 2, 3];       // object (array)
```

---

## The `typeof` Operator

To check the type of a value at runtime, use `typeof`:

```js
typeof 42;             // "number"
typeof "hello";        // "string"
typeof true;           // "boolean"
typeof undefined;      // "undefined"
typeof { a: 1 };       // "object"
typeof [1, 2, 3];      // "object"   (arrays are objects)
typeof function () {}; // "function"
```

There is one famous oddity worth memorizing:

```js
typeof null; // "object"   (a long-standing bug in JavaScript)
```

Because of that quirk, don't use `typeof` to test for `null`. Compare against `null` directly
instead:

```js
let value = null;

if (value === null) {
  console.log("Value is null");
}
```

---

## Dynamic Typing

Variables don't have fixed types: the **value** carries the type, not the variable. That means the
same variable can hold different types over its lifetime:

```js
let x = 10;      // x holds a number
x = "hello";     // now x holds a string
x = false;       // now x holds a boolean
```

This flexibility is powerful, but it can also hide bugs if you lose track of what type a value is
supposed to be. (This is exactly the problem TypeScript, later in the course, is designed to solve.)

---

## Type Coercion

Because JavaScript is loosely typed, it often **converts** values from one type to another on your
behalf. Two everyday cases show up constantly.

### String + Number

The `+` operator means "add" for numbers but "concatenate" for strings, and if either side is a
string, the number is converted to a string first:

```js
let result = "Age: " + 30;
console.log(result); // "Age: 30"   (the number 30 became a string)
```

### Loose vs Strict Equality

`==` allows coercion before comparing; `===` does **not**:

```js
0 == "0";     // true   (the string "0" is coerced to the number 0)
0 === "0";    // false  (different types, so no coercion)

false == 0;   // true
false === 0;  // false
```

In modern JavaScript, prefer **`===`** and **`!==`** almost all the time. Strict equality compares
type and value together, which avoids this whole class of surprise.

---

## Converting Types Explicitly

Rather than leaving conversions to chance, you can convert values yourself. Explicit conversion makes
your intent obvious and your code easier to debug:

```js
// To number
Number("42");    // 42
Number("hello"); // NaN (Not-a-Number)

// To string
String(42);      // "42"

// To boolean
Boolean(0);      // false
Boolean(1);      // true
Boolean("");     // false
Boolean("hello"); // true
```

---

## Value Types vs Reference Types

There is one more distinction that trips people up: **how values are copied**. Primitives are copied
**by value**, while objects (including arrays and functions) are copied **by reference**.

```js
// Primitive: copied by value
let a = 10;
let b = a;   // b gets its own copy of 10
b = 20;
console.log(a); // 10 (a is unchanged)

// Object: copied by reference
let obj1 = { count: 1 };
let obj2 = obj1;  // obj2 points at the same object in memory
obj2.count = 5;
console.log(obj1.count); // 5 (changed through obj2)
```

With `obj2 = obj1`, both names refer to the *same* object, so a change through one is visible through
the other. Keeping this in mind is essential to avoid accidentally mutating the same object from two
places.

---

## Summary

* JavaScript is **dynamically** and **loosely** typed: types are checked at runtime and often
  converted automatically.
* Values are either **primitives** (`number`, `string`, `boolean`, `undefined`, `null`, `symbol`,
  `bigint`) or **objects**.
* Use `typeof` to inspect a value's type, but test for `null` with `=== null`, since `typeof null`
  is `"object"`.
* **Type coercion** can be surprising; prefer `===` and `!==` over `==` and `!=`.
* Remember the **value vs reference** difference: primitives copy their value, objects share a
  reference.

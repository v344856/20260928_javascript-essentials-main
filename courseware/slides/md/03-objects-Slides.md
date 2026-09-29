---
title: Objects
subtitle: JavaScript & TypeScript Essentials
author: Cloud Contraptions LLC - www.cloudcontraptions.com
---

## Object Literals

- A collection of related data and behavior as **key/value pairs**

```js
const user = {
  name: "Alice",
  age: 30,
  isAdmin: false,
};

console.log(user); // { name: 'Alice', age: 30, isAdmin: false }
```

- Values can be any type; pairs separated by commas
- An empty object is just `{}`

## Property Access: Dot vs Bracket

```js
const user = { name: "Alice", "favorite color": "blue" };

console.log(user.name); // "Alice" (dot notation)

const key = "name";
console.log(user[key]);              // "Alice" (key from a variable)
console.log(user["favorite color"]); // "blue"  (space in the key)

console.log(user.email); // undefined (missing - no error)
```

## Add, Update, Delete

```js
const user = { name: "Alice" };

user.age = 30;          // add
user.name = "Alice S."; // update
delete user.age;        // delete

console.log(user); // { name: 'Alice S.' }
```

- Objects are **mutable**: `const` blocks reassignment, not mutation

```js
const u = { name: "Alice" };
u.name = "Bob"; // OK - changing a property
// u = {};      // Error - reassigning the const variable
```

## Nested Objects and Optional Chaining

```js
const user = {
  name: "Alice",
  address: { city: "Seattle", zip: "98101" },
};
console.log(user.address.city); // "Seattle"
```

```js
const bob = { name: "Bob" }; // no address
console.log(bob.address.city);  // TypeError
console.log(bob.address?.city); // undefined (no error)
```

- Optional chaining `?.` short-circuits the **whole** rest of the chain

## Defaults with `??`

- `??` falls back only for `null` / `undefined`
- `||` falls back for **any** falsy value, including valid `0` and `""`

```js
const settings = { fontSize: 0, title: "" };

settings.fontSize || 16; // 16  WRONG - 0 was a real choice
settings.fontSize ?? 16; // 0   right

settings.title || "Untitled"; // "Untitled"  WRONG
settings.title ?? "Untitled"; // ""          right

user.address?.city ?? "Unknown"; // the pair, together
```

## Shorthand, Computed Keys, Methods

```js
const name = "Alice", age = 30;
const b = { name, age }; // shorthand properties

const field = "email";
const user = { name, [field]: "alice@example.com" }; // computed key
```

```js
const calculator = {
  value: 0,
  add(n) { this.value += n; }, // method shorthand
};
calculator.add(5);
console.log(calculator.value); // 5
```

## Iterating Over an Object

```js
const scores = { math: 90, science: 85, art: 95 };

Object.keys(scores);    // [ 'math', 'science', 'art' ]
Object.values(scores);  // [ 90, 85, 95 ]
Object.entries(scores); // [ ['math', 90], ... ]

for (const [subject, score] of Object.entries(scores)) {
  console.log(`${subject}: ${score}`);
}
```

## Checking for a Property

```js
const user = { name: "Alice", nickname: undefined };

Object.hasOwn(user, "name");     // true
Object.hasOwn(user, "email");    // false
Object.hasOwn(user, "nickname"); // true - it EXISTS, just undefined

user.email === undefined;        // true, but so is nickname
"name" in user;                  // true (also searches the prototype)
```

- `Object.hasOwn` is the modern replacement for `hasOwnProperty`

## Copying, Merging, Freezing

```js
const defaults = { theme: "light", fontSize: 14 };
const custom = { fontSize: 18 };

const settings = { ...defaults, ...custom }; // spread
// { theme: 'light', fontSize: 18 } - later sources win
```

- Spread and `Object.assign` make **shallow** copies (nested is shared)
- `structuredClone(obj)` deep-copies plain data
- `Object.freeze(obj)` makes it read-only

## Value vs Reference

![Two primitive variables in separate boxes, beside two object variables pointing at one shared object](../../diagrams/png/value-vs-reference.png)

- Primitives copy the value; objects copy the reference
- Spread gives a **shallow** copy; a nested object is still shared

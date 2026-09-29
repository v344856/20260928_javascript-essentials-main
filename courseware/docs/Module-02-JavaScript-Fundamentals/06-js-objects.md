# JavaScript Objects

An **object** is a collection of related data and behavior, stored as **key/value pairs**.
Where an array is an ordered list, an object is a labeled bag: each value has a **name** (called a
**property** or **key**) that you use to look it up.

Objects are the backbone of JavaScript. Almost everything that isn't a primitive is an object.

![Two primitive variables in separate boxes, beside two object variables pointing at one shared object](../../diagrams/png/value-vs-reference.png)

*Primitives copy the value. Objects copy the reference, so two names share one object.*

---

## Object Literals

The most common way to create an object is with an **object literal**, which is curly braces with
`key: value` pairs inside.

```js
const user = {
  name: "Alice",
  age: 30,
  isAdmin: false,
};

console.log(user); // { name: 'Alice', age: 30, isAdmin: false }
```

* Keys are strings (you can usually write them without quotes).
* Values can be any type: numbers, strings, booleans, arrays, functions, even other objects.
* Pairs are separated by commas.

An object with no properties is just `{}`:

```js
const empty = {};
```

---

## Property Access: Dot vs Bracket

There are two ways to read a property.

### Dot notation

The everyday choice. Clean and readable when you know the key name ahead of time.

```js
const user = { name: "Alice", age: 30 };

console.log(user.name); // "Alice"
console.log(user.age);  // 30
```

### Bracket notation

Use square brackets when the key is stored in a **variable**, or when the key has characters that
aren't valid in dot notation (spaces, dashes, etc.).

```js
const user = { name: "Alice", "favorite color": "blue" };

const key = "name";
console.log(user[key]);              // "Alice"  (key came from a variable)
console.log(user["favorite color"]); // "blue"   (space in the key)
```

A missing property returns `undefined` (it does not throw an error):

```js
console.log(user.email); // undefined
```

---

## Adding, Updating, and Deleting Properties

Objects are **mutable**: you can change them after creation.

```js
const user = { name: "Alice" };

// add
user.age = 30;

// update
user.name = "Alice Smith";

// delete
delete user.age;

console.log(user); // { name: 'Alice Smith' }
```

Note that `const` stops you from **reassigning** the variable `user`, but it does **not** freeze the
object's contents; you can still add and change properties.

```js
const user = { name: "Alice" };
user.name = "Bob";      // OK - changing a property
// user = {};           // Error - reassigning the const variable
```

---

## Nested Objects

Property values can themselves be objects, letting you model structured data.

```js
const user = {
  name: "Alice",
  address: {
    city: "Seattle",
    zip: "98101",
  },
};

console.log(user.address.city); // "Seattle"
```

If an intermediate object might be missing, **optional chaining** (`?.`) reads safely instead of
throwing:

```js
const user = { name: "Bob" }; // no address

console.log(user.address.city);  // TypeError: Cannot read properties of undefined
console.log(user.address?.city); // undefined (no error)
```

Read `?.` as "if the thing on my left is `null` or `undefined`, stop and hand back `undefined`;
otherwise carry on." It short-circuits the *whole* rest of the chain, so one `?.` protects everything
after it:

```js
const company = { name: "Acme" }; // no ceo at all

company.ceo?.address.city; // undefined - no error, even though .address.city follows
```

It works for calls and for bracket access too:

```js
user.greet?.();        // calls greet only if it exists
user.address?.["zip"]; // bracket form
```

Use it where a value is **legitimately optional**. Do not sprinkle it everywhere: writing `a?.b?.c`
when `a` and `b` are always present just hides the bug on the day one of them is missing.

### Supplying a fallback with `??`

Optional chaining gives you `undefined`. Usually you want a default instead, which is what the
**nullish coalescing** operator `??` is for: it returns the right-hand side only when the left is
`null` or `undefined`:

```js
const settings = { theme: "dark", fontSize: 0, title: "" };

const theme = settings.theme ?? "light";       // "dark"
const spacing = settings.spacing ?? 8;         // 8   - missing, so the default
```

The two pair up naturally:

```js
const city = user.address?.city ?? "Unknown"; // "Unknown"
```

**Why not `||`?** Because `||` falls back on *any* falsy value, and `0` and `""` are falsy but
perfectly valid data:

```js
settings.fontSize || 16; // 16  - WRONG, the user really did choose 0
settings.fontSize ?? 16; // 0   - right

settings.title || "Untitled"; // "Untitled" - WRONG, the empty title was deliberate
settings.title ?? "Untitled"; // ""         - right
```

Use `??` when the only bad values are `null` and `undefined`, and `||` when you genuinely want to
replace every falsy value.

---

## Shorthand Properties

When a variable name matches the property name you want, you can skip the repetition.

```js
const name = "Alice";
const age = 30;

// longhand
const a = { name: name, age: age };

// shorthand - same result
const b = { name, age };

console.log(b); // { name: 'Alice', age: 30 }
```

---

## Computed Property Names

You can build a key **from an expression** by wrapping it in square brackets inside the literal.

```js
const field = "email";

const user = {
  name: "Alice",
  [field]: "alice@example.com", // key comes from the variable
};

console.log(user.email); // "alice@example.com"
```

---

## Methods (Functions on Objects)

A property whose value is a function is called a **method**. There's a shorthand for defining them.

```js
const calculator = {
  value: 0,

  // method shorthand - no "function" keyword needed
  add(n) {
    this.value += n;
  },

  reset() {
    this.value = 0;
  },
};

calculator.add(5);
calculator.add(3);
console.log(calculator.value); // 8
calculator.reset();
console.log(calculator.value); // 0
```

Inside a method, `this` refers to the object the method was called on (`calculator` here).

---

## Iterating Over an Object

The `Object` built-in provides three handy methods to turn an object into arrays you can loop over.

```js
const scores = { math: 90, science: 85, art: 95 };

console.log(Object.keys(scores));   // [ 'math', 'science', 'art' ]
console.log(Object.values(scores)); // [ 90, 85, 95 ]
console.log(Object.entries(scores)); // [ ['math', 90], ['science', 85], ['art', 95] ]
```

`Object.entries` pairs nicely with destructuring in a `for...of` loop:

```js
for (const [subject, score] of Object.entries(scores)) {
  console.log(`${subject}: ${score}`);
}
// math: 90
// science: 85
// art: 95
```

---

## Copying and Merging: `Object.assign` and Spread

To combine objects or make a **shallow copy**, use the spread operator (`...`) or `Object.assign`.

```js
const defaults = { theme: "light", fontSize: 14 };
const custom = { fontSize: 18 };

// spread - modern and readable
const settings = { ...defaults, ...custom };
console.log(settings); // { theme: 'light', fontSize: 18 }

// Object.assign - same idea, copies into the first object
const merged = Object.assign({}, defaults, custom);
console.log(merged); // { theme: 'light', fontSize: 18 }
```

Later sources win when keys collide, which is how `custom` overrides `fontSize`.

> **Shallow copy caveat:** nested objects are shared, not cloned. Changing a nested object in the
> copy also changes it in the original. For a deep copy of plain data, use `structuredClone(obj)`.

---

## Freezing an Object: `Object.freeze`

`Object.freeze` makes an object **read-only**: you can't add, change, or delete properties.

```js
const config = Object.freeze({ version: "1.0" });

config.version = "2.0"; // silently ignored (throws in strict mode)
console.log(config.version); // "1.0"
```

Use it to protect constants that should never change at runtime.

---

## Checking for a Property: `Object.hasOwn`

To test whether an object **actually has** a property (not just inherited one), use `Object.hasOwn`.
It's the modern replacement for the older `hasOwnProperty` call.

```js
const user = { name: "Alice" };

console.log(Object.hasOwn(user, "name"));  // true
console.log(Object.hasOwn(user, "email")); // false
```

This is more reliable than checking `user.email !== undefined`, because a property can legitimately
be set to `undefined`.

---

## Summary

* An **object** stores data as **key/value pairs** created with an object literal `{ ... }`.
* Read properties with **dot** notation, or **bracket** notation when the key is dynamic or unusual.
* Objects are **mutable**: add, update, and `delete` properties freely, even on `const` objects.
* Use **shorthand properties**, **computed keys**, and **method shorthand** to write objects concisely.
* `Object.keys` / `values` / `entries` turn objects into arrays for iteration.
* Copy or merge with **spread** (`...`) or `Object.assign` (shallow copies).
* `Object.freeze` makes an object read-only; `Object.hasOwn` safely checks for a property.
* **Optional chaining** `?.` stops a lookup at the first `null`/`undefined` instead of throwing, and
  short-circuits the rest of the chain.
* **Nullish coalescing** `??` supplies a fallback for `null`/`undefined` only; unlike `||`, it leaves
  valid `0` and `""` alone. The pair reads `a?.b ?? fallback`.

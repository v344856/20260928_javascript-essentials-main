# Type Aliases and Interfaces

Real programs pass around structured data, such as a user, a product, or an order. TypeScript gives you two ways to name and describe the *shape* of an object: **type aliases** (`type`) and **interfaces** (`interface`). This chapter covers both, when to reach for each, and the property modifiers (optional, readonly, index signatures) that make them expressive.

![Types ordered from any and unknown down to literal types and never, with unions and intersections](../../diagrams/png/ts-type-space.png)

*A type is the **set** of values it allows: unions widen it, intersections narrow it.*

---

## Object Types

Before naming anything, know that you can describe an object's shape inline:

```ts
let user: { name: string; age: number } = {
  name: "Ada",
  age: 30,
};

user.age = "thirty";
// Error: Type 'string' is not assignable to type 'number'.
```

That works, but repeating the shape everywhere is tedious and error-prone. Both `type` and `interface` let you give the shape a **name** and reuse it.

---

## Type Aliases (`type`)

A **type alias** gives a name to *any* type: an object shape, a union, a primitive, a tuple, anything:

```ts
type User = {
  name: string;
  age: number;
};

const ada: User = { name: "Ada", age: 30 };
```

Because a `type` can name *any* type, it is the more flexible tool. Only aliases can name unions, tuples, and primitives:

```ts
type ID = number | string;          // union
type Point = [number, number];      // tuple
type Direction = "up" | "down";     // literal union
```

---

## Interfaces (`interface`)

An **interface** describes the shape of an object. For object shapes it looks almost identical to a type alias:

```ts
interface User {
  name: string;
  age: number;
}

const ada: User = { name: "Ada", age: 30 };
```

The difference: an `interface` can *only* describe object-like shapes (objects, classes, functions). It cannot name a union or a primitive. In exchange it offers a couple of object-oriented conveniences we'll see below (`extends` and declaration merging).

---

## Optional and Readonly Properties

Both `type` and `interface` support the same property modifiers.

A **`?`** marks a property optional, meaning it may be present or absent:

```ts
interface User {
  name: string;
  age: number;
  nickname?: string; // optional
}

const a: User = { name: "Ada", age: 30 };              // OK, no nickname
const b: User = { name: "Al", age: 40, nickname: "Al" }; // OK
```

A **`readonly`** property can be set when the object is created but not changed afterward:

```ts
interface Account {
  readonly id: number;
  balance: number;
}

const acct: Account = { id: 1, balance: 100 };
acct.balance = 150; // OK
acct.id = 2;
// Error: Cannot assign to 'id' because it is a read-only property.
```

`readonly` is a compile-time guard: it prevents accidental reassignment in your code.

---

## Extending and Merging

### Interfaces extend with `extends`

An interface can build on another using **`extends`**, inheriting its members:

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

const rex: Dog = { name: "Rex", breed: "Corgi" }; // needs both properties
```

### Type aliases combine with `&` (intersection)

Type aliases achieve the same result with an **intersection type** (`&`), which merges shapes:

```ts
type Animal = { name: string };
type Dog = Animal & { breed: string };

const rex: Dog = { name: "Rex", breed: "Corgi" };
```

### Declaration merging (interfaces only)

Interfaces have a unique behavior: declaring the **same interface name twice merges** the two into one. Type aliases cannot do this; a duplicate `type` name is an error.

```ts
interface Box {
  width: number;
}
interface Box {
  height: number;
}
// Box now requires BOTH width and height.

const b: Box = { width: 10, height: 20 };
```

Merging is mostly useful for extending types from libraries; you rarely need it in everyday app code.

---

## Index Signatures

Sometimes you don't know the property *names* ahead of time; you just know every key is a string and every value is, say, a number. An **index signature** describes that:

```ts
interface ScoreBoard {
  [player: string]: number;
}

const scores: ScoreBoard = {};
scores["Ada"] = 90;
scores["Alan"] = 85;
scores["Grace"] = "high";
// Error: Type 'string' is not assignable to type 'number'.
```

The `[player: string]: number` line reads as "any string key maps to a number value." Index signatures let you type dictionary-like objects and maps whose keys are dynamic.

---

## Discriminated Unions

A **discriminated union** is a union of object types that all share one common **literal** property,
the *discriminant*, that tags which member you have. It is the cleanest way to model "one of several
shapes," and TypeScript narrows it beautifully.

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":    return Math.PI * shape.radius ** 2;
    case "square":    return shape.side ** 2;
    case "rectangle": return shape.width * shape.height;
  }
}
```

Switching on the shared `kind` tag narrows each `case` to exactly one member, so `shape.radius` is
available in the `"circle"` branch and nowhere else. Add a new member to the union and TypeScript can
flag every `switch` that hasn't handled it, which is exhaustiveness checking, close to free.

---

## When to Use Which

The two features overlap heavily for object shapes, and either is fine. Common guidance:

- **Reach for `interface`** when describing the shape of an **object or class**, especially if you expect it to be **extended** or **implemented** by a class (see [Classes and Abstract Classes](./04-abstract-classes.md)). Interfaces give clearer error messages and support `extends`/merging.
- **Reach for `type`** when you need something an interface **can't express**: unions, tuples, primitives, or more complex composed types.

Many teams pick one and stay consistent. A reasonable default: **interfaces for object/class shapes, type aliases for everything else.** The important thing is consistency within a codebase, not the choice itself.

---

## Summary

* Both **`type`** and **`interface`** let you **name a reusable shape** instead of repeating it inline.
* **`type`** can name *any* type: object shapes, **unions**, **tuples**, primitives; **`interface`** describes only **object-like** shapes.
* Both support **`?`** (optional) and **`readonly`** property modifiers.
* Interfaces extend with **`extends`**; type aliases combine with **`&`** (intersection). Only interfaces support **declaration merging** (same name declared twice).
* An **index signature** (`[key: string]: T`) types objects with dynamic keys, like dictionaries.
* Default guidance: **`interface` for object/class shapes, `type` for unions and everything else**, and above all, be consistent.

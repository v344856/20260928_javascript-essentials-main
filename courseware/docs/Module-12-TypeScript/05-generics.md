# Generics

**Generics** let you write code that works with *many* types while staying fully type-safe. A generic is a **type parameter**, a placeholder for a type that the caller fills in, just as a function parameter is a placeholder for a value. Generics are how TypeScript delivers reusable containers, utilities, and data structures without falling back to `any`.

![Three calls binding T to string, number and User, each carrying that type through to the return](../../diagrams/png/generics-type-flow.png)

*`T` is bound at the call site and flows through to the return type.*

---

## Why Generics? The Problem They Solve

Suppose you want a function that returns whatever you give it (an "identity" function). Without generics you have two bad options.

**Option 1: lock it to one type.** That works, but it is reusable for nothing else:

```ts
function identityNumber(value: number): number {
  return value;
}
```

**Option 2: use `any`.** That is reusable, but you lose all type safety:

```ts
function identity(value: any): any {
  return value;
}

const result = identity("hello");
result.toFixed(2); // no error at compile time, CRASHES at runtime
```

With `any`, TypeScript no longer knows the return type, so it can't catch the mistake. Generics give you the best of both: **reuse *and* safety.**

---

## Generic Functions

A generic function declares a **type parameter** in angle brackets (`<T>`) and uses it like a real type. By convention the parameter is named `T` (for "Type"):

```ts
function identity<T>(value: T): T {
  return value;
}
```

`T` is a placeholder. When you call the function, TypeScript **infers** what `T` should be from the argument:

```ts
const a = identity("hello"); // T is string; a is string
const b = identity(42);      // T is number; b is number

a.toUpperCase(); // OK - TypeScript knows a is a string
b.toUpperCase();
// Error: Property 'toUpperCase' does not exist on type 'number'.
```

The return type tracks the input type exactly, with no `any` and no crashes. You can also specify `T` explicitly when inference isn't enough:

```ts
const c = identity<string>("world"); // T explicitly set to string
```

### A more useful example

A function that returns the first element of an array works for any element type:

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}

first([1, 2, 3]);       // inferred number | undefined
first(["a", "b"]);      // inferred string | undefined
```

---

## Constraints with `extends`

Sometimes a generic shouldn't accept *literally any* type; it needs the type to have certain properties. A **constraint** (`extends`) limits what `T` can be:

```ts
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

longest("apple", "kiwi");     // OK - strings have .length
longest([1, 2, 3], [4, 5]);   // OK - arrays have .length
longest(10, 20);
// Error: Argument of type 'number' is not assignable to
//        parameter of type '{ length: number }'.
```

`T extends { length: number }` reads as "`T` can be any type, *as long as* it has a numeric `length` property." Inside the function you may safely use `.length` because the constraint guarantees it. Constraints are what make generics both flexible **and** safe.

---

## Generic Interfaces and Type Aliases

Types can be generic too. A generic interface takes a type parameter and uses it in its members:

```ts
interface ApiResponse<T> {
  status: number;
  data: T;
}

const userResponse: ApiResponse<{ name: string }> = {
  status: 200,
  data: { name: "Ada" },
};

userResponse.data.name; // string - the T is remembered
```

The same works with a `type` alias:

```ts
type Pair<K, V> = {
  key: K;
  value: V;
};

const entry: Pair<string, number> = { key: "age", value: 30 };
```

Note you can have **multiple** type parameters (`<K, V>`), each filled in independently.

---

## Generic Classes

A class can carry a type parameter, letting one class definition work for any content type. This is exactly how built-in containers like `Array<T>` and `Map<K, V>` are typed.

```ts
class Box<T> {
  private contents: T;

  constructor(value: T) {
    this.contents = value;
  }

  get(): T {
    return this.contents;
  }

  set(value: T): void {
    this.contents = value;
  }
}

const numberBox = new Box(123);   // Box<number>
numberBox.get();      // number
numberBox.set(456);   // OK
numberBox.set("no");
// Error: Argument of type 'string' is not assignable to parameter of type 'number'.

const stringBox = new Box("hi");  // Box<string>
stringBox.get().toUpperCase();    // OK
```

One `Box` definition, fully type-safe for every content type. That is the payoff of generics: **write it once, use it with any type, keep every guarantee.**

---

## A Small Generic Container: `Stack<T>`

A slightly larger example is a type-safe stack (last-in, first-out). It shows generics, constraints-free reuse, and inferred return types working together:

```ts
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }
}

const numbers = new Stack<number>();
numbers.push(1);
numbers.push(2);
numbers.pop();   // 2  (typed as number | undefined)
numbers.size;    // 1
numbers.push("three");
// Error: Argument of type 'string' is not assignable to parameter of type 'number'.

const words = new Stack<string>();
words.push("hello");
words.peek()?.toUpperCase(); // "HELLO" - TypeScript knows it's a string
```

The `Stack` code was written **once** but is reusable for numbers, strings, objects, or anything else, and every use is checked. Without generics you'd either duplicate the class per type or lose safety with `any`.

---

## Summary

* **Generics** are **type parameters** (`<T>`), placeholders a caller fills in, giving you **reuse without losing type safety**, unlike `any`.
* A **generic function** (`function identity<T>(value: T): T`) infers `T` from its arguments and keeps the return type accurate.
* **Constraints** (`<T extends ...>`) restrict what `T` can be so you can safely use its properties, which is flexible *and* safe.
* **Interfaces, type aliases, and classes** can all be generic, with one or more type parameters (`<K, V>`).
* Generic classes power **type-safe containers** (`Box<T>`, `Stack<T>`, and the built-in `Array<T>`/`Map<K,V>`): write the definition once, use it with any type, keep every guarantee.

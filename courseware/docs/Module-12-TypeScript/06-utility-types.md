# Utility Types

TypeScript ships with a set of built-in **utility types**, generic helpers that transform an existing type into a new one. Instead of hand-writing a slightly different version of a type ("the same `User` but every field optional", "the same `User` but only `id` and `name`"), you derive it. Utility types keep your types **DRY** (Don't Repeat Yourself): change the original and every derived type updates automatically.

Every utility type in this chapter is generic: you pass it a type in angle brackets, and it hands you a transformed one.

Throughout, we'll transform this base type:

```ts
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}
```

![One interface with arrows to Partial, Required, Readonly, Pick, Omit and Record](../../diagrams/png/utility-types.png)

*One source of truth in, several derived shapes out.*

---

## `Partial<T>`: Make Every Property Optional

`Partial<T>` produces a copy of `T` where **every property is optional** (`?`). This is perfect for "update" functions that change only some fields:

```ts
type PartialUser = Partial<User>;
// Equivalent to:
// { id?: number; name?: string; email?: string; age?: number }

function updateUser(id: number, changes: Partial<User>): void {
  // changes may contain any subset of User's fields
}

updateUser(1, { email: "new@example.com" }); // OK - only one field
updateUser(1, {});                           // OK - no changes
```

---

## `Required<T>`: Make Every Property Required

`Required<T>` is the opposite of `Partial`: it strips **all** optional markers, making every property mandatory. Useful when you start with a type full of optionals but need a fully-populated version:

```ts
interface Config {
  host?: string;
  port?: number;
}

type FullConfig = Required<Config>;
// { host: string; port: number }  - both now required

const c: FullConfig = { host: "localhost" };
// Error: Property 'port' is missing.
```

---

## `Readonly<T>`: Make Every Property Immutable

`Readonly<T>` marks every property `readonly`, so the object can't be modified after creation. Great for values you want to protect from accidental mutation:

```ts
type FrozenUser = Readonly<User>;

const u: FrozenUser = { id: 1, name: "Ada", email: "a@example.com", age: 30 };
u.name = "Grace";
// Error: Cannot assign to 'name' because it is a read-only property.
```

---

## `Pick<T, Keys>`: Keep Only Some Properties

`Pick<T, Keys>` builds a new type containing **only** the named properties. You pass the source type and a union of the keys to keep:

```ts
type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string }

const preview: UserPreview = { id: 1, name: "Ada" }; // email/age not allowed
```

Use `Pick` when a function or component needs just a slice of a larger type.

---

## `Omit<T, Keys>`: Remove Some Properties

`Omit<T, Keys>` is the mirror of `Pick`: it keeps everything **except** the named keys. This is handy for "create" payloads where the server generates certain fields:

```ts
type NewUser = Omit<User, "id">;
// { name: string; email: string; age: number }  - no id

function createUser(data: NewUser): User {
  return { id: Date.now(), ...data };
}

createUser({ name: "Ada", email: "a@example.com", age: 30 }); // OK, no id needed
```

`Pick` and `Omit` reach the same result from opposite directions; choose whichever names fewer keys.

---

## `Record<Keys, Value>`: Build a Map Type

`Record<Keys, Value>` constructs an object type whose keys are `Keys` and whose values are all `Value`. It's the clean way to type dictionaries and lookup tables:

```ts
type Roles = "admin" | "editor" | "viewer";

type Permissions = Record<Roles, boolean>;
// { admin: boolean; editor: boolean; viewer: boolean }

const perms: Permissions = {
  admin: true,
  editor: true,
  viewer: false,
}; // TypeScript requires ALL three keys

type PageViews = Record<string, number>;
const views: PageViews = { home: 100, about: 40 }; // any string key -> number
```

---

## `ReturnType<T>`: Extract a Function's Return Type

`ReturnType<T>` pulls out the type a function **returns**, without your having to write it separately. Note the special `typeof`: it takes the *type* of the function value:

```ts
function createUser(name: string) {
  return { id: 1, name, active: true };
}

type CreatedUser = ReturnType<typeof createUser>;
// { id: number; name: string; active: boolean }

const u: CreatedUser = { id: 5, name: "Ada", active: false };
```

This keeps a derived type perfectly in sync with the function it comes from: change what `createUser` returns and `CreatedUser` follows automatically. (A companion, `Parameters<T>`, extracts a function's parameter types as a tuple.)

---

## Combining Utility Types

Utility types compose: the output of one can feed the next. This is where they shine:

```ts
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// A create payload with no id, and every remaining field optional:
type DraftUser = Partial<Omit<User, "id">>;
// { name?: string; email?: string; age?: number }

const draft: DraftUser = { name: "Ada" }; // OK
```

Because these are all derived from `User`, editing `User` once updates `DraftUser`, `UserPreview`, `NewUser`, and every other derived type, with no manual syncing. That is the reason to derive types rather than write each one out by hand: describe your data once, and transform it everywhere.

---

## Summary

* **Utility types** are built-in generics that **transform an existing type** into a new one, keeping your types DRY.
* **`Partial<T>`** makes every property optional; **`Required<T>`** makes every property mandatory; **`Readonly<T>`** makes every property immutable.
* **`Pick<T, Keys>`** keeps only the named properties; **`Omit<T, Keys>`** keeps everything except them.
* **`Record<Keys, Value>`** builds an object type (a map/dictionary) from a set of keys to a value type.
* **`ReturnType<typeof fn>`** extracts a function's return type so derived types stay in sync with the source.
* Utility types **compose** (e.g. `Partial<Omit<User, "id">>`), and because they derive from one base type, editing the base updates every derived type automatically.

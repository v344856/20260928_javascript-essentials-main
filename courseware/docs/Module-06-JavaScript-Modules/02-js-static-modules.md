# JavaScript Static (ES2015) Modules

ES2015 gave JavaScript a built-in way to split code across files using `import` and `export`. These are called **static modules** because the structure of what a file imports and exports is fixed at parse time, before any code runs. There is no runtime decision about what to load, which lets tools analyze, bundle, and optimize your code ahead of time.

This chapter is a tour of the **syntax** on its own; the tools and environments that run it come later. Every module has its own scope: names you don't export stay private to the file.

---

## Exporting Values

A module shares values in two ways: **named exports** (as many as you like, each identified by name) and a single **default export**.

### Named exports

You can export things inline as you declare them:

```js
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export class Person {
  constructor(name) {
    this.name = name;
  }
}
```

Or declare them first and export a list at the end:

```js
const x = 1;
const y = 2;

function multiply(a, b) {
  return a * b;
}

export { x, y, multiply };
```

You can rename a binding as you export it with `as`:

```js
const secret = 42;

export { secret as answer };
```

### Default export

Each module may have **one** default export, a natural fit when a file's whole job is to provide a single function, object, or class.

```js
export default function greet(name) {
  console.log("Hello, " + name);
}
```

The default can be any value, not just a function:

```js
const config = { debug: true };
export default config;
```

or a class:

```js
export default class Animal {}
```

A second `export default` in the same module is a syntax error; there can only be one.

---

## Importing Values

### Named imports

Use curly braces and the exact exported names:

```js
import { PI, add } from "./math.js";
```

Rename on the way in with `as`:

```js
import { add as sum } from "./math.js";
```

### The default import

The default export comes in without braces, and you pick whatever name you want for it:

```js
import greet from "./greet.js";
```

Here `greet` refers to whatever the module exported with `export default`, regardless of what it was named there.

### Both default and named together

```js
import greet, { PI, add } from "./module.js";
```

### Namespace import

Pull every named export into a single object:

```js
import * as math from "./math.js";

// math.PI, math.add(...)
```

This gathers all the **named** exports as properties of `math`. The default export is not included.

### Side-effect-only import

Sometimes you just want a module to run (to register something or set up global state) without importing any of its bindings:

```js
import "./setup.js";
```

---

## Re-exporting

A module can pass along another module's exports without importing them into its own scope first. This is how you build a single "barrel" file that re-exports from many others.

Re-export specific bindings (optionally renaming):

```js
export { add, PI } from "./math.js";
export { add as sum } from "./math.js";
```

Re-export every named export:

```js
export * from "./math.js";
```

You can mix your own exports with re-exported ones:

```js
export const version = "1.0.0";
export * from "./math.js";
```

---

## Import and Export Are Top-Level Only

Static `import` and `export` must sit at the **top level** of a module. They cannot go inside a function, an `if` statement, a loop, or any other block:

```js
// valid - top level
import { add } from "./math.js";
```

```js
// invalid - not allowed inside a block
if (true) {
  import { add } from "./math.js";
}
```

That restriction is exactly what makes these modules **static**: because imports and exports can only appear at the top level, the full module structure is known before the code runs. (When you do need to load a module conditionally or on demand, that's the job of dynamic `import()`, covered in [Dynamic (ES2020) Modules](./03-js-dynamic-modules.md).)

---

## Summary

- ES2015 **static modules** organize code across files with `import` and `export`, each file having its own scope.
- **Named exports** share values by name, either inline (`export const ...`) or as a list (`export { x, y }`), with optional `as` renaming.
- A module may have **one default export**, imported without braces under any name you choose.
- Import forms: named (`import { a } from ...`), default (`import x from ...`), both together, namespace (`import * as ns`), and side-effect-only (`import "./file.js"`).
- **Re-exporting** (`export { ... } from` / `export * from`) forwards another module's exports, which is how barrel files are built.
- `import` and `export` are **top-level only**, so the module structure is fixed at parse time, which is what "static" means.

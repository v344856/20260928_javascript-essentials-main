# Node.js and JavaScript Modules

Node.js supports both **static ES modules** (`import` / `export`) and **dynamic imports** (`import()`). The syntax is the same as in the browser; the main difference is that Node needs to know a file is an ES module in the first place, because it also supports the older CommonJS (`require` / `module.exports`) system. This chapter is a short, syntax-focused overview.

---

## Static ES Modules in Node.js

Once Node treats a file as an ES module, the `import` / `export` syntax is exactly what you'd write in the browser.

### Telling Node a file is an ES module

Node treats a file as an ES module when either:

- The nearest `package.json` has `"type": "module"`, or
- The file uses the `.mjs` extension.

(Interop with CommonJS and older Node versions is an environment-setup concern, so we'll set it aside here.) The examples below assume you're in an ES module file.

### Exporting

Named exports:

```js
// math.js
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}
```

Default export:

```js
// greet.js
export default function greet(name) {
  console.log(`Hello, ${name}!`);
}
```

Export list:

```js
// utils.js
const x = 1;
const y = 2;

function multiply(a, b) {
  return a * b;
}

export { x, y, multiply };
```

### Importing

Named imports:

```js
// main.js
import { PI, add } from "./math.js";

console.log(add(2, 3), PI);
```

Default import:

```js
import greet from "./greet.js";

greet("Alice");
```

Both default and named together:

```js
import greet, { PI, add } from "./module.js";
```

Namespace import:

```js
import * as math from "./math.js";

console.log(math.PI);
console.log(math.add(3, 4));
```

As in the browser, static imports must be **top-level only**, not inside functions or conditions.

---

## Dynamic Modules With `import()` in Node.js

Dynamic import works in Node just as it does in the browser: `import()` loads a module at runtime and returns a **promise**.

### Inside an ES module

```js
// main.mjs, or main.js in a "type": "module" package
async function loadMath() {
  const math = await import("./math.js");
  console.log(math.PI);
  console.log(math.add(5, 6));
}

loadMath();
```

The same thing with `.then()`:

```js
import("./math.js")
  .then((math) => {
    console.log(math.PI);
  })
  .catch((error) => {
    console.error("Failed to load module:", error);
  });
```

Either way, `math` is the **module namespace object**: named exports are properties like `math.PI` and `math.add`, and the default export is `math.default`.

### From a CommonJS file

A CommonJS file can't use static `import`, but it *can* use dynamic `import()` to load an ES module:

```js
// index.cjs (CommonJS)
async function main() {
  const math = await import("./math.js");
  console.log(math.add(1, 2));
}

main();
```

This is a handy bridge when you're gradually migrating a codebase from `require` to ES modules.

---

## Mixing Static and Dynamic Imports

You can combine both styles in one ES module, loading the core up front and deferring optional pieces:

```js
// app.js as an ES module
import { setup } from "./setup.js";

setup();

async function enableDebug() {
  if (process.env.DEBUG === "true") {
    const debugModule = await import("./debug.js");
    debugModule.startDebugPanel();
  }
}

enableDebug();
```

Here `setup` loads **statically**, while `debug.js` loads **dynamically** only when the `DEBUG` environment variable is set.

---

## Summary

- Node treats a file as an **ES module** when the nearest `package.json` has `"type": "module"` or the file ends in `.mjs`.
- **Static ES modules** use `import` / `export` at the **top level** of an ES module file, with the same syntax as the browser.
- **Dynamic `import()`** returns a **promise**, works with `async/await`, and can be called **anywhere**, including from a CommonJS file, which makes it a useful bridge while migrating off `require`.
- Static imports resolve at load time; dynamic imports resolve **when `import()` is called**, letting you load code on demand.

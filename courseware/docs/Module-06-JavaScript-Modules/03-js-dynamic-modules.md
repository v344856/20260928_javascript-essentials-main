# JavaScript Dynamic (ES2020) Modules

Static `import` / `export` fixes a module's dependencies at parse time and requires them at the top level. Sometimes that's too rigid, because you might want to load a module only when a condition is met, only after a user acts, or only on the code path that actually needs it. **Dynamic import**, standardized in ECMAScript 2020, covers exactly that case: it loads a module at runtime, on demand.

This chapter walks through the syntax and the core ideas.

---

## The `import()` Function

A static import is a declaration, always written the same way:

```js
import { something } from "./module.js";
```

A dynamic import looks like a **function call** instead:

```js
import("./module.js").then((module) => {
  // use module
});
```

Three things make it different from static import:

- `import()` is **asynchronous**: it doesn't block while the module loads.
- It returns a **promise**.
- That promise resolves to a **module namespace object**, an object whose properties are the module's exports.

---

## Using Dynamic Import With Promises

Because `import()` returns a promise, you handle it with `.then()` and `.catch()`:

```js
import("./math.js")
  .then((math) => {
    console.log(math.PI);
    console.log(math.add(2, 3));
  })
  .catch((error) => {
    console.error("Failed to load module:", error);
  });
```

Given a `math.js` like this:

```js
export const PI = 3.14;
export function add(a, b) { return a + b; }
export default function greet() {}
```

the resolved object exposes:

- `math.PI`: a named export
- `math.add`: a named export
- `math.default`: the default export

---

## Using Dynamic Import With async/await

Since the result is a promise, `await` reads more naturally than `.then()`:

```js
async function loadMath() {
  try {
    const math = await import("./math.js");
    console.log(math.PI);
    console.log(math.add(2, 3));
  } catch (error) {
    console.error("Failed to load module:", error);
  }
}

loadMath();
```

This does the same thing as the promise version; `await` is just a cleaner way to write it.

---

## Where Dynamic Import Is Allowed

Static `import` is top-level only. Dynamic `import()`, being an ordinary function call, can appear **anywhere**: inside functions, `if` statements, event handlers, or after some condition is met.

That deferral is the point: the module is loaded only once you know you need it.

```js
async function setup() {
  if (window.location.search.includes("debug")) {
    const debugModule = await import("./debug-tools.js");
    debugModule.enableDebugMode();
  }
}
```

Here `debug-tools.js` is fetched only when the URL asks for debug mode, so visitors who never trigger it never download it.

---

## Named and Default Exports

A dynamic import always hands you the whole **module namespace object**, so you reach into it for the exports you want:

```js
const module = await import("./module.js");
```

Destructure the named exports:

```js
const { foo, bar } = module;
```

And read the default export off the `default` property:

```js
const main = module.default;
main();
```

---

## Summary

- **Dynamic import** loads a module at runtime with the `import()` function, standardized in **ECMAScript 2020**.
- `import()` returns a **promise** that resolves to a **module namespace object**; use it with `.then()` or `async/await`.
- Named exports are properties of that object; the default export is its `default` property.
- Unlike static `import`, `import()` can appear **anywhere**: inside functions, conditions, and event handlers.
- Reach for it when you want to load code **on demand** (conditionally, lazily, or only on the path that needs it) rather than fixing every dependency at parse time.

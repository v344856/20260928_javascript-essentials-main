# JavaScript & TypeScript Essentials: Demos

Each demo is a **self-contained folder** named with a number (course order) and a topic. Every folder
has its own `README.md` with a short description and exact run steps, plus its own `package.json` and
lint/format config, so you can open it in its own VS Code window. Nothing is shared, and the script
demos still **run with no install step**: `npm install` is only needed for `npm run lint` and
`npm run format`.

There are **35 demos**: **01-30 are the core set**, and **31-35 are held in reserve**, going deeper.
Each demo has a same-numbered activity in [`../activities/`](../activities/) that teaches the same
concept on different content.

> Demos `31`-`35` are **held in reserve**: performed only if the class finishes `01`-`30`. Note for
> instructors: `31`, `32` and `34` are the only coverage of outline items IV.G, IV.F and IX.D, so if a
> delivery does not reach them, mention those topics inside the neighboring core pair. The teaching
> guide says where.

## How to run

- **Node script demos**: plain Node, no dependencies:
  ```bash
  cd NN_name
  node index.js
  ```
- **The modules demo (20)**: same command. It is an ES module (`{ "type": "module" }` in its
  `package.json`) and reaches a CommonJS `.cjs` file through `createRequire`, so one run shows both
  module systems.
- **TypeScript demos (27-30, 35)**: run the `.ts` file directly with `tsx` (no build step):
  ```bash
  cd NN_name
  npx tsx index.ts
  ```
- **Browser demos (21-23, 25)**: served over http (open DevTools → Console with F12 to see output):
  ```bash
  cd NN_name
  npx http-server -o
  ```
  Demo **23** also needs a mock REST API in a separate terminal first:
  ```bash
  npx json-server db.json --port 3000
  ```

## Index

### Types, Variables & Operators
1. [types-and-variables](./01_types-and-variables/): `typeof` and dynamic typing; `let`/`const`/`var` and block scope; expression evaluation
2. [operators-and-strings](./02_operators-and-strings/): arithmetic operators, `===` vs `==`, concatenation vs. template literals
3. [objects](./03_objects/): object literals, dot/bracket access, `Object.hasOwn`/`keys`/`entries`, spread, `Object.freeze`

### Control Flow
4. [conditionals](./04_conditionals/): `if`/`else if`, `switch`, ternary
5. [loops](./05_loops/): `for`, `while`, `do…while`, `for…of`, `forEach`, `break`/`continue`

### Arrays & Functions
6. [arrays](./06_arrays/): literals and mixed types, `push`/`pop`/`splice`, `split`/`join`, `includes`/`indexOf`
7. [arrays-map-filter-reduce](./07_arrays-map-filter-reduce/): `map`, `filter`, `reduce` and `forEach`
8. [functions](./08_functions/): declarations vs. expressions vs. arrows, hoisting, defaults, rest & spread
9. [destructuring-rest-spread](./09_destructuring-rest-spread/): array and object destructuring, rest, spread, parameter destructuring
10. [closures](./10_closures/): counter factory, private state, the `var`-in-loop pitfall, memoize

### Classes, `this` & Errors
11. [classes](./11_classes/): class syntax, constructor, methods, `#private` fields, get/set validation
12. [classes-inheritance](./12_classes-inheritance/): `extends`, `super`, method override, `static` members, the prototype chain
13. [this-binding](./13_this-binding/): call-site `this`, `call`/`bind`, lexical `this`, class arrow fields
14. [constructors-and-prototypes](./14_constructors-and-prototypes/): `function`+`new`, `.prototype`, `Object.create`, delegation
15. [error-handling](./15_error-handling/): `throw` / `try` / `catch` / `finally`

### Asynchronous JavaScript
16. [callbacks-and-timers](./16_callbacks-and-timers/): higher-order functions, `setTimeout`, `setInterval`, the event loop
17. [promises](./17_promises/): the callback pyramid, `new Promise`, `.then` chaining, `.catch`/`.finally`
18. [async-await](./18_async-await/): `await`, `try`/`catch`, and why an `async` function returns a promise
19. [concurrent-promises](./19_concurrent-promises/): `Promise.all` / `allSettled` / `race`; concurrent vs. sequential timing

### Modules
20. [modules](./20_modules/): ES `import`/`export` and CommonJS `require`, side by side

### The DOM & Browser APIs
21. [dom-window-and-selecting](./21_dom-window-and-selecting/): `window`, `location` and `URLSearchParams`, selecting and creating elements, `navigator.geolocation`
22. [dom-events-and-styling](./22_dom-events-and-styling/): form submit, `dataset`, event delegation, `classList`/`.style`/`getComputedStyle`
23. [fetch-api](./23_fetch-api/): `fetch` GET and POST against a json-server REST API

### Built-In Objects
24. [string-number-math-methods](./24_string-number-math-methods/): String methods, number parsing/formatting, the `Math` object

### Forms & JSON
25. [forms-and-validation](./25_forms-and-validation/): regex validation with inline errors, then collecting with `FormData`
26. [json](./26_json/): `JSON.stringify`/`parse`, replacer, reviver, pitfalls

### TypeScript
27. [ts-type-annotations](./27_ts-type-annotations/): variable/function types, unions, tuples, `unknown`
28. [ts-interfaces-and-aliases](./28_ts-interfaces-and-aliases/): `interface` vs `type`, optional/readonly, extend
29. [ts-classes-and-abstract](./29_ts-classes-and-abstract/): access modifiers, `implements`, `abstract`
30. [ts-generics-and-utility-types](./30_ts-generics-and-utility-types/): generic functions/classes, constraints, `Partial`/`Pick`/`Omit`/`Record`

### In reserve, going deeper (perform only if the class finishes 01-30)
31. [maps-and-sets](./31_maps-and-sets/): `Map` set/get/iteration, `Set` dedupe and set math
32. [dates-and-intl](./32_dates-and-intl/): `new Date`, components, `Intl.DateTimeFormat`, date differences
33. [recursion](./33_recursion/): iterative vs. recursive Fibonacci
34. [dynamic-import](./34_dynamic-import/): `await import()` at top level
35. [ts-narrowing-and-discriminated-unions](./35_ts-narrowing-and-discriminated-unions/): type guards, literal `kind` tags, `assertNever`

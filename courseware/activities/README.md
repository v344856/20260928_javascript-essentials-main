# JavaScript & TypeScript Essentials - Activities

There is **one activity per demo**: activity `NN` pairs with the same-numbered demo in
[`../demos`](../demos/) and covers the **same concept with a different, fresh challenge** (not a repeat of
the demo).

There are **35 activities**: **01-30 are the core set**, and **31-35 are held in reserve**, going
deeper. Core activities are sized for **15-20 minutes**; a few short ones are 10-15. Every activity ends
with a **Stretch goal** for anyone who finishes early, and those are deliberately *not* reflected in
`solution/`.

> Activities `31`-`35` are **held in reserve**: the class works through `01`-`30`, and reaches the
> last five only if there is time. They are not harder or less useful, just extra. Everything they
> cover is in the [docs](../docs/README.md) either way, so nothing is lost by reading ahead.

Each activity is a self-contained folder:

```
NN_topic/
  README.md         the challenge + expected output
  package.json      shared by begin/end/solution
  eslint.config.mjs ESLint setup for this activity (not in the browser ones)
  .prettierrc       Prettier setup for this activity
  begin/            starter files (scaffolded with TODOs)
  end/              your working copy - implement your solution here
  solution/         the finished reference solution
```

Work in the **`end/`** folder. Node activities run with `npm start`; TypeScript activities run with
`npm start` (via `tsx`); browser activities run `npm install` once, then `npm start` to serve the page.
`npm run solution` runs/serves the reference answer. (Activity 23 also needs `npm run api` for its mock
REST server.)

Each activity is **its own project**, so you can open the folder in its own VS Code window and the
ESLint and Prettier extensions pick up the config sitting next to your code, the same setup taught in
[Module 01 · Linters and Formatters](../docs/Module-01-Getting-Started/03-linters-and-formatters.md).
Run `npm install` once, then `npm run lint` and `npm run format`. Expect lint errors in `end/` before
you start: they point at the very functions the TODOs ask you to write, so the error list doubles as a
checklist. The browser activities (21, 22, 23, 25) keep their JavaScript inside `<script>` tags, which
ESLint cannot read, so those have Prettier only.

## Table of Contents

### Types, Variables & Operators
1. [Types and Variables](./01_types-and-variables/)
2. [Operators at Work](./02_operators-and-strings/)
3. [Building a Movie Object](./03_objects/)

### Control Flow
4. [Weather Advisor](./04_conditionals/)
5. [Number Games](./05_loops/)

### Arrays & Functions
6. [Build a Bookshelf](./06_arrays/)
7. [Word Stats](./07_arrays-map-filter-reduce/)
8. [Discount Calculator, Several Ways](./08_functions/)
9. [Ranking Scores and Cataloging a Book](./09_destructuring-rest-spread/)
10. [Closures in Practice](./10_closures/)

### Classes, `this` & Errors
11. [Book Class and BankAccount](./11_classes/)
12. [Vehicles and Cars](./12_classes-inheritance/)
13. [The Call Site Decides `this`](./13_this-binding/)
14. [A Rectangle Constructor and Shapes on a Shared Prototype](./14_constructors-and-prototypes/)
15. [Age Check at the Door](./15_error-handling/)

### Asynchronous JavaScript
16. [Passing Callbacks and Driving Timers](./16_callbacks-and-timers/)
17. [Launch Countdown with Promises](./17_promises/)
18. [Reading Async Code with `async`/`await`](./18_async-await/)
19. [Load a Dashboard Concurrently](./19_concurrent-promises/)

### Modules
20. [Geometry Helpers with Modules](./20_modules/)

### The DOM & Browser APIs
21. [Reading List Dashboard](./21_dom-window-and-selecting/)
22. [RSVP Guest List](./22_dom-events-and-styling/)
23. [Fetch a Book Library](./23_fetch-api/)

### Built-In Objects
24. [Profile Card Formatting](./24_string-number-math-methods/)

### Forms & JSON
25. [Profile Form Validation and FormData](./25_forms-and-validation/)
26. [Serializing a Profile](./26_json/)

### TypeScript
27. [Annotate a Trip Planner](./27_ts-type-annotations/)
28. [Model a Library Catalog](./28_ts-interfaces-and-aliases/)
29. [Payroll with an Abstract Base Class](./29_ts-classes-and-abstract/)
30. [Generic Helpers and a Task Tracker](./30_ts-generics-and-utility-types/)

### In reserve, going deeper (run only if the class finishes 01-30)
31. [Tallying Tags and Skills](./31_maps-and-sets/)
32. [Formatting Dates and Counting Days](./32_dates-and-intl/)
33. [Recursion Warm-Ups](./33_recursion/)
34. [Dynamic import() to Load Tools on Demand](./34_dynamic-import/)
35. [Narrow a Mixed Field, Handle App Events](./35_ts-narrowing-and-discriminated-unions/)

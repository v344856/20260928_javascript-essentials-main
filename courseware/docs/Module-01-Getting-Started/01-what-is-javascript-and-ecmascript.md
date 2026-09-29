# What Is JavaScript and ECMAScript?

JavaScript (often shortened to **JS**) is a programming language that runs almost everywhere:
in web browsers, on servers, on phones, and even on tiny devices. If you already know how to write
variables, functions, and loops in another language, you will recognize a lot of JavaScript quickly.
The goal of this chapter is to explain **what the language actually is**, where it came from, and how
its versions are named, so the rest of the course makes sense.

---

## A Very Short History

JavaScript was created in **1995** by Brendan Eich at Netscape, reportedly in about ten days. Despite
the name, it is **not** related to the Java language; the naming was a marketing decision made when Java
was popular. The two languages share some surface syntax (curly braces, `for` loops) and nothing else.

Because JavaScript spread fast and was implemented by competing browser vendors, the language needed a
neutral, written **standard** so that everyone's version behaved the same way. That standard is called
**ECMAScript**.

---

## ECMAScript: The Standard Behind the Language

**ECMAScript** (abbreviated **ES**) is the official specification that defines how JavaScript works:
its syntax, its built-in objects, its rules. It is maintained by a standards committee known as
**TC39**, under an organization called Ecma International.

It helps to separate two words that people often use interchangeably:

- **ECMAScript** is the *specification*: the written rulebook.
- **JavaScript** is the *language you actually write*: an implementation of that rulebook (plus a few
  browser- and Node-specific extras).

In everyday conversation, people say "JavaScript" for the language and "ES2020" (or similar) when they
want to point at a specific version of the standard.

---

## Yearly Versions: ES2015 Through ES2026

For its first two decades, ECMAScript updates were slow and numbered by edition (ES3, ES5, and so on).
The big turning point was **ES2015** (also called **ES6**), a large release that modernized the language
with features you will use constantly in this course:

```js
let count = 0;          // block-scoped variables
const name = "Ada";     // constants
const greet = () => {}; // arrow functions
const msg = `Hi ${name}`; // template literals
const [a, b] = [1, 2];  // destructuring
```

Since ES2015, TC39 has shipped **one new edition every year**, named after the year it was finalized.
That is why you will see names like ES2016, ES2017, and so on. Each one adds a small, digestible set of
features rather than one giant release.

A few highlights along the way:

- **ES2015 (ES6):** `let`/`const`, arrow functions, template literals, destructuring, classes, modules,
  promises.
- **ES2017:** `async`/`await` for readable asynchronous code.
- **ES2020:** optional chaining `?.`, nullish coalescing `??`, `BigInt`.
- **ES2022:** `Object.hasOwn`, top-level `await`, class fields.
- **ES2025:** iterator helpers, new `Set` methods (`union`, `intersection`, `difference`),
  `Promise.try`, `RegExp.escape`, JSON module imports, and `Float16Array`.
- **ES2026 (current):** the 17th edition, published June 2026, adding `Error.isError`, `Math.sumPrecise`,
  `Iterator.concat`, `Array.fromAsync`, base64/hex conversion on `Uint8Array`, and
  `Map.prototype.getOrInsert`.

> `Array.fromAsync` is a good illustration of the gap between *shipping* and *standardized*: browsers
> and Node had it in 2024, but spec issues held it back until the ES2026 edition. You will find
> articles that call it ES2025 for exactly that reason. When a version matters, check
> [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync)
> rather than trusting a blog post, including this one.

Two long-awaited features are **finished but not yet published**: **`Temporal`** (a replacement for
the quirky `Date` object) and **explicit resource management** (the `using` keyword). Both missed the
ES2026 cut-off and are expected in **ES2027**. You will see articles that place them in ES2026,
because they were widely predicted for it. `Temporal` in particular is not yet in Node or in every browser,
so treat it as something to watch rather than something to use; see
[Dates and Times](../Module-09-Built-In-Objects/05-dates.md).

> **What "baseline" means for this course.** We treat **ES2015+** as the baseline: you can assume every
> modern browser and every supported Node.js version understands it. Throughout the course we prefer
> modern syntax: `let`/`const` over `var`, arrow functions, template literals, destructuring, modules,
> `async`/`await`, optional chaining `?.`, nullish coalescing `??`, and `Object.hasOwn`.

You do not need to memorize which feature landed in which year. The practical takeaway is that JavaScript
is a **living, yearly-updated language**, and this course teaches its current, modern form.

---

## JavaScript Engines

A **JavaScript engine** is the program that actually reads your JavaScript source and runs it. You never
install an engine directly; it comes bundled inside a browser or inside Node.js.

The best-known engines are:

- **V8**: built by Google; powers Chrome, Microsoft Edge, and **Node.js**.
- **SpiderMonkey**: built by Mozilla; powers Firefox.
- **JavaScriptCore**: built by Apple; powers Safari.

Engines take your human-readable code and compile it, on the fly, into fast machine instructions. That is
why the same JavaScript file can run at high speed in a browser and on a server: the engine, not the
language, does the heavy lifting.

---

## Where JavaScript Runs

JavaScript started in the browser but is no longer limited to it. There are two environments that matter
for this course.

### In the Browser

Every modern browser has a JavaScript engine built in. You add JavaScript to a page with a `<script>`
tag, and the browser runs it:

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>Hello!</h1>
    <script>
      console.log("Hello from the browser!");
    </script>
  </body>
</html>
```

In the browser, JavaScript can read and change the page (the **DOM**, or Document Object Model), respond
to clicks and typing, and talk to servers over the network. The browser also gives JavaScript extra
tools (`window`, `document`, and `fetch` among them) that only exist in that environment.

#### Inline versus external scripts

Writing code between `<script>` tags, as above, is **inline**. It is fine for a two-line demonstration
and wrong for everything else: it cannot be cached, reused across pages, linted, or sensibly reviewed.
Real work goes in its own `.js` file, loaded with the `src` attribute:

```html
<script src="app.js"></script>
```

A `<script>` with `src` ignores anything between its tags, so it is always written as an empty pair.

#### Where the tag goes, and why it matters

The browser parses HTML top to bottom. A plain `<script>` in the `<head>` **stops** that parsing: the
browser downloads and runs the script before it continues building the page. That has two
consequences. The page appears blank for longer, and your code runs before the elements it wants to
touch exist:

```html
<head>
  <script src="app.js"></script>  <!-- runs too early: no <h1> yet -->
</head>
<body>
  <h1 id="title">Hello</h1>
</body>
```

There are three fixes, and only one is current practice:

```html
<!-- 1. Old approach: put it last, so the HTML above it already exists. -->
<body>
  <h1 id="title">Hello</h1>
  <script src="app.js"></script>
</body>

<!-- 2. defer: download in parallel, run AFTER parsing, in document order. -->
<head>
  <script src="app.js" defer></script>
</head>

<!-- 3. async: download in parallel, run AS SOON as it arrives - order NOT guaranteed. -->
<head>
  <script src="analytics.js" async></script>
</head>
```

**Reach for `defer`.** It gets the download started early *and* guarantees your code runs after the
HTML is parsed, with multiple scripts still executing in the order you wrote them. Use `async` only
for genuinely independent scripts (analytics, a chat widget) where load order does not matter.
Note that both attributes are ignored on an inline `<script>`; they only apply when there is a `src`.

Modules behave differently again: `<script type="module">` is deferred automatically, which is one
reason modern code rarely thinks about this. That is covered in
[Browsers and JavaScript Modules](../Module-06-JavaScript-Modules/04-browser-modules.md).

### On the Server with Node.js

**Node.js** is a program that bundles the V8 engine so you can run JavaScript **outside** the browser:
directly on your computer or on a server. This is what lets JavaScript power web servers, command-line
tools, and build scripts.

With Node.js installed, you can run a `.js` file straight from the terminal:

```bash
node hello.js
```

Node gives JavaScript a different set of extras than the browser, such as access to the file system
and the ability to listen for network requests, but there is **no** `document` or `window`, because there
is no web page.

> The next chapter walks through installing Node.js and setting up your editor so you can run JavaScript
> both ways.

---

## Summary

- **JavaScript** is the programming language of the web, created in 1995 and unrelated to Java.
- **ECMAScript (ES)** is the written *standard* that defines the language; **JavaScript** is what you
  actually write. TC39 maintains the standard.
- Since **ES2015 (ES6)**, a new edition ships **every year**, named for the year (ES2016 … **ES2026**,
  the current edition). We treat **ES2015+** as the baseline and prefer modern syntax throughout.
- A **JavaScript engine** (V8, SpiderMonkey, JavaScriptCore) is what runs your code; it lives inside a
  browser or inside Node.js.
- JavaScript runs in two main places for this course: **the browser** (with the DOM and `fetch`) and
  **Node.js** (on the server, with files and networking).

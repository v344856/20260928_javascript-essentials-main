# What Is TypeScript?

**TypeScript** is a programming language built on top of JavaScript. It adds a **type system**, a way to describe the shape of your data, that is checked *before* your code runs. You still write JavaScript; TypeScript just lets you also write down your intentions ("this variable is a number", "this function returns a string") and then checks that the rest of your code agrees.

The slogan is: **TypeScript is JavaScript with types.**

![A .ts file type-checked by tsc and emitted as .js, with the annotations gone from the output](../../diagrams/png/typescript-pipeline.png)

*Types are checked, then **erased**: nothing survives to run time.*

---

## Why TypeScript?

Plain JavaScript is **dynamically typed**: a variable can hold a number one moment and a string the next, and nothing complains until something breaks at runtime, often in front of a user. TypeScript moves that discovery earlier.

### Early error detection

Consider a small bug in JavaScript:

```js
function total(price, quantity) {
  return price + quantity; // meant to add the two numbers
}

total("10", 5); // "105" - string concatenation, not 15. No error, just wrong.
```

Because `price` arrived as the string `"10"`, the `+` operator concatenates instead of adding, a silent bug with no warning. In TypeScript, you say what you meant:

```ts
function total(price: number, quantity: number): number {
  return price + quantity;
}

total("10", 5);
// Error: Argument of type 'string' is not assignable to parameter of type 'number'.
```

The mistake is caught **as you type**, in your editor, before the program ever runs. This is the single biggest reason teams adopt TypeScript: bugs surface at your desk instead of in production.

### Better tooling

Because the editor knows the types, it can offer accurate **autocomplete**, **inline documentation**, **safe renaming**, and **go-to-definition** across a whole codebase. When you type `user.` the editor can list exactly which properties `user` has. This tooling boost is why TypeScript scales so well to large projects and large teams.

---

## TypeScript Is a Superset of JavaScript

A **superset** means every valid JavaScript program is also a valid TypeScript program. You do not have to learn a new language from scratch; you start with the JavaScript you already know and add types gradually.

```ts
// This is valid JavaScript AND valid TypeScript.
const greeting = "Hello";
console.log(greeting.toUpperCase()); // "HELLO"
```

TypeScript files use the `.ts` extension (or `.tsx` for React). You can rename a `.js` file to `.ts` and start adding types one piece at a time, which makes adoption incremental rather than all-or-nothing.

A key point: **types exist only at development time.** The browser and Node.js do not understand TypeScript. Before your code runs, the types are removed (*erased*) and what remains is plain JavaScript. Types help you *write* the program; they are gone by the time it *runs*.

---

## The Compiler: `tsc`

The official TypeScript **compiler** is called `tsc` (TypeScript compiler). It does two jobs:

1. **Type-checks** your code and reports errors.
2. **Transpiles** (converts) your `.ts` files into plain `.js` files that Node or a browser can run.

You install it with npm and run it from the terminal (PowerShell shown):

```powershell
npm install --save-dev typescript
npx tsc app.ts        # produces app.js next to app.ts
```

Given `app.ts`:

```ts
const name: string = "Ada";
console.log(`Hi, ${name}`);
```

`tsc` emits `app.js` with the types stripped out:

```js
const name = "Ada";
console.log(`Hi, ${name}`);
```

You then run the generated JavaScript with Node:

```powershell
node app.js   # Hi, Ada
```

---

## Running TypeScript Directly with `tsx`

The compile-then-run cycle is a little tedious while learning or experimenting. The tool **`tsx`** runs a `.ts` file directly: it type-strips and executes in one step, with no `.js` file left behind. Throughout this course we use `tsx` to run demos:

```powershell
npx tsx app.ts   # Hi, Ada
```

Under the hood `tsx` **does not type-check**; it just strips the types and runs the code fast, which suits demos and scripts. Use `tsc --noEmit` when you want a full type-check without producing output:

```powershell
npx tsc --noEmit   # check every file for type errors, emit nothing
```

A common workflow: run with `tsx` while experimenting, and let `tsc` (often in your editor and your build pipeline) do the thorough checking.

> **Node can now do this on its own.** Since Node 23.6, and so in the Node 24 LTS line this course
> targets, Node strips types from a `.ts` file natively, with no extra tool:
>
> ```powershell
> node app.ts   # Hi, Ada
> ```
>
> It shares `tsx`'s main caveat (it **strips**, it does not check), but it is stricter about what it
> accepts. Node runs in **strip-only mode**: it erases types and cannot *generate* code, so any syntax
> that would need real compilation is rejected outright with `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`:
>
> - `enum`
> - `namespace` with runtime code in it
> - **parameter properties**: `constructor(private radius: number)`
>
> That last one is not exotic; this course uses it in
> [Abstract Classes](./04-abstract-classes.md), so `node index.ts` genuinely fails on two of the
> TypeScript demos. That is why the course standardizes on **`tsx`**, which handles all three. Use
> `node app.ts` for quick scratch files, and reach for `tsx` the moment one of the above appears.

---

## `tsconfig.json` Basics

A project-wide TypeScript configuration lives in a file called **`tsconfig.json`** at the project root. It tells `tsc` how strict to be and what output to produce. Generate a starter file with:

```powershell
npx tsc --init
```

A minimal, sensible config looks like this:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "outDir": "dist"
  }
}
```

The most important option is **`"strict": true`**. It turns on a family of checks (including catching `null`/`undefined` mistakes) and is the recommended default for all new projects. `target` controls which JavaScript version to emit; `outDir` controls where compiled files land. When a `tsconfig.json` is present, running `npx tsc` with no filename compiles the whole project according to these rules.

---

## Static vs Dynamic, Strong vs Loose

Two independent ideas describe a language's type system. It helps to keep them separate.

### Static vs dynamic typing: *when* types are checked

- **Dynamic** (JavaScript): types are checked at **runtime**, while the program runs. A variable can change type freely.
- **Static** (TypeScript): types are checked **ahead of time**, before the program runs. Once a variable is a `number`, assigning a string to it is an error.

```ts
let count = 10;   // TypeScript infers count is a number
count = "twelve"; // Error: Type 'string' is not assignable to type 'number'.
```

The same two lines in JavaScript run without complaint, which is the difference static typing makes.

### Strong vs loose typing: *how willing* the language is to coerce

- **Loosely (weakly) typed** (JavaScript): the language freely **coerces** types for you, sometimes surprisingly.
- **Strongly typed**: the language resists silent conversions and expects you to be explicit.

TypeScript is **statically and (relatively) strongly typed**, whereas JavaScript is **dynamically and loosely typed**. TypeScript keeps JavaScript's runtime behavior but adds a strict, static checking layer on top.

---

## Type Coercion (and How TypeScript Reins It In)

**Type coercion** is JavaScript automatically converting a value from one type to another. It is the source of many classic JavaScript surprises:

```js
"5" + 3;      // "53"   (number coerced to string, concatenation)
"5" - 3;      // 2      (string coerced to number, subtraction)
[] + {};      // "[object Object]"
0 == "";      // true   (both coerced to falsy)
```

TypeScript does not remove coercion from the *runtime*; the emitted JavaScript still behaves this way. What TypeScript does is **flag the risky operations at compile time** so you never reach them by accident:

```ts
const value: number = "5" - 3;
// Error: The left-hand side of an arithmetic operation must be of type
//        'any', 'number', 'bigint' or an enum type.

const label: string = "Age: " + 30; // OK: intentional, both sides make a string
```

By stating the types you expect, you turn JavaScript's silent coercions into visible, catchable errors, while still shipping ordinary JavaScript at the end.

---

## Summary

* **TypeScript is JavaScript plus a static type system**, a superset, so all your JavaScript is already valid TypeScript.
* Its main payoffs are **early error detection** and **much better editor tooling** (autocomplete, safe refactors).
* Types are **erased before runtime**: the browser and Node run plain JavaScript.
* **`tsc`** type-checks and compiles `.ts` to `.js`; **`tsx`** runs a `.ts` file directly (no type-check, great for demos); `tsc --noEmit` checks without emitting.
* **`tsconfig.json`** configures the compiler; turn on **`"strict": true`** for all new projects.
* JavaScript is **dynamic + loosely typed** (checks at runtime, coerces freely); TypeScript adds a **static + stronger** checking layer that catches coercion mistakes before the code runs.

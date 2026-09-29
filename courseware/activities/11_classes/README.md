# Activity: Book Class and BankAccount

Same concepts as the demo (class syntax, then `#private` fields with accessors and validation), applied to a book record and a bank account. You will write a plain class first, then a second one where the state is genuinely private and every change has to go through code you control.

**Estimated time:** 15-20 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: Define the Book class

Write a `Book` class whose `constructor` takes `title`, `author`, and `pages` and assigns them to `this`. Give it a `summary()` method that logs `"<title> by <author>, <pages> pages."`.

### Task 2: Create two instances

Create `book1` (Dune / Frank Herbert / 412) and `book2` (1984 / George Orwell / 328), read a property from each, and call `summary()` on both.

**Expected output:**
```
Dune
412
Dune by Frank Herbert, 412 pages.
George Orwell
1984 by George Orwell, 328 pages.
```

### Task 3: Type and sharing

Log `book1 instanceof Book`, then log `book1.summary === book2.summary`. Both are `true`: the method lives on the prototype, so the two instances share one function rather than each carrying a copy.

**Expected output:**
```
true
true
```

### Task 4: A private field with a getter

Write a `BankAccount` class with a `#balance` private field set by the constructor, and a `get balance()` accessor that returns it. Nothing outside the class can touch `#balance` directly.

### Task 5: Validate in the method

Write `deposit(amount)` that throws `new Error("Deposit must be a positive number")` unless `amount` is a number greater than zero, and otherwise adds it to the balance. The calling code already wraps a bad deposit in `try`/`catch` so the script keeps running.

### Task 6: A computed getter

Add `get balanceFormatted()` returning the balance as `"$125.00"`, derived from the private field rather than stored.

**Expected output:**
```
Rejected: Deposit must be a positive number
125
$125.00
[]
```

The empty array is `Object.keys(account)`: `#` fields never show up, because they are not properties of the object at all.

## What You'll Learn

- Writing a `class` with a `constructor` and methods, and creating instances with `new`.
- Checking an instance's type with `instanceof`.
- Why methods are shared across instances rather than copied.
- Declaring `#private` fields and why outside code cannot reach them.
- Exposing state through a `get` accessor instead of a public property.
- Putting validation where no caller can skip it, and signaling failure with `throw`.
- Computed getters that derive a value instead of storing one.

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Add a `withdraw(amount)` method that refuses both non-positive amounts *and* any amount larger than the current balance, with a different message for each. Then add a `#history` private array that records every accepted deposit and withdrawal, exposed through a `get statement()` that returns a formatted, read-only copy (return a new array so callers cannot mutate your private one).

Sample output:

```
Rejected: Insufficient funds
+$25.00
-$40.00
```

## Related reading

- [JavaScript Classes](../../docs/Module-04-Classes-this-and-Errors/01-js-classes.md)
- Diagram: [Class Anatomy](../../diagrams/png/class-anatomy.png)
- Diagram: [The Prototype Chain](../../diagrams/png/prototype-chain.png)

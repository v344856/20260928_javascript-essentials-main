# JavaScript Closures

A **closure** is one of JavaScript's most powerful ideas, and one that trips up a lot of people the
first time they meet it. A few worked examples make it concrete faster than any definition does.

In one sentence: **a closure is a function that remembers the variables from the place where it was
created, even after that place has finished running.**

![Nested scopes with lookup going outward only, and the captured variable surviving the outer call](../../diagrams/png/scope-chain-and-closures.png)

*Lookup goes **outward only**; a closure is the link that survives the outer call returning.*

---

## Lexical Scope: A Quick Recap

**Scope** is the set of variables a piece of code can "see." JavaScript uses **lexical scope**,
which means a function can access variables from the location where it was **written** (not where it
is called).

```js
const outerValue = "I'm outside";

function show() {
  console.log(outerValue); // can see outerValue
}

show(); // "I'm outside"
```

Inner functions can see the variables of the functions that surround them:

```js
function outer() {
  const message = "hello";

  function inner() {
    console.log(message); // inner sees outer's variable
  }

  inner();
}

outer(); // "hello"
```

That "inner function reaching outward" is the seed of every closure.

---

## What Is a Closure?

A closure forms when you **return (or otherwise keep) an inner function** that references variables
from its outer function. The inner function keeps those variables alive after the outer function has
returned.

```js
function makeGreeter(name) {
  // "name" lives in makeGreeter's scope
  return function () {
    console.log("Hello, " + name + "!");
  };
}

const greetAlice = makeGreeter("Alice");
const greetBob = makeGreeter("Bob");

greetAlice(); // "Hello, Alice!"
greetBob();   // "Hello, Bob!"
```

`makeGreeter` has already finished, yet `greetAlice` still remembers `name` was `"Alice"`. Each call
to `makeGreeter` creates a **separate** remembered value, which is why Alice and Bob don't interfere.

---

## The Classic Counter

The counter is the "hello world" of closures. The inner functions share the same `count` variable,
which stays private and persistent between calls.

```js
function makeCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

`count` is not a global variable and not a property on any object; it lives only inside the closure.
Nothing outside can touch it directly.

---

## Private State via Closures

Because those inner variables are invisible from the outside, closures give you **true private
state**, meaning data that can only be changed through the functions you choose to expose.

```js
function createAccount(startingBalance) {
  let balance = startingBalance;

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) {
        return "Insufficient funds";
      }
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    },
  };
}

const account = createAccount(100);

console.log(account.deposit(50));  // 150
console.log(account.withdraw(30)); // 120
console.log(account.getBalance()); // 120

console.log(account.balance);      // undefined - can't reach it directly
```

There is no way to set `balance` to a bad value from outside; every change goes through `deposit`
or `withdraw`. This is the closure-based version of "private fields."

---

## A Common Loop Pitfall: `var` vs `let`

Closures inside loops are a famous source of bugs, and a good illustration of why `let` matters.

With `var`, there is **one shared variable** for the whole loop. By the time the callbacks run, the
loop has finished and every closure sees the final value.

```js
const funcs = [];

for (var i = 0; i < 3; i++) {
  funcs.push(function () {
    return i;
  });
}

console.log(funcs[0]()); // 3  (not 0!)
console.log(funcs[1]()); // 3
console.log(funcs[2]()); // 3
```

Switching `var` to `let` fixes it. `let` creates a **new binding of `i` for each iteration**, so
each closure captures its own value.

```js
const funcs = [];

for (let i = 0; i < 3; i++) {
  funcs.push(function () {
    return i;
  });
}

console.log(funcs[0]()); // 0
console.log(funcs[1]()); // 1
console.log(funcs[2]()); // 2
```

The rule of thumb: **prefer `let`/`const` over `var`**, and this whole class of bug disappears.

---

## Practical Uses

Several patterns you will use routinely are built directly on closures.

### `once`: run something a single time

```js
function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}

const setup = once(() => {
  console.log("Setting up...");
  return "done";
});

setup(); // logs "Setting up..." and returns "done"
setup(); // returns "done" without logging again
```

The `called` flag hides inside the closure and survives between calls.

### `memoize`: cache expensive results

```js
function memoize(fn) {
  const cache = {};

  return function (n) {
    if (n in cache) {
      return cache[n]; // reuse the stored answer
    }
    const result = fn(n);
    cache[n] = result;
    return result;
  };
}

const slowSquare = (n) => {
  console.log("computing " + n);
  return n * n;
};

const fastSquare = memoize(slowSquare);

console.log(fastSquare(4)); // logs "computing 4", returns 16
console.log(fastSquare(4)); // returns 16 instantly, no log
```

The private `cache` object persists across calls, remembering every answer it has already computed.

---

## Summary

* A **closure** is a function bundled together with the variables from where it was **defined**.
* JavaScript uses **lexical scope**, so inner functions can read their outer function's variables,
  and keep reading them even after the outer function returns.
* Closures enable **private state**: variables no outside code can touch (counters, bank balances).
* Watch the **`var`-in-a-loop pitfall**, and use `let` so each iteration captures its own value.
* Everyday patterns like **`once`** and **`memoize`** are built on closures.

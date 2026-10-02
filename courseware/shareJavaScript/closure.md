# Closure

A closure in JavaScript is a function that remembers and can access variables from its outer scope even after that outer function has finished executing.

## What a Closure Really

A closure is formed when:

- You define a function inside another function.
- The inner function uses variables from the outer function.
- The inner function outlives the outer function (e.g., returned, stored, or passed around).
- Because JavaScript uses lexical scoping, the inner function keeps a persistent reference to the environment where it was created — not where it is called.

## Uses of Closure

- **Private variables** (data encapsulation)
- **Function factories**
- **Stateful functions** (counters, accumulators)
- **Callbacks & async behavior**
- **Modules and IIFEs**

```javascirpt
function createCounter() {
  let count = 0;   // private variable

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

The inner function "remembers" count even though "createCounter() has finished.

## Closures for Privacy (IIFE Pattern)

```javascript
const counter = (function () {
  let count = 0;

  return {
    increment() {
      count++;
      console.log(count);
    },
    reset() {
      count = 0;
      console.log("Counter reset");
    },
  };
})();
```

count is inaccessible from the outside — a closure keeps it private

## Remember

- A closure = function + remembered lexical environment.
- Created automatically whenever a function is defined inside another.
- Inner functions retain access to outer variables even after the outer function returns.
- Closures power many core JavaScript patterns (privacy, state, factories, async code).

## ES6+ Closures (Modern JavaScript)

- Use let and const (block‑scoped)
- Use arrow functions (lexical this)
- Use modules instead of IIFEs
- Use closures inside classes, React hooks, async functions
- Cleaner, more predictable behavior

```javascript
function makeCounter() {
  let count = 0; // private

  return () => ++count; // arrow function closure
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

## ES6 Modules (Closures Under the Hood)

```javascript
// user.js
const name = "Edna"; // private to module

export function getName() {
  return name; // closure over module scope
}
```

- ES6 modules replace IIFEs
- Still closures — but cleaner and native

# Scope in JavaScript

## Learning Onjectives

- Define what scope means in JavaScript
- Differentiate global, function, and block scope
- Understand lexical scope and the scope chain
- Predict variable visibility in nested functions and blocks
- Avoid common scope‑related bugs

## What is Scope ?

- Scope is the **current execution context** where variables and expressions are accessible.
  - If a variable is not in the current scope, you cannot use it.

- JavaScript scopes form a hierarchy:
  - Child scopes can access parent scopes, but not the other way around.

## Tyoes of Scope in JavaScript

### Global Scope

- A variable declared outside any function or block is global.
  - Accessible anywhere in the program
  - Useful but risky (naming conflicts, accidental overwrites)

```javascript
// global.js
let x = 10; // global

function show() {
  console.log(x); // accessible
}

show();
console.log(x); // accessible
```

### Function (Local) Scope

- Variables declared inside a function are local to that function.
  - Only accessible within that function
  - Created when the function runs
  - Destroyed when the function finishes

```scriptjavascript

// local.js
function greet() {
  let message = "Hello!";
  console.log(message); // works
}

greet();
console.log(message); // ReferenceError: message is not defined

```

### Block Scope ( **let** and **const**)

- Introduced in ES6
- A block is anything inside { } — if statements, loops, etc.
  - Variables declared with let or const inside a block:
  - Exist only inside that block
  - Cannot be accessed outside

```javascript
if (true) {
  let y = 20;
  console.log(y); // works
}

console.log(y); // ReferenceError
```

### Important Note

- var **does NOT** have block scope

```javascript
{
  var z = 99;
}

console.log(z); // 99
```

## Lexical Scope and Scope Chain

- JavaScript uses lexical scope, meaning scope is determined by where code is written, not where it is executed.

- Inner scopes can access outer scopes.
- Variable lookup follows the scope chain until the variable is found.

```javascript
let a = 1;

function outer() {
  let b = 2;

  function inner() {
    let c = 3;
    console.log(a, b, c); // 1, 2, 3
  }

  inner();
}

outer();
```

## Common Mistakes

❌ Using var inside blocks expecting block scope<br>
❌ Forgetting that functions create their own scope<br>
❌ Accidentally creating global variables<br>
❌ Shadowing variables unintentionally<br>

# Use of Modules in JavaScript Before ES6

JavaScript had no built‑in module system.
Developers had to invent their own ways to organize code, avoid global variables, and share functionality across files.

This led to several patterns:

1. Global namespace modules
2. IIFE modules (Immediately Invoked Function Expressions)
3. Revealing Module Pattern
4. CommonJS (Node.js)
5. AMD (Asynchronous Module Definition) <br>

Understanding these gives learners historical context and helps them recognize older codebases still in use today.

## The Problem Before ES6

JavaScript originally loaded scripts like this:

```javascript
<script src="file1.js"></script>
<script src="file2.js"></script>
<script src="file3.js"></script>
```

All scripts shared the same global scope, causing:

1. Naming collisions
2. Hard‑to‑track dependencies
3. Difficult maintenance
4. “Spaghetti code” in large apps
   Developers needed a way to encapsulate code.

### CommonJS (Node.js Pre-ES6)

Node.js introduced CommonJS, which became the dominant server‑side module system.

### Exporting

```javascript
// math.js
function add(a, b) {
  return a + b;
}

module.exports = { add };
```

### Importing

```javascript
const math = require("./math");
console.log(math.add(2, 3));
```

- Pros
  - Simple
  - Synchronous loading (good for servers)
  - Widely used
- Cons
  - Not native in browsers
  - Requires bundlers (Browserify, Webpack)

# Use of Modules in JavaScript ES6

As applications grew larger, JavaScript needed a way to organize code into separate, reusable files.
Modules solve this problem by letting you split your code into logical pieces and control what is exposed to other parts of the program. <br>

Modern JavaScript uses ES6 modules, which are now the standard in browsers and Node.js.

ES6 Modules Replaced All of These
ES6 modules provide:

1. Native browser support
2. Clear syntax (import / export)
3. Static analysis (tree‑shaking, bundling)
4. Better performance
5. Predictable scoping
   They unify the ecosystem.

## Learning Objectives

Learners will be able to:

- Understand what modules are
- Use export and import
- Structure applications using multiple module files
- Compare ES6 modules with older module systems
- Understand default vs named exports

### What is a Module ?

1. A module is simply a JavaScript file that:

- Has its own scope
- Can export values
- Can import values from other modules

2. Modules help you:

- Organize code
- Avoid global variables
- Reuse functionality
- Improve maintainability

## ES6 Module Syntax

### Named Exports

#### Exporting

```javascript
// ../library/export_maths.js
export const PI = 3.14;

export function add(a, b) {
  return a + b;
}
```

#### Importing

```javascript
import { PI, add } from '../library/export_maths.js';

console.log(PI);        // Output: 3.14
console.log(add(5, 10)); // Output: 15
```

### Default Export

Each module can have one default export.

#### Exporting

```javascript
// logger.js
export default function log(message) {
  console.log("LOG:", message);
}
```

#### Importing default export

```javascript
import log from "../library/logger.js";

log("Hello Stefan");
```

### Mixed Named and Default Exports

#### Exporting

```javascript
// utils.js
export default function greet(name) {
  return `Hello ${name}`;
}

export const version = "1.0";
```

#### Importing

```javascript
import greet, { version } from "./utils.js";
```

## Folder Structure

```text
project/
│
├── main.js
├── math/
│   ├── add.js
│   └── subtract.js
└── utils/
    └── logger.js

```

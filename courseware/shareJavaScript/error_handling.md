# Error Handling in JavaScript

## Common JavaScript Compiler Errors

- JavaScript is **interpreted**, not traditionally compiled — but modern engines (V8, SpiderMonkey, Chakra) do perform compilation steps internally.
- When we say **compiler error** in JavaScript, we really mean syntax errors that prevent the code from running at all.
- These errors happen before execution, during parsing/compilation.

### 1. SyntaxError (Most Common Compiler Error)

A **SyntaxError** occurs when JavaScript cannot parse your code because the syntax is invalid. <br>

**❌ Missing parentheses**

```javascript
console.log("Hello"  // SyntaxError
```

**❌ Missing closing brace**

```javascript
function greet() {
  console.log("Hi");
  // SyntaxError: Unexpected end of input

```

**❌Using reserved keywords incorrectly**

```javascript
let for = 10; // SyntaxError
```

**❌ Invalid or unexpected token**

```javascript
const x = 10;
```

### 2. Reference Error

A ReferenceError occurs when:

- You use a variable that hasn’t been declared
- You access a variable outside its scope
- You mistype a variable name
- You use a variable before it is initialized (with let or const)
- You call a function that doesn’t exist

### 3. Type Error - not a compiler error, but extremely common\*\*

### 3. Common Causes of Compiler‑Level Errors

✔️ Missing brackets, braces, parentheses<br>
✔️ Incorrect use of let, const, class<br>
✔️ Using reserved keywords<br>
✔️ Invalid characters (copy/paste from Word)<br>
✔️ Unterminated strings<br>
✔️ Incorrect import/export syntax<br>

## Type of Errors in JavaScript

1. Syntax Errors

- Code cannot run at all.

2. Runtime Errors

- Code runs, then crashes.

3. Logical Errors

- Code runs but produces wrong results — hardest to detect.

## Basic Error Handling (try-catch)

```javascript
try {
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  console.log("Something went wrong:", error.message);
}
```

### How it Works

1. Code inside try runs
2. If an error occurs → jumps to catch
3. Program continues instead of crashing

### The Error Object

Every caught error is an object with useful properties:

```javascript
catch (error) {
  console.log(error.name);    // TypeError, ReferenceError, etc.
  console.log(error.message); // description
  console.log(error.stack);   // call stack (debugging)
}
```

### Throwing your own Errors

You can create custom errors to enforce rules or validate input.

```javascript
function withdraw(amount) {
  if (amount <= 0) {
    throw new Error("Amount must be greater than zero");
  }
  console.log("Withdrawing", amount);
}

try {
  withdraw(-10);
} catch (error) {
  console.log("Error:", error.message);
}
```

### Custom Error Class

- Useful for large applications.

```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

try {
  throw new ValidationError("Invalid email format");
} catch (error) {
  console.log(error.name); // ValidationError
  console.log(error.message); // Invalid email format
}
```

### The finally Block

- Runs whether an error occurs or not.

```javascript
try {
  console.log("Opening file...");
  throw new Error("File corrupted");
} catch (error) {
  console.log("Error:", error.message);
} finally {
  console.log("Closing file...");
}
```

#### Great for cleanup tasks:

1. Closing connections
2. Stopping timers
3. Releasing resources

## Error Jandling in async/await

Async errors must be caught with try…catch

```javascript
async function fetchData() {
  try {
    const res = await fetch("https://api.example.com/data");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Network error:", error.message);
  }
}
```

## Best Practices for Error Handling

✔️ Validate input early<br>
✔️ Throw meaningful error messages<br>
✔️ Use custom error classes for clarity<br>
✔️ Always handle async errors<br>
✔️ Log errors for debugging<br>
✔️ Never expose internal error details to users in production<br>
✔️ Use finally for cleanup<br>

```javascript
class Account {
  constructor(balance = 0) {
    this.balance = balance;
  }

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }
    this.balance += amount;
  }

  withdraw(amount) {
    if (amount > this.balance) {
      throw new Error("Insufficient funds");
    }
    this.balance -= amount;
  }
}

try {
  const acc = new Account(100);
  acc.withdraw(200);
} catch (error) {
  console.log("Transaction failed:", error.message);
} finally {
  console.log("Transaction complete");
}
```

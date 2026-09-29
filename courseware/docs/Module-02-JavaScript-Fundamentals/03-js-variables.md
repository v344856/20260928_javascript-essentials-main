# JavaScript Variables (Beginner-Friendly Overview)

**Variables** are how you **store values** so you can use them again later: a number, a name, a
message, a list, an object, anything. You already know the idea; this chapter focuses on the three
ways JavaScript declares variables, how scope works, and the conventions worth following.

![var, let/const and function declarations compared, with the temporal dead zone on a timeline](../../diagrams/png/hoisting-and-tdz.png)

*`let` and `const` exist before they are usable; that gap is the temporal dead zone.*

---

## Declaring Variables: `let`, `const`, and `var`

Modern JavaScript gives you two keywords you should reach for:

- **`let`**: for values that can **change**.
- **`const`**: for values that should **not be reassigned**.

There is also an older keyword, **`var`**, which you will still see in legacy code but should
**avoid** in new code (more on why below).

### `let`

Use `let` when the value will change over time:

```js
let score = 0;       // declare and set an initial value
score = 10;          // fine - let can be reassigned
console.log(score);  // 10
```

### `const`

Use `const` when the value should stay fixed. You **must** give a `const` a value when you declare
it, and any attempt to reassign it is an error:

```js
const pi = 3.14;
console.log(pi);     // 3.14

// pi = 3.14159;     // Error: Assignment to constant variable.
```

A good habit: reach for `const` by default, and switch to `let` only when you know the value needs to
change.

---

## Declaring vs Initializing

These are two separate steps, even though you usually do them together:

* **Declare**: create the variable.
* **Initialize**: give it its first value.

```js
let age;       // declaration (no value yet - age is undefined)
age = 18;      // initialization (now it has a value)
```

More often you do both at once:

```js
let age = 18;  // declaration + initialization
```

---

## Variable Naming Rules

You can pick almost any name, within a few rules:

* Must **start** with a letter, `_`, or `$`.
* After the first character, may contain letters, numbers, `_`, and `$`.
* **Cannot** be a reserved keyword (`let`, `const`, `if`, and so on).
* Names are **case-sensitive**: `age` and `Age` are two different variables.

```js
let userName = "Alex";
let _count = 0;
let $price = 9.99;

// let 2cool = "no";    // invalid - cannot start with a number
// let let = 5;         // invalid - cannot use a reserved word
```

Beyond the rules, choose names that describe what the value *means*. Clear names make code read like
a sentence:

```js
let x = 5;              // technically fine, but not clear
let numberOfLives = 5;  // much clearer
```

---

## Scope: Where a Variable Exists

**Scope** is the region of code where a variable can be seen and used. `let` and `const` are
**block-scoped**, which is the behavior you want.

### Block Scope

A **block** is any code inside `{ }`: the body of an `if`, a `for`, or just a bare pair of braces. A
variable declared with `let` or `const` lives only inside the block that declares it:

```js
if (true) {
  let message = "Hello";
  console.log(message); // "Hello"
}

console.log(message);   // Error: message is not defined
```

`message` does not exist at all outside the `if` block.

### Function Scope

Variables declared inside a function exist only inside that function:

```js
function greet() {
  let text = "Hi there!";
  console.log(text); // "Hi there!"
}

greet();

console.log(text);   // Error: text is not defined
```

---

## `var`: The Old Style, and Why to Avoid It

`var` behaves differently from `let` and `const` in two ways that cause confusion: it is
**function-scoped** (it ignores block boundaries) and it is **hoisted** (its declaration is treated
as if it moved to the top of the function).

Because `var` ignores blocks, a variable declared inside an `if` "escapes" it:

```js
if (true) {
  var test = "I escape the block";
}

console.log(test); // "I escape the block"
```

With `let`, that same code is an error, which is exactly the safer, more predictable behavior:

```js
if (true) {
  let test2 = "Block only";
}

console.log(test2); // Error: test2 is not defined
```

The takeaway is simple: in new code, use `let` and `const` and leave `var` in the past.

---

## Variables and the Browser

Variables really earn their keep when you use them to build up what the page shows. Here a name and a
visit count are combined into a message and written into the page through the DOM:

```html
<!DOCTYPE html>
<html>
  <body>
    <p id="info"></p>

    <script>
      const name = "Sam";
      let visits = 3;

      const infoParagraph = document.getElementById("info");
      infoParagraph.textContent = name + " has visited " + visits + " times.";
    </script>
  </body>
</html>
```

---

## Summary

* Use **variables** to store values for later use.
* Prefer **`const`** by default, and **`let`** when the value needs to change.
* **Avoid `var`** in new code, because its function scoping and hoisting are error-prone.
* Follow the naming rules, and pick **clear, descriptive names**.
* Variables have **scope**: `let` and `const` live only inside the block that declares them.

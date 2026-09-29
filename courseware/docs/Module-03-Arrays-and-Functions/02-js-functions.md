# JavaScript Functions

A **function** is a reusable block of code that you can name, hand some inputs, and run whenever you
need it. Both the inputs and the result it hands back are optional: some functions take nothing and
return nothing, while others do a lot of both.

Functions are the main way you keep code manageable: they let you avoid repeating yourself, break a
big problem into small pieces of logic, and give those pieces names that make the whole program
easier to read and maintain.

![factorial calls descending to the base case, then the answers multiplying back up](../../diagrams/png/recursion-call-tree.png)

*Calls go down until the base case; nothing returns until the bottom is reached.*

---

## Function Declaration

The classic way to create a function is a **function declaration**, which is the `function` keyword,
followed by a name, a list of parameters in parentheses, and a body in braces:

```js
function greet() {
  console.log("Hello!");
}

greet(); // call (or "invoke") the function
```

Reading that top line piece by piece:

* `function` → keyword
* `greet` → function name
* `()` → place for parameters
* `{ ... }` → function body (the code that runs)

Defining the function does not run it; the code inside only executes when you **call** it by
writing its name followed by `()`.

---

## Parameters and Arguments

Functions become far more useful once you can pass values **into** them. The two halves of that have
different names: the **parameters** are the placeholder names you list in the definition, and the
**arguments** are the actual values you supply when you call the function.

```js
function greetUser(name) {
  console.log("Hello, " + name + "!");
}

greetUser("Sam");   // "Hello, Sam!"
greetUser("Alex");  // "Hello, Alex!"
```

Here, `name` is the parameter, while `"Sam"` and `"Alex"` are the arguments passed in on each call.

### Default Parameters

If a caller might leave an argument out, you can give a parameter a **default value** that steps in
when nothing is passed:

```js
function greetUser(name = "guest") {
  console.log("Welcome, " + name + "!");
}

greetUser("Sam"); // "Welcome, Sam!"
greetUser();      // "Welcome, guest!"
```

When you call `greetUser()` with no argument, `name` falls back to `"guest"` instead of being
`undefined`.

---

## Return Values

A function can hand a value back to whoever called it using the `return` keyword. That returned
value can then be stored in a variable or used directly:

```js
function add(a, b) {
  return a + b;
}

let result = add(3, 4); // 7
console.log(result);
```

Two things are worth remembering about `return`. As soon as it runs, the function **stops** and
gives back the value; any code after it is skipped. And if a function has no `return` at all, it
still returns something: the value `undefined`.

---

## Function Expressions

A function does not have to be declared on its own; you can also create one and store it in a
variable. This is called a **function expression**:

```js
const multiply = function (a, b) {
  return a * b;
};

console.log(multiply(2, 5)); // 10
```

Here `multiply` is a constant that holds a function, and you call it through that variable exactly
as you would a declared function.

---

## Arrow Functions (Shorter Syntax)

**Arrow functions** are a more compact way to write function expressions, using `=>` in place of
the `function` keyword:

```js
const divide = (a, b) => {
  return a / b;
};

console.log(divide(10, 2)); // 5
```

When the whole body is just a single expression, you can drop the braces and the `return`; the
value of the expression is returned automatically, which makes short helpers very tidy:

```js
const square = (n) => n * n;

console.log(square(4)); // 16
```

---

## Functions and the DOM (Simple Example)

Functions really shine when the browser calls them for you in response to events. Here a function
runs each time a button is clicked:

```html
<!DOCTYPE html>
<html>
  <body>
    <button id="btn">Click me</button>

    <script>
      function handleClick() {
        console.log("Button was clicked!");
      }

      const button = document.getElementById("btn");
      button.addEventListener("click", handleClick);
    </script>
  </body>
</html>
```

Notice that you never call `handleClick` yourself. You hand the function to `addEventListener`, and
the browser calls it for you **when** the button is clicked. A function used this way is called a
callback.

---

## Summary

* A function is a reusable piece of code.
* You **define** a function (with `function` or `=>`) and then **call** it.
* Functions can take **parameters** and can **return** values.
* Function declarations, function expressions, and arrow functions are common forms.
* Functions are used everywhere in JavaScript, especially with events and callbacks.

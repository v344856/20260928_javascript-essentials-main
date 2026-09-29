# JavaScript Branching Statements

Branching statements let your code **make decisions**, choosing different paths depending on
conditions (true/false checks). They are how a program does one thing in one situation and something
else in another.

JavaScript's main branching tools are:

- `if`, `else`, and `else if`
- `switch`
- the **ternary operator** `? :` (technically an expression, but used for the same purpose)

We'll take them in turn.

---

## `if`

Use `if` to run some code **only when** a condition is true:

```js
let age = 18;

if (age >= 18) {
  console.log("You can enter.");
}
```

If `age >= 18` is `true`, the code inside the `{ }` runs; otherwise it is skipped.

---

## `if` ... `else`

Add `else` to supply an **alternative** for when the condition is false. Exactly one of the two blocks
runs:

```js
let age = 16;

if (age >= 18) {
  console.log("You can enter.");
} else {
  console.log("You are too young.");
}
```

---

## `if` ... `else if` ... `else`

When you have **several cases** to distinguish, chain them with `else if`. JavaScript checks each
condition from top to bottom, runs the **first** one that is true, and ignores the rest:

```js
let score = 75;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Grade: D or below");
}
```

---

## Truthy and Falsy

An `if` condition doesn't have to be a literal `true` or `false`; JavaScript decides whether any
value is **truthy** or **falsy**. There is a short, fixed list of **falsy** values:

* `false`
* `0`
* `""` (empty string)
* `null`
* `undefined`
* `NaN`

Everything else is **truthy**. This lets you test for "has a value" concisely:

```js
let name = "";

if (name) {
  console.log("Name is set.");
} else {
  console.log("Name is empty or missing.");
}
```

Because `""` is falsy, the `else` block runs here.

---

## `switch`

When you're comparing the **same value** against many possible options, `switch` can be clearer than a
long `else if` chain:

```js
let color = "green";

switch (color) {
  case "red":
    console.log("Stop!");
    break;
  case "yellow":
    console.log("Slow down!");
    break;
  case "green":
    console.log("Go!");
    break;
  default:
    console.log("Unknown color");
}
```

Three things to remember:

* `case` labels are checked top to bottom.
* `break` stops the switch so it doesn't "fall through" into the next case. Forgetting it is a common
  bug.
* `default` runs when no case matches.

---

## The Ternary Operator (`? :`)

The ternary is not a statement but an **expression**: it evaluates to one of two values, which makes
it perfect for assignments. The syntax is:

```
condition ? valueIfTrue : valueIfFalse
```

```js
let age = 20;

let message = age >= 18 ? "Adult" : "Minor";

console.log(message); // "Adult"
```

Reach for it when the choice is short and simple; for anything more involved, a full `if`/`else`
stays more readable.

---

## Branching in the Browser

Putting it together, here's a small page that reads an age from an input and branches on it, writing
the result back into the page:

```html
<!DOCTYPE html>
<html>
  <body>
    <input id="age-input" type="number" placeholder="Enter your age" />
    <button id="check-btn">Check</button>
    <p id="result"></p>

    <script>
      const input = document.getElementById("age-input");
      const button = document.getElementById("check-btn");
      const result = document.getElementById("result");

      button.addEventListener("click", function () {
        const age = Number(input.value);

        if (!age) {
          result.textContent = "Please enter a valid age.";
        } else if (age < 18) {
          result.textContent = "You are a minor.";
        } else {
          result.textContent = "You are an adult.";
        }
      });
    </script>
  </body>
</html>
```

---

## Summary

* Use `if`, `else if`, and `else` to control **which code runs**.
* `switch` is a good fit when checking one value against many options, but don't forget the `break`s.
* The ternary operator `? :` is a compact way to choose between two values, ideal in assignments.
* Conditions rely on **truthy** and **falsy** values; keep the short list of falsy values in mind.

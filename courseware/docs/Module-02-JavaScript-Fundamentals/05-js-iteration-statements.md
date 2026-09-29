# JavaScript Iteration Statements (Loops)

Iteration statements (more commonly called **loops**) let you **repeat code** without writing it
out many times. JavaScript gives you several loop forms, each suited to a different situation:

- `for`
- `while`
- `do...while`
- `for...of`
- `for...in`

Let's look at each, then at how to control a loop from the inside.

---

## The `for` Loop

Reach for a `for` loop when you **know how many times** you want to repeat something. Its header has
three parts, namely a start, a condition, and an update:

```js
for (start; condition; update) {
  // code to repeat
}
```

For example:

```js
for (let i = 1; i <= 5; i++) {
  console.log("Count:", i);
}

// Output:
// Count: 1
// Count: 2
// Count: 3
// Count: 4
// Count: 5
```

Reading the header: `let i = 1` starts the counter at 1, `i <= 5` keeps the loop going while it's
true, and `i++` adds 1 after each pass.

---

## The `while` Loop

Use a `while` loop to repeat **as long as a condition is true**, especially when you don't know the
number of iterations in advance:

```js
let count = 1;

while (count <= 3) {
  console.log("Loop:", count);
  count++; // important: update the variable each time
}
```

That update is critical: if you forget to change `count`, the condition never becomes false and the
loop runs forever (an *infinite loop*).

---

## The `do...while` Loop

`do...while` is like `while`, but it checks the condition **after** running the body, so the body
**always runs at least once**:

```js
let number = 0;

do {
  console.log("Number is:", number);
  number++;
} while (number < 3);

// Runs with number = 0, 1, 2
```

Even if the condition is false to begin with, the body still executes a single time.

---

## The `for...of` Loop (Great for Arrays)

`for...of` is the clean way to loop over the values of an **array** or any other iterable. You get
each value directly, without managing index numbers:

```js
const fruits = ["apple", "banana", "orange"];

for (const fruit of fruits) {
  console.log(fruit);
}

// Output:
// apple
// banana
// orange
```

---

## The `for...in` Loop (For Object Keys)

`for...in` loops over the **keys** (property names) of an object:

```js
const user = {
  name: "Sam",
  age: 25,
  isAdmin: false
};

for (const key in user) {
  console.log(key, "=", user[key]);
}

// Output:
// name = Sam
// age = 25
// isAdmin = false
```

For arrays, prefer `for` or `for...of`; `for...in` is meant for object properties, not array
elements.

---

## `break` and `continue`

Two keywords let you steer a loop from inside its body:

* `break`: **stop** the loop entirely.
* `continue`: skip the **rest of the current iteration** and move on to the next.

```js
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue; // skip 3
  }
  if (i === 5) {
    break; // stop when i reaches 5
  }
  console.log(i);
}

// Output:
// 1
// 2
// 4
```

---

## Looping in the Browser

A common use of a loop is to turn an array of data into elements on the page. Here each todo becomes
an `<li>` inside a `<ul>`:

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="todo-list"></ul>

    <script>
      const todos = ["Learn HTML", "Learn CSS", "Learn JavaScript"];

      const list = document.getElementById("todo-list");

      for (const item of todos) {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
      }
    </script>
  </body>
</html>
```

---

## Summary

* Loops let you **repeat code**. Choose the form that fits the job:
  * `for`: when you know the number of iterations.
  * `while`: repeat until a condition changes.
  * `do...while`: when the body should run at least once.
  * `for...of`: to go through the values of an array or iterable.
  * `for...in`: to go through an object's keys.
* `break` stops a loop; `continue` skips to the next iteration.

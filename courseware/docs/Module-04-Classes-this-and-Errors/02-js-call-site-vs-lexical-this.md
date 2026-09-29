# Call-Site This versus Lexical This

The value of `this` is one of the most-asked-about corners of JavaScript. The confusion almost always
comes down to a single fork in the road: **regular functions and arrow functions decide `this` in
completely different ways.** Once you know which rule applies to which, the mystery mostly evaporates.

This article walks through:

* How `this` works in **keyword-style functions** (`function ...`), or "call-site `this`"
* How `this` works in **arrow functions**, or "lexical `this`"
* Why arrow functions make nested functions and callbacks so much simpler

![A decision tree for this: arrow, then new, then call/apply/bind, then the dot, then the default](../../diagrams/png/this-binding.png)

*Ask the **call site**, not where the function was written.*

---

## Two big ideas: call-site vs lexical `this`

### Call-site `this` (regular `function`)

For a normal function (`function foo() {}`), `this` is decided by **how the function is called** (the
*call site*), not by where the function was written. The same function can see a different `this` on
every call.

```js
function showThis() {
  console.log(this);
}

showThis();           // this = global (or undefined in strict mode)

const obj = { showThis };
obj.showThis();       // this = obj

const ref = obj.showThis;
ref();                // this = global (or undefined)
```

Same function, three different values of `this`, all depending on the call.

---

### Lexical `this` (arrow functions)

An **arrow function** (`() => {}`) plays by the opposite rule. It has no `this` of its own, so it
**borrows `this` from the surrounding scope**, meaning the place where it was defined. This is called
**lexical `this`**, and it never changes based on how the arrow is called.

```js
const obj = {
  value: 42,
  showThisLater() {
    setTimeout(() => {
      console.log(this.value); // this is obj, thanks to the arrow function
    }, 1000);
  }
};

obj.showThisLater();
```

The arrow inside `setTimeout` shares the same `this` as `showThisLater`, which is `obj`. That is the
whole trick, and the rest of this chapter is really just consequences of it.

---

## Regular `function` and call-site `this`

Let's look at the common call-site patterns, from the well-behaved case to the one that surprises people.

### As a method on an object

Call a function *through* an object and `this` is that object:

```js
const user = {
  name: 'Alice',
  sayHi: function () {
    console.log('Hi, I am', this.name);
  }
};

user.sayHi(); // this = user -> "Hi, I am Alice"
```

### As a standalone function

Pull the same function off the object and call it bare, and the connection to `user` is gone:

```js
const greet = user.sayHi;
greet(); // this = global / undefined -> this.name is not "Alice"
```

### As a callback (where the trouble usually starts)

```js
const button = document.querySelector('#btn');

const app = {
  name: 'MyApp',
  init: function () {
    button.addEventListener('click', function () {
      console.log(this.name);
    });
  }
};

app.init();
```

Inside that click handler:

* `this` is the **button element**, not `app`
* so `this.name` is `undefined`

Why? Because the browser invokes the handler as if it were the button's own method, so the button
becomes the call site. The function has no idea it was defined inside `app`.

### Setting `this` yourself: `call`, `apply`, and `bind`

So far the call site has decided `this` for us. Every function also has three built-in methods that
let you decide it explicitly.

**`call(thisValue, ...args)`** invokes the function immediately with the `this` you name:

```js
function introduce(greeting, punctuation) {
  console.log(`${greeting}, I am ${this.name}${punctuation}`);
}

const alice = { name: 'Alice' };
const bob = { name: 'Bob' };

introduce.call(alice, 'Hello', '!'); // "Hello, I am Alice!"
introduce.call(bob, 'Hi', '.');      // "Hi, I am Bob."
```

One function, two different objects, and neither of them owns it. This is the clearest possible proof
of the rule this chapter opened with: `this` is not baked into the function.

**`apply(thisValue, argsArray)`** does exactly the same thing, but takes the arguments as an array:

```js
introduce.apply(alice, ['Hey', '?']);  // "Hey, I am Alice?"
```

The only difference is how you hand over the arguments. Modern code usually reaches for `call` with
the spread operator (`introduce.call(alice, ...args)`) instead, so you will meet `apply` mostly in
older code.

**`bind(thisValue)`** is the different one: it does **not** call the function. It returns a *new*
function with `this` permanently fixed:

```js
const introduceAlice = introduce.bind(alice);

introduceAlice('Good morning', '!'); // "Good morning, I am Alice!"
```

That permanence is the point, and it is what makes `bind` the fix for the detached-method problem:

```js
const counter = {
  count: 0,
  increment() {
    this.count++;
    console.log('count:', this.count);
  }
};

const detached = counter.increment;
detached();  // TypeError - `this` is undefined, so `this.count` blows up

const bound = counter.increment.bind(counter);
bound();     // "count: 1"
bound();     // "count: 2"
```

"Permanently" is literal: a bound function cannot be re-bound, and even `call` will not budge it:

```js
const stubborn = introduce.bind(alice);
stubborn.call(bob, 'Nice try', '!'); // "Nice try, I am Alice!" - still Alice
```

Add these to the list of call-site patterns, and the rule for a regular `function` becomes:

| How it is called | `this` is |
|------------------|-----------|
| `new Fn()` | the brand-new object |
| `fn.call(x)` / `fn.apply(x)` / `fn.bind(x)()` | whatever you passed |
| `obj.method()` | `obj`, whatever is left of the dot |
| `fn()` on its own | `undefined` in strict mode, `globalThis` otherwise |

Work down the list; the first match wins. Arrow functions ignore the whole table, which is the subject
of the rest of this chapter.

---

## The nested function problem

Call-site `this` gets genuinely painful the moment you nest **a function inside a function**. The inner
function starts a brand-new call site and loses the outer `this`.

```js
const counter = {
  value: 0,
  start: function () {
    console.log('Starting...');

    setTimeout(function () {
      // Here, this is NOT counter
      this.value++;
      console.log('Value:', this.value);
    }, 1000);
  }
};

counter.start();
```

Inside `setTimeout`:

* the inner function has its **own** call-site `this`
* which is **not** the outer `this` (the `counter` object)
* so `this.value` is wrong

### Old solutions (before arrow functions)

For years, developers reached for one of two workarounds.

1. **Save `this` in a variable** (often named `self` or `that`):

```js
start: function () {
  const self = this;

  setTimeout(function () {
    self.value++;
    console.log('Value:', self.value);
  }, 1000);
}
```

2. **Bind `this`** onto the callback explicitly:

```js
start: function () {
  setTimeout(function () {
    this.value++;
    console.log('Value:', this.value);
  }.bind(this), 1000);
}
```

Both work, but they're wordy and easy to forget, exactly the kind of boilerplate arrow functions
were designed to erase.

---

## Arrow functions: lexical `this` to the rescue

An arrow function **has no `this` of its own**, so it reuses whatever `this` was in the scope
around it. Rewrite the counter with an arrow and the problem disappears:

```js
const counter = {
  value: 0,
  start: function () {
    console.log('Starting...');

    setTimeout(() => {
      // Arrow function borrows this from start()
      this.value++;
      console.log('Value:', this.value);
    }, 1000);
  }
};

counter.start();
```

Now:

* `this` inside the arrow is the same as `this` in `start` (the `counter` object)
* no `self = this`, no `.bind(this)` needed

This is the single biggest reason arrow functions exist, and the main way they simplify nested code.

---

## Nested functions in methods: `function` vs `=>`

The same contrast shows up with array methods like `forEach`.

### Using regular functions everywhere (more confusing)

```js
const list = {
  items: ['a', 'b', 'c'],
  logAll: function () {
    this.items.forEach(function (item) {
      console.log(this, item); // this is wrong here!
    });
  }
};

list.logAll();
```

Inside the `forEach` callback, `this` is not `list`; `forEach` calls the function without pointing
`this` at your object, so you'd be back to `self = this`, `.bind`, or passing `forEach`'s `thisArg`.

### Using an arrow function inside forEach (simple)

```js
const list = {
  items: ['a', 'b', 'c'],
  logAll: function () {
    this.items.forEach((item) => {
      console.log(this, item); // this is the list object
    });
  }
};

list.logAll();
```

Here the outer `this` in `logAll` is `list`, and the arrow inside `forEach` happily reuses it.

---

## When to use arrow functions vs keyword `function`

### Arrow functions shine when:

* you need **nested functions or callbacks** that should keep the **outer `this`**
* for example: `setTimeout`, `setInterval`, `addEventListener`, and array methods (`map`, `forEach`, and friends)

```js
const app = {
  name: 'MyApp',
  init: function () {
    document.addEventListener('click', (event) => {
      console.log('App:', this.name); // this is app
    });
  }
};
```

### Regular `function` is still the right choice for:

1. **Object methods** (the classic style)

```js
const user = {
  name: 'Alice',
  sayHi() {
    console.log('Hi', this.name);
  }
};
```

You *can* write an arrow here, but see the pitfall in the next section.

2. Functions used as **constructors or prototype methods**

Arrow functions:

* cannot be called with `new`
* have no `this`, `arguments`, or `prototype` of their own

So don't use an arrow function as a constructor or a prototype method.

---

## Pitfall: arrow functions as methods

Be careful reaching for an arrow function **directly as an object method** when you expect `this` to be
the object:

```js
const user = {
  name: 'Alice',
  // Arrow as a method:
  sayHi: () => {
    console.log('Hi', this.name);
  }
};

user.sayHi(); // this is NOT user
```

Here:

* `this` inside `sayHi` comes from the surrounding (global) scope where `user` was defined
* it is **not** the `user` object
* so `this.name` is usually `undefined`

**Rule of thumb:**

* use `function` (or method shorthand) to **define** methods on objects and classes
* use arrow functions **inside** those methods, for nested callbacks

---

## Summary

* Regular `function` -> `this` depends on **how it's called** (the call site)

  * `obj.method()` -> `this` = `obj`
  * `fn()` -> `this` = global / undefined
  * as a callback -> whatever the caller decides
  * `fn.call(x)` / `fn.apply(x)` -> `x`, chosen by you, called immediately
  * `fn.bind(x)` -> a **new** function with `this` fixed to `x` for good
* Arrow function -> `this` depends on **where it's defined** (lexical)

  * shares `this` with its surrounding scope
  * great for nested functions and callbacks

**Practical pattern**: a regular function for the method, an arrow for the callback inside it:

```js
const widget = {
  id: 123,
  init: function () {
    // This method uses function, so this = widget

    document.addEventListener('click', (event) => {
      // This callback uses an arrow, so this is still widget
      console.log('Widget id:', this.id);
    });
  }
};
```

Keep these two phrases in your head:

* "**`function` -> call-site `this`**"
* "**`=>` -> lexical `this`**"

and you'll be able to pick the right one and sidestep most `this`-related confusion.

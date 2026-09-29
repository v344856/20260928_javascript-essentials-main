# Function Constructors and Prototypes

Modern JavaScript has the `class` keyword, and you'll reach for it most of the time. But `class` is
mostly **syntax sugar** over an older, more fundamental system: **function constructors** and
**prototypes**. Understanding that system demystifies how objects, inheritance, and `this` really
work, and explains error messages you'll eventually hit.

![An instance linked up through Dog.prototype and Animal.prototype to Object.prototype and null](../../diagrams/png/prototype-chain.png)

*Lookup walks **up** the chain until it finds a match; `class` builds exactly this chain.*

---

## Function Constructors + `new`

Before `class`, you created object "blueprints" using a regular function called a **constructor**.
By convention, constructor functions start with a **capital letter**.

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const alice = new Person("Alice", 30);
const bob = new Person("Bob", 25);

console.log(alice.name); // "Alice"
console.log(bob.age);    // 25
```

The magic is in the `new` keyword. When you call `new Person(...)`, JavaScript quietly does four
things:

1. Creates a fresh empty object.
2. Sets that object's internal prototype link to `Person.prototype` (more on that below).
3. Runs the function body with `this` pointing at the new object.
4. Returns the new object automatically.

If you **forget** `new`, `this` won't refer to a new object and things break, another reason the
capital-letter convention exists as a visual reminder.

---

## The `.prototype` Property

Every function has a property called `prototype`, an object that becomes the **shared parent** of
everything created with `new`. Putting methods there means all instances share **one copy**, instead
of each object carrying its own.

```js
function Person(name) {
  this.name = name;
}

// shared by every Person instance
Person.prototype.greet = function () {
  console.log("Hi, I'm " + this.name);
};

const alice = new Person("Alice");
const bob = new Person("Bob");

alice.greet(); // "Hi, I'm Alice"
bob.greet();   // "Hi, I'm Bob"

console.log(alice.greet === bob.greet); // true - same single function
```

Data (like `name`) belongs on each instance; behavior (like `greet`) belongs on the prototype.

---

## The Prototype Chain

When you access a property, JavaScript looks on the object itself first. If it's not there, it
follows the hidden link to the object's prototype, then that prototype's prototype, and so on, in a
sequence called the **prototype chain**. The search ends at `null`.

```js
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  return "Hi, I'm " + this.name;
};

const alice = new Person("Alice");

console.log(Object.hasOwn(alice, "name"));  // true  - own property
console.log(Object.hasOwn(alice, "greet")); // false - found on the prototype
console.log(alice.greet());                 // "Hi, I'm Alice"
```

Here the lookup for `greet` misses on `alice`, then finds it on `Person.prototype`. That's the chain
in action. Built-in methods like `toString` come from even further up the chain (`Object.prototype`).

### Seeing the chain: `Object.getPrototypeOf`

The link between an object and its prototype is hidden, but not secret:
**`Object.getPrototypeOf(obj)`** returns it, which lets you check the chain instead of taking it on
faith:

```js
console.log(Object.getPrototypeOf(alice) === Person.prototype);          // true
console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype));                     // null - the end
```

Those three lines *are* the chain: `alice` -> `Person.prototype` -> `Object.prototype` -> `null`. You
can walk it yourself, which is a useful thing to do once in a debugger when a method is coming from
somewhere you did not expect:

```js
let step = alice;
while (step !== null) {
  console.log(step.constructor?.name ?? '(none)');
  step = Object.getPrototypeOf(step);
}
// Person
// Person      <- Person.prototype: its .constructor still points at Person
// Object      <- Object.prototype
```

A few notes:

* You may see **`obj.__proto__`** in older code and in DevTools. It does the same job, but it is a
  legacy feature kept only for compatibility, so prefer `Object.getPrototypeOf`.
* There is a matching **`Object.setPrototypeOf(obj, proto)`**, but changing an object's prototype
  after creation makes engines de-optimize it badly. Use `Object.create` (next section) to set the
  prototype *at* creation instead.
* An object made with `Object.create(null)` has **no** prototype at all, so
  `Object.getPrototypeOf` returns `null` and it has none of the usual inherited members, not even
  `toString` or `hasOwnProperty`. That is occasionally exactly what you want for a pure lookup table.

---

## `Object.create`

`Object.create(proto)` builds a new object with a prototype **you choose directly**, with no constructor
function required. It's the most explicit way to set up the chain.

```js
const animal = {
  describe() {
    return this.type + " named " + this.name;
  },
};

const dog = Object.create(animal); // dog's prototype is "animal"
dog.type = "dog";
dog.name = "Rex";

console.log(dog.describe()); // "dog named Rex"
```

`dog` has no `describe` of its own; it borrows it from `animal` through the prototype chain.

---

## `instanceof`

The `instanceof` operator asks: **"Is this constructor's `prototype` somewhere in the object's
chain?"** It's how you check what an object was built from.

```js
function Person(name) {
  this.name = name;
}

const alice = new Person("Alice");

console.log(alice instanceof Person); // true
console.log(alice instanceof Object); // true - Object is further up the chain
console.log(alice instanceof Array);  // false
```

---

## How ES6 `class` Maps Onto This

**`class` is a cleaner way to write exactly what you just saw.** It does not introduce a new object
model; it uses the same constructors and prototypes underneath.

These two definitions are essentially equivalent:

```js
// Prototype style
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  return this.name + " makes a sound";
};

// Class style - same result, nicer syntax
class Animal2 {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return this.name + " makes a sound";
  }
}
```

You can verify that class methods still live on the prototype:

```js
const a = new Animal2("Rex");

console.log(a.speak());                     // "Rex makes a sound"
console.log(Object.hasOwn(a, "speak"));     // false - it's on the prototype
console.log(a instanceof Animal2);          // true
```

The mapping, piece by piece:

* The `class` body's `constructor` **is** the old constructor function.
* Methods written in the class body are placed on `ClassName.prototype`.
* `extends` sets up the prototype chain between child and parent.
* `super(...)` calls the parent constructor, just like calling it manually would.
* `new`, `this`, and `instanceof` behave identically, because it's the same machinery.

So when you read `class`, picture the constructor-and-prototype version underneath. That mental model
explains why methods are shared, why `this` depends on how a method is called, and why `instanceof`
works the way it does.

---

## Summary

* A **function constructor** (capitalized by convention) plus **`new`** builds objects: `new`
  creates an object, links its prototype, runs the function with `this`, and returns it.
* A function's **`.prototype`** object holds methods **shared** by every instance, one copy, not
  one per object.
* Property lookups walk the **prototype chain** until found or until `null`.
* **`Object.getPrototypeOf(obj)`** returns the next link, so you can inspect (or walk) the chain
  yourself. Prefer it to the legacy `__proto__`.
* **`Object.create(proto)`** makes an object with a prototype you pick directly.
* **`instanceof`** checks whether a constructor's prototype is in an object's chain.
* **ES6 `class` is syntax sugar** over constructors and prototypes, with the same object model and
  friendlier syntax.

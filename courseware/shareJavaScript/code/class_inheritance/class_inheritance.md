# Inheritance in JavaScript

## Objectives:

1. Use extends to implement inheritance
2. Understand how super() works
3. Recognize the prototype chain behind class inheritance

### Inheritance Using extends keyword

```javascript
class Car {
  constructor(brand) {
    this.carname = brand;
  }

  present() {
    return `I have a ${this.carname}`;
  }
}

class Model extends Car {
  constructor(brand, mod) {
    super(brand); // calls parent constructor
    this.model = mod;
  }

  show() {
    return this.present() + `, it is a ${this.model}`;
  }
}

const myCar = new Model("Ford", "Mustang");
console.log(myCar.show());
```

#### How the super() works

- super() calls the parent class constructor
- It must be called before using this in the child constructor
- It gives access to parent properties and methods

## Prototype Chain Behind the Scenes

Even though ES6 classes look like classical OOP, JavaScript still uses **prototypal inheritance**.

```text
myCar → Model.prototype → Car.prototype → Object.prototype → null
```

## What is Prototype Inheritance ?

Prototype inheritance means:

- An object inherits properties and methods from another object via its prototype link.
- MDN states that each object has an internal [[Prototype]] pointing to another object, and property lookup walks up this chain until it finds the property or reaches null

### The Prototype Chain

When you access a property:

- JavaScript checks the object itself
- If not found, it checks the object's prototype
- Then the prototype’s prototype
- Continues until null

## Creating Prototype Inheritance with Object.create()

```javascript
const parent = {
  greet() {
    console.log("Hello from the parent!");
  },
};

const child = Object.create(parent);
child.sayHi = function () {
  console.log("Hi from the child!");
};

child.greet(); // inherited
child.sayHi(); // own method
```

## Inheritance with Static Methods

JavaScript classes support:

- **Instance methods** → used by objects created from the class
- **Static methods** → used by the class itself, not by instances
- **Inheritance** → child classes extend parent classes
  <br>
  Static methods are perfect for utilities like validation, ID generation, or factory creation.

```javascript
// class_static.js

class Example {
  static greet() {
    return "Hello!";
  }
}

console.log(Example.greet()); // ✔️ works
console.log(new Example().greet()); // ❌ error
```

A **static** method belong to the class, not the instance <br>

### Static methods are ideal for:

1. Validation
2. Utility functions
3. ID generation
4. Factory methods

## Polymorphism

- Different objects can share the same method name but implement different behaviors.
- In JavaScript, polymorphism happens through:
  - Method overriding (child class replaces parent method)
  - Prototype chain behavior

## Pros and Cons of Using Arrow Functions in Inheritance

### Pros of USing Arrow Functions in Inheritance

1. **Lexical** this — **No Binding Problems**

- Arrow functions capture this from the class instance, so you never lose context.

```javascript
class Employee {
  constructor(name) {
    this.name = name;
  }

  getName = () => this.name; // always correct
}


const emp =  new Employee("Stefan");
console.log(emp.getName())
```

#### Why this matters in inheritance:
- Arrow functions **do not have their own** this
- They **capture** lexically fromt he surrounding scope at te moment they are created
- In a class, the surrounding scope is always the **instance**

Thus:
- A parent class arrow method captures the parent instnace
- A child class arrow method captures the child instnace
- Passing the method around (callback, event handlers, timers) does not change this
**This is why they never lose this**

```javascript
// inheritance_arrow.js

class Parent {
    constructor(name) {
        this.name = name;
    }

    sayName = () => {
        console.log(this.name);
    };
}


class Child extends Parent {
    constructor(name) {
        super(name);
    }
}

const c = new Child("Stefan");

// PAssing the method as callback
setTimeout(c.sayName, 1000);

// Why this workds - sayName is created **inside the constructor**, so its **this** bound to the isntance c
```
- Not using the arrow function

```javascript
// inheritance_no_arrow.js

class Parent {
    constructor(name) {
        this.name = name;
    }

    sayName() {
        console.log(this.name);
    };
}


class Child extends Parent {
    constructor(name) {
        super(name);
    }
}

const c = new Child("Stefan");

// PAssing the method as callback
setTimeout(c.sayName, 1000);

// Error : Undefined

```

1. Child classes calling parent arrow functions never lose this, even when passed as callbacks.

2. Safe When Passing Methods Around
- Arrow‑based methods don’t lose their binding:

3. Useful for Event Handlers and Callbacks

- In UI frameworks or async code, arrow functions prevent the classic “undefined this” bug.

4. Each Instance Gets Its Own Copy

- This is a pro when you want per‑instance behavior or closures.
- Example: private counters, per‑instance memoization, or stateful methods.

## Using Object.getPrototypeOf(obj) method

1. **Object.getPrototypeOf(obj)** — Get an object’s prototype

```javascript
// inheritance_prototype.js

class Parent {
    constructor(name) {
        this.name = name;
    }

    sayName() {
        console.log(this.name);
    };
}


class Child extends Parent {
    constructor(name) {
        super(name);
    }
}

const c = new Child("Stefan");


const parentObject = new Parent("parent");
console.log(Object.getPrototypeOf(parentObject));

const childObject = new Child("child");
console.log(Object.getPrototypeOf(childObject));

/* Output
{}
Parent {}
*/
```

### What it does

- Returns the internal [[Prototype]] of an object
- Equivalent to reading obj.**proto** (but safer and recommended)

2. **Object.setPrototypeOf(obj, proto)** — Set an object’s prototype

```javascript
const parent = {
  greet() {
    console.log("Hello");
  },
};
const child = {};

Object.setPrototypeOf(child, parent);

child.greet(); // Hello
```

### What it does

- Changes the prototype chain
- Makes child inherit from parent<br>
  ⚠️ Not recommended for performance‑critical code because changing prototypes can slow down engines.

3. Function **.prototype** — Used for constructor functions & classes
   Every function has a .prototype object.

```javascript
function Employee(name) {
  this.name = name;
}

Employee.prototype.sayHi = function () {
  console.log("Hi " + this.name);
};

const e = new Employee("Edna");
e.sayHi(); // Hi Edna
```

### What it does

- Defines the prototype for all instances created by new Employee()
- This is how class inheritance works under the hood

```javascript
const parent = {
  greet() {
    console.log("Hello from parent");
  },
};

const child = {
  sayHi() {
    console.log("Hi from child");
  },
};

// Set prototype
Object.setPrototypeOf(child, parent);

// Inspect prototype
console.log(Object.getPrototypeOf(child)); // parent object

child.greet(); // inherited
child.sayHi(); // own method
```

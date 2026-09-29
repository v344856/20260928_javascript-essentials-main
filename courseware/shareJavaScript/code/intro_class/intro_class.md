# Class in JavaScript

## Objectives:

1. Define JavaScript classes
2. Create class constructors and methods
3. Private property and Getters and Setters
4. Hoisting Behavior

## What is a Class in JavaScript ?

- A class is a blueprint for creating objects with shared properties and methods.
- ES6 classes provide a cleaner syntax for constructor functions and prototypes.

### Defining a class

```javascript
// car.js

class Car {
  constructor(brand) {
    this.carname = brand;
  }

  present() {
    return `I have a ${this.carname}`;
  }
}

const myCar = new Car("Ford");
console.log(myCar.present());
```

### Creating an Instance

```javascript
const myCar = new Car("Ford");
console.log(myCar.present());
```

## Getters and Setterss in Classes

Classes support getters and setters for encapsulation.

```javascript
class Car {
  constructor(brand) {
    this._carname = brand;
  }

  get carname() {
    return this._carname;
  }

  set carname(x) {
    this._carname = x;
  }
}

const myCar = new Car("Ford");
myCar.carname = "Toyota";
console.log(myCar.carname);


// add code to create and instance and access the values directly
```

A field with **#** is private unreachable from outside the class body

```javascript
// car_private.js
class Car {
  #carname;

  constructor(brand) {
    this.#carname = brand;
  }

//   get carname() {
//     return this.#carname;
//   }

//   set carname(x) {
//     this.#carname = x;
//   }
}

const myCar = new Car("Ford");
myCar.#carname = "Toyota";       // error
console.log(myCar.#carname);     // error

// add code to create an instance and use try/catch to catch exception to access the property directly. Must use the setter method instead
```

## Hoisting Behavior

- Class declarations are not hoisted.
- You must define a class before using it.
- ReferenceError: Cannot access 'Car' before initialization


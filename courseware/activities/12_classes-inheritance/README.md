# Activity: Vehicles and Cars

Same concepts as the demo (`extends` and `super`, overriding a method, `static` members, and `instanceof`), applied to vehicles instead of people. You will build a subclass, override an inherited method while still calling the parent's, and add static members that belong to the class rather than any car.

**Estimated time:** 15-20 minutes

## Setup

Your working files are in `end/`. Open `end/index.js` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: Extend Vehicle

Write `class Car extends Vehicle`. Its constructor takes `make`, `model`, and `doors`; call `super(make, model)` **first**, then assign `this.doors`.

### Task 2: Add a subclass method

Give `Car` a `describe()` method logging `"<make> <model> has <doors> doors."`.

### Task 3: Override start()

Redefine `start()` on `Car` so it logs `"Checking the doors first..."` and then calls `super.start()` to run the parent's version too.

**Expected output:**
```
Checking the doors first...
Toyota Corolla is starting.
Toyota Corolla has 4 doors.
```

### Task 4: Static members on Vehicle

Add `static registry = "State DMV"` and `static count = 0` to `Vehicle`, and increment `Vehicle.count` in its constructor. Because `Car`'s `super()` runs the parent constructor, cars are counted too.

### Task 5: A static factory

Add `static coupe(make, model)` to `Car` that returns a new `Car` with 2 doors, a named alternative to calling `new` with a magic number.

**Expected output:**
```
Mazda MX-5 has 2 doors.
```

### Task 6: Read the statics, then check the chain

Log `Vehicle.registry` and `Vehicle.count`, then log `car1.registry`, which is `undefined`, because statics live on the class, not on instances. Finish with the four `instanceof` checks.

**Expected output:**
```
State DMV
2
undefined
true
true
true
false
```

## What You'll Learn

- Building a subclass with `extends` and reusing the parent constructor with `super(...)`.
- Why `super()` has to come before the subclass assigns its own fields.
- Overriding an inherited method and still calling the parent's with `super.method()`.
- Declaring `static` fields and methods, and why instances cannot see them.
- Writing a static factory method as a readable alternative to `new`.
- How `instanceof` walks the prototype chain, matching every ancestor.

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Add a second subclass `Truck extends Vehicle` with a `payload` field and its own `start()` override, then put a mixed array of cars and trucks through one loop that calls `start()` on each. Every object picks its own override with no `if` in sight, which is polymorphism. Then add a `static describeFleet(vehicles)` on `Vehicle` that reports how many of each subclass the array holds, using `constructor.name`.

Sample output:

```
Checking the doors first...
Toyota Corolla is starting.
Securing the load...
Ford F-150 is starting.
{ Car: 1, Truck: 1 }
```

## Related reading

- [JavaScript Classes](../../docs/Module-04-Classes-this-and-Errors/01-js-classes.md)
- [Function Constructors and Prototypes](../../docs/Module-04-Classes-this-and-Errors/04-js-function-constructors-and-prototypes.md)
- Diagram: [The Prototype Chain](../../diagrams/png/prototype-chain.png)
- Diagram: [Class Anatomy](../../diagrams/png/class-anatomy.png)

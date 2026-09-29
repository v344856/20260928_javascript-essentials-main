# Classes and Abstract Classes

JavaScript already has classes (you met them earlier in the course). TypeScript keeps those same classes and adds a type layer: **access modifiers** to control visibility, the ability to **implement** an interface, and **abstract** classes that define a template subclasses must complete. This chapter walks through each.

---

## Classes in TypeScript

A TypeScript class looks like a JavaScript class with type annotations on its fields and methods:

```ts
class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  distanceFromOrigin(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
}

const p = new Point(3, 4);
p.distanceFromOrigin(); // 5
```

Unlike plain JavaScript, TypeScript requires you to **declare fields** (`x: number`) before using them, and it checks that the constructor actually initializes them.

### Parameter properties (a shortcut)

Declaring a field and assigning it in the constructor is such a common pattern that TypeScript offers a shorthand: put an access modifier on a constructor parameter and TypeScript creates and assigns the field for you.

```ts
class Point {
  constructor(public x: number, public y: number) {}
  // Equivalent to declaring x and y and assigning this.x = x, this.y = y.
}

const p = new Point(3, 4);
p.x; // 3
```

---

## Access Modifiers

Access modifiers control **who can see a member**. They are a compile-time feature; they shape how your class is *used*, catching misuse before runtime.

### `public` (the default)

`public` members are accessible everywhere. This is the default, so you rarely write it explicitly:

```ts
class Dog {
  public name: string; // "public" is optional here
  constructor(name: string) {
    this.name = name;
  }
}

new Dog("Rex").name; // "Rex" - accessible outside the class
```

### `private`

`private` members are accessible **only inside the class** that declares them:

```ts
class BankAccount {
  private balance = 0;

  deposit(amount: number): void {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

const acct = new BankAccount();
acct.deposit(100);
acct.getBalance(); // 100
acct.balance;
// Error: Property 'balance' is private and only accessible within class 'BankAccount'.
```

This is **encapsulation**: internal state is protected, and the outside world interacts only through the methods you expose.

### `protected`

`protected` members are accessible inside the class **and its subclasses**, but not from outside:

```ts
class Animal {
  protected species: string;
  constructor(species: string) {
    this.species = species;
  }
}

class Cat extends Animal {
  describe(): string {
    return `A ${this.species}`; // OK - subclass can see protected members
  }
}

new Cat("feline").species;
// Error: Property 'species' is protected.
```

### `readonly`

`readonly` marks a field that can be set only during construction, then never reassigned. It combines with the other modifiers:

```ts
class User {
  readonly id: number;
  constructor(id: number) {
    this.id = id; // OK - set in constructor
  }
}

const u = new User(1);
u.id = 2;
// Error: Cannot assign to 'id' because it is a read-only property.
```

---

## Implementing an Interface

An interface (from [Type Aliases and Interfaces](./03-type-aliases-and-interfaces.md)) can act as a **contract** for a class. The class promises, via **`implements`**, to provide everything the interface requires:

```ts
interface Shape {
  area(): number;
  name: string;
}

class Circle implements Shape {
  name = "circle";
  constructor(private radius: number) {}

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}
```

If the class forgets a required member, TypeScript reports it:

```ts
class Square implements Shape {
  name = "square";
  // forgot area()
}
// Error: Class 'Square' incorrectly implements interface 'Shape'.
//        Property 'area' is missing.
```

A class can implement **multiple** interfaces (`implements A, B`), letting you compose small contracts. `implements` only checks the shape; it does not inherit any code.

---

## Abstract Classes

An **abstract class** is a base class that **cannot be instantiated directly**; it exists to be extended. It is useful when several classes share behavior *and* a common template, but the base itself is incomplete.

```ts
abstract class Shape {
  abstract area(): number;      // no body - subclasses MUST implement it

  describe(): string {          // concrete method - shared by all subclasses
    return `This shape has area ${this.area()}`;
  }
}

new Shape();
// Error: Cannot create an instance of an abstract class.
```

### Abstract methods

An **abstract method** has a signature but **no implementation**. Every concrete subclass is required to provide one:

```ts
class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }

  area(): number {              // required - fulfills the abstract method
    return this.width * this.height;
  }
}

const r = new Rectangle(3, 4);
r.area();      // 12
r.describe();  // "This shape has area 12"  (inherited concrete method)
```

If a subclass forgets to implement an abstract method, it is an error:

```ts
class Triangle extends Shape {}
// Error: Non-abstract class 'Triangle' does not implement inherited
//        abstract member 'area'.
```

### Abstract class vs interface

Both define a contract, so which do you use?

- An **interface** is purely a shape, with no implementation, and a class can implement many. Use it for a lightweight contract.
- An **abstract class** can hold **shared implementation** (`describe()` above) *and* enforce abstract members, but a class can extend only **one**. Use it when subclasses should inherit real, shared code, not just a shape.

As a rule of thumb, reach for an **abstract class** when related classes need to share real code, and for an **interface** when you only need to guarantee a shape.

---

## Summary

* TypeScript classes are JavaScript classes with **typed fields**; **parameter properties** (`constructor(public x: number)`) declare and assign a field in one step.
* **Access modifiers** control visibility: **`public`** (default, everywhere), **`private`** (this class only), **`protected`** (this class + subclasses), plus **`readonly`** (set once, in the constructor).
* **`implements`** makes a class satisfy an interface's contract; a class can implement several interfaces, and TypeScript checks nothing is missing.
* An **`abstract` class** cannot be instantiated; it is a base to extend. **Abstract methods** have no body and must be implemented by every concrete subclass, and abstract classes can also provide shared concrete methods.
* Use an **abstract class** to share implementation among related classes; use an **interface** for a lightweight shape-only contract.

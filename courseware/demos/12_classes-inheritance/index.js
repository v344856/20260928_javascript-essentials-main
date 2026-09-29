// ---------------------------------------------------------------------------
// Part 1: extends and super(): reusing a parent class
// ---------------------------------------------------------------------------

class Person {
  // Static members belong to the CLASS, not to any instance.
  static species = "Homo sapiens";
  static count = 0;

  constructor(name, age) {
    this.name = name;
    this.age = age;
    Person.count++;
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }

  // A static factory method: a named alternative to `new`. It is called on
  // the class (Person.fromFullName), never on an instance.
  static fromFullName(fullName, age) {
    const [firstName] = fullName.split(" ");
    return new Person(firstName, age);
  }
}

class Employee extends Person {
  constructor(name, age, jobTitle) {
    super(name, age); // call the parent constructor FIRST
    this.jobTitle = jobTitle;
  }

  work() {
    console.log(`${this.name} is working as a ${this.jobTitle}.`);
  }

  // ---------------------------------------------------------------------
  // Part 2: Overriding a method, and calling back up with super
  // ---------------------------------------------------------------------
  greet() {
    console.log("greet is overridden in Employee.");
    super.greet(); // run the parent's version too
  }
}

const employee1 = new Employee("Charlie", 28, "Software Engineer");
console.log(employee1.name, employee1.age, employee1.jobTitle);
employee1.greet(); // the override runs, then the parent's
employee1.work(); // defined only on Employee

// ---------------------------------------------------------------------------
// Part 3: Static members are read off the class
// ---------------------------------------------------------------------------

const person2 = Person.fromFullName("Jane Smith", 41);
console.log(person2); // Person { name: 'Jane', age: 41 }

console.log(Person.species); // Homo sapiens
console.log(Person.count); // 2: the Employee's super() call counted too

// Statics are NOT on instances:
console.log(employee1.species); // undefined

// ---------------------------------------------------------------------------
// Part 4: instanceof and the prototype chain
// ---------------------------------------------------------------------------

class Apple {}

console.log(employee1 instanceof Employee); // true
console.log(employee1 instanceof Person); // true: up the chain
console.log(employee1 instanceof Object); // true: everything ends here
console.log(employee1 instanceof Apple); // false

// employee1 inherits from Employee.prototype...
console.log(Object.getPrototypeOf(employee1) === Employee.prototype); // true

// ...Employee.prototype inherits from Person.prototype...
console.log(Object.getPrototypeOf(Employee.prototype) === Person.prototype); // true

// ...Person.prototype inherits from Object.prototype...
console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype); // true

// ...and Object.prototype is the top: its prototype is null.
console.log(Object.getPrototypeOf(Object.prototype)); // null

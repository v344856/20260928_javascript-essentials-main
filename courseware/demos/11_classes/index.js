// ---------------------------------------------------------------------------
// Part 1: A class is a template for objects
// ---------------------------------------------------------------------------

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

const person = new Person("Alice", 30);
console.log(person.name); // Alice
console.log(person.age); // 30
person.greet(); // Hello, my name is Alice and I am 30 years old.

const person2 = new Person("Bob", 25);
person2.greet(); // Hello, my name is Bob and I am 25 years old.

console.log(person instanceof Person); // true

// Methods live on the prototype, so every instance SHARES one function object
// rather than each carrying its own copy.
console.log(person.greet === person2.greet); // true

// ---------------------------------------------------------------------------
// Part 2: Encapsulation: #private fields and accessors
// ---------------------------------------------------------------------------

class Employee {
  // A # field is genuinely private: unreachable from outside the class body.
  #firstName;
  #lastName;
  #salary;

  constructor(firstName, lastName, salary) {
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#salary = salary;
  }

  // A getter reads like a property but runs code.
  get firstName() {
    return this.#firstName;
  }

  // A setter is where validation belongs: nothing can bypass it to reach
  // the private field directly.
  set firstName(name) {
    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("First name must be a non-empty string");
    }
    this.#firstName = name;
  }

  get lastName() {
    return this.#lastName;
  }

  // A computed getter derives a value instead of storing one.
  get fullName() {
    return `${this.#firstName} ${this.#lastName}`;
  }

  get salaryFormatted() {
    return "$" + this.#salary.toFixed(2);
  }
}

const employee = new Employee("John", "Doe", 82500);

// The setter validates: assigning an empty string throws. We catch it here so
// the demo can continue and show the accessors below.
try {
  employee.firstName = ""; // rejected
} catch (error) {
  console.log("Rejected:", error.message); // Rejected: First name must be a non-empty string
}

employee.firstName = "Jane"; // accepted
console.log(employee.firstName); // Jane
console.log(employee.fullName); // Jane Doe
console.log(employee.salaryFormatted); // $82500.00

// The private field really is private; this is a syntax error if uncommented:
// console.log(employee.#salary);
console.log(Object.keys(employee)); // []: # fields never show up

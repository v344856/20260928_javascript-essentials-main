// ============================================
// Part 1: Function constructors: objects before ES6 classes
// ============================================

// Before the `class` keyword, JavaScript built objects from
// "constructor functions". By convention their name is Capitalized.
function Person(name, age) {
  // `new` creates a fresh object and binds it to `this`.
  this.name = name;
  this.age = age;
}

// Shared methods go on the constructor's `.prototype`, so every
// instance shares ONE copy instead of each carrying its own.
Person.prototype.greet = function () {
  return `Hi, I'm ${this.name} and I'm ${this.age}.`;
};

Person.prototype.haveBirthday = function () {
  this.age += 1;
};

// `new` runs the constructor and returns the new object.
const alice = new Person("Alice", 30);
const bob = new Person("Bob", 25);

console.log(alice.greet()); // Hi, I'm Alice and I'm 30.
console.log(bob.greet()); // Hi, I'm Bob and I'm 25.

alice.haveBirthday();
console.log(alice.greet()); // Hi, I'm Alice and I'm 31.

// Both instances share the same greet function (one copy on the prototype).
console.log(alice.greet === bob.greet); // true

// `instanceof` checks whether an object was built from a constructor.
console.log(alice instanceof Person); // true
console.log(alice instanceof Object); // true (Person builds on Object)

// The instance's hidden prototype link points at Person.prototype.
console.log(Object.getPrototypeOf(alice) === Person.prototype); // true
console.log(alice.constructor === Person); // true

// ============================================
// Part 2: Prototype inheritance with Object.create
// ============================================

// You do not need a constructor at all. A plain object can serve as a
// prototype: a shared parent that other objects delegate to for
// properties they do not have themselves.
const animal = {
  describe() {
    return `${this.name} is a ${this.type}.`;
  },
  speak() {
    return `${this.name} makes a sound.`;
  },
};

// Object.create makes a new object whose prototype IS `animal`.
const dog = Object.create(animal);
dog.name = "Rex";
dog.type = "dog";

// `describe` isn't on `dog`: the engine walks up the chain to `animal`.
console.log(dog.describe()); // Rex is a dog.
console.log(dog.speak()); // Rex makes a sound.

// Delegation in action: an object can override an inherited method.
const cat = Object.create(animal);
cat.name = "Whiskers";
cat.type = "cat";
cat.speak = function () {
  return `${this.name} says meow.`;
};

console.log(cat.speak()); // Whiskers says meow. (own method wins)
console.log(cat.describe()); // Whiskers is a cat. (still inherited)

// The prototype chain: cat -> animal -> Object.prototype -> null
console.log(Object.getPrototypeOf(cat) === animal); // true
console.log(Object.getPrototypeOf(animal) === Object.prototype); // true

// Object.hasOwn distinguishes own properties from inherited ones.
console.log(Object.hasOwn(cat, "speak")); // true  (defined on cat)
console.log(Object.hasOwn(dog, "speak")); // false (inherited from animal)

// ============================================
// Part 3: A class is sugar over exactly this machinery
// ============================================

class Vehicle {
  constructor(name) {
    this.name = name;
  }
  describe() {
    return `${this.name} is a vehicle.`;
  }
}

const car = new Vehicle("Sedan");
console.log(car.describe()); // Sedan is a vehicle.

// Under the hood the class uses the SAME prototype chain we built by hand.
console.log(Object.getPrototypeOf(car) === Vehicle.prototype); // true
console.log(typeof Vehicle.prototype.describe); // function

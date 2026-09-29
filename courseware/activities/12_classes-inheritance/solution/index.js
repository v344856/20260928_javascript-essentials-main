// Activity: Class Inheritance, Overriding and Statics (solution)

class Vehicle {
  // Task 4: static members belong to the class, not to any instance.
  static registry = "State DMV";
  static count = 0;

  constructor(make, model) {
    this.make = make;
    this.model = model;
    Vehicle.count++;
  }

  start() {
    console.log(`${this.make} ${this.model} is starting.`);
  }
}

// Task 1: Car extends Vehicle and reuses the parent constructor with super().
class Car extends Vehicle {
  constructor(make, model, doors) {
    super(make, model);
    this.doors = doors;
  }

  // Task 2: subclass-specific method
  describe() {
    console.log(`${this.make} ${this.model} has ${this.doors} doors.`);
  }

  // Task 3: override start(), then call the parent's version with super.
  start() {
    console.log("Checking the doors first...");
    super.start();
  }

  // Task 5: static factory - a named alternative to `new`.
  static coupe(make, model) {
    return new Car(make, model, 2);
  }
}

const car1 = new Car("Toyota", "Corolla", 4);
car1.start(); // the override runs, then the parent's
car1.describe();

const car2 = Car.coupe("Mazda", "MX-5");
car2.describe();

// Task 6: statics are read off the class, and instanceof walks the chain.
console.log(Vehicle.registry);
console.log(Vehicle.count);
console.log(car1.registry);

class Bicycle {}
console.log(car1 instanceof Car);
console.log(car1 instanceof Vehicle);
console.log(car1 instanceof Object);
console.log(car1 instanceof Bicycle);

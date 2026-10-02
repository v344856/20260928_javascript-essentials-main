// Activity: Class Inheritance, Overriding and Statics
// Complete each TODO. Run with:  npm start   (npm run solution for the answer)

class Vehicle {
  // TODO Task 4: add `static registry = "State DMV"` and `static count = 0`,
  // then increment Vehicle.count inside the constructor below.
  static registry = "State DMV";
  static count = 0;

  constructor(make, model) {
    this.make = make;
    this.model = model;
    Vehicle.count++;
  }


  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  start() {
    console.log(`${this.make} ${this.model} is starting.`);
  }
}

// TODO Task 1: write `class Car extends Vehicle`. Its constructor takes
// make, model, and doors: call super(make, model) FIRST, then set this.doors.
 
class Car extends Vehicle {
     constructor(make, model, doors) {
     super(make,model);
     this.doors = doors;}
 

// TODO Task 2: give Car a describe() method logging
// "<make> <model> has <doors> doors."
      describe() {
        console.log(`make = ${this.make} model = ${this.model}, door= ${this.doors}`)
        }
        
      
     
// TODO Task 3: override start() on Car so it logs "Checking the doors first..."
// and then calls super.start().

    start() {
    console.log("Checking the doors first...");
    super.start();
  }
}

      
// TODO Task 5: add `static coupe(make, model)` to Car returning a new Car
// with 2 doors.

// Once Car exists, uncomment the block below - it is already written.
//
const car1 = new Car("Toyota", "Corolla", 4);
car1.start();
car1.describe();

//const car2 = Car.coupe("Mazda", "MX-5");
//car2.describe();

// TODO Task 6: log Vehicle.registry, Vehicle.count, then car1.registry
// (undefined - statics are not on instances).

class Bicycle {}
console.log(car1 instanceof Car);
console.log(car1 instanceof Vehicle);
console.log(car1 instanceof Object);
console.log(car1 instanceof Bicycle);

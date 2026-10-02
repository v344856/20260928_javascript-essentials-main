// car.js

class Car {
  constructor(brand) {
    this.carname = brand;  // "this" means current object
  }

  present() {
    return `I have a ${this.carname}`;
  }
}

const myCar = new Car("Ford");
console.log(myCar.present());
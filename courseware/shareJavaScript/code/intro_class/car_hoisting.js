
const myCar = new Car("Ford");
console.log(myCar.present());


class Car {
  constructor(brand) {
    this.carname = brand;
  }

  present() {
    return `I have a ${this.carname}`;
  }
}


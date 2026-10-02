
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

// above will get error
// class must be defined firstg before you use it.
// however, funcation and var can be defined any where.
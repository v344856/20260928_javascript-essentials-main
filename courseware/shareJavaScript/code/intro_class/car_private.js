class Car {
  #carname;

  constructor(brand) {
    this.#carname = brand;
  }

//   get carname() {
//     return this.#carname;
//   }

//   set carname(x) {
//     this.#carname = x;
//   }
}

const myCar = new Car("Ford");
myCar.#carname = "Toyota";       // error
console.log(myCar.#carname);     // error
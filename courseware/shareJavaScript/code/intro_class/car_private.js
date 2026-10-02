class Car {
  #carname;  // private attribute

  constructor(brand) {
    this.#carname = brand;
  }

  // "get" is read/display , "set" is write
  // the line #28 calls GET
  get carname() {
    console.log("GET method is called")
    return this.#carname;
  }

  // "set" is write, line # 25 calls SET
  set carname(x) {
     console.log("SET method is called")
    this.#carname = x;
  }
}

// const myCar = new Car("Ford");
// myCar.#carname = "Toyota";       // error 
// console.log(myCar.#carname);     // error

const myCar = new Car("Ford");
myCar.carname = "Toyota";       // good 
console.log(myCar.carname);     // good
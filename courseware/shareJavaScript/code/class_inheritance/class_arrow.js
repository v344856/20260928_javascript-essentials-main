class Employee {
  constructor(name) {
    this.name = name;
  }

  getName = () => this.name; // always correct
}

const emp =  new Employee("Stefan");
console.log(emp.getName())
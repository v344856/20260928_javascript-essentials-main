// const emp01 = {
//     fname: "Lambert",
//     salary: "100000.0",
//     county: "Baltimore",
//     position: "CIO",
//     isAdministrator: true
// }

// const emp02 = {
//     fname: "Luke",
//     salary: "90000.0",
//     county: "Montgomery",
//     position: "CSO",
//     isAdministrator: true
// }

// if a function inside class, we call method in stead of function
class Employee{
    constructor(fname, salary, county, position, isAdministrator) {
        this.fname = fname;
        this.salary = salary;
        this.county = county;
        this.position = position;
        this.isAdministrator = isAdministrator
    }
    // "display() is called method, not function although it is actuallly a function
    // method --- TODO --tasks
    // object.method()  -  how to invoke
    display() { console.log(`Name = ${this.fmame} Salary = ${this.salary}`)}
}
//invoke the class and create object/instant,  you have to use the key words "new"
const emp01 = new Employee("Lambert", 100000.00, "Baltimore", "CIO", true)
console.log(emp01.fname)
console.log(emp01.salary)
console.log(emp01.county)
console.log(emp01.position)

emp01.display();

console.log(emp01)

console.log(`${emp01.fname} ${emp01.salary}`)

emp01.salary = 500.00

console.log(`${emp01.fname} ${emp01.salary}`)

emp01.salary = "T"
console.log(emp01)

let num = 100;
console.log(typeof num)
console.log(typeof emp01.salary)

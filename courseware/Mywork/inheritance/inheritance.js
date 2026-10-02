class Employee {
    constructor(fname) {
        this.fname = fname;
    }
    computePay() {
        return 0;

    }
    display() { return `Name : ${this.fname}` };
    
//console.log(Employee.display(Companyname()))
    //console.log(PartTime.display(Companyname()))
    //console.log(FullTime.display(Companyname()))

    static displaycompanyName() {return "SSA";}
}


console.log("===============");
const emp01 = new Employee("Lambert");
console.log(emp01.display());
console.log(emp01.computePay());// return 0

//below codes will override zero
class FullTime extends Employee {
    constructor(fname, salary) {
        super(fname);
        this.salary = salary
    }



    computePay() {
        return this.salary;
    }
}


// "extends" means inheritance
class PartTime extends Employee {
    constructor(fname, rate, hours) {
        super(fname);
        this.rate = rate;
        this.hours = hours;
    }


    computePay() {
        return this.rate * this.hours;
    }
}

const emp02 = new PartTime("junjie", 25000, 40)
console.log(emp02.display());
console.log(emp02.computePay());  // since return is 0, 

//computePay can be override not return 0

const emp03 = new FullTime("Luke", 90000)
console.log(emp03.display());
console.log(Employee.displaycompanyName()) // out is SSA

console.log("Using an array")
const myEmployee =  []
myEmployee.push(emp01)
myEmployee.push(emp02)
myEmployee.push(emp03)

myEmployee.forEach(element => 
    console.log(element.computePay()))

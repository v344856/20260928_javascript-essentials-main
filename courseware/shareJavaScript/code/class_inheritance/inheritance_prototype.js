// inheritance_prototype.js

class Parent {
    constructor(name) {
        this.name = name;
    }

    sayName() {
        console.log(this.name);
    };
}


class Child extends Parent {
    constructor(name) {
        super(name);
    }
}

const c = new Child("Stefan");


const parentObject = new Parent("parent");
console.log(Object.getPrototypeOf(parentObject));

const childObject = new Child("child");
console.log(Object.getPrototypeOf(childObject));
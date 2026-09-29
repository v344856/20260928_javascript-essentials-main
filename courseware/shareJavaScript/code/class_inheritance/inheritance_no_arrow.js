// inheritance_no_arrow.js

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

// PAssing the method as callback
setTimeout(c.sayName, 1000);

// Error : Undefined
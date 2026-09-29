// inheritance_arrow.js

class Parent {
    constructor(name) {
        this.name = name;
    }

    sayName = () => {
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

// Why this workds - sayName is created **inside the constructor**, so its **this** bound to the isntance c
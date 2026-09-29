"use strict";

// ---------------------------------------------------------------------------
// Part 1: Call-site `this`: the CALL decides, not the definition
// ---------------------------------------------------------------------------

// One function, defined once.
function whoAmI() {
  console.log(this);
}

// Called bare, in strict mode, there is no owner; `this` is undefined.
whoAmI(); // undefined

// Put the SAME function on two objects. The object to the left of the dot
// at the moment of the call becomes `this`.
const a = { id: "a", whoAmI };
const b = { id: "b", whoAmI };

a.whoAmI(); // { id: 'a', whoAmI: [Function: whoAmI] }
b.whoAmI(); // { id: 'b', whoAmI: [Function: whoAmI] }

// It is genuinely the same function object in all three cases.
console.log(a.whoAmI === b.whoAmI); // true

// Pull it back off the object and the binding is lost again.
const detached = a.whoAmI;
detached(); // undefined: this is the classic "lost this" bug

// call / apply / bind set `this` explicitly.
whoAmI.call(a); // { id: 'a', ... }
const bound = whoAmI.bind(b);
bound(); // { id: 'b', ... }: permanently bound

// ---------------------------------------------------------------------------
// Part 2: Lexical `this`: an arrow function does not get its own
// ---------------------------------------------------------------------------

const counterObj = {
  label: "counter",

  run() {
    console.log(this.label); // "counter": called as a method

    // A NESTED regular function gets its own `this` (undefined here); this is
    // the bug the old `const that = this;` trick worked around:
    //
    //   const that = this;
    //   function nested() { console.log(that.label); }

    // An arrow function has no `this` of its own, so it sees the enclosing
    // scope's: exactly what we want.
    const nested = () => {
      console.log(this.label); // "counter"
    };

    nested();
  },
};

counterObj.run();

// ---------------------------------------------------------------------------
// Part 3: Where it bites: passing a method as a callback
// ---------------------------------------------------------------------------

// A callback system that invokes the function with no receiver.
function runCallback(fn) {
  fn();
}

class PersonMethod {
  constructor(name) {
    this.name = name;
  }

  // A normal method loses `this` when detached.
  sayName() {
    console.log(this?.name ?? "(this was lost)");
  }
}

const p1 = new PersonMethod("Alice");
p1.sayName(); // Alice
runCallback(p1.sayName); // (this was lost)

class PersonArrow {
  constructor(name) {
    this.name = name;
  }

  // A class field holding an arrow function captures `this` at construction,
  // so it survives being passed around. Commonly used for event handlers.
  // Note: do NOT make every method an arrow field, only the ones that get
  // detached and passed as callbacks.
  sayName = () => {
    console.log(this.name);
  };
}

const p2 = new PersonArrow("Bob");
p2.sayName(); // Bob
runCallback(p2.sayName); // Bob: still bound

// bind() is the other fix, and works with normal methods.
runCallback(p1.sayName.bind(p1)); // Alice

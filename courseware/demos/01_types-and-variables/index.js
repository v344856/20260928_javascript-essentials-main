// ---------------------------------------------------------------------------
// Part 1: Declaring variables: let, const, and (the legacy) var
// ---------------------------------------------------------------------------

// let creates a block-scoped variable you can reassign.
let x = 2;
x = 3;
console.log("x is", x); // 3

// const creates a block-scoped binding you cannot reassign.
const y = 4;
// y = 5; // TypeError: Assignment to constant variable.
console.log("y is", y); // 4

// const protects the *binding*, not the value. Objects stay mutable.
const settings = { theme: "dark" };
settings.theme = "light"; // allowed - we changed the object, not the binding
// settings = {};         // TypeError - this would replace the binding
console.log("settings.theme is", settings.theme); // light

// let and const are block-scoped: they do not escape the { } they live in.
function blockScope() {
  {
    let inner = 8;
    console.log("inner (inside the block) is", inner); // 8
  }
  // console.log(inner); // ReferenceError: inner is not defined
}
blockScope();

// var is function-scoped, which is why it surprises people. Prefer let/const.
function varLeaks() {
  {
    var leaked = 8;
  }
  console.log("var leaked out of its block:", leaked); // 8
}
varLeaks();

// ---------------------------------------------------------------------------
// Part 2: Expressions: the right side is evaluated, then assigned
// ---------------------------------------------------------------------------

// Structure:  let variableName = <expression>;
let a = 2; // evaluate 2, assign the result (2) to a
let b = 1 + 2; // evaluate 1 + 2, assign the result (3) to b

// A variable on the right is *evaluated* - it is not linked to the new one.
let c = a; // a evaluates to 2, so 2 is assigned to c
let d = a + 2; // a + 2 evaluates to 4, so 4 is assigned to d

console.log(a, b, c, d); // 2 3 2 4

a = 5; // assignment only - no new declaration

console.log("c did not change:", c); // 2 - c copied the value, not the variable
console.log("a did change:", a); // 5

// ---------------------------------------------------------------------------
// Part 3: Types: one variable, every type, checked with typeof
// ---------------------------------------------------------------------------

let t = 2;
console.log(typeof t); // number

t = "hello";
console.log(typeof t); // string

// Changing the type of a variable as the program runs is called dynamic typing.

t = true;
console.log(typeof t); // boolean

t = undefined;
console.log(typeof t); // undefined

t = Symbol("mySymbol");
console.log(typeof t); // symbol

t = BigInt(1234567890123456789012345678901234567890);
console.log(typeof t); // bigint

t = null;
console.log(typeof t); // "object" - a historical bug in JavaScript. null is
// actually a primitive representing the absence of any object value.

t = { name: "Alice", age: 30 };
console.log(typeof t); // object

function doIt() {}
console.log(typeof doIt); // function

class MyClass {}
console.log(typeof MyClass); // function - a class is a function under the hood

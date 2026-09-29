// ---------------------------------------------------------------------------
// Part 1: Arithmetic operators
// ---------------------------------------------------------------------------

// add
let x = 1 + 2;
console.log(x); // 3

// multiply
x = x * 2;
console.log(x); // 6

// subtract
x = x - 4;
console.log(x); // 2

// divide
x = x / 2;
console.log(x); // 1

// exponentiation
x = x ** 3;
console.log(x); // 1

// remainder: the leftover after an integer division
x = 1000 % 60;
console.log(x); // 40

// ---------------------------------------------------------------------------
// Part 2: Comparison operators: always use ===
// ---------------------------------------------------------------------------

// === compares value AND type. No coercion, no surprises.
console.log(5 === 5); // true
console.log(5 === "5"); // false

// == coerces the operands first, which produces results people do not expect.
console.log(5 == "5"); // true  <- the string was converted to a number
console.log(0 == ""); // true  <- both coerced to 0

// Prefer === and !== in every comparison you write.
console.log(5 !== "5"); // true

// ---------------------------------------------------------------------------
// Part 3: Building strings: + versus template literals
// ---------------------------------------------------------------------------

let myName = "Eric";
console.log(myName); // Eric

// The + operator concatenates strings.
myName = myName + " " + "Greene";
console.log(myName); // Eric Greene

// A template literal uses backticks - not single or double quotes. The
// dollar-sign and curly braces embed an expression inside the string.
let message = `Hello, ${myName}!`;
console.log(message); // Hello, Eric Greene!

// The placeholder holds any expression, not just a variable.
const quantity = 3;
const price = 4;
console.log(`${quantity} bags = $${quantity * price}`); // 3 bags = $12

// Backticks also span multiple lines, which quotes cannot do.
console.log(`Line one
Line two`);

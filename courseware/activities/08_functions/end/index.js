// Activity: Functions
// Complete each TODO. Run with:  npm start   (npm run solution for the answer)

// Task 1 calls applyDiscount BEFORE it is declared - that works because
// function declarations hoist. Write the declaration below these calls.

console.log("task 1 begin")
console.log(applyDiscount(100, 20));
console.log(applyDiscount(50, 10));
function applyDiscount(price, percent) {
  return price - (price * percent) / 100;
}

console.log("task 1 end")


// TODO Task 1: write applyDiscount(price, percent) as a function declaration.
// It returns the price minus that percentage.

// TODO Task 2: write the same logic as a function expression assigned to
// const applyDiscountExpr. It must appear above the call below.
console.log("task 2 begin")

const applyDiscountExpr = function (price, percent) {
  return price - (price * percent) / 100;
};
console.log(applyDiscountExpr(100, 20));

console.log("task 2 end")

// TODO Task 3: write it once more as an arrow function with an implicit
// return, assigned to const applyDiscountArrow.
console.log("task 3 begin")

const applyDiscountArrow = (price, percent) => price - (price * percent) / 100;  //right called expression
console.log(applyDiscountArrow(500, 20));

console.log("task 3 end")

// TODO Task 4: write quote(price, percent = 10) returning a string like "$150".
// Reuse applyDiscount inside it.
console.log("task 4 begin")
function quote(price, percent = 10) { return `$${applyDiscount(price,percent)}`}  //if 2nd para is not passed, use default value=10
console.log(quote(200, 25));
console.log("task 4 end")



// TODO Task 5: write sumAll(...numbers) that totals any number of arguments.
// console.log("task 5 begin")
// console.log(sumAll(1, 2, 3));
// console.log(sumAll(10, 20, 30, 40));

console.log("task 5 begin")
function sumAll(...numbers) {
  let total = 0;
  for (const n of numbers) {
    total += n;
  }
  return total;
}

console.log(sumAll())
console.log(sumAll(1, 2, 3));
console.log(sumAll(10, 20, 30, 40));


console.log("task 5 end")

// TODO Task 6: call sumAll with prices spread into individual arguments.
console.log("task 6 begin")
const prices = [5, 10, 15, 20];
console.log(sumAll(prices)); // TODO: spread it with ...

console.log(sumAll(...prices));

console.log("task 6 end")


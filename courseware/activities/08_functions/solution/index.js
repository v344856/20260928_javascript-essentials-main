// Activity: Functions (solution)

// Task 1: function declaration; hoisted, so the calls above it work.
console.log(applyDiscount(100, 20));
console.log(applyDiscount(50, 10));

function applyDiscount(price, percent) {
  return price - (price * percent) / 100;
}

// Task 2: function expression assigned to const (not hoisted).
const applyDiscountExpr = function (price, percent) {
  return price - (price * percent) / 100;
};
console.log(applyDiscountExpr(100, 20));

// Task 3: arrow function with an implicit single-expression return.
const applyDiscountArrow = (price, percent) => price - (price * percent) / 100;
console.log(applyDiscountArrow(100, 20));

// Task 4: default parameter fills in for a missing argument.
function quote(price, percent = 10) {
  return `$${applyDiscount(price, percent)}`;
}

console.log(quote(200, 25));
console.log(quote(200));

// Task 5: rest parameter collects all arguments into an array.
function sumAll(...numbers) {
  let total = 0;
  for (const n of numbers) {
    total += n;
  }
  return total;
}

console.log(sumAll(1, 2, 3));
console.log(sumAll(10, 20, 30, 40));

// Task 6: spread an array back into individual arguments.
const prices = [5, 10, 15, 20];
console.log(sumAll(...prices));

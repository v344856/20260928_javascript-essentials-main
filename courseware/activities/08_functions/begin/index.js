// Activity: Functions
// Complete each TODO. Run with:  npm start   (npm run solution for the answer)

// Task 1 calls applyDiscount BEFORE it is declared - that works because
// function declarations hoist. Write the declaration below these calls.
console.log(applyDiscount(100, 20));
console.log(applyDiscount(50, 10));

// TODO Task 1: write applyDiscount(price, percent) as a function declaration.
// It returns the price minus that percentage.

// TODO Task 2: write the same logic as a function expression assigned to
// const applyDiscountExpr. It must appear above the call below.
console.log(applyDiscountExpr(100, 20));

// TODO Task 3: write it once more as an arrow function with an implicit
// return, assigned to const applyDiscountArrow.
console.log(applyDiscountArrow(100, 20));

// TODO Task 4: write quote(price, percent = 10) returning a string like "$150".
// Reuse applyDiscount inside it.
console.log(quote(200, 25));
console.log(quote(200));

// TODO Task 5: write sumAll(...numbers) that totals any number of arguments.
console.log(sumAll(1, 2, 3));
console.log(sumAll(10, 20, 30, 40));

// TODO Task 6: call sumAll with prices spread into individual arguments.
const prices = [5, 10, 15, 20];
console.log(sumAll(prices)); // TODO: spread it with ...

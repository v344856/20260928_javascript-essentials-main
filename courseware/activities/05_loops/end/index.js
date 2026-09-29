// Activity: Loops
// Complete each TODO. Run with:  npm start   (npm run solution for the answer)

// TODO Task 1: FizzBuzz from 1 to 15 with a for loop.
// Print "FizzBuzz" for multiples of 15, "Fizz" for 3, "Buzz" for 5,
// otherwise the number. Check 15 first.


for (let i = 1; i <= 15; i++) {
  if (i % 15 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}



// TODO Task 2: add up the numbers 1 through 10 with a while loop.
let total = 0;
let i = 1
// TODO: write the while loop here
while (i <= 10) {total = total + i, i++
    
}
console.log("task 2 begin")
console.log(`Sum 1..10 = ${total}`);
console.log("task 2 end")

// TODO Task 3: count down from 5 to 1 with a do-while loop.
console.log("task 3 begin")
let count = 5
do {console.log(count)
    count--
    
} while (count >= 1);
console.log("task 3 end")

// TODO Task 4: add up every price with a for-of loop.
console.log("task 4 begin")
const prices = [4.5, 2.25, 8.0, 3.75];
let cartTotal= 0;
for (const price of prices) {
  cartTotle =  cartTotal+ price;
}
console.log(`Total: $${cartTotle}`);
console.log("task 4 begin")


console.log("task 4 end")

// TODO: write the for-of loop here

console.log(`Total: $${cartTotal}`);

// TODO Task 5: print a numbered label for each item with forEach.
// The callback receives (price, index); the label is 1-based.
//const prices = [4.5, 2.25, 8.0, 3.75];


prices.forEach(function (price, index) {
  console.log(`Item ${index + 1}: $${price}`);
});

// Activity: Loops (solution)

// Task 1: FizzBuzz from 1 to 15 with a for loop.

for (let n = 1; n <= 15; n++) {
  if (n % 15 === 0) {
    console.log("FizzBuzz");
  } else if (n % 3 === 0) {
    console.log("Fizz");
  } else if (n % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(n);
  }
}

// Task 2: add up the numbers 1 through 10 with a while loop.

let total = 0;
let i = 1;
while (i <= 10) {
  total += i;
  i++;
}
console.log(`Sum 1..10 = ${total}`);

// Task 3: count down from 5 to 1 with a do-while loop.

let count = 5;
do {
  console.log(count);
  count--;
} while (count >= 1);

// Task 4: add up every price with a for-of loop.

const prices = [4.5, 2.25, 8.0, 3.75];

let cartTotal = 0;
for (const price of prices) {
  cartTotal += price;
}
console.log(`Total: $${cartTotal}`);

// Task 5: print a numbered label for each item with forEach.

prices.forEach(function (price, index) {
  console.log(`Item ${index + 1}: $${price}`);
});

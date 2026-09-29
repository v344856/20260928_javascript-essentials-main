// Activity: Recursion Warm-Ups (solution)

// Task 1: factorial via recursion (base case: n <= 1 returns 1).
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
console.log(factorial(6)); // 720

// Task 2: sumTo(n) adds 1 + 2 + ... + n via recursion.
function sumTo(n) {
  if (n <= 0) return 0;
  return n + sumTo(n - 1);
}

console.log(sumTo(5));  // 15
console.log(sumTo(10)); // 55

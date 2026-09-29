

// fibonacci sequence - non-recursive
function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  let a = 0, b = 1, temp;
  for (let i = 2; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

// Example usage:
console.log(fibonacci(10)); // Output: 55

// fibonacci sequence - recursive
function fibonacciRecursive(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

// Example usage:
console.log(fibonacciRecursive(10)); // Output: 55
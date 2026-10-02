

function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

try {
   console.log(divide(10, 0)); // This will throw an error
  console.log(divide(10, 2)); // Output: 5
  //console.log(divide(10, 0)); // This will throw an error
} catch (error) {
  console.error("Error:", error.message);
} finally {
  console.log("Division operation completed.");
}
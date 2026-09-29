// Activity: Age Check at the Door (solution)

// Task 1: throw when the age is too young, otherwise return a success message
function checkAge(age) {
  if (age < 18) {
    throw new Error("Must be 18 or older");
  }
  return `Access granted for age ${age}`;
}

const ages = [25, 15];

// Task 2: try/catch/finally around each check
for (const age of ages) {
  try {
    console.log(checkAge(age));
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    console.log(`Finished checking age ${age}.`);
  }
}

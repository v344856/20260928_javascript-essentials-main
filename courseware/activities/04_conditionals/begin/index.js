// Activity: Weather Advisor

// Task 1: classify a temperature with an if / else if / else chain.
// Return "Hot" (>= 90), "Warm" (>= 70), "Cool" (>= 50), otherwise "Cold".

function classifyTemp(temp) {
  // TODO Task 1: build the if / else if / else chain and return the label
}

console.log(classifyTemp(95)); // expected: Hot
console.log(classifyTemp(72)); // expected: Warm
console.log(classifyTemp(55)); // expected: Cool
console.log(classifyTemp(40)); // expected: Cold

// Task 2: pick an activity with a switch statement.
// "sunny" -> "Go for a hike."   "rainy" -> "Read a book."
// "snowy" or "icy" -> "Stay inside."   anything else -> "Check the forecast."

function planActivity(weather) {
  // TODO Task 2: write a switch statement, using a fall-through for snowy/icy
}

console.log(planActivity("sunny")); // expected: Go for a hike.
console.log(planActivity("snowy")); // expected: Stay inside.
console.log(planActivity("icy"));   // expected: Stay inside.
console.log(planActivity("windy")); // expected: Check the forecast.

// Task 3: choose what to bring with a ternary operator.

const isRaining = true;
// TODO Task 3: set `gear` to "umbrella" when isRaining is true, else "sunglasses"
const gear = "";
console.log(`Bring your ${gear}.`); // expected: Bring your umbrella.

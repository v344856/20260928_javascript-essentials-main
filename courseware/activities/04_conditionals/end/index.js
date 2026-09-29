// Activity: Weather Advisor

// Task 1: classify a temperature with an if / else if / else chain.
// Return "Hot" (>= 90), "Warm" (>= 70), "Cool" (>= 50), otherwise "Cold".

function classifyTemp(temp) {
  if (temp >= 90) {
    return "Hot";
  } else if (temp >= 70) {
    return "Warm";
  } else if (temp >= 50) {
    return "Cool";
  } else {
    return "Cold";
  }
}


  // TODO Task 1: build the if / else if / else chain and return the label
}

console.log(classifyTemp(95)); // expected: Hot
console.log(classifyTemp(72)); // expected: Warm
console.log(classifyTemp(55)); // expected: Cool
console.log(classifyTemp(40)); // expected: Cold

// Task 2: pick an activity with a switch statement.
// "sunny" -> "Go for a hike."   "rainy" -> "Read a book."
// "snowy" or "icy" -> "Stay inside."   anything else -> "Check the forecast."

console.log(`task 2`)
function planActivity(weather) {
  switch (weather) {
    case "sunny":
      return "Go for a hike.";
    case "rainy":
      return "Read a book.";
    case "snowy": // fall-through: snowy and icy share the same advice
    case "icy":
      return "Stay inside.";
    default:
      return "Check the forecast.";
  }
}



console.log(planActivity("sunny")); // expected: Go for a hike.
console.log(planActivity("snowy")); // expected: Stay inside.
console.log(planActivity("icy"));   // expected: Stay inside.
console.log(planActivity("windy")); // expected: Check the forecast.

// Task 3: choose what to bring with a ternary operator.

const isRaining = true;
// TODO Task 3: set `gear` to "umbrella" when isRaining is true, else "sunglasses"
const gear = "isRaining" ? "umbrella : "sunglasses"
console.log(`Bring your ${gear}.`); // expected: Bring your umbrella.

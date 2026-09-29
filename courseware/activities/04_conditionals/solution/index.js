// Activity: Weather Advisor (solution)

// Task 1: classify a temperature with an if / else if / else chain.

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

console.log(classifyTemp(95)); // Hot
console.log(classifyTemp(72)); // Warm
console.log(classifyTemp(55)); // Cool
console.log(classifyTemp(40)); // Cold

// Task 2: pick an activity with a switch statement.

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

console.log(planActivity("sunny")); // Go for a hike.
console.log(planActivity("snowy")); // Stay inside.
console.log(planActivity("icy"));   // Stay inside.
console.log(planActivity("windy")); // Check the forecast.

// Task 3: choose what to bring with a ternary operator.

const isRaining = true;
const gear = isRaining ? "umbrella" : "sunglasses";
console.log(`Bring your ${gear}.`); // Bring your umbrella.

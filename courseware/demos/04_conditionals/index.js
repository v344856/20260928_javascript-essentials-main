
// if-else statement example

const age = 18;

if (age >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are a minor.");
}

// if-else if statement example

const score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else if (score >= 60) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}

// switch statement example

const day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of the work week.");
    break;
  case "Tuesday":
    console.log("Second day of the work week.");
    break;
  case "Wednesday":
    console.log("Midweek.");
    break;
  case "Thursday":
    console.log("Almost the weekend.");
    break;
  case "Friday":
    console.log("End of the work week.");
    break;
  case "Saturday": // a fall-through case is bad practice, but it's
                   // used here for demonstration purposes
  case "Sunday":
    console.log("It's the weekend!");
    break;
  default:
    console.log("Invalid day.");
}

// ternary operator example

const isMember = true;
const price = isMember ? "$10" : "$20";
console.log(`The price is ${price}.`);

let pages = 10
if (pages > 1) { display = "s."} else { display = "."}
console.log(`delete ${pages} page${isplay} `)

console.log ("replace above with 2 line below")
const display = (page > 1 ? "s." : ".")
console.log(`delete ${pages} page${display} `)



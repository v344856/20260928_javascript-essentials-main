// Activity: Operators and Strings
// Complete each TODO. Run with:  npm start   (npm run solution for the answer)

// TODO Task 1: use the ** operator to set area to side raised to the power 2.
const side = 4;
const area = 4**2; // TODO: replace 0
console.log(area);

// TODO Task 2: split totalSeconds into whole minutes and leftover seconds.
// Use % for the leftover seconds, then (totalSeconds - seconds) / 60.
const totalSeconds = 1000;
const seconds = totalSeconds % 60; // TODO: replace 0
const minutes = (totalSeconds - seconds) /60 ; // TODO: replace 0
console.log(`${minutes}m ${seconds}s`);

// TODO Task 3: set isEven to true when count divides evenly by 2.
const count = 7;
const isEven = count % 2 === 0; // TODO: replace false
console.log(`${count} is even: ${isEven}`);

// TODO Task 4: compare count to the string "7" twice - once with ===
// and once with ==. Replace both placeholders below.
console.log(`strict: ${count === "7"}`);
console.log(`loose:  ${count == "7"}`);

// TODO Task 5: build the receipt line "3 bags = $12" two ways.
const quantity = 3;
const price = 4;
const withPlus = ""; // TODO: use + concatenation
const withTemplate = quantity + "bag = $" + quantity * price; // TODO: use a template literal
console.log(withPlus);
console.log(withTemplate);

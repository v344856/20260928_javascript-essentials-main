// Activity: Operators and Strings (solution)

// Task 1: exponentiation (**) - area of a square tile.
const side = 4;
const area = side ** 2;
console.log(area);

// Task 2: division (/) and remainder (%) - split 1000 seconds into
// whole minutes and the leftover seconds.
const totalSeconds = 1000;
const seconds = totalSeconds % 60;
const minutes = (totalSeconds - seconds) / 60;
console.log(`${minutes}m ${seconds}s`);

// Task 3: remainder (%) plus strict equality (===) as an even/odd test.
const count = 7;
const isEven = count % 2 === 0;
console.log(`${count} is even: ${isEven}`);

// Task 4: === compares value and type; == coerces first.
console.log(`strict: ${count === "7"}`);
console.log(`loose:  ${count == "7"}`);

// Task 5: build the same receipt line two ways. Note that * binds tighter
// than +, so the multiplication happens before the concatenation.
const quantity = 3;
const price = 4;
const withPlus = quantity + " bags = $" + quantity * price;
const withTemplate = `${quantity} bags = $${quantity * price}`;
console.log(withPlus);
console.log(withTemplate);

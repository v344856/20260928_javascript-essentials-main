// Activity: Types and Variables
// Complete each TODO. Run with:  npm start   (npm run solution for the answer)

// TODO Task 1: replace each `var` below with the right keyword.
// TAX_RATE and PRICES never change - use const.
// subtotal is rebuilt on every pass of the loop - use let.
const TAX_RATE = 0.07;
const PRICES = [3, 4, 5];

let subtotal = 0;
for (const price of PRICES) {
  subtotal = subtotal + price;
}
console.log(`Subtotal: ${subtotal}`);
console.log(`Tax: ${(subtotal * TAX_RATE).toFixed(2)}`);

// TODO Task 1 (continued): a const binding is fixed, but the object it points
// to can still change. Set order.size to "large" on the line below.
const order = { item: "Latte", size: "small" };
// TODO: change the size here
console.log(`Order: ${order.item} (${order.size})`);

order.size = "Large";
console.log(`size is ${order.size}`);

// TODO Task 2: copy subtotal into snapshot, then set subtotal to 100.
// snapshot must keep the old value - the right-hand side is evaluated first.
let snapshot = subtotal; // TODO: copy subtotal instead of 0
// TODO: set subtotal to 100 here
subtotal = 100;
console.log(`Snapshot: ${snapshot}`);
console.log(`Subtotal now: ${subtotal}`);

// TODO Task 3: return the accurate type name for a value.
// Like typeof, but return the string "null" when value is null
// (remember: typeof null is "object" - a historical quirk).
function kindOf(value) {
  // TODO: replace this line
  if (value === null) {return "null"
  }
  console.log(`jjl value is ${value}`)
  return typeof value;
}

// Task 4: a reference type is anything whose kindOf is "object" or "function".
function isReference(value) {
  const kind = kindOf(value);
  return kind === "object" || kind === "function";
}

const samples = [42, "coffee", null, order, PRICES, true];

let referenceCount = 0;
for (const sample of samples) {
  const kind = kindOf(sample);
  const category = isReference(sample) ? "reference" : "primitive";
  console.log(`${kind} -> ${category}`);
  if (isReference(sample)) {
    referenceCount++;
  }
}

console.log(`Reference types: ${referenceCount}`);

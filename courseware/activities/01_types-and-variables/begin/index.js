// Activity: Types and Variables
// Complete each TODO. Run with:  npm start   (npm run solution for the answer)

// TODO Task 1: replace each `var` below with the right keyword.
// TAX_RATE and PRICES never change - use const.
// subtotal is rebuilt on every pass of the loop - use let.
var TAX_RATE = 0.07;
var PRICES = [3, 4, 5];

var subtotal = 0;
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

// TODO Task 2: copy subtotal into snapshot, then set subtotal to 100.
// snapshot must keep the old value - the right-hand side is evaluated first.
let snapshot = 0; // TODO: copy subtotal instead of 0
// TODO: set subtotal to 100 here
console.log(`Snapshot: ${snapshot}`);
console.log(`Subtotal now: ${subtotal}`);

// TODO Task 3: return the accurate type name for a value.
// Like typeof, but return the string "null" when value is null
// (remember: typeof null is "object" - a historical quirk).
function kindOf(value) {
  // TODO: replace this line
  return "";
}

// TODO Task 4: return true when value is a reference type
// (its kindOf is "object" or "function"), otherwise false.
function isReference(value) {
  // TODO: use kindOf(value) here
  return false;
}

// The loop below is wired up for you - once Tasks 3 and 4 work, it prints
// "<kind> -> <category>" for each sample and counts the reference types.
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

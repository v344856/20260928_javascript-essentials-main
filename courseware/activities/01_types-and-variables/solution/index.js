// Activity: Types and Variables (solution)

// Task 1: values that never change are const; a running total is let.
const TAX_RATE = 0.07;
const PRICES = [3, 4, 5];

let subtotal = 0;
for (const price of PRICES) {
  subtotal = subtotal + price;
}
console.log(`Subtotal: ${subtotal}`);
console.log(`Tax: ${(subtotal * TAX_RATE).toFixed(2)}`);

// A const binding is fixed, but the object it points to can still change.
const order = { item: "Latte", size: "small" };
order.size = "large";
console.log(`Order: ${order.item} (${order.size})`);

// Task 2: assigning one variable to another copies the value, not a live link.
let snapshot = subtotal;
subtotal = 100;
console.log(`Snapshot: ${snapshot}`);
console.log(`Subtotal now: ${subtotal}`);

// Task 3: like typeof, but return "null" for null (typeof null is "object").
function kindOf(value) {
  if (value === null) {
    return "null";
  }
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

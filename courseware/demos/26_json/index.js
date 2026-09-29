// ============================================
// Demo: JSON.parse and JSON.stringify
// ============================================

// Build a plain JavaScript object, including a Date.
const order = {
  id: 1024,
  customer: "Alice",
  total: 42.5,
  paid: true,
  items: ["espresso", "croissant"],
  password: "s3cret",
  placedAt: new Date("2026-07-07T15:00:00Z"),
};

console.log("=== Compact stringify ===\n");
const compact = JSON.stringify(order);
console.log(compact);
// {"id":1024,"customer":"Alice",...,"placedAt":"2026-07-07T15:00:00.000Z"}

console.log("\n=== Pretty stringify (space = 2) ===\n");
console.log(JSON.stringify(order, null, 2));

console.log("\n=== Stringify with a replacer (drop password) ===\n");
const safe = JSON.stringify(
  order,
  (key, value) => (key === "password" ? undefined : value),
  2
);
console.log(safe);

console.log("\n=== Parse with a reviver (revive the date) ===\n");
const isoDate = /^\d{4}-\d{2}-\d{2}T/;
const parsed = JSON.parse(compact, (key, value) =>
  typeof value === "string" && isoDate.test(value) ? new Date(value) : value
);
console.log("customer:", parsed.customer);
console.log("placedAt is a Date:", parsed.placedAt instanceof Date);
console.log("year:", parsed.placedAt.getFullYear());

console.log("\n=== Round-trip check ===\n");
const roundTripped = JSON.parse(JSON.stringify(order));
console.log("customer matches:", roundTripped.customer === order.customer);
console.log("items match:", JSON.stringify(roundTripped.items) === JSON.stringify(order.items));

console.log("\n=== Pitfall: Date becomes a string ===\n");
console.log("original placedAt is a Date:", order.placedAt instanceof Date); // true
console.log("round-tripped placedAt is a Date:", roundTripped.placedAt instanceof Date); // false
console.log("round-tripped placedAt type:", typeof roundTripped.placedAt); // "string"

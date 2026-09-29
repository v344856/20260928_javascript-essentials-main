// ============================================
// Part 1: The Map Collection
// ============================================
// A Map holds key/value pairs like an object, but keys can be
// ANY type (not just strings), it remembers insertion order,
// and it has a real `size` and clean iteration.

const inventory = new Map();

// set(key, value): returns the Map, so calls can chain
inventory.set("espresso", 12);
inventory.set("latte", 8);
inventory.set("cold brew", 5);

// get(key) reads a value; has(key) checks existence
console.log("get('latte'):", inventory.get("latte")); // 8
console.log("has('mocha'):", inventory.has("mocha")); // false

// size is a property (objects have no direct equivalent)
console.log("size:", inventory.size); // 3

// delete(key) removes an entry
inventory.delete("cold brew");
console.log("after delete, size:", inventory.size); // 2

// --- Iteration keeps insertion order ---
for (const [item, qty] of inventory) {
  console.log(`  ${item}: ${qty}`);
}
// espresso: 12
// latte: 8

console.log("keys:", [...inventory.keys()]); // [ 'espresso', 'latte' ]
console.log("values:", [...inventory.values()]); // [ 12, 8 ]

// forEach works too (value first, then key)
inventory.forEach((qty, item) => console.log(`forEach -> ${item}=${qty}`));

// --- Keys can be any type, even objects ---
const userA = { id: 1 };
const userB = { id: 2 };
const lastSeen = new Map();
lastSeen.set(userA, "2026-07-01");
lastSeen.set(userB, "2026-07-05");
console.log("object key lookup:", lastSeen.get(userA)); // 2026-07-01

// --- Map vs plain object ---
// Object keys are always strings/symbols; Map keys keep their type.
const obj = {};
obj[1] = "number one?";
console.log("object key is a string:", Object.keys(obj)); // [ '1' ]

const map = new Map();
map.set(1, "still a number");
console.log("map key stays a number:", [...map.keys()]); // [ 1 ]

// Build a Map from an array of pairs, and back to an object
const fromPairs = new Map([
  ["a", 1],
  ["b", 2],
]);
console.log("from pairs size:", fromPairs.size); // 2
console.log("back to object:", Object.fromEntries(fromPairs)); // { a: 1, b: 2 }
// ============================================
// Part 2: The Set Collection
// ============================================
// A Set is a collection of UNIQUE values. Adding a value that
// already exists is ignored. Like Map, it remembers
// insertion order and exposes a `size` property.

const tags = new Set();

// add(value): returns the Set, so calls can chain
tags.add("coffee");
tags.add("tea");
tags.add("coffee"); // duplicate, silently ignored

console.log("size:", tags.size); // 2
console.log("has('tea'):", tags.has("tea")); // true
console.log("has('milk'):", tags.has("milk")); // false

// delete(value) removes a member
tags.delete("tea");
console.log("after delete, has('tea'):", tags.has("tea")); // false

// --- The classic use: dedupe an array ---
const numbers = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(numbers)];
console.log("deduped:", unique); // [ 1, 2, 3, 4 ]

// Works for strings too
const words = ["red", "blue", "red", "green", "blue"];
console.log("unique words:", [...new Set(words)]); // [ 'red', 'blue', 'green' ]

// Count distinct values quickly
console.log("distinct count:", new Set(words).size); // 3

// --- Iteration keeps insertion order ---
const roles = new Set(["admin", "editor", "viewer"]);
for (const role of roles) {
  console.log("  role:", role);
}
// admin
// editor
// viewer

console.log("as array:", [...roles]); // [ 'admin', 'editor', 'viewer' ]

// --- Basic set math with modern methods (ES2024+) ---
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);
console.log("intersection:", [...a.intersection(b)]); // [ 3, 4 ]
console.log("union:", [...a.union(b)]); // [ 1, 2, 3, 4, 5, 6 ]
console.log("difference:", [...a.difference(b)]); // [ 1, 2 ]

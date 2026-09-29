// ---------------------------------------------------------------------------
// Part 1: An array holds anything, in order
// ---------------------------------------------------------------------------

const nums = [1, 2, 3, 4, 5];
const letters = ["a", "b", "c", "d", "e"];

const people = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 },
];

// Elements do not have to share a type; an array can be genuinely mixed.
const mixed = [1, "a", { name: "Alice" }, [1, 2, 3], true];

console.log(nums.length, letters.length, people.length, mixed.length);

// Read by index; a missing index is undefined, not an error.
console.log(nums[0], letters[4], people[1].name);
console.log(nums[99]); // undefined

// Functions are values, so they can live in an array too.
const funcs = [
  function () {
    console.log("Hello");
  },
  function () {
    console.log("World");
  },
];

funcs[0](); // Hello
funcs[1](); // World

// ---------------------------------------------------------------------------
// Part 2: Arrays are mutable, even when declared const
// ---------------------------------------------------------------------------

const items = ["a", "b", "c", "d", "e"];

// Assigning to an index changes the array in place.
items[0] = "z";
console.log(items); // [ 'z', 'b', 'c', 'd', 'e' ]

// push appends and returns the NEW LENGTH.
const newLength = items.push("g");
console.log(items, newLength); // [ 'z', 'b', 'c', 'd', 'e', 'g' ] 6

// pop removes the last element and returns THAT ELEMENT.
const last = items.pop();
console.log(last); // g

// unshift prepends (returns the new length); shift removes the first
// element (returns that element). Both are slower than push/pop because
// every remaining element has to be re-indexed.
items.unshift("y");
console.log(items); // [ 'y', 'z', 'b', 'c', 'd', 'e' ]
console.log(items.shift()); // y

// splice(start, deleteCount, ...insert) does all three jobs at once.
items.splice(2, 0, "x"); // insert without removing
console.log(items); // [ 'z', 'b', 'x', 'c', 'd', 'e' ]

const removed = items.splice(3, 1); // remove 1 element at index 3
console.log(removed, items); // [ 'c' ] [ 'z', 'b', 'x', 'd', 'e' ]

const swapped = items.splice(1, 2, "w"); // remove 2, insert 1
console.log(swapped, items); // [ 'b', 'x' ] [ 'z', 'w', 'd', 'e' ]

// ---------------------------------------------------------------------------
// Part 3: Searching, and converting to and from strings
// ---------------------------------------------------------------------------

const colorsStr = "red,green,blue";

// split turns a string into an array on a delimiter...
const colorsArr = colorsStr.split(",");
console.log(colorsArr); // [ 'red', 'green', 'blue' ]

console.log("========")
const colorsLimit = colorsStr.split(",",1);
console.log(colorsLimit)


// ...and join turns it back, with any separator you like.
console.log(colorsArr.join("|")); // red|green|blue

// includes answers "is it there?"; indexOf answers "where is it?" (-1 = absent)
console.log(colorsArr.includes("green")); // true
console.log(colorsArr.includes("yellow")); // false
console.log(colorsArr.indexOf("green")); // 1
console.log(colorsArr.indexOf("yellow")); // -1

// slice copies a section WITHOUT changing the original (unlike splice).
console.log(colorsArr.slice(1)); // [ 'green', 'blue' ]
console.log(colorsArr); // unchanged

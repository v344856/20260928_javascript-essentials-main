// ---------------------------------------------------------------------------
// Part 1: Array destructuring: unpack by POSITION
// ---------------------------------------------------------------------------

const nums = [1, 2, 3, 4, 5];

// ... here is the REST operator: it gathers what is left into a new array.
const [first, second, ...rest] = nums;

console.log(first); // 1
console.log(second); // 2
console.log(rest); // [ 3, 4, 5 ]

// An empty hole skips a position you do not care about.
const [first2, , third, ...rest2] = nums;

console.log(first2); // 1
console.log(third); // 3
console.log(rest2); // [ 4, 5 ]

// A default fills in when the position does not exist.
const [a, b, c, d, e, f = 99] = nums;
console.log(f); // 99

// ... here is the SPREAD operator, same three dots, opposite job:
// it unpacks an array into a new one.
const nums2 = [...rest, first, second];
console.log(nums2); // [ 3, 4, 5, 1, 2 ]

// The classic one-liner swap.
let x = 1;
let y = 2;
[x, y] = [y, x];
console.log(x, y); // 2 1

// ---------------------------------------------------------------------------
// Part 2: Object destructuring: unpack by NAME
// ---------------------------------------------------------------------------

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  city: "New York",
};

// Pull firstName and lastName into variables; gather the rest into `props`
// (the rest variable can be named anything).
const { firstName, lastName, ...props } = person;

console.log(firstName); // John
console.log(lastName); // Doe
console.log(props); // { age: 30, city: 'New York' }

// Rename on the way out, and supply a default for a key that is absent.
const { age: years, country = "USA" } = person;
console.log(years, country); // 30 USA

// Object spread copies properties into a new object. Later keys win, so
// this is how you "copy and override".
const person2 = {
  ...props,
  firstName: "Jane",
  lastName: "Smith",
};
console.log(person2); // { age: 30, city: 'New York', firstName: 'Jane', lastName: 'Smith' }

// ---------------------------------------------------------------------------
// Part 3: Where destructuring earns its keep: function parameters
// ---------------------------------------------------------------------------

// Destructure right in the parameter list, with defaults, so the call site
// reads as named arguments in any order.
function describe({ firstName: fn, city = "somewhere", age = 0 }) {
  return `${fn}, ${age}, from ${city}`;
}

console.log(describe(person)); // John, 30, from New York
console.log(describe({ firstName: "Sam" })); // Sam, 0, from somewhere

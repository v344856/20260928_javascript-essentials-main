// ============================================
// Creating and working with objects
// ============================================

// The object literal: the most common way to make an object.
const book = {
  title: "The Pragmatic Programmer",
  author: "Hunt & Thomas",
  year: 1999,
};

// Two ways to read a property: dot access and bracket access.
console.log(book.title); // The Pragmatic Programmer
console.log(book["author"]); // Hunt & Thomas

// Bracket access is required when the key is in a variable.
const key = "year";
console.log(book[key]); // 1999

// Add, update, and delete properties.
book.rating = 5; // add
book.year = 2019; // update (second edition)
delete book.author; // delete
console.log(book); // { title: '...', year: 2019, rating: 5 }

// Shorthand properties: when the variable name matches the key.
const price = 24;
const inStock = true;
const listing = { price, inStock };
console.log(listing); // { price: 24, inStock: true }

// Computed property names: build the key from an expression.
const field = "sku";
const product = {
  [field]: "PP-2019",
  [`${field}_label`]: "Stock Keeping Unit",
};
console.log(product); // { sku: 'PP-2019', sku_label: 'Stock Keeping Unit' }

// Testing whether a property exists. Object.hasOwn is the modern replacement
// for the older obj.hasOwnProperty(...) call.
console.log(Object.hasOwn(book, "author")); // false: we deleted it
console.log(Object.hasOwn(book, "title")); // true

// Careful: reading a missing property is undefined, not an error.
console.log(book.publisher); // undefined

// Object.keys / values / entries turn an object into arrays you can loop.
const scores = { math: 90, science: 85, art: 95 };
console.log(Object.keys(scores)); // [ 'math', 'science', 'art' ]
console.log(Object.values(scores)); // [ 90, 85, 95 ]
console.log(Object.entries(scores)); // [ [ 'math', 90 ], [ 'science', 85 ], [ 'art', 95 ] ]

for (const [subject, score] of Object.entries(scores)) {
  console.log(`${subject}: ${score}`);
}
// math: 90
// science: 85
// art: 95

// Spread copies an object and lets you override or extend it.
const base = { theme: "light", fontSize: 14 };
const custom = { ...base, fontSize: 16, showSidebar: true };
console.log(custom); // { theme: 'light', fontSize: 16, showSidebar: true }
console.log(base); // unchanged: { theme: 'light', fontSize: 14 }

// Object.freeze makes an object read-only (shallowly).
const config = Object.freeze({ apiUrl: "https://example.com", retries: 3 });
config.retries = 10; // silently ignored (throws in strict mode)
console.log(config.retries); // 3
console.log(Object.isFrozen(config)); // true

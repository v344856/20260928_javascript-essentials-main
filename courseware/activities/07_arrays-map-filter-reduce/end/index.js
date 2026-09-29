// Activity: Word Stats

const words = ["sky", "ocean", "sun", "mountain", "sea"];

// Task 1: use map to build an array of each word's length.

// TODO Task 1: map `words` to their lengths
console.log("task 1 begin")
const lengths = words.map(word => word.length); 
console.log(lengths); // expected: [ 3, 5, 3, 8, 3 ]
console.log("task 1 end")

// Task 2: use filter to keep only words with length 3 or less.

// TODO Task 2: filter `words` down to the short ones
console.log("task 2 begin")
const shortWords = words.filter(word => word.length <= 3);
console.log(shortWords); // expected: [ 'sky', 'sun', 'sea' ]
console.log("task 2 end")
// Task 3: use reduce to add up the total number of letters.

// TODO Task 3: reduce `words` to the total letter count (start the accumulator at 0)
console.log("task 3 begin")
let totalLetters = words.reduce((accum, word) => accum + word.length,0)
console.log(totalLetters); // expected: 22
console.log("task 3 end")

// Activity: Word Stats (solution)

const words = ["sky", "ocean", "sun", "mountain", "sea"];

// Task 1: use map to build an array of each word's length.

const lengths = words.map(word => word.length);
console.log(lengths); // [ 3, 5, 3, 8, 3 ]

// Task 2: use filter to keep only words with length 3 or less.

const shortWords = words.filter(word => word.length <= 3);
console.log(shortWords); // [ 'sky', 'sun', 'sea' ]

// Task 3: use reduce to add up the total number of letters.

const totalLetters = words.reduce((acc, word) => acc + word.length, 0);
console.log(totalLetters); // 22

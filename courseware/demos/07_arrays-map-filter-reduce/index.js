


const nums = [1, 2, 3, 4, 5];
nums.forEach((num, index, arr) => console.log(num, index, arr));

// function expression
nums.forEach(function(num, index, arr) {
  console.log(num, index, arr);
});

const colors = ['red', 'green', 'blue'];
colors.forEach((color, index, arr) => console.log(color, index, arr));

// function expression
colors.forEach(function(color, index, arr) {
  console.log(color, index, arr);
});

// Array.prototype.forEach = function(callbackFn) {
//   for (let i = 0; i < this.length; i++) {
//     callbackFn(this[i], i, this);
//   }
// };

const doubleNums = nums.map(num => num * 2);

// map does not mutate the original array, it returns a new array
console.log(nums); // [1, 2, 3, 4, 5]
console.log(doubleNums); // [2, 4, 6, 8, 10]

// Array.prototype.map = function(callbackFn) {
//   const result = [];
//   for (let i = 0; i < this.length; i++) {
//     result.push(callbackFn(this[i], i, this));
//   }
//   return result;
// };

const evenNums = nums.filter(num => num % 2 === 0);

console.log(nums); // [1, 2, 3, 4, 5]
console.log(evenNums); // [2, 4]

// Array.prototype.filter = function(callbackFn) {
//   const result = [];
//   for (let i = 0; i < this.length; i++) {
//     if (callbackFn(this[i], i, this)) {
//       result.push(this[i]);
//     }
//   }
//   return result;
// };

const sum = nums.reduce((acc, num) => acc + num, 0);

// first iteration: acc = 0, num = 1 => acc = 0 + 1 = 1
// second iteration: acc = 1, num = 2 => acc = 1 + 2 = 3
// third iteration: acc = 3, num = 3 => acc = 3 + 3 = 6
// fourth iteration: acc = 6, num = 4 => acc = 6 + 4 = 10
// fifth iteration: acc = 10, num = 5 => acc = 10 + 5 = 15

console.log(nums); // [1, 2, 3, 4, 5]
console.log(sum); // 15

// Array.prototype.reduce = function(callbackFn, initialValue) {
//   let acc = initialValue;
//   for (let i = 0; i < this.length; i++) {
//     acc = callbackFn(acc, this[i], i, this);
//   }
//   return acc;
// };

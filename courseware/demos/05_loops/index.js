const nums = [1, 2, 3, 4, 5];

// Without a loop you would have to write every access by hand.
console.log(nums[0]);
console.log(nums[1]);
console.log(nums[2]);
console.log(nums[3]);
console.log(nums[4]);

// ---------------------------------------------------------------------------
// for: when you need the index (or want to control the step)
// ---------------------------------------------------------------------------

// i++ is the same as i = i + 1
// i += 1 is the same as i = i + 1

//  initial value; terminating condition; change on each iteration
for (let i = 0; i < nums.length; i++) {
  console.log(nums[i]);
}

// i-- is the same as i = i - 1
// reverse loop: the reason a plain for loop still earns its keep
for (let i = nums.length - 1; i >= 0; i--) {
  console.log(nums[i]);
}

// ---------------------------------------------------------------------------
// while: when the number of passes is not known up front
// ---------------------------------------------------------------------------

let i = 0; // initial value
while (i < nums.length) {
  // terminating condition
  console.log(nums[i]);
  i++; // change on each iteration
}

// ---------------------------------------------------------------------------
// do…while: always runs the body at least once
// ---------------------------------------------------------------------------

i = 0;
do {
  console.log(nums[i]);
  i++;
} while (i < nums.length);

// The condition is false from the start, yet the body still runs once.
i = 99;
do {
  console.log("do…while always runs once, i =", i);
} while (i < 5);

// ---------------------------------------------------------------------------
// for…of: the modern default when you just want the values
// ---------------------------------------------------------------------------

const letters = ["a", "b", "c", "d", "e"];

for (const letter of letters) {
  console.log(letter);
}

// forEach passes a function that the array calls once per element.
// The callback also receives the index.
letters.forEach(function (letter, index) {
  console.log(index, letter);
});

// ---------------------------------------------------------------------------
// break and continue: steering a loop from the inside
// ---------------------------------------------------------------------------

for (const n of nums) {
  if (n === 2) continue; // skip the rest of this pass
  if (n === 4) break; // stop the loop entirely
  console.log("kept", n);
}

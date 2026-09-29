// Activity: Maps and Sets, Tallying tags and skills
// Complete each TODO. Run with:  npm start   (npm run solution for the answer)

// TODO Task 1: write tally(tags) returning a Map from each tag to how many
// times it appears. Hint: counts.set(tag, (counts.get(tag) || 0) + 1)
function tally(tags) {
  return new Map(); // replace me
}

const tags = ["js", "css", "js", "html", "js", "css"];
const counts = tally(tags);

// TODO Task 2: log counts.get("js") and counts.size.

// TODO Task 3: loop counts with for...of and array destructuring, printing
// "  <tag>: <n>" for each pair, then log Object.fromEntries(counts).

// TODO Task 4: write unique(arr) returning the array without duplicates,
// using [...new Set(arr)].
function unique(arr) {
  return []; // replace me
}

// TODO Task 5: write shared(a, b) returning the values present in both,
// using new Set(a).intersection(new Set(b)).
function shared(a, b) {
  return []; // replace me
}

// TODO Task 6: write distinctCount(arr) returning new Set(arr).size.
function distinctCount(arr) {
  return 0; // replace me
}

const skills = ["html", "css", "js", "css", "js", "js"];
const mine = ["js", "css", "react"];
const theirs = ["css", "vue", "js"];

console.log("unique:", unique(skills));
console.log("shared:", shared(mine, theirs));
console.log("distinct count:", distinctCount(skills));

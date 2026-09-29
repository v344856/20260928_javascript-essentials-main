// Activity: Maps and Sets, Tallying tags and skills (solution)

// Task 1: Count how many times each tag appears, returning a Map.
function tally(tags) {
  const counts = new Map();
  for (const tag of tags) {
    counts.set(tag, (counts.get(tag) || 0) + 1);
  }
  return counts;
}

const tags = ["js", "css", "js", "html", "js", "css"];
const counts = tally(tags);

// Task 2: Read the count for one tag and the number of distinct tags.
console.log("js count:", counts.get("js"));
console.log("distinct tags:", counts.size);

// Task 3: Iterate in insertion order, then convert the Map to a plain object.
for (const [tag, n] of counts) {
  console.log(`  ${tag}: ${n}`);
}
console.log("as object:", Object.fromEntries(counts));

// Task 4: Remove duplicates from an array using a Set.
function unique(arr) {
  return [...new Set(arr)];
}

// Task 5: Return the tags shared by two lists (intersection).
function shared(a, b) {
  return [...new Set(a).intersection(new Set(b))];
}

// Task 6: Count distinct values in an array using Set size.
function distinctCount(arr) {
  return new Set(arr).size;
}

const skills = ["html", "css", "js", "css", "js", "js"];
const mine = ["js", "css", "react"];
const theirs = ["css", "vue", "js"];

console.log("unique:", unique(skills));
console.log("shared:", shared(mine, theirs));
console.log("distinct count:", distinctCount(skills));

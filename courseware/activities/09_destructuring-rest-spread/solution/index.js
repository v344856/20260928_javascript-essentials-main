// Activity: Destructuring, Rest and Spread (solution)

const scores = [95, 88, 72, 60, 41];

// Task 1: first element into `top`, the remaining elements into `others`
const [top, ...others] = scores;
console.log(top);
console.log(others);

// Task 2: keep gold (first) and bronze (third), skip silver with an empty hole
const [gold, , bronze] = scores;
console.log(gold);
console.log(bronze);

// Task 3: spread the existing scores into a new array, with 100 in front
const withPerfect = [100, ...scores];
console.log(withPerfect);

const book = {
  title: "Dune",
  author: "Frank Herbert",
  year: 1965,
  genre: "Sci-Fi",
};

// Task 4: pull title and author, gather the rest into `details`
const { title, author, ...details } = book;
console.log(title);
console.log(author);
console.log(details);

// Task 5: rename year -> published, and default pages to 0 (book has no pages)
const { year: published, pages = 0 } = book;
console.log(published);
console.log(pages);

// Task 6: spread details into a new object, overriding genre
const reissue = { ...details, genre: "Classic" };
console.log(reissue);

// Task 7: destructure the parameter itself, with a default
function label({ title: t, genre = "Unknown" }) {
  return `${t} [${genre}]`;
}

console.log(label(book));
console.log(label({ title: "Untitled" }));

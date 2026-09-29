// Activity: Objects, Movie edition (solution)

// Task 1: create an object literal, then read two properties - one with dot
// notation, one with bracket notation (including a key held in a variable).
const movie = { title: "Inception", director: "Nolan", year: 2010 };
console.log(movie.title);
console.log(movie["director"]);

const key = "year";
console.log(movie[key]);

// Task 2: add / update / delete properties, then test membership.
movie.rating = 5; // add
movie.year = 2011; // update
delete movie.director; // delete
console.log(movie);

console.log(Object.hasOwn(movie, "director"));
console.log(Object.hasOwn(movie, "title"));

// Task 3: turn an object of scores into an array and compute the average.
const scores = { acting: 9, plot: 8, music: 10 };
const values = Object.values(scores);
const average = values.reduce((sum, n) => sum + n, 0) / values.length;
console.log(`Average score: ${average}`);

// Task 4: loop the entries as key/value pairs.
for (const [category, score] of Object.entries(scores)) {
  console.log(`${category}: ${score}`);
}

// Task 5: copy-and-override with spread, then lock an object with freeze.
const settings = { quality: "HD", subtitles: false };
const updated = { ...settings, subtitles: true };
console.log(updated);

const locked = Object.freeze({ region: "US" });
locked.region = "EU"; // ignored: the object is frozen
console.log(locked.region);

// Activity: Objects, Movie edition
// Complete the TODOs, then run `npm start` from the activity folder.

// TODO Task 1: create a `movie` object literal with title, director, and year.
// Read `title` with dot notation and `director` with bracket notation.
// Then read `year` using the `key` variable below - bracket access is the only
// form that works when the key lives in a variable.
const key = "year";

// TODO Task 2: add a `rating` property, update `year`, and delete `director`,
// then log the object. Finally use Object.hasOwn to check for "director"
// (now gone) and "title" (still there).

// TODO Task 3: given the `scores` object below, use Object.values to get an
// array of the numbers, then compute and log the average score.
const scores = { acting: 9, plot: 8, music: 10 };

// TODO Task 4: loop Object.entries(scores) with for...of and array
// destructuring, printing "<category>: <score>" for each pair.

// TODO Task 5: given `settings` below, use the spread operator to make a copy
// that overrides `subtitles` to true, and log it. Then freeze an object with
// { region: "US" }, try to change region to "EU", and log region (still "US").
const settings = { quality: "HD", subtitles: false };

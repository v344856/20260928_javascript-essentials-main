// Activity: Objects, Movie edition
// Complete the TODOs, then run `npm start` from the activity folder.

// TODO Task 1: create a `movie` object literal with title, director, and year.
// Read `title` with dot notation and `director` with bracket notation.
// Then read `year` using the `key` variable below - bracket access is the only
// form that works when the key lives in a variable.
console.log(`task1`)
const movies = {title: "Mytitle",director: "Junjie", year: 2026};
console.log(movies.title);
console.log(movies[director])
const key = "year"
console.log(movies[key])

// TODO Task 2: add a `rating` property, update `year`, and delete `director`,
// then log the object. Finally use Object.hasOwn to check for "director"
// (now gone) and "title" (still there).
console.log(`task2`)
movies.rating = 10
movies.year = 2021

delete movies.director
console.log(movies)

console.log(Object.hasOwn(movies,"director")) //false
console.log(Object.hasOwn(movies,"title")) // true


// TODO Task 3: given the `scores` object below, use Object.values to get an
// array of the numbers, then compute and log the average score.
//console.log(`task3`)
//const scores = { acting: 9, plot: 8, music: 10 };
console.log(`task3`)
const scores = { acting: 9, plot: 8, music: 10 };
const values = Object.values(scores);
const average = values.reduce((sum, n) => sum + n, 0) / values.length;
console.log(`Average score: ${average}`);


// TODO Task 4: loop Object.entries(scores) with for...of and array
// destructuring, printing "<category>: <score>" for each pair.
console.log(`task4`)
for (const [category, scores] of Object.entries(scores))
{
    console.log(`${category}: ${scores}`)
}

// TODO Task 5: given `settings` below, use the spread operator to make a copy
// that overrides `subtitles` to true, and log it. Then freeze an object with
// { region: "US" }, try to change region to "EU", and log region (still "US").
//const settings = { quality: "HD", subtitles: false };

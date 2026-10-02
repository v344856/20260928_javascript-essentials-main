// Activity: Destructuring, Rest and Spread
// Complete each TODO. Run with:  npm start   (npm run solution for the answer)

const scores = [95, 88, 72, 60, 41];

// TODO Task 1: destructure so the first element lands in `top` and everything
// after it gathers into `others` with ... . Log both.

console.log("task 1 begin")
let [top,...others] = scores
console.log(top)
console.log(others)
console.log("task 1 end")

// TODO Task 2: destructure gold (first) and bronze (third), skipping silver
// with an empty hole. Log both.

console.log("task 2 begin")
let[gold,,bronze] = scores
console.log(gold)
console.log(bronze)
console.log("task 2 end")

// TODO Task 3: build `withPerfect` as a new array with 100 in front of every
// existing score, using spread. Log it. `scores` must not change.


console.log("task 3 begin")
const withPerfect = [100, ...scores]
console.log(withPerfect)
const book = {
  title: "Dune",
  author: "Frank Herbert",
  year: 1965,
  genre: "Sci-Fi",
};

console.log("task 3 end")

// TODO Task 4: destructure title and author out of book, gathering the
// remaining properties into `details`. Log all three.

console.log("task 4 begin")
let {title,author, ...details} = book
console.log(title)
console.log(author)
console.log("task 4 end")

// TODO Task 5: destructure year but name the variable `published`, and
// destructure `pages` with a default of 0. Log both.
console.log("task 5 begin")
let {year:published, pages = 0} = book
console.log(published)
console.log(pages)
console.log("task 5 end")

// TODO Task 6: spread details into a new `reissue` object that overrides
// genre to "Classic". Log it.

console.log("task 6 begin")
const reissue = {...details, genre: "Classic"} 
console.log(reissue)
console.log("task 6 end")

// TODO Task 7: write label({ title: t, genre = "Unknown" }) returning
// "<title> [<genre>]", destructuring in the parameter list itself.
// Then log label(book) and label({ title: "Untitled" }).
console.log("task 7 begin")

function label({title: t, genre = "Unknown" }){
  return `${t} [${genre}]`
}
console.log(book)
console.log(label({ title: "Untitled" }))
console.log("task 7 begin")


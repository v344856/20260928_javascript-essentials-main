// Activity: Destructuring, Rest and Spread
// Complete each TODO. Run with:  npm start   (npm run solution for the answer)

const scores = [95, 88, 72, 60, 41];

// TODO Task 1: destructure so the first element lands in `top` and everything
// after it gathers into `others` with ... . Log both.

// TODO Task 2: destructure gold (first) and bronze (third), skipping silver
// with an empty hole. Log both.

// TODO Task 3: build `withPerfect` as a new array with 100 in front of every
// existing score, using spread. Log it. `scores` must not change.

const book = {
  title: "Dune",
  author: "Frank Herbert",
  year: 1965,
  genre: "Sci-Fi",
};

// TODO Task 4: destructure title and author out of book, gathering the
// remaining properties into `details`. Log all three.

// TODO Task 5: destructure year but name the variable `published`, and
// destructure `pages` with a default of 0. Log both.

// TODO Task 6: spread details into a new `reissue` object that overrides
// genre to "Classic". Log it.

// TODO Task 7: write label({ title: t, genre = "Unknown" }) returning
// "<title> [<genre>]", destructuring in the parameter list itself.
// Then log label(book) and label({ title: "Untitled" }).

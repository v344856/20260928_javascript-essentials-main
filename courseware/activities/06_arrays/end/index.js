// Activity: Arrays, Bookshelf edition
// Complete each TODO. Run with:  npm start   (npm run solution for the answer)

// TODO Task 1: create `titles` (three strings) and `books` (three objects,
// each with a `title` and a `read` boolean).

const titles = ["Junjie", "2022", "BIO"]
const books = [
 {title: "Book0", read: true },
 {title: "Book1", read: false},
 {title: "Book2",eread: true }
]

// TODO Task 2: print the first title, the title of the second book, and
// titles[99] - an out-of-range index reads as undefined.
console.log(titles[0])
console.log(books[0].title)
console.log(books[1].title)
console.log(books[2].title)


// TODO Task 3: put two functions in an `actions` array - one logging
// "Opening the book...", one logging "Closing the book..." - then call
// them by index.

// TODO Task 4: replace index 2 of playlist with "Chorus" and log the array.
// Then push "Encore" (log the returned new length) and pop it back off
// (log the returned element).
const playlist = ["Intro", "Verse", "Bridge", "Outro"];

// TODO Task 5: insert "Solo" at index 2 without removing anything, then
// remove one element at index 1. Log the array after the insert, the array
// splice returns, and the final array.

// TODO Task 6: split tagString on ";", join the result with " > ", then
// search it with includes("css"), indexOf("node"), and indexOf("react").
const tagString = "javascript;html;css;node";

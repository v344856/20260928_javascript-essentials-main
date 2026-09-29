// Activity: Arrays, Bookshelf edition (solution)

// Task 1: create arrays that hold different kinds of values.

const titles = ["Dune", "1984", "Hyperion"];

const books = [
  { title: "Dune", read: true },
  { title: "1984", read: false },
  { title: "Hyperion", read: true },
];

// Task 2: read values out of the arrays by index.

console.log(titles[0]);
console.log(books[1].title);
console.log(titles[99]);

// Task 3: store functions in an array and call them by index.

const actions = [
  function () {
    console.log("Opening the book...");
  },
  function () {
    console.log("Closing the book...");
  },
];

actions[0]();
actions[1]();

// Task 4: mutate a playlist in place.

const playlist = ["Intro", "Verse", "Bridge", "Outro"];

playlist[2] = "Chorus";
console.log(playlist);

const newLength = playlist.push("Encore");
console.log(newLength);

const removed = playlist.pop();
console.log(removed);

// Task 5: rearrange with splice.

playlist.splice(2, 0, "Solo");
console.log(playlist);

const cut = playlist.splice(1, 1);
console.log(cut);
console.log(playlist);

// Task 6: split, join, and search a tag string.

const tagString = "javascript;html;css;node";

const tags = tagString.split(";");
console.log(tags);

console.log(tags.join(" > "));

console.log(tags.includes("css"));
console.log(tags.indexOf("node"));
console.log(tags.indexOf("react"));

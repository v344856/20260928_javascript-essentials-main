// Activity: Interfaces and Type Aliases
// Theme: a small library catalog. Complete each TODO. Run: npx tsx index.ts

// --- Task 1: a Book interface ---
// TODO Task 1: give Book a `readonly id: number`, a `title: string`, and an
// optional `subtitle?: string`.
interface Book {
  // ...
}

const dune: Book = { id: 1, title: "Dune" };
const effective: Book = { id: 2, title: "Effective TypeScript", subtitle: "62 Ways" };

console.log(`${dune.title}${dune.subtitle ? ": " + dune.subtitle : ""}`);
console.log(`${effective.title}: ${effective.subtitle ?? "(no subtitle)"}`);

// --- Task 2: type aliases (things interfaces cannot name) ---
// TODO Task 2: make ISBN an alias for string, Genre a union of
// "fiction" | "science" | "history", and Shelf the tuple [Genre, number].
type ISBN = string;
type Genre = string;
type Shelf = [Genre, number];

const isbn: ISBN = "978-0441013593";
const shelf: Shelf = ["science", 3];

console.log(`ISBN ${isbn} | shelf ${shelf[0]} #${shelf[1]}`);

// --- Task 3: extend an interface, and intersect aliases ---
// TODO Task 3a: make Ebook extend Book (add `extends Book`) so it inherits id/title.
interface Ebook {
  fileSizeMb: number;
}

const guide: Ebook = { id: 3, title: "Deep Learning", fileSizeMb: 24 };
console.log(`${guide.title} is ${guide.fileSizeMb}MB`);

type Audit = { addedOn: string };
// TODO Task 3b: make CatalogEntry the intersection of Book and Audit (Book & Audit).
type CatalogEntry = Audit;

const entry: CatalogEntry = { id: 4, title: "Sapiens", addedOn: "2026-07-01" };
console.log(`${entry.title} added ${entry.addedOn}`);

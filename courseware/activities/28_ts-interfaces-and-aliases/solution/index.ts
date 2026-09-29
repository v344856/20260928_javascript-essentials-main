// Activity: Interfaces and Type Aliases (solution)
// Theme: a small library catalog. Run with: npx tsx index.ts

// --- Task 1: a Book interface ---
interface Book {
  readonly id: number;
  title: string;
  subtitle?: string; // optional
}

const dune: Book = { id: 1, title: "Dune" };
const effective: Book = { id: 2, title: "Effective TypeScript", subtitle: "62 Ways" };

console.log(`${dune.title}${dune.subtitle ? ": " + dune.subtitle : ""}`);
console.log(`${effective.title}: ${effective.subtitle ?? "(no subtitle)"}`);

// --- Task 2: type aliases (things interfaces cannot name) ---
type ISBN = string;
type Genre = "fiction" | "science" | "history";
type Shelf = [Genre, number];

const isbn: ISBN = "978-0441013593";
const shelf: Shelf = ["science", 3];

console.log(`ISBN ${isbn} | shelf ${shelf[0]} #${shelf[1]}`);

// --- Task 3: extend an interface, and intersect aliases ---
interface Ebook extends Book {
  fileSizeMb: number;
}

const guide: Ebook = { id: 3, title: "Deep Learning", fileSizeMb: 24 };
console.log(`${guide.title} is ${guide.fileSizeMb}MB`);

type Audit = { addedOn: string };
type CatalogEntry = Book & Audit;

const entry: CatalogEntry = { id: 4, title: "Sapiens", addedOn: "2026-07-01" };
console.log(`${entry.title} added ${entry.addedOn}`);

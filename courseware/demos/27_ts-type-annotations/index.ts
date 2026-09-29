// TypeScript type annotations
// A type annotation is the `: Type` you write after a name to tell
// TypeScript what kind of value belongs there. Run with: npx tsx index.ts

// --- Variable annotations ---------------------------------------------------
// The type goes right after the variable name.
const title: string = "TypeScript Basics";
const version: number = 5;
const isStable: boolean = true;

console.log(title, version, isStable); // TypeScript Basics 5 true

// --- Type inference ---------------------------------------------------------
// You do not have to annotate everything. When you initialize a variable,
// TypeScript infers the type for you.
let inferredCount = 10;          // inferred as number
// inferredCount = "ten";        // would be a compile error: string not allowed
inferredCount = 20;              // fine: still a number

console.log("count is now", inferredCount); // count is now 20

// --- Function annotations ---------------------------------------------------
// Annotate each parameter and the return type.
function add(a: number, b: number): number {
  return a + b;
}

// A function that returns nothing uses the `void` return type.
function greet(name: string): void {
  console.log(`Hello, ${name}!`);
}

console.log("2 + 3 =", add(2, 3)); // 2 + 3 = 5
greet("Ada");                       // Hello, Ada!

// --- Union types ------------------------------------------------------------
// A union type (written with `|`) allows a value to be one of several types.
function formatId(id: number | string): string {
  return `ID-${id}`;
}

console.log(formatId(42));      // ID-42
console.log(formatId("abc"));   // ID-abc

// --- Literal types ----------------------------------------------------------
// A literal type restricts a value to specific allowed values.
type Direction = "north" | "south" | "east" | "west";

function move(dir: Direction): void {
  console.log(`Moving ${dir}`);
}

move("north"); // Moving north
// move("up"); // would be a compile error: "up" is not a Direction

// --- Arrays -----------------------------------------------------------------
// `Type[]` means "an array of that type".
const scores: number[] = [90, 85, 100];
const names: string[] = ["Ann", "Ben", "Cy"];

console.log("top score:", Math.max(...scores)); // top score: 100
console.log("first name:", names[0]);           // first name: Ann

// --- Tuples -----------------------------------------------------------------
// A tuple is a fixed-length array where each position has its own type.
const point: [number, number] = [3, 4];
const labeled: [string, number] = ["age", 30];

console.log(`point = (${point[0]}, ${point[1]})`); // point = (3, 4)
console.log(`${labeled[0]}: ${labeled[1]}`);       // age: 30

// --- any vs unknown ---------------------------------------------------------
// `any` turns off type checking: avoid it. `unknown` is the safe version:
// you must narrow it before using it.
let loose: any = "could be anything";
loose = 123; // no complaint: that is why `any` is risky

let safe: unknown = "must be checked first";
if (typeof safe === "string") {
  // Inside this block TypeScript knows `safe` is a string.
  console.log("length is", safe.length); // length is 21
}

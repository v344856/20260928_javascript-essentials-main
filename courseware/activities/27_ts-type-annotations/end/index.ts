// Activity: TypeScript Type Annotations
// Theme: a small trip planner. Complete each TODO. Run with: npx tsx index.ts

// --- Task 1: annotate the variables ---
// TODO Task 1: add a type annotation (: string, : number, : boolean) to each.
const city: string = "Reykjavik";
const distanceKm: nu = 4200;
const isCapital: boolean = true;

console.log(`${city} is ${distanceKm} km away (capital: ${isCapital})`);

// --- Task 2: a function and a literal union type ---
// TODO Task 2a: annotate the parameter and the return type (both number).
function celsiusToF(c :number) {
  return (c * 9) / 5 + 32;
}

// TODO Task 2b: make Season a literal union "spring" | "summer" | "fall" | "winter".
type Season = "Spring" | "summer" | "fall" | "winter";

function announce(season: Season): void {
  console.log(`Packing for ${season}`);
}

console.log(`10C is ${celsiusToF(10)}F`);
announce("winter");

// --- Task 3: a typed array and a tuple ---
// TODO Task 3a: annotate highs as a number array (number[]).
const highs: number[] = [3, 5, 2, 6, 4];
// TODO Task 3b: annotate coords as a [string, number] tuple.
const coords: [string, number] = ["Reykjavik", 64];

console.log(`warmest high: ${Math.max(...highs)}`);
console.log(`${coords[0]} sits at latitude ${coords[1]}`);

// --- Task 4: unknown ---
// TODO Task 4: change the annotation on rawInput from string to unknown. The
// typeof guard below then lets you safely read .length.
const rawInput: unknown = "48";

if (typeof rawInput === "string") {
  console.log(`input has ${rawInput.length} characters`);
}

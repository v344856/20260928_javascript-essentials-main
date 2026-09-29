// Activity: TypeScript Type Annotations (solution)
// Theme: a small trip planner. Run with: npx tsx index.ts

// --- Task 1: annotate the variables ---
const city: string = "Reykjavik";
const distanceKm: number = 4200;
const isCapital: boolean = true;

console.log(`${city} is ${distanceKm} km away (capital: ${isCapital})`);

// --- Task 2: a function and a literal union type ---
function celsiusToF(c: number): number {
  return (c * 9) / 5 + 32;
}

type Season = "spring" | "summer" | "fall" | "winter";

function announce(season: Season): void {
  console.log(`Packing for ${season}`);
}

console.log(`10C is ${celsiusToF(10)}F`);
announce("winter");

// --- Task 3: a typed array and a tuple ---
const highs: number[] = [3, 5, 2, 6, 4];
const coords: [string, number] = ["Reykjavik", 64];

console.log(`warmest high: ${Math.max(...highs)}`);
console.log(`${coords[0]} sits at latitude ${coords[1]}`);

// --- Task 4: unknown ---
const rawInput: unknown = "48";

if (typeof rawInput === "string") {
  // Inside this guard TypeScript knows rawInput is a string.
  console.log(`input has ${rawInput.length} characters`);
}

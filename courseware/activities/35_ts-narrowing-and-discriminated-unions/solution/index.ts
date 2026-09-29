// Activity: Narrowing and Discriminated Unions (solution)
// Run with `npm start` (or `npm run solution`).

// Task 1: typeof narrows the union to a single primitive per branch.
function show(value: string | number): string {
  if (typeof value === "string") {
    return `text: ${value.toUpperCase()}`;
  }
  return `num: ${value.toFixed(2)}`;
}
console.log(show("hello"));
console.log(show(3.14159));

// Task 2: instanceof narrows unknown to a Date.
function explain(x: unknown): string {
  if (x instanceof Date) return `date: ${x.getFullYear()}`;
  return `other: ${String(x)}`;
}
console.log(explain(new Date("2026-01-15")));
console.log(explain("nope"));

// Task 3: a truthiness check narrows away undefined/empty.
function label(name?: string): string {
  if (!name) return "unnamed";
  return name.trim();
}
console.log(label());
console.log(label("  Ada "));

// Task 4: a union of event objects, each tagged by a literal `type`.
type AppEvent =
  | { type: "click"; x: number; y: number }
  | { type: "key"; key: string }
  | { type: "scroll"; delta: number };

// Task 5: switching on the shared `type` tag narrows each case to a single
// member, so only that member's properties are available in its branch.
function render(e: AppEvent): string {
  switch (e.type) {
    case "click":
      return `click at (${e.x}, ${e.y})`;
    case "key":
      return `key ${e.key}`;
    case "scroll":
      return `scroll ${e.delta}`;
    default:
      // Task 6: exhaustiveness check. Add a member to AppEvent without
      // adding a case here and this line stops compiling.
      return assertNever(e);
  }
}

function assertNever(value: never): never {
  throw new Error(`Unhandled event: ${JSON.stringify(value)}`);
}

const events: AppEvent[] = [
  { type: "click", x: 10, y: 20 },
  { type: "key", key: "Enter" },
  { type: "scroll", delta: -5 },
];

for (const e of events) console.log(render(e));

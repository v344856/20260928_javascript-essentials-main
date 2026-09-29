// Narrowing and Discriminated Unions
// A union type is only useful once TypeScript can tell WHICH member you have.
// Run: npx tsx index.ts

// ============================================================================
// Part 1: Narrowing with type guards
// ============================================================================

// `typeof` narrows primitives.
function format(id: number | string): string {
  if (typeof id === "string") {
    return id.toUpperCase(); // narrowed to string
  }
  return id.toFixed(0); // narrowed to number
}
console.log(format("a-12")); // A-12
console.log(format(42.7)); // 43

// `instanceof` narrows to a class instance. Note the parameter is `unknown`,
// not `any`: `unknown` forces you to prove the type before using it.
function describe(err: unknown): string {
  if (err instanceof Error) return `Error: ${err.message}`;
  return `Non-error: ${String(err)}`;
}
console.log(describe(new Error("boom"))); // Error: boom
console.log(describe("oops")); // Non-error: oops

// `in` narrows object shapes by which property exists.
type Circle = { radius: number };
type Square = { side: number };
function areaByShape(shape: Circle | Square): number {
  if ("radius" in shape) return Math.PI * shape.radius ** 2;
  return shape.side ** 2;
}
console.log(areaByShape({ radius: 2 }).toFixed(2)); // 12.57
console.log(areaByShape({ side: 3 })); // 9

// A truthiness check narrows away null / undefined.
function greet(name?: string): string {
  if (!name) return "Hello, stranger";
  return `Hello, ${name}`; // name is string here
}
console.log(greet()); // Hello, stranger
console.log(greet("Ada")); // Hello, Ada

// ============================================================================
// Part 2: Discriminated unions: give every member a literal tag
// ============================================================================
// `in` checks get fragile as a union grows. Instead, give each member a shared
// property whose type is a LITERAL, the "discriminant", and switch on it.

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2; // only radius exists here
    case "square":
      return shape.side ** 2;
    case "rectangle":
      return shape.width * shape.height;
    default:
      // Exhaustiveness check: if a new member is added to Shape and this
      // switch forgets it, `shape` is no longer `never` and this line fails
      // to compile: the compiler finds the missing case for you.
      return assertNever(shape);
  }
}

function assertNever(value: never): never {
  throw new Error(`Unhandled shape: ${JSON.stringify(value)}`);
}

const shapes: Shape[] = [
  { kind: "circle", radius: 2 },
  { kind: "square", side: 3 },
  { kind: "rectangle", width: 2, height: 5 },
];

for (const shape of shapes) {
  console.log(`${shape.kind}: ${area(shape).toFixed(2)}`);
}
// circle: 12.57
// square: 9.00
// rectangle: 10.00

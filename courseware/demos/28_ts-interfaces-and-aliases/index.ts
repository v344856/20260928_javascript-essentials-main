// Interfaces and type aliases
// Both describe the shape of an object. This demo shows when each shines,
// plus optional and readonly properties and extending. Run: npx tsx index.ts

// --- An interface -----------------------------------------------------------
// An interface names the shape of an object: which properties it has and
// what type each one is.
interface User {
  readonly id: number; // readonly: cannot be reassigned after creation
  name: string;
  email: string;
  nickname?: string;   // optional: the ? means it may be missing
}

const alice: User = { id: 1, name: "Alice", email: "alice@example.com" };
const bob: User = { id: 2, name: "Bob", email: "bob@example.com", nickname: "Bobby" };

console.log(alice.name, "-", alice.email);        // Alice - alice@example.com
console.log(bob.name, "goes by", bob.nickname);   // Bob goes by Bobby

// alice.id = 99; // compile error: id is readonly
alice.name = "Alice Smith"; // fine: name is writable
console.log("updated name:", alice.name); // updated name: Alice Smith

// The ?? handles the optional property gracefully.
console.log("alice nickname:", alice.nickname ?? "(none)"); // alice nickname: (none)

// --- A type alias -----------------------------------------------------------
// A type alias gives a name to any type, not just object shapes. It is the
// only choice for unions, tuples, and primitives.
type ID = number | string;
type Point = { x: number; y: number };
type Status = "active" | "inactive" | "banned";

const userId: ID = "u-42";
// Named `startPoint`, not `origin`: `origin` is a global in the DOM type
// library, so a top-level `const origin` collides with it in a plain script.
const startPoint: Point = { x: 0, y: 0 };
const state: Status = "active";

console.log("id:", userId, "| startPoint:", startPoint, "| status:", state);
// id: u-42 | startPoint: { x: 0, y: 0 } | status: active

// --- Extending an interface -------------------------------------------------
// An interface can extend another to add properties on top of it.
interface Admin extends User {
  permissions: string[];
}

const root: Admin = {
  id: 3,
  name: "Root",
  email: "root@example.com",
  permissions: ["read", "write", "delete"],
};

console.log(`${root.name} can: ${root.permissions.join(", ")}`);
// Root can: read, write, delete

// --- Extending a type alias with intersection (&) ---------------------------
// Type aliases combine with the intersection operator `&` instead of `extends`.
type Timestamps = { createdAt: string; updatedAt: string };
type Article = { title: string } & Timestamps;

const post: Article = {
  title: "Learning TypeScript",
  createdAt: "2026-07-01",
  updatedAt: "2026-07-07",
};

console.log(`"${post.title}" created ${post.createdAt}`);
// "Learning TypeScript" created 2026-07-01

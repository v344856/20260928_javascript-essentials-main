// Generics and Utility Types
// Generics let you write reusable code that works with many types while
// keeping full type safety; the built-in utility types then transform an
// existing type into a new one. Run with: npx tsx index.ts

// ============================================================================
// Part 1: Generics
// ============================================================================

// --- A generic function -----------------------------------------------------
// `<T>` is a type parameter: a placeholder filled in when the function is called.
// `identity` returns whatever type it receives, unchanged.
function identity<T>(value: T): T {
  return value;
}

const n = identity(42); // T inferred as number
const s = identity("hello"); // T inferred as string
console.log(n, s); // 42 hello

// --- A generic function with a constraint -----------------------------------
// `extends` here constrains T: it must have a `length` property. That lets us
// safely read `.length` inside the function.
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

console.log(longest("cat", "kangaroo")); // kangaroo
console.log(longest([1, 2], [1, 2, 3, 4])); // [ 1, 2, 3, 4 ]
// longest(10, 20); // compile error: numbers have no `length`

// --- A generic class: Box<T> ------------------------------------------------
// The class stores and returns a value of whatever type it is created with.
class Box<T> {
  constructor(private value: T) {}

  get(): T {
    return this.value;
  }

  set(value: T): void {
    this.value = value;
  }

  map<U>(fn: (value: T) => U): Box<U> {
    // Transform the contents into a new Box of a possibly different type.
    return new Box(fn(this.value));
  }
}

const numberBox = new Box(10);
console.log("boxed:", numberBox.get()); // boxed: 10

const stringBox = numberBox.map((x) => `#${x}`); // Box<number> -> Box<string>
console.log("mapped:", stringBox.get()); // mapped: #10

// --- A generic interface ----------------------------------------------------
// The interface describes an API response wrapping any payload type.
interface ApiResponse<T> {
  status: number;
  data: T;
}

const userResponse: ApiResponse<{ id: number; name: string }> = {
  status: 200,
  data: { id: 1, name: "Alice" },
};

console.log("user:", userResponse.data.name); // user: Alice

// ============================================================================
// Part 2: Utility types
// ============================================================================
// These are themselves generic: each takes the type to transform as its
// type argument. They exist so you never restate a shape you already have.

// --- The domain type we will transform --------------------------------------
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

// --- Partial<T>: every property becomes optional ---------------------------
// Handy for update functions that accept only the fields being changed.
function applyUpdate(product: Product, changes: Partial<Product>): Product {
  return { ...product, ...changes };
}

const base: Product = { id: 1, name: "Mug", price: 12, description: "Ceramic mug" };
const updated = applyUpdate(base, { price: 10 }); // only price supplied
console.log("updated price:", updated.price); // updated price: 10

// --- Required<T>: every property becomes mandatory -------------------------
interface Options {
  debug?: boolean;
  timeout?: number;
}

// After defaults are merged, no field is optional anymore.
const fullOptions: Required<Options> = { debug: false, timeout: 3000 };
console.log("options:", fullOptions); // options: { debug: false, timeout: 3000 }

// --- Readonly<T>: every property becomes read-only -------------------------
const frozen: Readonly<Product> = base;
// frozen.price = 5; // compile error: cannot assign to a readonly property
console.log("frozen name:", frozen.name); // frozen name: Mug

// --- Pick<T, Keys>: keep only the listed properties ------------------------
// A lightweight view of a Product for a list display.
type ProductPreview = Pick<Product, "id" | "name">;
const preview: ProductPreview = { id: 1, name: "Mug" };
console.log("preview:", preview); // preview: { id: 1, name: 'Mug' }

// --- Omit<T, Keys>: keep everything EXCEPT the listed properties -----------
// The shape you accept before the server assigns an id.
type NewProduct = Omit<Product, "id">;
const draft: NewProduct = { name: "Kettle", price: 40, description: "1.7L kettle" };
console.log("draft:", draft.name); // draft: Kettle

// --- Record<Keys, Value>: an object with fixed keys and one value type -----
// A lookup table from a known set of keys to a value type.
type Role = "admin" | "editor" | "viewer";
const permissions: Record<Role, string[]> = {
  admin: ["read", "write", "delete"],
  editor: ["read", "write"],
  viewer: ["read"],
};

console.log("editor can:", permissions.editor.join(", ")); // editor can: read, write

// --- Combining them ---------------------------------------------------------
// Utility types compose: a draft whose every remaining field is optional.
type ProductDraft = Partial<Omit<Product, "id">>;
const halfDraft: ProductDraft = { name: "Teapot" };
console.log("half draft:", halfDraft); // half draft: { name: 'Teapot' }

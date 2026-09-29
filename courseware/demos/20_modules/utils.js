// ES module: this file's package.json says { "type": "module" }.

// A NAMED export: the importer must ask for it by name.
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// Exported values can be anything, not just functions.
export const VERSION = "1.0.0";

// A module can have at most ONE default export. The importer names it
// whatever it likes.
export default {
  add,
  subtract,
  VERSION,
};

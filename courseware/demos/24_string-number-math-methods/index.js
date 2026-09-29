// ============================================
// String Properties & Methods
// ============================================
// Strings are immutable: every method returns a NEW string
// rather than changing the original.

const title = "  Modern JavaScript Essentials  ";

// length is a property, not a method (no parentheses)
console.log("length:", title.length); // length: 32

// trim() removes leading/trailing whitespace
const trimmed = title.trim();
console.log("trim():", `"${trimmed}"`); // trim(): "Modern JavaScript Essentials"

// Case conversion
console.log("toUpperCase():", trimmed.toUpperCase()); // MODERN JAVASCRIPT ESSENTIALS

// slice(start, end) extracts a portion (end is exclusive)
console.log("slice(0, 6):", trimmed.slice(0, 6)); // Modern
// Negative indexes count from the end
console.log("slice(-10):", trimmed.slice(-10)); // Essentials

// indexOf finds the first position of a substring (-1 if absent)
console.log("indexOf('Java'):", trimmed.indexOf("Java")); // 7

// includes / startsWith / endsWith return booleans
console.log("includes('Script'):", trimmed.includes("Script")); // true
console.log("startsWith('Modern'):", trimmed.startsWith("Modern")); // true

// replace swaps the FIRST match; replaceAll swaps every match
const sentence = "cats are cats";
console.log("replace:", sentence.replace("cats", "dogs")); // dogs are cats
console.log("replaceAll:", sentence.replaceAll("cats", "dogs")); // dogs are dogs

// split turns a string into an array on a delimiter; join reverses it
const colors = "red,green,blue".split(",");
console.log("split(','):", colors); // [ 'red', 'green', 'blue' ]
console.log("join(' | '):", colors.join(" | ")); // red | green | blue

// padStart / padEnd fill a string to a target width
console.log("padStart:", "7".padStart(3, "0")); // 007
console.log("padEnd:", "7".padEnd(3, "-")); // 7--

// repeat and at
console.log("repeat(3):", "ab".repeat(3)); // ababab
console.log("at(-1):", trimmed.at(-1)); // s

// ============================================
// Number Parsing, Formatting & Checks
// ============================================

// parseInt reads an integer from the FRONT of a string, ignoring trailing text.
// Always pass the radix (base 10) to avoid surprises.
console.log("parseInt('42px', 10):", parseInt("42px", 10)); // 42
console.log("parseInt('FF', 16):", parseInt("FF", 16)); // 255

// parseFloat reads a decimal number
console.log("parseFloat('3.14 rad'):", parseFloat("3.14 rad")); // 3.14

// Number(...) converts a WHOLE string; any junk makes it NaN
console.log("Number('42'):", Number("42")); // 42
console.log("Number('42px'):", Number("42px")); // NaN

// toFixed formats a number with a fixed number of decimals; returns a STRING
const price = 19.5;
console.log("toFixed(2):", price.toFixed(2)); // 19.50

// toString(radix) converts a number to another base
console.log("(255).toString(16):", (255).toString(16)); // ff

// Number.isInteger and Number.isNaN are safe checks (no coercion)
console.log("isInteger(10.5):", Number.isInteger(10.5)); // false
console.log("isNaN(Number('abc')):", Number.isNaN(Number("abc"))); // true

// --- The classic floating-point gotcha ---
console.log("0.1 + 0.2 =", 0.1 + 0.2); // 0.30000000000000004
console.log("0.1 + 0.2 === 0.3:", 0.1 + 0.2 === 0.3); // false

// Fix 1: round to a sensible number of decimals
const sum = 0.1 + 0.2;
console.log("rounded number:", Number(sum.toFixed(2))); // 0.3

// Fix 2: compare within a tiny tolerance (epsilon)
console.log("close enough:", Math.abs(sum - 0.3) < Number.EPSILON); // true

// Formatting money for humans with Intl.NumberFormat
const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
console.log("formatted:", usd.format(1234.5)); // $1,234.50

// ============================================
// The Math Object
// ============================================
// Math is a built-in object of constants and static helper
// methods. You never call `new Math()`; you use it directly.

// Rounding
console.log("round(4.5):", Math.round(4.5)); // 5
console.log("floor(4.9):", Math.floor(4.9)); // 4  (always down)
console.log("ceil(4.1):", Math.ceil(4.1)); // 5  (always up)
console.log("trunc(-4.7):", Math.trunc(-4.7)); // -4 (drops the fraction)

// Absolute value
console.log("abs(-7):", Math.abs(-7)); // 7

// Powers and roots
console.log("pow(2, 10):", Math.pow(2, 10)); // 1024
console.log("2 ** 10:", 2 ** 10); // 1024 (modern exponent operator)
console.log("sqrt(144):", Math.sqrt(144)); // 12

// min / max across many arguments, and over an array via spread
const scores = [88, 72, 95, 61];
console.log("max(3, 9, 1):", Math.max(3, 9, 1)); // 9
console.log("max of array:", Math.max(...scores)); // 95
console.log("min of array:", Math.min(...scores)); // 61

// A handy constant
console.log("PI:", Math.PI); // 3.141592653589793

// --- Random numbers ---
// Math.random() returns a float in [0, 1)
console.log("random():", Math.random()); // e.g. 0.6273...

// Reusable helper: a random integer from min to max, inclusive
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Roll a six-sided die a few times
console.log("dice rolls:", [randomInt(1, 6), randomInt(1, 6), randomInt(1, 6)]);

// Pick a random item from an array
const drinks = ["espresso", "latte", "cold brew", "cappuccino"];
console.log("random drink:", drinks[randomInt(0, drinks.length - 1)]);

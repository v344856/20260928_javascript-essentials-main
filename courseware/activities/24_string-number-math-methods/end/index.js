// Activity: Strings, Numbers and Math
// Complete each TODO. Run with:  npm start   (npm run solution for the answer)

// TODO Task 1: return a URL-friendly slug.
// trim the whitespace, lowercase it, then replaceAll spaces with hyphens.
function slugify(title) {
  return ""; // TODO
}

// TODO Task 2: return the uppercase initials of each word.
// split on spaces, take part[0] of each, uppercase, then join.
function initials(fullName) {
  return ""; // TODO
}

// TODO Task 3: mask an email as first-letter + "***" + "@domain".
// Find the "@" with indexOf, then slice around it.
function maskEmail(email) {
  return ""; // TODO
}

console.log("slug:", slugify("  My Profile Page  "));
console.log("initials:", initials("Ada Grace Lovelace"));
console.log("masked:", maskEmail("ada@example.com"));

// TODO Task 4: pull the leading number out of a label like "42 followers".
// Remember to pass the radix.
function parseAmount(label) {
  return 0; // TODO
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
// TODO Task 4 (continued): format n with the usd formatter above.
function formatMoney(n) {
  return ""; // TODO
}

console.log("amount:", parseAmount("42 followers"));
console.log("money:", formatMoney(1250.5));

// TODO Task 5: keep value inside [min, max] using Math.min and Math.max.
function clamp(value, min, max) {
  return 0; // TODO
}

console.log("clamp(120, 0, 100):", clamp(120, 0, 100));
console.log("clamp(-5, 0, 100):", clamp(-5, 0, 100));

// TODO Task 6: round n to the given number of decimal places.
// Multiply by 10 ** decimals, Math.round, then divide back.
function roundTo(n, decimals) {
  return 0; // TODO
}

// TODO Task 6 (continued): return a random integer from min to max inclusive.
function randomInt(min, max) {
  return 0; // TODO
}

console.log("roundTo(3.14159, 2):", roundTo(3.14159, 2));

// randomInt is random, so verify it stays in range instead of printing it.
const roll = randomInt(1, 6);
console.log("roll in range 1-6:", roll >= 1 && roll <= 6);

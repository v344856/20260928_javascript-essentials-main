// Activity: Strings, Numbers and Math (solution)
// The same built-in toolkits as the demo, applied to fresh profile data.

// Task 1: Return a URL-friendly slug: trim, lowercase, spaces -> hyphens.
function slugify(title) {
  return title.trim().toLowerCase().replaceAll(" ", "-");
}

// Task 2: Return the uppercase initials of each word in the name.
function initials(fullName) {
  return fullName
    .split(" ")
    .map((part) => part[0].toUpperCase())
    .join("");
}

// Task 3: Mask an email as first-letter + "***" + "@domain".
function maskEmail(email) {
  const at = email.indexOf("@");
  const first = email.slice(0, 1);
  const domain = email.slice(at);
  return `${first}***${domain}`;
}

console.log("slug:", slugify("  My Profile Page  "));
console.log("initials:", initials("Ada Grace Lovelace"));
console.log("masked:", maskEmail("ada@example.com"));

// Task 4: Pull the leading number out of a label, and format money.
function parseAmount(label) {
  return parseInt(label, 10);
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
function formatMoney(n) {
  return usd.format(n);
}

console.log("amount:", parseAmount("42 followers"));
console.log("money:", formatMoney(1250.5));

// Task 5: Keep a value inside a range using Math.min and Math.max.
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

console.log("clamp(120, 0, 100):", clamp(120, 0, 100));
console.log("clamp(-5, 0, 100):", clamp(-5, 0, 100));

// Task 6: Round to a given number of decimals, and roll a die.
function roundTo(n, decimals) {
  const factor = 10 ** decimals;
  return Math.round(n * factor) / factor;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log("roundTo(3.14159, 2):", roundTo(3.14159, 2));

// randomInt is random, so verify it stays in range instead of printing it.
const roll = randomInt(1, 6);
console.log("roll in range 1-6:", roll >= 1 && roll <= 6);

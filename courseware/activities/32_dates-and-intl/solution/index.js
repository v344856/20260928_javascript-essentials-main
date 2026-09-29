// Activity: Formatting Dates and Counting Days (solution)
// Same Date toolkit as the demo. We build dates from year/month/day
// components (month is 0-based) so results are deterministic.

// Task 1: Format a date as "Month D, YYYY" using Intl.DateTimeFormat.
const pretty = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
function formatLong(date) {
  return pretty.format(date);
}

// Task 2: Return the weekday name of a date (e.g. "Tuesday").
function weekday(date) {
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

// Task 3: Return the whole number of days between two dates.
function daysBetween(a, b) {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((b - a) / msPerDay);
}

// Build dates from components: new Date(year, monthIndex, day)
const launch = new Date(2026, 6, 7); // July 7, 2026
const start = new Date(2026, 0, 1); // January 1, 2026
const end = new Date(2026, 0, 15); // January 15, 2026

console.log("formatted:", formatLong(launch));
console.log("weekday:", weekday(launch));
console.log("days between:", daysBetween(start, end));

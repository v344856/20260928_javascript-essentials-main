// Activity: Formatting Dates and Counting Days
// Same Date toolkit as the demo. We build dates from year/month/day
// components (month is 0-based) so results are deterministic.

// Task 1: Format a date as "Month D, YYYY" using Intl.DateTimeFormat
// with year "numeric", month "long", day "numeric".
function formatLong(date) {
  // TODO Task 1: return the formatted date string
  return date.toString();
}

// Task 2: Return the weekday name of a date (e.g. "Tuesday").
// Use toLocaleDateString("en-US", { weekday: "long" }).
function weekday(date) {
  // TODO Task 2: return the weekday name
  return "";
}

// Task 3: Return the whole number of days between two dates.
// Subtract them (milliseconds), divide by ms-per-day, round.
function daysBetween(a, b) {
  // TODO Task 3: return the day count
  return 0;
}

// Build dates from components: new Date(year, monthIndex, day)
const launch = new Date(2026, 6, 7); // July 7, 2026
const start = new Date(2026, 0, 1); // January 1, 2026
const end = new Date(2026, 0, 15); // January 15, 2026

console.log("formatted:", formatLong(launch));
console.log("weekday:", weekday(launch));
console.log("days between:", daysBetween(start, end));

// ============================================
// Working with Dates
// ============================================

// The current moment
const now = new Date();
console.log("now:", now.toString()); // e.g. Tue Jul 07 2026 ...

// Build a specific date. NOTE: the month is ZERO-BASED:
// 0 = January, 11 = December. So 6 here means July.
const launch = new Date(2026, 6, 7, 9, 30); // Jul 7, 2026, 09:30 local
console.log("launch:", launch.toString());

// Parse from an ISO 8601 string (recommended, unambiguous format)
const iso = new Date("2026-01-15T00:00:00");
console.log("parsed ISO:", iso.toDateString()); // Thu Jan 15 2026

// --- Reading the parts of a date ---
console.log("getFullYear:", launch.getFullYear()); // 2026
console.log("getMonth (0-based):", launch.getMonth()); // 6
console.log("getDate (day of month):", launch.getDate()); // 7
console.log("getDay (0=Sun):", launch.getDay()); // 2 (Tuesday)
console.log("getHours:", launch.getHours()); // 9
console.log("getMinutes:", launch.getMinutes()); // 30

// --- Formatting for humans ---
console.log("toLocaleDateString:", launch.toLocaleDateString("en-US"));
// 7/7/2026

// Intl.DateTimeFormat gives fine-grained control over the output
const pretty = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
console.log("Intl formatted:", pretty.format(launch));
// Tuesday, July 7, 2026

// --- Date differences ---
// Dates convert to milliseconds since Jan 1 1970 (the "epoch"),
// so subtracting two dates gives a difference in milliseconds.
const start = new Date("2026-01-01");
const end = new Date("2026-12-31");
const msPerDay = 1000 * 60 * 60 * 24;
const daysBetween = Math.round((end - start) / msPerDay);
console.log("days in 2026 (Jan 1 to Dec 31):", daysBetween); // 364

// "Days until" a target date from a fixed reference day
const today = new Date("2026-07-07");
const newYear = new Date("2027-01-01");
const daysUntil = Math.ceil((newYear - today) / msPerDay);
console.log("days until 2027:", daysUntil); // 178

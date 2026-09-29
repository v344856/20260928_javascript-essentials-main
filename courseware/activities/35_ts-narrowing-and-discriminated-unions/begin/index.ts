// Activity: Narrowing and Discriminated Unions
// Complete each TODO. Run with `npm start` (or `npm run solution`).

// TODO Task 1 (typeof): complete show() so that for a string it returns
//   `text: <UPPERCASE>` and for a number it returns `num: <value.toFixed(2)>`.
function show(value: string | number): string {
  return ""; // replace me
}
console.log(show("hello"));
console.log(show(3.14159));

// TODO Task 2 (instanceof): complete explain() so that a Date returns
//   `date: <full year>` and anything else returns `other: <String(x)>`.
//   Note the parameter is `unknown` - prove the type before using it.
function explain(x: unknown): string {
  return ""; // replace me
}
console.log(explain(new Date("2026-01-15")));
console.log(explain("nope"));

// TODO Task 3 (truthiness): complete label() so a missing/empty name returns
//   "unnamed", otherwise the trimmed name.
function label(name?: string): string {
  return ""; // replace me
}
console.log(label());
console.log(label("  Ada "));

// TODO Task 4: declare `type AppEvent` as a union of three object types, each
//   carrying a literal `type` tag:
//     { type: "click"; x: number; y: number }
//     { type: "key"; key: string }
//     { type: "scroll"; delta: number }

// TODO Task 5: write render(e: AppEvent) with a switch (e.type) returning
//   `click at (<x>, <y>)`, `key <key>`, or `scroll <delta>`.

// TODO Task 6: add a `default` branch calling assertNever(e), and write
//   function assertNever(value: never): never that throws.

// const events: AppEvent[] = [
//   { type: "click", x: 10, y: 20 },
//   { type: "key", key: "Enter" },
//   { type: "scroll", delta: -5 },
// ];
//
// for (const e of events) console.log(render(e));

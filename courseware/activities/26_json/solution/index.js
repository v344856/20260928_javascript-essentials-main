// Activity: JSON.parse and JSON.stringify, Profile edition (solution)

const profile = {
  username: "jsmith",
  level: 7,
  premium: true,
  token: "abc123",
  tags: ["admin", "beta"],
};

// Task 1: pretty-print with the `space` argument (2-space indent).
console.log("=== Pretty ===");
console.log(JSON.stringify(profile, null, 2));

// Task 2: use a replacer to drop the secret `token` field.
console.log("\n=== Safe (token removed) ===");
const safe = JSON.stringify(
  profile,
  (key, value) => (key === "token" ? undefined : value),
  2
);
console.log(safe);

// Task 3: parse a JSON string, then round-trip the object through JSON.
console.log("\n=== Parse and round-trip ===");
const text = '{"username":"adoe","level":3}';
const parsed = JSON.parse(text);
console.log(`User ${parsed.username} is level ${parsed.level}`); // User adoe is level 3

const copy = JSON.parse(JSON.stringify(profile));
console.log("username survives round-trip:", copy.username === profile.username); // true

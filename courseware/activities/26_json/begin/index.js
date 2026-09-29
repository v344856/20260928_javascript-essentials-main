// Activity: JSON.parse and JSON.stringify, Profile edition
// Complete the TODOs, then run `npm start` from the activity folder.

const profile = {
  username: "jsmith",
  level: 7,
  premium: true,
  token: "abc123",
  tags: ["admin", "beta"],
};

// TODO Task 1: pretty-print `profile` with JSON.stringify using a 2-space indent
// (the `space` argument). Log the result under a "=== Pretty ===" heading.

// TODO Task 2: stringify `profile` again, but pass a replacer function that
// returns undefined for the "token" key so the secret field is dropped.
// Use a 2-space indent and log it under a "=== Safe (token removed) ===" heading.

// TODO Task 3: parse the JSON string below, then log
// `User <username> is level <level>`. Then round-trip `profile` through
// JSON.stringify + JSON.parse and confirm the username survives.
// const text = '{"username":"adoe","level":3}';
// Expected: User adoe is level 3
//           username survives round-trip: true

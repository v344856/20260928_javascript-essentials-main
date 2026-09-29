"use strict";

// Activity: The Call Site Decides `this`
// Complete each TODO. Run with:  npm start   (npm run solution for the answer)
// Leave "use strict" above - it is what makes a bare call's `this` undefined.

// TODO Task 1: write reportRole() returning this.role when it has an owner,
// and the string "(no owner)" when it does not.

// TODO Task 2: attach reportRole to both objects below with shorthand
// property syntax, call it as a method on each, and log both results.
// Then log captain.reportRole === cook.reportRole.
const captain = { role: "captain" };
const cook = { role: "cook" };

// TODO Task 3: assign captain.reportRole to a plain variable `loose`
// and call it. `this` is undefined, so it reports "(no owner)".

// TODO Task 4: log reportRole.call(cook), then build a bound copy with
// reportRole.bind(captain) and log the result of calling it.

// TODO Task 5: give ship a roster(crew) method returning crew.map(...)
// producing "<ship name>: <role>" for each member. Use an ARROW function
// inside map so it sees roster's `this`.
const ship = {
  name: "Endeavor",
};

// console.log(ship.roster([captain, cook]));

// runCallback invokes fn with no receiver - a normal method would lose `this`.
function runCallback(fn) {
  fn();
}

class Watch {
  constructor() {
    this.count = 0;
  }

  // TODO Task 6: add a `ring` class field holding an ARROW function that
  // increments this.count and logs `bells rung <count> time(s)`.
}

const watch = new Watch();
// runCallback(watch.ring);
// runCallback(watch.ring);

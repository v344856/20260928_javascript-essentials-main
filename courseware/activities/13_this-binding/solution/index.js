"use strict";

// Activity: The Call Site Decides `this` (solution)
// Same concepts as the demo, applied to a ship's crew.

// Task 1: a regular function that reports the role of whatever object
// it was called on. If there is no owner, return "(no owner)".
function reportRole() {
  return this ? this.role : "(no owner)";
}

// Task 2: attach the same function to two different objects and call it
// as a method on each. The object left of the dot becomes `this`.
const captain = { role: "captain", reportRole };
const cook = { role: "cook", reportRole };

console.log(captain.reportRole());
console.log(cook.reportRole());
console.log(captain.reportRole === cook.reportRole);

// Task 3: pull the function off the object and call it bare. In strict
// mode a plain call has no owner, so `this` is undefined.
const loose = captain.reportRole;
console.log(loose());

// Task 4: set `this` explicitly with call and bind.
console.log(reportRole.call(cook));
const boundToCaptain = reportRole.bind(captain);
console.log(boundToCaptain());

// Task 5: an arrow function has no `this` of its own, so a nested arrow
// sees the enclosing method's.
const ship = {
  name: "Endeavor",

  roster(crew) {
    return crew.map((member) => `${this.name}: ${member.role}`);
  },
};

console.log(ship.roster([captain, cook]));

// Task 6: a class arrow-function field keeps `this` when detached.
function runCallback(fn) {
  fn();
}

class Watch {
  constructor() {
    this.count = 0;
  }

  // An arrow field captures `this` at construction, so it survives being
  // passed as a bare callback.
  ring = () => {
    this.count++;
    console.log(`bells rung ${this.count} time(s)`);
  };
}

const watch = new Watch();
runCallback(watch.ring);
runCallback(watch.ring);

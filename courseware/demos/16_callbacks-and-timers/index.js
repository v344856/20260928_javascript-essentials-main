// ============================================
// Part 1: A callback is just a function passed as an argument
// ============================================

// mathOp does not know or care WHICH operation it runs. It receives one.
function mathOp(operationFunction, a, b) {
  return operationFunction(a, b);
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

// Pass the function itself: no parentheses. `add` is a reference;
// `add(...)` would be its result.
console.log(mathOp(add, 5, 3)); // 8
console.log(mathOp(subtract, 5, 3)); // 2

// An inline arrow is the same thing, written at the call site.
console.log(mathOp((x, y) => x * y, 5, 3)); // 15

// A function that takes (or returns) a function is a "higher-order" function.
// map, filter, and forEach are all higher-order functions you already use.
console.log([1, 2, 3].map(square)); // [ 1, 4, 9 ]

function square(x) {
  return x * x;
}

// ============================================
// Part 2: setTimeout: a callback the event loop runs LATER
// ============================================

setTimeout(() => {
  console.log("(2) fires after 300ms");
}, 300);

setTimeout(() => {
  console.log("(1) fires after 100ms, shorter delay, so it goes first");
}, 100);

// This runs FIRST, even though it is written last. Timer callbacks are
// queued; the current call stack has to empty before the event loop can
// pick any of them up. A delay is a MINIMUM wait, not a guarantee.
console.log("(0) synchronous: runs before any timer callback");

// ============================================
// Part 3: setInterval / clearInterval, and setTimeout chaining
// ============================================

// setInterval runs a callback over and over on a fixed delay.
// clearInterval stops it: without that, the program would never exit.
let remaining = 3;
const timer = setInterval(() => {
  console.log(`${remaining}...`);
  remaining -= 1;

  if (remaining < 0) {
    clearInterval(timer); // stop the repeating timer
    console.log("Liftoff!");
    startChain();
  }
}, 200);

// "Chaining" schedules the next step from inside the previous callback:
// useful when each step must only start after the last one finishes.
// Notice the nesting: this is the shape promises were invented to flatten.
function startChain() {
  console.log("--- setTimeout chain ---");
  const steps = ["Boil water", "Add coffee", "Pour and serve"];

  function runStep(i) {
    if (i >= steps.length) {
      console.log("Done!");
      return;
    }
    setTimeout(() => {
      console.log(`Step ${i + 1}: ${steps[i]}`);
      runStep(i + 1); // schedule the next step from inside this one
    }, 200);
  }

  runStep(0);
}

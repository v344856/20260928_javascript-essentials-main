// Activity: Callbacks and Timers (solution)

// Task 1: higher-order function. Call `action(i)` for i = 1..n and
// collect each return value into an array.
function times(n, action) {
  const results = [];
  for (let i = 1; i <= n; i++) {
    results.push(action(i));
  }
  return results;
}

// Task 2: named callbacks to pass in.
function square(x) {
  return x * x;
}

function label(x) {
  return "hi #" + x;
}

console.log(times(3, square));
console.log(times(3, label));

// Task 3: pass an inline arrow function as the callback.
console.log(times(3, (i) => i * 10));

// Task 4: a synchronous line prints before any timer callback, because the
// call stack must empty before the event loop runs queued callbacks.
setTimeout(() => console.log("queued, runs last"), 0);
console.log("synchronous, runs first");

// Task 5: a repeating timer that counts up and stops itself after `limit`
// ticks. Without clearInterval the program would never exit.
let count = 1;
const limit = 3;
const timer = setInterval(() => {
  console.log(`Tick ${count}`);
  if (count === limit) {
    clearInterval(timer);
    // Task 6: schedule a one-time message AFTER the last tick.
    setTimeout(() => console.log("All done!"), 200);
  }
  count += 1;
}, 200);

// Activity: Closures (solution)

// Task 1: a factory that remembers its `factor` argument.
function makeMultiplier(factor) {
  return (n) => n * factor;
}
const double = makeMultiplier(2);
const triple = makeMultiplier(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15  (independent captured factor)

// Task 2: private state: `count` is reachable only through the returned methods.
function createCounter() {
  let count = 0;
  return {
    increment() {
      count += 1;
      return count;
    },
    reset() {
      count = 0;
      return count;
    },
  };
}
const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.reset()); // 0
console.log(counter.count); // undefined: count is private

// Task 3: `once` uses a closure over a flag so `fn` runs only the first time.
function once(fn) {
  let called = false;
  let result;
  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}
const setup = once(() => {
  console.log("Setting up...");
  return "ready";
});
console.log(setup()); // Setting up... then ready
console.log(setup()); // ready (setup does not run again)

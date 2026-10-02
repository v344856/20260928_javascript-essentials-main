// Activity: Closures
// Complete the TODOs, then run `npm start` from the activity folder.

// TODO Task 1: write `makeMultiplier(factor)` that returns a function which
// multiplies its argument by the captured `factor`.
// Create double = makeMultiplier(2) and triple = makeMultiplier(3).
// Log double(5) and triple(5).
// Expected: 10
//           15

console.log("111111111111111111")

function makeMultiplier(factor) {
    return (n) => n * factor 
}
const double = makeMultiplier(2)    //outer func
const triple = makeMultiplier(3)   
console.log(double(5))  // inner function
console.log(triple(5))

// TODO Task 2: write `createCounter()` that keeps a private `count` and returns
// an object with increment() (adds 1, returns count) and reset() (sets count to
// 0, returns count). Show that `count` itself is not reachable from outside.
// Log counter.increment(), counter.increment(), counter.reset(), counter.count.
// Expected: 1
//           2
//           0
//           undefined

console.log("222222222222222222222")
function createCounter() {
    let count = 0
    return { increment (){count = count + 1; return count},
             reset(){count = 0; return count}
            }
}

const counter = createCounter();
console.log(counter.increment())
console.log(counter.increment())
console.log(counter.reset())
console.log(counter.count)


//console.log(count) error, cannot reference

// TODO Task 3: write `once(fn)` that returns a function which runs `fn` only the
// first time it is called (and returns fn's result every time afterward).
// Wrap a function that logs "Setting up..." and returns "ready", then call the
// wrapper twice.
// Expected: Setting up...
//           ready
//           ready

console.log("3333333333333333333333")

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
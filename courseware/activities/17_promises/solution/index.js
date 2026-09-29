// Activity: Promises, Launch Countdown (solution)
// The delays are fixed so the output order is predictable.

// Task 1: a promise factory. resolve with a message after `ms`, or reject
// when shouldFail is true.
function step(name, ms, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`${name} failed`));
      } else {
        resolve(name);
      }
    }, ms);
  });
}

console.log("Preparing launch...");

// Task 2/3: chain the steps. Returning a promise from inside .then() makes
// the next .then() wait for it - the steps stay in order, flat.
step("3...", 100)
  .then((result) => {
    console.log(result);
    return step("2...", 100);
  })
  .then((result) => {
    console.log(result);
    return step("1...", 100);
  })
  .then((result) => {
    console.log(result);
    console.log("Liftoff!");
    return runAbort();
  })
  .catch((err) => {
    console.log("countdown failed:", err.message);
  });

// Task 4/5: a rejected step skips every .then() and lands in .catch();
// .finally() runs either way.
function runAbort() {
  console.log("--- abort sequence ---");

  return step("ignition", 50, true)
    .then((result) => {
      console.log("never runs:", result);
    })
    .catch((err) => {
      console.log("caught:", err.message);
    })
    .finally(() => {
      console.log("finally: systems safed");
    });
}

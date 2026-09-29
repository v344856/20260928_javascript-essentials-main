// ============================================
// Part 1: The problem: the callback pyramid
// ============================================

// Forcing three async steps to run in order with callbacks means nesting
// each one inside the last. Three steps is already uncomfortable; ten is
// unreadable. This shape is why promises exist.
setTimeout(() => {
  console.log("nested 1");

  setTimeout(() => {
    console.log("nested 2");

    setTimeout(() => {
      console.log("nested 3");
      startPromises(); // move on to the next section
    }, 100);
  }, 100);
}, 100);

// ============================================
// Part 2: A promise wraps async work in a value you can pass around
// ============================================

// `new Promise` hands you resolve and reject. Call resolve on success,
// reject on failure. A promise is settled exactly once; later calls are
// ignored.
function createPromise(name, ms, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`failed: ${name}`));
      } else {
        resolve(`done: ${name}`);
      }
    }, ms);
  });
}

function startPromises() {
  console.log("--- promise chain ---");

  // ==========================================
  // Part 3: .then() chaining flattens the pyramid
  // ==========================================

  // Returning a promise from inside .then() makes the NEXT .then() wait for
  // it. The steps stay in order but the nesting is gone; the chain is flat.
  createPromise("p1", 100)
    .then((result) => {
      console.log(result);
      return createPromise("p2", 100);
    })
    .then((result) => {
      console.log(result);
      return createPromise("p3", 100);
    })
    .then((result) => {
      console.log(result);
      startErrors();
    })
    // One .catch at the end handles a rejection from ANY step above it:
    // there is no equivalent with nested callbacks.
    .catch((err) => {
      console.log("chain failed:", err.message);
    });
}

// ============================================
// Part 4: Rejection, .catch, and .finally
// ============================================

function startErrors() {
  console.log("--- rejection ---");

  createPromise("p4", 50, true) // this one rejects
    .then((result) => {
      console.log("never runs:", result); // skipped
    })
    .catch((err) => {
      // .catch receives whatever was passed to reject()
      console.log("caught:", err.message);
    })
    .finally(() => {
      // .finally runs either way: the place for cleanup
      console.log("finally: cleanup runs whether it worked or not");
    });

  // Two shortcuts for a promise that is already settled.
  Promise.resolve("instant").then((v) => console.log(v));
  Promise.reject(new Error("instant failure")).catch((e) => console.log(e.message));
}

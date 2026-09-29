// Activity: async/await (solution)
// Fixed delays, so the output order is deterministic.

// Helper: resolve with `value` after `ms`, or reject when shouldFail is true.
function resolveAfter(value, ms, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`${value} unavailable`));
      } else {
        resolve(value);
      }
    }, ms);
  });
}

// Task 1: await three steps one after another. Each line reads top to
// bottom like synchronous code.
async function loadSteps() {
  const first = await resolveAfter("step 1", 50);
  console.log(first);
  const second = await resolveAfter("step 2", 50);
  console.log(second);
  const third = await resolveAfter("step 3", 50);
  console.log(third);
}

// Task 2: a rejected promise throws at the await, so try/catch handles it.
async function loadOptional() {
  try {
    const extra = await resolveAfter("bonus", 20, true);
    console.log("never runs:", extra);
  } catch (err) {
    console.log("caught:", err.message);
  } finally {
    console.log("finally: done trying");
  }
}

// Task 3: an async function always returns a promise.
async function getTotal() {
  return 60;
}

// Task 4: compose them with await so everything runs in order, then exit.
async function main() {
  await loadSteps();
  await loadOptional();

  console.log("without await:", getTotal() instanceof Promise);
  console.log("with await:   ", await getTotal());

  console.log("finished");
}

main();

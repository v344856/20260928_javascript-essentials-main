// Activity: async/await
// Complete each TODO. Run with:  npm start   (npm run solution for the answer)
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

// TODO Task 1: make loadSteps an async function that awaits "step 1",
// "step 2", "step 3" (50ms each) one after another, logging each result.
function loadSteps() {}

// TODO Task 2: in loadOptional, await resolveAfter("bonus", 20, true) -
// which rejects. Wrap it in try/catch, log "caught:" with err.message,
// and add a finally logging "finally: done trying".
function loadOptional() {}

// TODO Task 3: write `async function getTotal()` that returns 60.

// TODO Task 4: make main await loadSteps(), then loadOptional(), then log
// getTotal() instanceof Promise and await getTotal(), then log "finished".
async function main() {}

main();

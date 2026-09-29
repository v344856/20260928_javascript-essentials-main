// Activity: Promises, Launch Countdown
// Complete each TODO. Run with:  npm start   (npm run solution for the answer)
// The delays are fixed so the output order is predictable.

// TODO Task 1: write step(name, ms, shouldFail = false) returning a
// new Promise. After `ms` it rejects with new Error(name + " failed") when
// shouldFail is true, and resolves with `name` otherwise.

console.log("Preparing launch...");

// TODO Task 2: call step("3...", 100) and chain .then() handlers that log
// each result and RETURN the next step(...). The return is what makes the
// next .then() wait - without it they all fire at once.

// TODO Task 3: in the last .then(), log "Liftoff!" and return runAbort().

// TODO Task 4: in runAbort below, call step("ignition", 50, true) and chain
// a .then() that logs something. It never runs.

// TODO Task 5: add a .catch() logging "caught:" and err.message, then a
// .finally() logging "finally: systems safed".
function runAbort() {
  console.log("--- abort sequence ---");
  // TODO: return the chain here
}

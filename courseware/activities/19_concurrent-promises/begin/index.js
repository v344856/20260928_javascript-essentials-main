// Activity: Load a Dashboard Concurrently

// Same concept as the demo (running independent async tasks concurrently
// with Promise.all instead of one at a time), applied to loading a
// dashboard's widgets. There are no repeating timers, so the script
// exits on its own.

// loadWidget(name, ms) resolves with a small widget object after `ms`.
function loadWidget(name, ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name, loadedInMs: ms }), ms);
  });
}

async function main() {
  console.log("Loading dashboard...");

  // TODO Task 1: start all three widgets AT ONCE and wait for the group.
  //   Use Promise.all with loadWidget("chart", 300), loadWidget("feed", 200),
  //   and loadWidget("profile", 250). Destructure the results into
  //   chart, feed, profile.

  // TODO Task 2: log "Loaded: <chart>, <feed>, <profile>" using each widget's
  //   name. Notice the results come back in the order you listed them.

  // TODO Task 3: use Promise.allSettled on loadWidget("stats", 100) and a
  //   Promise.reject(new Error("ads failed")). Count how many fulfilled and
  //   log "Extras: <n> of <total> loaded".
}

main();

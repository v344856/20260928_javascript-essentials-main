// Activity: Load a Dashboard Concurrently (solution)

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

  // Task 1: start all three at once; Promise.all resolves once they've ALL
  // finished, with the results in the order they were listed.
  const [chart, feed, profile] = await Promise.all([
    loadWidget("chart", 300),
    loadWidget("feed", 200),
    loadWidget("profile", 250),
  ]);

  // Task 2: listed order, not finish order (feed finished first, but chart is first).
  console.log(`Loaded: ${chart.name}, ${feed.name}, ${profile.name}`);

  // Task 3: allSettled waits for every promise and never short-circuits, so the
  // rejected "ads" promise doesn't stop us from seeing the fulfilled one.
  const results = await Promise.allSettled([
    loadWidget("stats", 100),
    Promise.reject(new Error("ads failed")),
  ]);
  const fulfilled = results.filter((r) => r.status === "fulfilled").length;
  console.log(`Extras: ${fulfilled} of ${results.length} loaded`);
}

main();

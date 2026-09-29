// Running independent async tasks CONCURRENTLY with Promise.all, and how that
// compares to awaiting them one at a time. Each "step" resolves after a delay.

function fetchStep(label, ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`${label} (after ${ms}ms)`), ms);
  });
}

// Sequential: await one, then the next. Total time = the SUM of the delays.
async function runSequential() {
  const start = Date.now();
  const a = await fetchStep("A", 300);
  const b = await fetchStep("B", 300);
  const c = await fetchStep("C", 300);
  console.log("Sequential:", [a, b, c]);
  console.log(`  took ~${Date.now() - start}ms (the sum of all three)`);
}

// Concurrent: start all three, then wait for the group. Total time = the SLOWEST.
async function runConcurrent() {
  const start = Date.now();
  const [a, b, c] = await Promise.all([
    fetchStep("A", 300),
    fetchStep("B", 300),
    fetchStep("C", 300),
  ]);
  console.log("Concurrent:", [a, b, c]); // results stay in listed order
  console.log(`  took ~${Date.now() - start}ms (just the slowest one)`);
}

async function main() {
  await runSequential();
  await runConcurrent();

  // allSettled never short-circuits: we get an outcome for every promise,
  // even though one of them rejects.
  const settled = await Promise.allSettled([
    fetchStep("ok", 100),
    Promise.reject(new Error("boom")),
  ]);
  console.log("allSettled statuses:", settled.map((r) => r.status));

  // race settles as soon as the FIRST promise settles; here, the fast one.
  const winner = await Promise.race([
    fetchStep("slow", 200),
    fetchStep("fast", 50),
  ]);
  console.log("race winner:", winner);
}

main();

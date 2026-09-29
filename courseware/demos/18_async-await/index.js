// ============================================
// async / await: the same promises, read top to bottom
// ============================================

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

// The .then() chain from the previous demo, for comparison:
//
//   createPromise("p1", 100)
//     .then((r) => { console.log(r); return createPromise("p2", 100); })
//     .then((r) => { console.log(r); return createPromise("p3", 100); })
//     .then((r) => console.log(r));
//
// `await` expresses the same thing without the handlers. There is no new
// machinery here: an async function still works on promises underneath.
async function doSomething() {
  const result1 = await createPromise("p1", 100);
  console.log(result1);
  const result2 = await createPromise("p2", 100);
  console.log(result2);
  const result3 = await createPromise("p3", 100);
  console.log(result3);
}

// ============================================
// Errors: try/catch replaces .catch()
// ============================================

async function handleFailure() {
  try {
    const value = await createPromise("p4", 50, true); // rejects
    console.log("never runs:", value);
  } catch (err) {
    // A rejected promise makes `await` THROW, so ordinary try/catch works.
    console.log("caught:", err.message);
  } finally {
    console.log("finally: cleanup runs either way");
  }
}

// ============================================
// An async function always returns a promise
// ============================================

async function getValue() {
  return 42; // NOT a number to the caller: a promise that resolves to 42
}

async function main() {
  await doSomething();
  await handleFailure();

  console.log(getValue()); // Promise { 42 }: the promise itself
  console.log(await getValue()); // 42: the resolved value

  // `await` only works inside an async function... except at the top level
  // of an ES module, where it is allowed directly.

  // A common bug: forgetting await. This logs a pending promise, not a value.
  const forgotten = createPromise("p5", 10);
  console.log("forgot await:", forgotten); // Promise { <pending> }
  console.log("with await:  ", await forgotten);
}

main();

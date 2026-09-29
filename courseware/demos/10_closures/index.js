// ============================================
// Closures: functions that remember their scope
// ============================================

// A closure is a function that "remembers" variables from the scope
// where it was created, even after that scope has returned.

// 1. A counter factory: each call gets its own private `count`.
function makeCounter() {
  let count = 0; // private: only the returned function can see it
  return function () {
    count += 1;
    return count;
  };
}

const counterA = makeCounter();
const counterB = makeCounter();
console.log(counterA()); // 1
console.log(counterA()); // 2
console.log(counterB()); // 1  (independent private state)
console.log(counterA()); // 3

// 2. Private state: expose only what you choose via an object of functions.
function makeAccount(balance) {
  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) return "Insufficient funds";
      balance -= amount;
      return balance;
    },
  };
}

const account = makeAccount(100);
console.log(account.deposit(50)); // 150
console.log(account.withdraw(30)); // 120
console.log(account.withdraw(500)); // Insufficient funds
console.log(account.balance); // undefined: balance is private

// 3. The classic `var`-in-loop pitfall, and two fixes.
console.log("--- var pitfall ---");
const withVar = [];
for (var i = 0; i < 3; i++) {
  // Every callback closes over the SAME `i`, which ends at 3.
  withVar.push(() => i);
}
console.log(withVar.map((fn) => fn())); // [ 3, 3, 3 ] : oops

console.log("--- fixed with let ---");
const withLet = [];
for (let j = 0; j < 3; j++) {
  // `let` creates a fresh binding each iteration.
  withLet.push(() => j);
}
console.log(withLet.map((fn) => fn())); // [ 0, 1, 2 ]

console.log("--- fixed with an IIFE ---");
const withIife = [];
for (var k = 0; k < 3; k++) {
  // An Immediately Invoked Function Expression captures k's value now.
  withIife.push(
    (function (captured) {
      return () => captured;
    })(k)
  );
}
console.log(withIife.map((fn) => fn())); // [ 0, 1, 2 ]

// 4. Memoize: a closure caches results so expensive work runs once per input.
function memoize(fn) {
  const cache = new Map();
  return function (n) {
    if (cache.has(n)) {
      console.log(`(cache hit for ${n})`);
      return cache.get(n);
    }
    const result = fn(n);
    cache.set(n, result);
    return result;
  };
}

const slowSquare = (n) => {
  console.log(`(computing ${n} * ${n})`);
  return n * n;
};
const fastSquare = memoize(slowSquare);

console.log(fastSquare(4)); // (computing 4 * 4) then 16
console.log(fastSquare(4)); // (cache hit for 4) then 16
console.log(fastSquare(5)); // (computing 5 * 5) then 25

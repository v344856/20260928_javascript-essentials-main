// Activity: Classes and Encapsulation
// Complete each TODO. Run with:  npm start   (npm run solution for the answer)

// TODO Task 1: define a Book class. The constructor takes title, author, and
// pages and assigns them to `this`. Add a summary() method that logs
// "<title> by <author>, <pages> pages."

// TODO Task 2: create book1 (Dune / Frank Herbert / 412) and book2
// (1984 / George Orwell / 328). Log book1.title, book1.pages, then call
// book1.summary(). Log book2.author, then call book2.summary().

// TODO Task 3: log book1 instanceof Book, then log
// book1.summary === book2.summary. Both are true.

// TODO Task 4: define a BankAccount class with a #balance private field set
// by the constructor, and a `get balance()` accessor that returns it.

// TODO Task 5: add deposit(amount) that throws
// new Error("Deposit must be a positive number") unless amount is a number
// greater than zero, and otherwise adds it to the balance.

// TODO Task 6: add `get balanceFormatted()` returning the balance as "$125.00".

// Once BankAccount exists, uncomment the block below - it is already written.
//
// const account = new BankAccount(100);
//
// try {
//   account.deposit(-50); // rejected
// } catch (error) {
//   console.log("Rejected:", error.message);
// }
//
// account.deposit(25);
//
// console.log(account.balance);
// console.log(account.balanceFormatted);
// console.log(Object.keys(account));

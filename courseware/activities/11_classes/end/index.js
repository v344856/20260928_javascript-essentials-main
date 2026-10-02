// Activity: Classes and Encapsulation
// Complete each TODO. Run with:  npm start   (npm run solution for the answer)

// TODO Task 1: define a Book class. The constructor takes title, author, and
// pages and assigns them to `this`. Add a summary() method that logs
// "<title> by <author>, <pages> pages."

console.log( "111111111111111111")
class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }

  summary() {
    console.log(`${this.title} by ${this.author}, ${this.pages} pages.`);
  }
}


// TODO Task 2: create book1 (Dune / Frank Herbert / 412) and book2
// (1984 / George Orwell / 328). Log book1.title, book1.pages, then call
// book1.summary(). Log book2.author, then call book2.summary().

console.log( "222222222222222222")
const book1 = new Book("Dune", "Frank Herbert", 412);
console.log(book1.title);
console.log(book1.author);
book1.summary();

const book2 = new Book("1984", "George Orwell", 328);
book2.summary();




// TODO Task 3: log book1 instanceof Book, then log
// book1.summary === book2.summary. Both are true.
console.log( "333333333333333333")
console.log( book1 instanceof Book)
console.log(book1.summary === book2.summary)

// TODO Task 4: define a BankAccount class with a #balance private field set
// by the constructor, and a `get balance()` accessor that returns it.
console.log("444444444444444444444444")

class BankAccount {
    #balance;
    constructor(StatementBalance) {
           this.#balance = StatementBalance}

    get balance () {
        return this.#balance
    }



// TODO Task 5: add deposit(amount) that throws
// new Error("Deposit must be a positive number") unless amount is a number
// greater than zero, and otherwise adds it to the balance.

   deposit(amount) {
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Deposit must be a positive number") ;
    }
    this.#balance += amount;
  }
}


// TODO Task 6: add `get balanceFormatted()` returning the balance as "$125.00".
// Once BankAccount exists, uncomment the block below - it is already written.
//
const account = new BankAccount(100);

try {
  account.deposit(-50); // rejected
} catch (error) {
  console.log("Rejected:", error.message);
}

account.deposit(25);

console.log(account.balance);
console.log(account.balanceFormatted);
console.log(Object.keys(account));



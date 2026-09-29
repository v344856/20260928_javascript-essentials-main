// Activity: Classes and Encapsulation (solution)

// Task 1: define a Book class with a constructor and a summary() method.
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

// Task 2: create two instances and use them.
const book1 = new Book("Dune", "Frank Herbert", 412);
console.log(book1.title);
console.log(book1.pages);
book1.summary();

const book2 = new Book("1984", "George Orwell", 328);
console.log(book2.author);
book2.summary();

// Task 3: confirm the type and that the method is shared.
console.log(book1 instanceof Book);
console.log(book1.summary === book2.summary);

// Task 4: a private field plus a getter.
class BankAccount {
  #balance;

  constructor(startingBalance) {
    this.#balance = startingBalance;
  }

  get balance() {
    return this.#balance;
  }

  // Task 5: deposit validates its input and throws on invalid amounts.
  deposit(amount) {
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Deposit must be a positive number");
    }
    this.#balance += amount;
  }

  // Task 6: computed getter derived from the private field.
  get balanceFormatted() {
    return "$" + this.#balance.toFixed(2);
  }
}

const account = new BankAccount(100);

// The deposit validates input: a negative amount throws. We catch it so the
// activity can continue.
try {
  account.deposit(-50); // rejected
} catch (error) {
  console.log("Rejected:", error.message);
}

account.deposit(25);

console.log(account.balance);
console.log(account.balanceFormatted);
console.log(Object.keys(account));

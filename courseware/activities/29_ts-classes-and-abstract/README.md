# Activity: Payroll with an Abstract Base Class

Same concept as the demo (abstract classes), applied to a fresh scenario: employee payroll instead of shapes. You will build an abstract `Employee` base with a shared method and an abstract one, then two subclasses that pay differently.

**Estimated time:** 10-15 minutes

## Setup

Your working files are in `end/`. Open `end/index.ts` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: Build the abstract base

Make `Employee` an `abstract class` that `implements Payable`. Give it a `protected readonly name`, an abstract `monthlyPay(): number`, and a concrete `summary()` that returns `<name> earns $<pay>/month` (use `toFixed(2)`).

### Task 2: Add the salaried subclass

`SalariedEmployee extends Employee`, takes `(name, annualSalary)` (use a `private` parameter property), and returns `annualSalary / 12` from `monthlyPay()`.

### Task 3: Add the hourly subclass

`HourlyEmployee extends Employee`, takes `(name, hourlyRate, hoursPerMonth)`, and returns `hourlyRate * hoursPerMonth` from `monthlyPay()`.

**Expected output (all three tasks together):**
```
Ada earns $8000.00/month
Ben earns $4000.00/month
```

## What You'll Learn

- Declaring an `abstract class` you cannot instantiate, with abstract members subclasses must implement
- Fulfilling an interface contract with `implements`
- Access modifiers (`public`, `protected`, `private`) and `readonly` fields
- `private` parameter properties that declare and assign in the constructor signature
- Polymorphism, meaning treating subclasses uniformly through the shared base type

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Add a `protected` helper on the abstract base that subclasses use but outside code cannot call, and confirm the compiler blocks the outside call while allowing the subclass one, which is the whole difference between `protected` and `private`. Then add a **static factory** on the base that builds the right subclass from a plain config object, so callers never name a concrete class at all.

Sample output:

```
Ada earns $5000.00/month
Ben earns $4000.00/month
built from config: Contractor
```

## Related reading

- [Classes and Abstract Classes](../../docs/Module-12-TypeScript/04-abstract-classes.md)
- Diagram: [Class Anatomy](../../diagrams/png/class-anatomy.png)
- Diagram: [The Prototype Chain](../../diagrams/png/prototype-chain.png)

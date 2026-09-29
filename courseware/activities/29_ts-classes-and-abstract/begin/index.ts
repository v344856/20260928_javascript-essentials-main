// Activity: Abstract Classes
// Theme: employee payroll. Complete each TODO. Run with: npx tsx index.ts

// --- An interface as a contract ---
interface Payable {
  monthlyPay(): number;
}

// --- Task 1: an abstract base class ---
// TODO Task 1: make Employee an `abstract class` that `implements Payable`.
//   - give it a `protected readonly name: string` set in the constructor
//   - declare an abstract method `monthlyPay(): number` (no body)
//   - add a concrete method summary(): string that returns
//       `${this.name} earns $${this.monthlyPay().toFixed(2)}/month`
class Employee {
  // ...
}

// --- Task 2: a salaried subclass ---
// TODO Task 2: extend Employee. Take (name, annualSalary) in the constructor
// (use a `private annualSalary: number` parameter property) and implement
// monthlyPay() as annualSalary / 12.
class SalariedEmployee {
  // ...
}

// --- Task 3: an hourly subclass ---
// TODO Task 3: extend Employee. Take (name, hourlyRate, hoursPerMonth) and
// implement monthlyPay() as hourlyRate * hoursPerMonth.
class HourlyEmployee {
  // ...
}

// --- Using them polymorphically ---
const staff: Employee[] = [
  new SalariedEmployee("Ada", 96000),
  new HourlyEmployee("Ben", 25, 160),
];

for (const person of staff) {
  console.log(person.summary());
}

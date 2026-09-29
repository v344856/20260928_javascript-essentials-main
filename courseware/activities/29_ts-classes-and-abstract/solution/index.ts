// Activity: Abstract Classes (solution)
// Theme: employee payroll. Run with: npx tsx index.ts

// --- An interface as a contract ---
interface Payable {
  monthlyPay(): number;
}

// --- Task 1: an abstract base class ---
// Employee cannot be instantiated directly. It stores a shared, protected name,
// declares an abstract monthlyPay(), and provides a concrete summary().
abstract class Employee implements Payable {
  protected readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract monthlyPay(): number;

  summary(): string {
    return `${this.name} earns $${this.monthlyPay().toFixed(2)}/month`;
  }
}

// --- Task 2: a salaried subclass ---
class SalariedEmployee extends Employee {
  // A private parameter property declares and assigns annualSalary in one step.
  constructor(name: string, private annualSalary: number) {
    super(name);
  }

  monthlyPay(): number {
    return this.annualSalary / 12;
  }
}

// --- Task 3: an hourly subclass ---
class HourlyEmployee extends Employee {
  constructor(
    name: string,
    private hourlyRate: number,
    private hoursPerMonth: number,
  ) {
    super(name);
  }

  monthlyPay(): number {
    return this.hourlyRate * this.hoursPerMonth;
  }
}

// --- Using them polymorphically ---
const staff: Employee[] = [
  new SalariedEmployee("Ada", 96000),
  new HourlyEmployee("Ben", 25, 160),
];

for (const person of staff) {
  console.log(person.summary());
}
// Ada earns $8000.00/month
// Ben earns $4000.00/month

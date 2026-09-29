// Abstract classes, access modifiers, and implementing an interface
// Run with: npx tsx index.ts

// --- An interface as a contract ---------------------------------------------
// A class can promise to implement an interface with `implements`.
interface Describable {
  describe(): string;
}

// --- An abstract class ------------------------------------------------------
// An abstract class is a base class you cannot instantiate directly. It can
// provide shared code AND declare abstract members that subclasses must fill in.
abstract class Shape implements Describable {
  // Access modifiers control who can see a member:
  //   public   : everyone (the default)
  //   protected: this class and its subclasses
  //   private  : this class only
  protected readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  // An abstract method has no body: every concrete subclass must implement it.
  abstract area(): number;

  // A concrete method shared by all shapes. It can call the abstract area().
  describe(): string {
    return `${this.name} with area ${this.area().toFixed(2)}`;
  }
}

// const s = new Shape("thing"); // compile error: cannot instantiate abstract class

// --- Concrete subclasses ----------------------------------------------------
class Circle extends Shape {
  // `private`: only Circle can read this field.
  private radius: number;

  constructor(radius: number) {
    super("Circle"); // call the base constructor
    this.radius = radius;
  }

  // Implement the abstract method.
  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    // A `private` parameter property declares and assigns the field in one step.
    super("Rectangle");
  }

  area(): number {
    return this.width * this.height;
  }
}

// --- Using them polymorphically ---------------------------------------------
// Because both extend Shape, we can treat them uniformly as Describable.
const shapes: Describable[] = [new Circle(2), new Rectangle(3, 4)];

for (const shape of shapes) {
  console.log(shape.describe());
}
// Circle with area 12.57
// Rectangle with area 12.00

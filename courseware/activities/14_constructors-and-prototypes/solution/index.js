// Activity: Constructors and Prototypes, Shapes edition (solution)

// Task 1: a constructor function initializes instance state through `this`.
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}

// Task 2: shared methods go on the prototype so every instance shares one copy.
Rectangle.prototype.area = function () {
  return this.width * this.height;
};
Rectangle.prototype.scale = function (factor) {
  this.width *= factor;
  this.height *= factor;
};

// Task 3: build instances with `new`, call methods, and inspect the type.
const r1 = new Rectangle(3, 4);
const r2 = new Rectangle(5, 5);

console.log(r1.area());
console.log(r2.area());

r1.scale(2);
console.log(r1.area());

console.log(r1.area === r2.area);
console.log(r1 instanceof Rectangle);
console.log(Object.getPrototypeOf(r1) === Rectangle.prototype);

// Task 4: a plain object serves as a shared prototype (a parent to delegate to).
const shape = {
  describe() {
    return `A ${this.name} shape.`;
  },
  area() {
    return 0;
  },
};

// Task 5: Object.create makes a new object whose prototype IS `shape`.
const square = Object.create(shape);
square.name = "square";
square.side = 4;
square.area = function () {
  // override the inherited area() with the square's own version
  return this.side * this.side;
};

const blob = Object.create(shape);
blob.name = "blob";

console.log(square.describe()); // inherited from shape
console.log(square.area()); // own method wins
console.log(blob.area()); // falls back to the inherited version

// Task 6: inspect the chain and tell own from inherited properties.
console.log(Object.getPrototypeOf(square) === shape);
console.log(Object.hasOwn(square, "area"));
console.log(Object.hasOwn(square, "describe"));
console.log(Object.hasOwn(blob, "area"));

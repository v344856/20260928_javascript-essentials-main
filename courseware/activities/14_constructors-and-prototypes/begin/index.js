// Activity: Constructors and Prototypes, Shapes edition
// Complete each TODO. Run with:  npm start   (npm run solution for the answer)

// TODO Task 1: write function Rectangle(width, height) assigning both to `this`.

// TODO Task 2: add area() and scale(factor) to Rectangle.prototype -
// NOT inside the constructor.

// TODO Task 3: create r1 (3 x 4) and r2 (5 x 5) with `new`. Log r1.area()
// and r2.area(), scale r1 by 2 and log its area again. Then log
// r1.area === r2.area, r1 instanceof Rectangle, and
// Object.getPrototypeOf(r1) === Rectangle.prototype.

// TODO Task 4: create a `shape` object literal with describe() returning
// "A <name> shape." and area() returning 0.

// TODO Task 5: make `square` with Object.create(shape), give it name and
// side, and give it its OWN area() returning side * side. Make `blob` the
// same way with only a name. Log square.describe(), square.area(),
// and blob.area().

// TODO Task 6: log Object.getPrototypeOf(square) === shape, then use
// Object.hasOwn to check "area" and "describe" on square, and "area" on blob.

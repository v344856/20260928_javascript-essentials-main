// Activity: JavaScript Modules, Geometry Helpers

// TODO Task 4: import from both modules and use them.
//   - Named import { rectangleArea, rectanglePerimeter as perimeter, SHAPE }
//     from "./shapes.js" - note the required .js extension.
//   - Default import `format` from "./format.js".
//   Then log the three lines below.

// console.log(format("Area", rectangleArea(4, 5)));
// console.log(format("Perimeter", perimeter(4, 5)));
// console.log(format("Shape", SHAPE));

// TODO Task 5: there is no `require` in an ES module. Import createRequire
//   from "node:module", build one with createRequire(import.meta.url), and
//   use it to load "./legacy-units.cjs". Then log the width in inches to
//   two decimals, e.g. format("Width", units.toInches(10).toFixed(2) + units.UNIT).

// TODO Task 6: await Promise.resolve("modules loaded") at the TOP LEVEL -
//   no async wrapper - and log the result.

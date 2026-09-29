// Activity: JavaScript Modules, Geometry Helpers (solution)

// Task 4: a named import for the shape functions, renaming one with `as`.
import { rectangleArea, rectanglePerimeter as perimeter, SHAPE } from "./shapes.js";

// Task 4: a default import - no braces, and we choose the local name.
import format from "./format.js";

console.log(format("Area", rectangleArea(4, 5)));
console.log(format("Perimeter", perimeter(4, 5)));
console.log(format("Shape", SHAPE));

// Task 5: there is no `require` in an ES module, so make one.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const units = require("./legacy-units.cjs");
console.log(format("Width", units.toInches(10).toFixed(2) + units.UNIT));

// Task 6: top-level await works in an ES module - no async wrapper needed.
const ready = await Promise.resolve("modules loaded");
console.log(ready);

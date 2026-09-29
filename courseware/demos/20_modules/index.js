// ============================================
// Part 1: ES modules (ES2015): import / export
// ============================================
// This folder's package.json contains { "type": "module" }, which is what
// tells Node to treat .js files here as ES modules.

// A NAMED import: the braces are not destructuring, they are import syntax.
// The name has to match the export.
import { add, subtract, VERSION } from "./utils.js";

// A DEFAULT import: no braces, and you choose the local name.
import utils from "./utils.js";

// You can rename on the way in, and grab everything as a namespace object.
import { add as plus } from "./utils.js";
import * as everything from "./utils.js";

console.log(add(2, 3)); // 5
console.log(subtract(9, 4)); // 5
console.log(plus(10, 1)); // 11: same function, local alias
console.log(VERSION); // 1.0.0
console.log(utils.add(2, 3)); // 5: via the default export
console.log(Object.keys(everything).sort()); // every export, as a namespace

// Note the extension: ES modules in Node require the ".js" in the path.
// Imports are also HOISTED and statically analyzed; they run before any
// other code in this file, and the path cannot be built at runtime.

// ============================================
// Part 2: CommonJS: require / module.exports
// ============================================
// The older Node system. In an ES module there is no `require`, so we make
// one with createRequire: which is also how real code bridges the two.

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const legacy = require("./legacy-utils.cjs");

console.log(legacy.add(2, 3)); // 5
console.log(legacy.LABEL); // legacy

// The differences that matter:
//
//   ES modules                       CommonJS
//   ----------------------------     --------------------------------
//   import / export                  require / module.exports
//   static: hoisted, analyzable      dynamic: runs where it appears
//   path must be a literal           path can be built at runtime
//   top-level await allowed          no top-level await
//   the default in modern code       still common in older Node projects

// Top-level await works here because this is an ES module, no async
// wrapper function needed.
const later = await Promise.resolve("top-level await works in ES modules");
console.log(later);

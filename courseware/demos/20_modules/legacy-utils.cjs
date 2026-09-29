// CommonJS: Node's original module system, still everywhere in older code.
// The .cjs extension tells Node to treat this file as CommonJS even though
// the folder's package.json says { "type": "module" }.

// There is no `export` keyword. You attach to the `exports` object...
exports.add = function add(a, b) {
  return a + b;
};

// ...or replace `module.exports` wholesale, which is the rough equivalent
// of an ES module's default export.
exports.LABEL = "legacy";

// CommonJS requires are RESOLVED AT RUNTIME, so this line could sit inside
// an `if`: something a static `import` cannot do.
console.log("(legacy-utils.cjs was loaded)");

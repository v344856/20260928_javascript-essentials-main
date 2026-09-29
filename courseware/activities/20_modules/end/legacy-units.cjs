// CommonJS: the .cjs extension opts this file out of "type": "module".
// Nothing to do here; Task 5 is about reaching it from index.js.

exports.toInches = function toInches(cm) {
  return cm / 2.54;
};

exports.UNIT = "in";

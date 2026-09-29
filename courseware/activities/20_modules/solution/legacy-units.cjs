// CommonJS: the .cjs extension opts this file out of "type": "module".

exports.toInches = function toInches(cm) {
  return cm / 2.54;
};

exports.UNIT = "in";

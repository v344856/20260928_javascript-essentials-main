// ---------------------------------------------------------------------------
// Part 1: Why functions exist: the repetition they remove
// ---------------------------------------------------------------------------

// Without a function, the force calculation (F = m * a) is copy-pasted:
//
//   let mass = 10, acceleration = 5;
//   let force = mass * acceleration;
//   console.log("The force is: " + force + " Newtons");
//
//   mass = 20; acceleration = 10;
//   force = mass * acceleration;
//   console.log("The force is: " + force + " Newtons");
//
//   ...and again, and again. Name the operation once instead.

// ---------------------------------------------------------------------------
// Part 2: Function declarations, and hoisting
// ---------------------------------------------------------------------------

// These calls appear BEFORE the declarations and still work: function
// declarations are hoisted: the whole function is available in its scope.
displayForce(10, 5); // mass = 10 kg, acceleration = 5 m/s^2
displayForce(20, 10); // mass = 20 kg, acceleration = 10 m/s^2
displayForce(15, 8); // mass = 15 kg, acceleration = 8 m/s^2

function calculateForce(mass, acceleration) {
  return mass * acceleration;
}

function displayForce(mass, acceleration) {
  const force = calculateForce(mass, acceleration);
  console.log("The force is: " + force + " Newtons");
}

// ---------------------------------------------------------------------------
// Part 3: Function expressions: a value assigned to a variable
// ---------------------------------------------------------------------------

// const does not hoist a value: the assignment happens on this line, so the
// calls have to come after it.
const calculateForce2 = function (mass, acceleration) {
  return mass * acceleration;
};

const displayForce2 = function (mass, acceleration) {
  const force = calculateForce2(mass, acceleration);
  console.log("The force is: " + force + " Newtons");
};

displayForce2(10, 5);
displayForce2(20, 10);

// ---------------------------------------------------------------------------
// Part 4: Arrow functions: the shortest form
// ---------------------------------------------------------------------------

// The long form, with a block body and an explicit return:
//   const calculateForce3 = (mass, acceleration) => {
//     return mass * acceleration;
//   };
//
// A single-expression body returns implicitly, no braces, no `return`:
const calculateForce3 = (mass, acceleration) => mass * acceleration;

const displayForce3 = (mass, acceleration) => {
  const force = calculateForce3(mass, acceleration);
  console.log("The force is: " + force + " Newtons");
};

displayForce3(15, 8);

// ---------------------------------------------------------------------------
// Part 5: Parameters: defaults, rest, and argument spread
// ---------------------------------------------------------------------------

// A missing argument is undefined, unless the parameter has a default.
function withDefaults(a, b = 999, c = 888) {
  console.log(a, b, c);
}

withDefaults(1); // 1 999 888
withDefaults(1, 2); // 1 2 888
withDefaults(1, 2, 3); // 1 2 3

// ...rest collects every remaining argument into a real array.
function doIt(a, b, ...c) {
  console.log(a, b, c);
}

doIt(1, 2); // 1 2 []
doIt(1); // 1 undefined []
doIt(1, 2, 3); // 1 2 [ 3 ]
doIt(1, 2, 3, 4, 5); // 1 2 [ 3, 4, 5 ]

// Passing an array passes ONE argument, the array itself.
doIt([1, 2, 3, 4, 5]); // [ 1, 2, 3, 4, 5 ] undefined []

// The spread operator unpacks it back into separate arguments.
doIt(...[1, 2, 3, 4, 5]); // 1 2 [ 3, 4, 5 ]

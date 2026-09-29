// An ES Module using NAMED exports.

export function rectangleArea(w, h) {
  return w * h;
}

export function rectanglePerimeter(w, h) {
  return 2 * (w + h);
}

// A named export does not have to be a function.
export const SHAPE = "rectangle";

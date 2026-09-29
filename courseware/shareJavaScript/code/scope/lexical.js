// lexical.js

let a = 1;

function outer() {
  let b = 2;

  function inner() {
    let c = 3;
    console.log(a, b, c); // 1, 2, 3
  }

  inner();
}

outer();
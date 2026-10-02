// lexical.js

let a = 1;

function outer() {
  let b = 2;

  function inner() {
    let c = 3;
    let b = 100  //after adding this, you see 1 100 3
    console.log(a, b, c); // 1, 2, 3 w/o b=100
  }

  inner();
}

outer();
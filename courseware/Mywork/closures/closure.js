function createCounter() {
  let count = 0;   // private variable

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3


//since a function reside in the funcation, the value of count still is alive although function is gone.


const counter = (function () {
  let count = 0;

  return {
    increment() {
      count++;
      console.log(count);
    },
    reset() {
      count = 0;
      console.log("Counter reset");
    },
  };
})();  // () notation in the line# 32 means call that funcation


function makeCounter() {
  let count = 0; // private

  return () => ++count; // FAT arrow function closure, which replace above. means that you don't need to code function.
                        
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
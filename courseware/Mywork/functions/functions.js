function sum(num1,num2=45) {
    return num1 + num2
}

console.log(sum(3, 4))
console.log(sum(3,4,7,8,9))  // only conside 1st 2
console.log(sum(3))  // display NaN if w/o num2=45
                     // since has num2=45 so we call 45 is defuault value

let result = sum(3,4,5)  // ok coding this way
console.log(result)

const add = function(num1, num2) { return num1 + num2}
add(3, 4)
let addResult = add(3,4)
console.log(add(3,4))

//(params) => implementation
const result1 = (num1,num2) => { return num1 + num2 }  //lambda by removing key words "function"
// or
const result2 = (num1,num2) => num1 + num2 

console.log(result2(3,4))


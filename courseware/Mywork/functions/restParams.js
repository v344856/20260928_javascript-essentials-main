
// num2 actiall is an array
function displayNum(num1=10, ...num2) {
    console.log(num1)

    num2.forEach((e) => console.log(e))
}

displayNum(1)
displayNum(2,3,4)
displayNum()

let greetings = "hello world"
console.log(greetings)

let chars = [... greetings]
console.log(chars)


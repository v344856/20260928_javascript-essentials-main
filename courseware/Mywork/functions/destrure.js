// function displayNumbers(...numbers) {
// numbers.forEach(number => {console.log(number)}}

// displayNumbers(1,2,3,4)
// displayNumbers(...values)


// use array as example
const values = [6,7,8,9] // array
let [a,b,c,d] = values
console.log(a)
console.log(b)
console.log(c)
console.log(d)

let [g,e] = values
console.log(g)
console.log(e)

console.log("=====")
let [h, i,...k] = values
console.log(h)
console.log(i)
console.log(k)

//let [...q, z] = values  //show red on q, it doesn't allow
// use object as example 
const employee = {fname: "junjie", position: "CIO", salary: 120000, county: "Prince George"}

let {fname: first, ...others} = employee
console.log(first)
console.log(others)
let {fname, county} = employee
console.log(fname)
console.log(county)

console.log("****")
let {fname: firstName} = employee
console.log(firstName)


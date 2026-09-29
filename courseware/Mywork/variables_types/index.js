let number = 10;
console.log(number);

number=15;
console.log(number);

const fname = "Junjie"; 
console.log(fname);

// const fname = "Xiaojun"
// console.log(fname);

const values = [1, 2, 3,4,5];
console.log(values);

values.push(6);
console.log(values);

values.pop()
values.pop();

console.log(values);

//values = [2,4,5];  // you get error, you cannot re-declare

{
    let last = "Liu";
    console.log("last name = " + last);
    console.log(`last name is \n ${last}`);

    const age = 20;
    console.log(age); 
}

//console.log(last); error
//console.log(age); error

//console.log('${last');

console.log(values);


var a = 10;
console.log(a);  // display 10

{
    var a = 12;
    console.log(a);  // display 12

}

console.log ("==================");

// function hello() {console.log(number1)
//                    let number1 = 12;
// }

//hello();
function hello1(){console.log(number2);  //display undefined
                 var number2 = 10;

}
hello1();

function hello1(){
    //var number2 
    console.log(number2);  //display undefined
    var number2 = 10;

}
hello1();

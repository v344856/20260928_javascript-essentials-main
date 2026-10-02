// Define the callback function
function greet() {
  console.log("Hello! This runs every 2 seconds.");
}

// Start the interval
const timerId = setInterval(greet, 2000);   //wait 2000 then call function "greet"
setInterval(greet, 2000) ;
console.log("Interal start - 1")
console.log("Interal start -2")
console.log("Interal start -3")
console.log("Interal start -4")
                                            

//alternative for above is 
setInterval( () => console.log("Go home soon", 1000));  //1000: one thousand million seconds


// above you need to use cltl C to stop it

//another alternative is to using setTimeout so you don't need to do the key strike cntl C

setInterval( () => console.log("class ends"), 20000);

// Stop after three greetings.
setTimeout(() => {
  clearInterval(timerId);
  console.log("Interval stopped.");})

  setTimeout(() => {
    console.log("class ends", 20000);
  })

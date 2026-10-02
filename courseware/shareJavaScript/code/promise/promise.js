// createPromise.js
const myPromise$ = new Promise((resolve, reject) => {
  const success = false;

  if (success) {
    resolve("Operation completed");
  } else {
    reject("Something went wrong");
  }
});

//consumePromise.js
myPromise$
  .then((result) => console.log(result))   //"result" is just a field name, can be anything
  .catch((error) => console.error("catch: " + error));  // this line shows to execute catch
  //.catch((error) => console.error(error));

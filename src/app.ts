//Array is a generic type and it requires a type argument
const names: Array<string> = ["Lob", "boc"];

//Promise type
//- Javascript feature
//Promise that will later return a string
const promise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve("This is done");
  }, 2000);
});

promise.then(data => {
  data.split(" ");
})

//
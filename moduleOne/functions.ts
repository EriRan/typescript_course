function add(number1: number, number2: number): number {
  return number1 + number2;
}
//VOID type
//Should the void be declared explicitely?
//Typescript can infer the fact that is void
function printValue(number: number) {
  console.log("Result: " + number);
}

function addAndHandle(
  number1: number,
  number2: number,
  callback: (number: number) => void//Function that has a number parameter and returns nothing expected as a parameter
) {
  const result = number1 + number2;
  callback(result);
}

printValue(add(120, 3));

//void returns undefined
//undefined is a valid type
//Function with undefined return must have empty return; statement. For what purpose?
let undefinedValue: undefined;

//What if we have a function type?
//The teacher claimed that combinevalues = 5 would not result into a compile error but it did
//Let's define what the function of this variable has to be like
//Cool an inline function definition!
//Still pretty weird though
let combineValues: (number1: number, number2: number) => number;
combineValues = add;

console.log(combineValues(1, 2));

addAndHandle(10, 20, (result) => {
  console.log(result);
  //callback can return things but it is expected that the function does not use it for anything
  return result;
});

//Two more types that are good to be aware of
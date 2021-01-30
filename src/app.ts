//Const cannot be changed
const userName = "Max Milvana";

//Scope
let age = 30;
age = 26;

//You should not use var anymore
//Available at the scope it has been defined at
//Eg. If defined inside a function, it is only available there
var cool = "asd";
//cool = 123; Compile error here

function add(a: number, b: number) {
  let coolResult;
  coolResult = a + b;
  return coolResult;
}

//Var only visible inside this if statement. Typescript specific?
//Same for let. This is called that it is only available in this block scope. This applies in Javascript too
//if (age > 20) {
//  let isOld = true;
//}

//console.log(isOld);

//Let's use arrow function!
//If you only add one expression, the curly braces can be omitted
//Default parameteres also available
//-Defaults should be set from the right because the order matters
const addFunction = (number1: number = 1, number2: number = 1) =>
  number1 + number2;
const oneParameterFunction: (a: number | string) => void = (output) =>
  console.log(output);

console.log(addFunction(5, 6));
//COOL WITH DEFAULT VARIABLES YOU CAN CALL THEM LIKE THIS!
//This is really nice!
console.log("With default variable in one: " + addFunction(10));
console.log("With only default variables: " + addFunction());
oneParameterFunction("22222");

const button = document.querySelector("button");
if (button) {
  button.addEventListener("click", (event) => {
    console.log(event);
  });
}

//Spread operator
const hobbies = ["SPERTS", "Cooking"];
const activeHobbies = ["Hiking"];
//How to describe this... Make a container object into individual objects
activeHobbies.push(...hobbies);

const person = {
  name: "Bob",
  age: 222,
};

//This just passes the reference
//const copiedPerson = person;
//Spread operator is used to create real copies of objets too
const copiedPerson = { ...person };

//Gadrombo


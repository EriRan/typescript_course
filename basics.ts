function add(
  number1: number,
  number2: number,
  printResult: boolean,
  resultPhrase: string
) {
  //Built in operator is from vanilla jacascript
  console.log(typeof number1);
  //WE could have a validation for the types in vanilla javascript but in typescript it is done automatically
  //Javascript == dynamic types (resolved at runtime)
  //Typescript == static types (set during development)

  //Primitive types in typescript are all lowercase

  //Sometimes return a value. GOD DAMN!!
  if (printResult) {
    console.log(resultPhrase + (number1 + number2));
  } else {
    return number1 + number2;
  }
}

//Type inferrence
//Typescript is able to infer the type from the value
//It is bad practice to explicitely define the type
//If it does not have a value, then you should define the type

//Stay sharp
let number1: number;
number1 = 123;
const number2 = 2.8;
const printResult = true;
let resultPhrase = "Result is: ";

//Object types
//Typescript has more specific types than in Javascript

add(number1, number2, printResult, resultPhrase);

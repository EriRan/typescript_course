function add(number1: number, number2: number) {
  //Built in operator is from vanilla jacascript
  console.log(typeof number1);
  //WE could have a validation for the types in vanilla javascript but in typescript it is done automatically
  //Javascript == dynamic types (resolved at runtime)
  //Typescript == static types (set during development)

  //Primitive types in typescript are all lowercase
  return number1 + number2;
}

const number1 = 3;
const number2 = 2.8;

const result = add(number1, number2);
console.log(result);
//Accept both numbers and strings
//This is called an union type
//Let's make it into a type alias
type NumberOrString = number | string;
type ResultType = "number" | "string";//Only these string values allowed. These are called literal types

//Central management of types. Could it be done somewhere else?

function combine(
  input1: NumberOrString, //Using type aliases here that allow numbers or strings
  input2: NumberOrString,
  resultType: ResultType 
) {
  let result;
  if (typeof input1 === "number" && typeof input2 === "number" || resultType === "number") {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  if (resultType === "number") {
    return +result;
  } else {
    return result.toString();
  }
}

const result = combine(1, 2, "number");
console.log(result);

const numberFromStrings = combine("1", "2", "number");
console.log(numberFromStrings);

const stringResult = combine("Walter", "White", "string");
console.log(stringResult);

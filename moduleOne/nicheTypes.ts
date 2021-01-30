//Niche types
//!
//New type introduced by Typescript
let userInput: unknown;
let userName: string;

//Same as any type?
userInput = 5;
userInput = "aouasdfhuisdfhuif";

//Unknown not guaranteed to be a string
//This would work if userInput were any
//userName = userInput;

if (typeof userInput == "string") {
  //Cool typescript compiler is smart!
  userName = userInput;
}

//Unknown has some type checking
//Any has no type checking

//Never type
//This function never produces a return value
//Has to be set explicely. Otherwise void is assumed
//This function essentially breaks the script
function generateError(message: string, code: number): never {
  throw {message: message, errorCode: code};
}

function infiniteLoop(): never {
  while (true) {

  }
}

generateError("ERROR", 500);
//Never reached. IDE will complain about this line since it can't be reached
//console.log("I'm still here");

//Never seems more useful than unknown
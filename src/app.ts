const userName = "Repe";
console.log(userName);

function clickHandler(message: string) {
  console.log("Clicked " + message);
}

//Watch mode can target one file
//Bigger projects must compile all the files ADDS

//Strict null checks setting would allow this without the exclamation mark
const button = document.querySelector("button");

//Better to do a null check here for extreme safety
if (button) {
  button.addEventListener("click", clickHandler.bind(null, "BUTTON!"));
} else {
  console.error("Button missing!")
}

//Map needs to be added to lib
const coolMap = new Map();

//Decorators
//Meta programming
//Wont be used that often but instead they are good for writing code thats easier to be used by other developers
//Content:
//-What are they
//-How to use them
//- Examples

//Decorator is in the end just a function
//They are all about classes
//Practice is to name them with uppercase
//Decorators execute when the class is defined
//They run when Javascript finds the class definition
function Logger(constructor: Function) {
  console.log("Logging...");
  console.log(constructor);
}

//Pointing at a decorator
@Logger
class Person {
  name = "Max";

  constructor() {
    console.log("Creating a person");
  }
}

const person = new Person();

console.log(person);
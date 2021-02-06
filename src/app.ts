//Decorators
//Meta programming
//Wont be used that often but instead they are good for writing code thats easier to be used by other developers
//Content:
//-What are they
//-How to use them
//- Examples

//Decorator is in the end just a function
//We can also define a decorator factory
//They are all about classes
//Practice is to name them with uppercase
//Decorators execute when the class is defined
//They run when Javascript finds the class definition
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("Decorator activating");
  //Underscore as a parameter name: I am aware of it but I won't use it
  return function(constructor: any) {
    const hookElement = document.getElementById(hookId);
    const person = new constructor();
    if (hookElement) {
      //wtf is this ok? I thought this was a bad practice
      //hookElement.innerHTML = template;
      //Can grab the person name from the object being constructed
      //Construction still happens later as well.
      hookElement.innerHTML = template;
      hookElement.querySelector("h1")!.textContent = person.name;

      //Can I modify it? No
      person.name = "Hacked person";
    }
  }
}

//We are creating decorator functions with a tool that exposes them to other developers
//Could they also be called interceptors? Act when something is built and then do something with the build object


//Pointing at a decorator
//We can pass values to the annotation which in turn are used at the decorator factory?
@WithTemplate("<h1>My person object</h1>", "app")
class Person {
  name = "Rondo of Lomboc";

  constructor() {
    console.log("Creating a person");
  }
}

//Someone can import the above annotation and use it to render some magic!
//Gets the HTML as parameter and the id is where to apply the element to
//That decorator is called when Javascript discovers the function...?
//I don't get it
//It is only activated if the annotation is there

const person = new Person();

console.log(person);

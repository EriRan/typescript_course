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
  console.log("Logger activating");
  return function (constructor: Function) {
    console.log("Logger function called");
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("With template activating");
  //Underscore as a parameter name: I am aware of it but I won't use it
  return function (constructor: any) {
    console.log("WithTemplate function called");
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
  };
}

//We are creating decorator functions with a tool that exposes them to other developers
//Could they also be called interceptors? Act when something is built and then do something with the build object

//Pointing at a decorator
//We can pass values to the annotation which in turn are used at the decorator factory?
//Decorators seem to activate depending on the order of the annotations
//Functions executed bottoms up
@WithTemplate("<h1>My person object</h1>", "app")
@Logger("Logging!")
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

//Where else can we add decorators to?
//Oh my god the js code looks horrible

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator");
  console.log(target, propertyName);
}

//I really need some real code examples. I don't understand where is this useful at
class Product {
  //This executes when class definition is registered with Javascript
  @Log
  title: string;
  private _price: number;

  set price(value: number) {
    if (value > 0 ) {
      this._price = value;
    } else {
      throw new Error("Invalid price. Should be above zero");
    }
  }

  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }

  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }

}


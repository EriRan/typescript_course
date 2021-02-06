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

//Decorators can also return values. The type of return value depends on the decorator
//Can use a decorator to replace the old class with an extended version of the original
//Oh boy this is a lot to take in

//WTF
//This kind of structure makes it so that the function is called when the object is instantiated
function WithTemplate(template: string, hookId: string) {
  console.log("With template activating");
  //Underscore as a parameter name: I am aware of it but I won't use it
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    //Return new constructor function
    //This extends the original constructor?
    //This way the logic should happen only when the instanciation is done
    return class extends originalConstructor {
      constructor(..._: any[]) {
        //This calls the original constructor
        super();

        //Then we do some extra logic on top of calling the original constructor
        console.log("WithTemplate function called");
        const hookElement = document.getElementById(hookId);
        if (hookElement) {
          //wtf is this ok? I thought this was a bad practice
          //hookElement.innerHTML = template;
          //Can grab the person name from the object being constructed
          //Construction still happens later as well.
          hookElement.innerHTML = template;
          hookElement.querySelector("h1")!.textContent = this.name;
        }
      }
    };
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

//Can control the property descriptor by returning the values inside an object here
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

//Method decorator
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

//Name is the name of the method where the parameter is used
function Log4(target: any, methodName: string | Symbol, position: number) {
  console.log("Parameter decorator");
  console.log(target);
  console.log(methodName);
  console.log(position);
}

//I really need some real code examples. I don't understand where is this useful at
class Product {
  //This executes when class definition is registered with Javascript
  @Log
  title: string;
  private _price: number;

  //Accessor decorator here
  @Log2
  set price(value: number) {
    if (value > 0) {
      this._price = value;
    } else {
      throw new Error("Invalid price. Should be above zero");
    }
  }

  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }

  //Method decorator
  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

//Decorator run order
//Decorator not ran at instanciation, executed when the class is defined
//Decorators allow you to do behind the scenes setup
//They are just a function that executes when a class is defined
//Do some behind the scenes work

//Could store the decorator in some data structure
const product = new Product("Energy drink", 2.2);

//Some libraries make heavy use of decorators
//Maybe that will enlighten me

//Return values are not supported for some accessors
//Log2 and Log3 == setter and method decorator

//Property descriptors are in vanilla Javascript
//-Writeable
//-Configurable
//-Enumerable == can be for looped

///Old methods configuration will be replaced
function Autobind(
  _: any,
  _2: string | Symbol | number,
  descriptor: PropertyDescriptor
) {
  //Get the original method
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    //Extra logic when users try to access this property
    //Getter is triggered by the concrete method
    //This is some kind of extra layer
    get() {
      const boundFunction = originalMethod.bind(this);
      return boundFunction;
    },
  };
  return adjustedDescriptor;
}

class Printer {
  message = "This works!";

  @Autobind
  showMessage() {
    //this does not have the same context when it is called from an event listener
    //bind is the traditional method to handle this
    //Let's do this instead with a decorator
    //WOWWW
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);

//I didn't understand anything
//Ok I understood what it does but I don't understand how it did it

//Decorators for validation
//We want a validation that checks that the course has all the input required
//I don't fully understand what is going on in here. Javascript property descriptors are in use somehow
//I get the big picture but not the details

interface ValidatorConfig {
  [property: string]: {
    //This is kind of a map
    [validatableProperty: string]: string[]; //required, positive
  };
}

const registeredValidators: ValidatorConfig = {};

//Some kind of map is being made
function Required(target: any, propertyName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyName]: ["required"],
  };
}

function PositiveNumber(target: any, propertyName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    //Key and value
    //He did mention a key
    [propertyName]: ["positive"],
  };
}

function validate(obj: any) {
  console.log(registeredValidators);
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    if (!objValidatorConfig || !prop) {
      continue;
    }
    const propertyToBeValidated = objValidatorConfig[prop];
    if (!propertyToBeValidated) {
      console.log("Property to be validated was undefined!");
      continue;
    }
    for (const validator of propertyToBeValidated) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
        default:
          console.log("Unknown validator:" + validator);
          return false;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleElement = document.getElementById("title") as HTMLInputElement;
  const priceElement = document.getElementById("price") as HTMLInputElement;

  const title = titleElement.value;
  const price = +priceElement.value;

  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    alert("Invalid input!");
  }
  console.log(createdCourse);
});

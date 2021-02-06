//Intersection types
//This same could be done with interfaces
//No good reason why not to use interfaces instead...?
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date; //Oh boy new type
};
//Compined type!
type ElevatedEmployee = Admin & Employee;

const employeeOne: ElevatedEmployee = {
  name: "Repe",
  privileges: ["create-server"],
  startDate: new Date(),
};

//Type guard
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

//HOLY SHIT Fuction overloads are strong
//If parameters these, return this type
function add(one: string, two: string): string
function add(one: string, two: number): string
function add(one: number, two: string): string
function add(one: number, two: number): number
function add(one: Combinable, two: Combinable) {
  //Typeguard with typeof
  if (typeof one === "string" || typeof two === "string") {
    return one.toString() + two.toString();
  }
  return one + two;
}

//4 Possible overloads
add("One", 2);
add(2, "Two");
const result = add("Lom", "boc");
//Now can't use string functions because its a combinable
//Unless we cast it
console.log("Function overload result: " + result.length);

//Optional chaining
const fetchedUser = {
  id: "1",
  name: "Max",
  job: {title: "CEO", description: "COOL CLUB"}
};

//Check if a property is there
//Use question mark for the optionals
//Access the variable if it does exist
console.log("Optional Chaining: ", fetchedUser?.job?.title);

//Nullish coalescing
const userInput = "";

const falseyData = userInput || "DEFAULT";
//This is called null coalescing!!!
//Use the other value if the first one is null or undefined
const nullishCoalescing = userInput ?? "DEFAULT";

//Plan b value usage
console.log("The one with bars: " + falseyData);
console.log("Nullish coalescing: " + nullishCoalescing);

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(employee: UnknownEmployee) {
  console.log(employee.name);
  //typeof can't be used here. Javescript only knows object, not the custom classes we just created
  //Let's use a different check
  //Check by checking if there is a certain variable
  if ("privileges" in employee) {
    console.log(employee.privileges);
  }
  if ("startDate" in employee) {
    console.log(employee.startDate);
  }
}

printEmployeeInformation(employeeOne);
printEmployeeInformation({ name: "Rondo", startDate: new Date() });

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving truck...");
  }

  loadCargo(amount: number) {
    console.log("load cargo: " + amount);
  }
}

type Vehicle = Car | Truck;

const firstCar = new Car();
const firstTruck = new Truck();

function useVehicle(vehicle: Vehicle) {
  //this is always callable because both have this method
  vehicle.drive();

  //loadCargo is more difficult
  //instanceof is a part of Javascript
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(123);
  }
}

useVehicle(firstCar);
useVehicle(firstTruck);

interface Person {
  name: string;
}

interface Bob extends Person {
  age: number;
}

class BobClass implements Bob {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const bobber = new BobClass("Bobo", 1);
type bobType = Bob;

//Cannot do a check like this:
//console.log(bobber instanceof Bob);
//Well this sucks

//Type guard == check if a the object has a provided method or is certain class

//Discriminated Unions
//They make type guards easier
//One common property that makes up the union
//Typescript compiler is smart and is able to understand which variables are not available to discriminating types
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

//Ok this is nice
//In java, I'd have to do a ton of those casts but Typescript is smart
function moveAnimal(animal: Animal) {
  switch (animal.type) {
    case "bird":
      console.log("Flying at speed: " + animal.flyingSpeed);
      break;
    case "horse":
      console.log("Running at speed: " + animal.runningSpeed);
      break;
  }
}

moveAnimal({ type: "bird", flyingSpeed: 123 });
moveAnimal({ type: "horse", runningSpeed: 321 });

//Type casting
//The brackets do the casting or it can be done with 'as' keyword
//Exclamation means that the variable cannot be null
const userInputElement = document.getElementById("user-input");
//React has same angle bracket syntax. Use 'as' keyword afterwards to do the real casting instead!
//
if (userInputElement) {
  (userInputElement as HTMLInputElement).value = "BEEDER MEEDER";
}

//Ok let's continue after a week long break

//Index types
//More flexible about properties they hold
//Used for eg. error handling?

//Flexible container
//Don't know how many properties
interface ErrorContainer {
  //Square brackets!
  //Can't make id: number, because below index type restricts all types to be strings
  //I don't know the exact property name, I just know that every property must have a property name and the value must be string
  [prop: string]: string;
}

//I don't know a good scenario for this...
const errorBag: ErrorContainer = {
  email: "Not a valid email",
  username: "User name must start with a cpaital character!"
};

//Function overload
//like the add function that we've been overloading...?

//Typeof test
//The answer is c because type is not written as a string
let testValue = "Test";
console.log(typeof testValue === "string");

//Cool 3/3
//Ok module complete!!!
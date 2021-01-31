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

function add(one: Combinable, two: Combinable) {
  //Typeguard with typeof
  if (typeof one === "string" || typeof two === "string") {
    return one.toString() + two.toString();
  }
  return one + two;
}

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

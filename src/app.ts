//Array is a generic type and it requires a type argument
/*
const names: Array<string> = ["Lob", "boc"];

//Promise type
//- Javascript feature
//Promise that will later return a string
const promise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve("This is done");
  }, 2000);
});

promise.then(data => {
  data.split(" ");
})
*/

//Let's make our onw generic
//Object.assign is pretty cool. This would be dark magic in Java
//Function returns an intersection of T and U
//T & U == Intersection of two objects
//Can use any extneds constraints: natural objects, custom objects
function merge<T extends object, U extends object>(objectA: T, objectB: U): T & U {
  return Object.assign(objectA, objectB);
}

const mergedObject = merge({name: "Lorde"}, {age: 22});
//Type restrictions prevent this: just number 22 not allowed because it does not extend object
//merge({name: "Lorde"}, 22);
//This is redundant. This is what generics prevent
const mergeCastObject = merge<{name: string}, {age: number}>({name: "Lorde"}, {age: 22});

const mergedObject2 = merge({favoriteActivity: "Parties", hobbies: ["sports", "video games"]}, {amountOfChildren: 12});
//Can do an expected value cast: merge<string, number>
console.log(mergedObject);
console.log(mergeCastObject);
console.log(mergedObject2);
//Cool now the typecasting works!!!
mergedObject.age;

//We could  typecast but thats stupid
//Can't access name or age because Typescript can't know about these properties
//mergedObject.age

//You often want to restrict types of generics
//Type constraints are used here

interface Lengthy {
  length: number;
}

//Return value as a tuple
//This is really interesting: it identifies the variable based on just the name!!
//In Java, we would have to extend the string class but in Javascript its just tied to the name. This too can result in some trouble I bet
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "No elements no joy";
  if (element.length === 1) {
    descriptionText = "Got 1 element";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe("COOOL"))
console.log(countAndDescribe(["BOB", "Saget"]))

//Dayumn
//U has to be a variable of T
//This is some advanced syntax
//The compiler is so damn smart
//keyof constraint is important here
function extractAndConvert<T extends object, U extends keyof T>(object: T, key: U): string {
  return "Value: " +  object[key];
}

console.log(extractAndConvert({name: "Robert Schneider"}, "name"));

//Generic classes
//Type parameter in the constructor
//(string | number | boolean)[] would be a mixed array
//Here: you got to choose the type once
//Union type: any of the types is fine
//Causes problems in the methods. Would have to implement separate handling
//You want union types when you want to be flexible with the provided types. Generic types lock in a type
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    let foundKey = this.data.indexOf(item);
    if (foundKey !== -1) {
      this.data.splice(foundKey, 1);
    }
    return;
  }

  //Return a copy of the array
  //Three dots
  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
//Storage where you can store anything
const anyStorage = new DataStorage();

textStorage.addItem("GOOD");
console.log("Before remove");
console.log( textStorage)
//Not allowed
//textStorage.addItem(123);
console.log("After remove");
textStorage.removeItem("GOOD");
console.log(textStorage)

//Let's try out anyStorage
anyStorage.addItem(123);
anyStorage.addItem("STRING VALUE");

console.log(anyStorage);

const numberStorage = new DataStorage<number>();
//Not allowed
//numberStorage.addItem("asd");

numberStorage.addItem(1212123);

/*
//RIP object storages

const objectStorage = new DataStorage<object>();

objectStorage.addItem({name: "Robert"});
let robertObject = {name: "Roibos"};
objectStorage.addItem(robertObject);

//This is tecnically a brand new object and has a different address
objectStorage.removeItem(robertObject);

//This ain't good. It removes the first object!!!
//This happened because the indexOf returned -1 which caused the splice to remove the last object in the array.
//Fixed this by not removing when the returned value is -1
//Object has to be removed with a reference to the same object for the indexOf to work!
//Exact same object!
console.log("Situation after attempting to remove from object storage");
console.log(objectStorage);

//Objects are reference types
*/


//Summary
//Generic types are cool
//Flexibility with constraints
//

//Generic utility types

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(title: string, description: string, completeUntil: Date): CourseGoal {
  //This is an object that in the end will be a course goal
  //Make object types variables to be temporarily optional
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = completeUntil;
  //Partial construction is finished with a type cast
  return courseGoal as CourseGoal;
}

//Read only array
const names: Readonly<string[]> = ["Robert", "Hunter"];
//Not allowed with read only
//names.push("Combert");
//names.pop();

//Generic types vs. union types

//Functions can have generic types
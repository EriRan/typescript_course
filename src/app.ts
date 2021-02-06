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
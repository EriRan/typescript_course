//Object is one of the types
//What is this
//object does not support any variables
//Curly braces after the variable mean a specialized object type where some info is provided of the type
//We can define the variables inside the curly braces
//You can define an object like this but its bad practice:
/* const person: {
  name: string;
  age: number;
}  */
//Compilation removes the above!

//THIS IS GOOD SYNTAX!
const person: {
  name: string;
  nickname: string;
  age: number;
  hobbies: string[];
  role: [number, string]; //This is a tuple definition
} = {
  name: "BOB",
  nickname: "LOMBOC",
  age: 30,
  hobbies: ["SPERTS", "Cooking"],
  //This is a tuple. We need to explicitely overwrite the type. Otherwise it is considered an array
  role: [2, "Author"],
};

let favoriteActivities: string[];
//Mixed array not defined when defining like above
favoriteActivities = ["SPORTS", "COOKEN"];

//Do not use any array often
//let anyArray: any[];

//Cool missing variables are also detected
console.log("My name is " + person.name);

console.log("And I like: ");
for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
  //We would get errors if the array had any content!
}

//Tuple type
//Some programming languages have them, some don't
//Array with two elements is not a tuple

//Why do these work? Ok I think I understand
//This is a bit stupid though
person.role.push("ADmen");
person.role[1] = "asd";
person.role[0] = 123;

//Next: Section 2, 20. Working with enums
//Let's do some enums
//enum {NEW,OLD}

//Javascript constant enum?
//const ADMIN = 1;
//const REGULAR_GUY = 2;
//Typescript enum makes it easier
//Its a good practice to have enums be UPPER CASE
//If we add a number value for the first enum, others will have incremented value for them, so eg. Admin = 5, then other enums will be 5,6,7,8, ...
//Or you can assign your onw values
//Benefits: human readable values that have a value mapped to them behind the scenes
enum Role {ADMIN = 5, READ_ONLY, AUTHOR}

const enumPerson = {
  name: "Gregor",
  nickname: "Fonduo",
  age: 30,
  hobbies: ["Programman", "Mechanical keyboarder"],
  //Let's make role an enum
  //COOL WE GET a compile error if the type is not really available
  role: Role.ADMIN
};

//One more core type: Any type
//Does not tell Typescript anything 
let anything: any;
anything = "asdasd";
anything = 123;
//This is a disadvangate. Takes away all the good things that Typescript does

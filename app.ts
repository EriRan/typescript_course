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
//type AddFunction = (a: number, b: number) => number;

interface AddFunction {
  (a: number, b: number): number;
}

let add: AddFunction;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

//Interfaces
//Why use them?
//We want to that implementing class has implemeneted a certain method with a certain structure

interface Named {
  //Value assignment is not allowed in interface
  //private not allowed. readonly should be used
  readonly name?: string;
  //Optional variable
  outputName?: string;
}

//Describes a constructor of an object
//interface is Typescript specific
//This same can be done with a type. Why are we using interface instead?
//- Interface is clearer
//- You can implement an interface in a class (Type cannot be implemented)
interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable, Named {
  name?: string;

  age: number;

  constructor(age: number, name?: string) {
    if (name) {
      this.name = name;
    }
    this.age = age;
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(`${phrase} I am ${this.name} and I am ${this.age} years old`);
    } else {
      console.log(`${phrase} someone...?`)
    }
  }
}

//Lets add an initial type
let user1: Greetable;
//Let's add things needed for a Person
//Pretty nice
user1 = new Person(32, "Larson");
//Not allowed due to readonly of the interface
//user1.name = "Bnie";

user1.greet("Hey there.");
console.log(user1);


let user2 = new Person(32);
user2.greet("HEEEY");

//Extenders can decide whether the acquired variables are optional or not
//Interfaces will not show up in the final compiled code
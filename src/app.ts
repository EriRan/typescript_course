//Convention: start with uppercase letter
class Department {
  //private id: string;
  //This is a field. Defines the variable key and the value type
  //Public are accessible but this is what happens when there is no accessibility keyword anyway so its kind of redundant
  //No package private in javascript?
  //private name: string;
  //Private variable is only accessible inside the class. FORCE EVERYONE TO WRITE CLEANER CODE!
  private employees: string[];

  //Class things are added into prototypes in es5?

  //Reserved keyword. This is a function as well
  //We can create the fields in constructor too. No need to have them in the constructor too
  //readonly is typescript specific
  //All variables that a class has are called class properties
  constructor(private readonly id: string, private readonly name: string) {
    //this.id = id;
    //this.name = name;
    this.employees = [];
  }

  //This is a method
  //The parameter here is just a hint for typescript to be able to understand, what is 'this' referring to
  //This is really interesting
  describe(this: Department) {
    //this == Refer to the concrete instance and then get the name variable
    //Remember this backtick syntax. Its a handy way to write long strings with variables
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    //This does not work due to the readonly property
    //this.id = "asdasd";
    this.employees.push(employee);
  }

  printEmployeeInformation(this: Department) {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const coolClub = new Department("CC", "Cool Club");
coolClub.addEmployee("Robert");
coolClub.addEmployee("Standard");
//This is bad. Only one path is good. Let's make the variable private
//coolClub.employees[2] = "Richter";

console.log(coolClub);
coolClub.describe();

//The object does have the name variable, so we will end up with undefined as the name
//const coolClubClone = { name: "Hardcore Club", describe: coolClub.describe}
//coolClubClone.describe();

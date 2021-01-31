//Convention: start with uppercase letter
abstract class Department {
  //Static variable
  //You can't access variables inside non static parts
  //Have to access them like this: Department.fiscalYear
  static fiscalYear = 2021;

  //private id: string;
  //This is a field. Defines the variable key and the value type
  //Public are accessible but this is what happens when there is no accessibility keyword anyway so its kind of redundant
  //No package private in javascript?
  //private name: string;
  //Private variable is only accessible inside the class. FORCE EVERYONE TO WRITE CLEANER CODE!
  protected employees: string[];

  //Class things are added into prototypes in es5?

  //Reserved keyword. This is a function as well
  //We can create the fields in constructor too. No need to have them in the constructor too
  //readonly is typescript specific
  //All variables that a class has are called class properties
  constructor(protected readonly id: string, protected readonly name: string) {
    //this.id = id;
    //this.name = name;
    this.employees = [];
  }

  //Now we can access this without creating the object?
  static createEmployee(name: string) {
    return { name: name };
  }

  //This is a method
  //The parameter here is just a hint for typescript to be able to understand, what is 'this' referring to
  //This is really interesting
  //Abstract == this has to be overwritten
  //If abstract is used, the class has to be abstract too abstract
  abstract describe(this: Department): void;

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

//Let's do some inheritance
class ITDepartment extends Department {
  admins: string[];

  constructor(id: string, admins: string[]) {
    super(id, "IT Department");
    this.admins = admins;
  }

  describe() {
    console.log(`IT department ID: (${this.id}) Name: ${this.name}`);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found");
  }

  set mostRecentReport(value: string) {
    if (value) {
      this.addReport(value);
    } else {
      throw new Error("Please pass a valid value");
    }
  }

  private constructor(id: string, public reports: string[]) {
    super(id, "IT Department");
    if (reports[0]) {
      this.lastReport = reports[0];
    } else {
      this.lastReport = "";
    }
  }

  //Singleton creator
  static getInstance() {
    if (AccountingDepartment.instance) {
        return this.instance;
    } else {
      this.instance = new AccountingDepartment("ACC", []);
      return this.instance;
    }
  }

  //Override addEmployee with some special logic
  addEmployee(name: string) {
    if (name === "Greg") {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  getReports(this: AccountingDepartment) {
    console.log(this.reports);
  }

  describe() {
    console.log(`Accounting department ID: (${this.id}) Name: ${this.name}`);
  }
}

const coolClub = new ITDepartment("CC", ["Cool Colin", "Nice Sasha"]);
coolClub.addEmployee("Robert");
coolClub.addEmployee("Standard");
//This is bad. Only one path is good. Let's make the variable private
//coolClub.employees[2] = "Richter";

console.log(coolClub);
coolClub.describe();

//Static method call
const employee1 = Department.createEmployee("Gregor");
console.log(employee1);
//Static variable fetched
console.log(Department.fiscalYear);

//The object does have the name variable, so we will end up with undefined as the name
//const coolClubClone = { name: "Hardcore Club", describe: coolClub.describe}
//coolClubClone.describe();

const itGuys = new ITDepartment("ITGOD", ["Bob", "Ross"]);
console.log(itGuys);

const accountingPersons = AccountingDepartment.getInstance();
accountingPersons.addEmployee("Greg");
accountingPersons.addEmployee("Not Greg");
console.log(accountingPersons);
//Access this without parenthesis
//This is how getters work
console.log(accountingPersons.mostRecentReport);

//Now this is using a setter
accountingPersons.mostRecentReport = "THEY ARE IN";

accountingPersons.describe();
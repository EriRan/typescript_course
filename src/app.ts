//Let's build a small project
//Let's write all the code here LOL!
//We will split the file later
//index.html and a css was provided. We need to write some code to make it all work
//tsc -w == Quick way to run tsc --watch

//Validation
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

//This could be a lot better
//MMMMMMMMMMMMMMMEga refactor!!!!!!
//weeeee have no tests lol
function validate(input: Validatable) {
  let isValid = true;
  if (input.required) {
    isValid = isValid && input.value.toString().trim().length !== 0;
  }
  if (input.minLength != null && typeof input.value === "string") {
    isValid = isValid && input.value.trim().length >= input.minLength;
  }
  if (input.maxLength != null && typeof input.value === "string") {
    isValid = isValid && input.value.trim().length <= input.maxLength;
  }
  if (input.min != null && typeof input.value === "number") {
    isValid = isValid && input.value >= input.min;
  }
  if (input.max != null && typeof input.value === "number") {
    isValid = isValid && input.value <= input.max;
  }
  return isValid;
}

//Copied from git history hehe
function Autobind(
  _: any, //target, unused
  _2: string | Symbol | number, //methodName, unused
  descriptor: PropertyDescriptor
) {
  //Get the original method
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    //Extra logic when users try to access this property
    //Getter is triggered by the concrete method
    //This is some kind of extra layer
    configurable: true,
    //I guess enumberable means whether it can be iterated
    enumerable: false,
    get() {
      const boundFunction = originalMethod.bind(this);
      return boundFunction;
    },
  };
  return adjustedDescriptor;
}

//The list class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  sectionElement: HTMLElement;

  constructor(private type: "active" | "finished") {
    this.templateElement = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    //Import content with deep clode (Clones all nested objects?)
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.sectionElement = importedNode.firstElementChild as HTMLElement;
    //WHy is this not done in the html file....?
    this.sectionElement.id = `${this.type}-projects`;
    this.attach();
    this.renderContent();
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.sectionElement.querySelector("ul")!.id = listId;
    this.sectionElement.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.sectionElement);
  }
}

//Get access to the template form
class ProjectInput {
  //This would be better to be called as formTemplate
  //I'm not going to rename these or otherwise I'll get confused when following the tutorial
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  formElement: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    //Import content with deep clode (Clones all nested objects?)
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.formElement = importedNode.firstElementChild as HTMLFormElement;
    //WHy is this not done in the html file....?
    this.formElement.id = "user-input";

    //Hashtag means ID
    this.titleInputElement = this.formElement.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputElement = this.formElement.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInputElement = this.formElement.querySelector(
      "#people"
    )! as HTMLInputElement;

    this.configure();
    //Constructor does a call to attach! This is unique
    this.attach();
  }

  //We will return a tuple or nothing
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeopleCount = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleCountValidatable: Validatable = {
      value: +enteredPeopleCount,
      required: true,
      min: 1,
      max: 5,
    };

    //This is crap. Let's improve it in a later lecture
    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleCountValidatable)
    ) {
      alert("Invalid input. Try again");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeopleCount];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      console.log(title, description, people);
      this.clearInputs();
    }
  }

  private configure() {
    this.formElement.addEventListener("submit", this.submitHandler.bind(this));
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
  }
}

const projectInput = new ProjectInput();
const activeProjectsList = new ProjectList("active");
const finishedProjectsList = new ProjectList("finished");

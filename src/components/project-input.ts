import { Component } from "./base-components.js";
import { Validatable, validate } from "../util/validation.js";
import { Autobind } from "../decorators/autobind.js";
//Import project state constant
import { projectState } from "../state/project-state.js";

//Get access to the template form
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    //Hashtag means ID
    this.titleInputElement = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    )! as HTMLInputElement;

    this.configure();
    //Constructor does a call to attach! This is unique
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

    //This is slightly less crappy
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
      projectState.addProject(title, description, people);
      this.clearInputs();
    }
  }

  renderContent() {
    //Not really requrired here but required in the parent class
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }
}

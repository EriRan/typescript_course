/// <reference path= "models/drag-drop.ts" />
/// <reference path= "models/project.ts" />
/// <reference path= "state/project-state.ts" />
/// <reference path= "util/validation.ts" />
/// <reference path= "decorators/autobind.ts" />
//^3 forward slashes! This is important and it is not vanilla Javascript

//Namespaces: The imports from a namespace must be in same namespace...?

namespace App {
  //Let's build a small project
  //index.html and a css was provided. We need to write some code to make it all work
  //tsc -w == Quick way to run tsc --watch

  //Component base class
  //Renderable object
  //Generic class. Inheritors set the concrete classes
  abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLElement;
    element: HTMLElement;

    //string | undefined == string?
    constructor(
      templateId: string,
      hostElementId: string,
      insertAtStart: boolean,
      newElementId?: string
    ) {
      this.templateElement = document.getElementById(
        templateId
      )! as HTMLTemplateElement;
      this.hostElement = document.getElementById(hostElementId)! as T;

      //Import content with deep clone (Clones all nested objects?)
      const importedNode = document.importNode(
        this.templateElement.content,
        true
      );
      this.element = importedNode.firstElementChild as U;
      if (newElementId) {
        this.element.id = newElementId;
      }
      this.attach(insertAtStart);
    }

    private attach(insertAtStart: boolean) {
      this.hostElement.insertAdjacentElement(
        insertAtStart ? "afterbegin" : "beforeend",
        this.element
      );
    }

    abstract configure(): void;
    abstract renderContent(): void;
    //private abstract methods not allowed
  }

  class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable {
    private project: Project;

    //Getter is like a function for getting a specific value
    get persons() {
      if (this.project.peopleCount == 1) {
        return this.project.peopleCount + " person";
      }
      return this.project.peopleCount + " persons";
    }
    constructor(hostId: string, project: Project) {
      super("single-project", hostId, false, project.id);
      this.project = project;
      this.renderContent();
      this.configure();
    }

    configure() {
      this.element.addEventListener("dragstart", this.dragStartHandler);
      this.element.addEventListener("dragend", this.dragEndHandler);
    }

    renderContent() {
      this.element.querySelector("h2")!.textContent = this.project.title;
      this.element.querySelector("h3")!.textContent =
        this.persons + " assigned";
      this.element.querySelector("p")!.textContent = this.project.description;
    }

    @Autobind
    dragStartHandler(event: DragEvent) {
      //Add id so that we can later fetch it
      event.dataTransfer!.setData("text/plain", this.project.id);
      event.dataTransfer!.effectAllowed = "move";
    }
    @Autobind
    dragEndHandler(event: DragEvent) {
      console.log(event);
    }
  }

  //The list class
  class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget {
    assignedProjects: Project[];

    //Creation of a type variable happens here in the parameters
    //Need to use string literal here. Enum value not possible
    constructor(private type: "active" | "finished") {
      super("project-list", "app", false, `${type}-projects`);
      this.assignedProjects = [];

      this.configure();
      this.renderContent();
    }

    private renderProjects() {
      const listElement = document.getElementById(
        `${this.type}-projects-list`
      )! as HTMLUListElement;
      //Reset the html content of the list
      listElement.innerHTML = "";
      for (const projectItem of this.assignedProjects) {
        new ProjectItem(this.element.querySelector("ul")!.id, projectItem);
      }
    }

    configure() {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("drop", this.dropHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);

      projectState.addListener((projects: Project[]) => {
        const relevantProjects = projects.filter((project) => {
          if (this.type === "active") {
            return project.status == ProjectStatus.ACTIVE;
          }
          return project.status == ProjectStatus.FINISHED;
        });
        this.assignedProjects = relevantProjects;
        this.renderProjects();
      });
    }

    renderContent() {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector("ul")!.id = listId;
      this.element.querySelector("h2")!.textContent =
        this.type.toUpperCase() + " PROJECTS";
    }

    @Autobind
    dragOverHandler(event: DragEvent) {
      if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
        //Default: To not allow dropping. Prevent allows it
        event.preventDefault();
        const listElement = this.element.querySelector("ul")!;
        //Vanilla javascript feature to add a class that has some css tied to it
        listElement.classList.add("droppable");
      }
    }
    @Autobind
    dropHandler(event: DragEvent) {
      //The dataTransfer doesn't have the content for some reason when it is printed out in console with console.log(event);
      const projectId = event.dataTransfer!.getData("text/plain");
      projectState.moveProject(
        projectId,
        this.type === "active" ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED
      );
    }

    @Autobind
    dragLeaveHandler(_: DragEvent) {
      const listElement = this.element.querySelector("ul")!;
      listElement.classList.remove("droppable");
    }
  }

  //Get access to the template form
  class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}

import { DragTarget } from "../models/drag-drop.js";
import { Component } from "./base-components.js";
import { ProjectItem } from "./project-item.js";
import { Project, ProjectStatus } from "../models/project.js";
import { Autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";

//File extension omitting is possbile with different configuration

//The list class
export class ProjectList
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

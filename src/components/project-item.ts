import { Draggable } from "../models/drag-drop.js";
import Component from "./base-components.js";
import { Project } from "../models/project.js";
import { Autobind } from "../decorators/autobind.js";

export class ProjectItem
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
    this.element.querySelector("h3")!.textContent = this.persons + " assigned";
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

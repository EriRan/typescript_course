import { Project, ProjectStatus } from "../models/project";

//We need to get projects fromm input ot list
//Let's make a class that manages the state of the application like in React!!

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFunction: Listener<T>) {
    this.listeners.push(listenerFunction);
  }
}

//Project state management
//Just a bunch of functions
type Listener<T> = (items: T[]) => void;

export class ProjectState extends State<Project> {
  private projects: Project[] = [];

  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numberOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numberOfPeople,
      ProjectStatus.ACTIVE
    );

    this.projects.push(newProject);
    this.updateListeners();
  }

  //Move project from one list to another
  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((project) => project.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFunction of this.listeners) {
      //Return a copy of the array
      listenerFunction(this.projects.slice());
    }
  }
}

//Does this run for once or multiple times?
//The answer: Runs once for the first importer
export const projectState = ProjectState.getInstance();

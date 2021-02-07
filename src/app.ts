//Let's build a small project
//Let's write all the code here LOL!
//We will split the file later
//index.html and a css was provided. We need to write some code to make it all work
//tsc -w == Quick way to run tsc --watch

//Get access to the template form
class ProjectInput {
  //This would be better to be called as formTemplate
  //I'm not going to rename these or otherwise I'll get confused when following the tutorial
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  formElement: HTMLFormElement;

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
    //Constructor does a call to attach! This is unique
    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
  }
}

const projectInput = new ProjectInput();

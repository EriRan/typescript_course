// /// <reference path= "components/project-input.ts" />
// /// <reference path= "components/project-list.ts" />
//^3 forward slashes! This is important and it is not vanilla Javascript
//Namespaces: The imports from a namespace must be in same namespace...?

//Let's use ES6 modules instead because they are more convenient. The proble is that they only work on modern browsers
import { ProjectList } from "./components/project-list";
import { ProjectInput } from "./components/project-input";
//We could import the classes like autobind here so that they would be available in the component classes but it is better to have them imported in the classes themselves

//We need to import

//Let's build a small project
//index.html and a css was provided. We need to write some code to make it all work
//tsc -w == Quick way to run tsc --watch

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");

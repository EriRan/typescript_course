//Drag & Drop Interfaces
//Namespace is Typscript feature...?
//You can put anything into namespaces
//Namespaces can be replaced with ES6 modules

export interface Draggable {
  //Two event listeners
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

//Export == Is available outside of the file
export interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

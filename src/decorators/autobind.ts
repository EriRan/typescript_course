//Copied from git history hehe
export function Autobind(
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

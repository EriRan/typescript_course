//Lodash is a vanilla Javacript library
//NoOmitOnError would fix this
//We have to live with the fact that the library is a Javascript library. Its a common scenario. We have to translate the library to Typescript
//file.d.ts == Declaration file
//When working with a library that is not written in Typescript, type package is a solution
import _ from "lodash";

console.log(_.shuffle([1, 2, 3]));

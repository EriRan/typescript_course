import "reflect-metadata";
import { plainToClass } from "class-transformer";

import { Product } from "./product.model";

import { validate } from "class-validator";

const products = [
  { title: "Cool book", price: 3022 },
  { title: "Mystery of the Pedro", price: 101010 },
];

//If we want to transform regular Javascript objects into Typescript defined objects, we need to convert them
//class-transformer will help with this
// const loadedProducts = products.map((product) => {
//   return new Product(product.title, product.price);
// });

//This is the way using class-transformer
const loadedProducts = plainToClass(Product, products);

for (const product of loadedProducts) {
  console.log(product.getInformation());
}

//Next up: class-validator
//This is better than in the decorators module
const failedProduct = new Product("", -11);
validate(failedProduct).then((errors) => {
  if (errors.length > 0) {
    console.log("Validation errors!");
    console.log(errors);
  } else {
    console.log(failedProduct.getInformation());
  }
});
console.log(failedProduct.getInformation());

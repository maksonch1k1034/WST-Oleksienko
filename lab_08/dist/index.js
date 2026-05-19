"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const services_1 = require("./services");
const productService = new services_1.ProductService();
const cart = new services_1.Cart();
const products = [
    new models_1.Product(1, "Laptop", 45000, "Electronics", true),
    new models_1.Product(2, "Phone", 30000, "Electronics", true),
    new models_1.Product(3, "Sofa", 30000, "Furniture", false),
    new models_1.Product(4, "Book", 500, "Books", true),
    new models_1.DiscountedProduct(5, "Table", 12000, "Furniture", true, 15),
    new models_1.DiscountedProduct(6, "Headphones", 5000, "Electronics", true, 10)
];
products.forEach(product => {
    productService.addProduct(product);
});
console.log("Усі товари:");
console.log(productService.getAll());
console.log("Товари категорії Electronics:");
console.log(productService.getByCategory("Electronics"));
console.log("Товари в наявності:");
console.log(productService.getInStock());
cart.add(products[0]);
cart.add(products[2]);
cart.add(products[4]);
console.log("Кошик:");
console.log(cart.getItems());
console.log("Загальна сума:");
console.log(cart.getTotal());
cart.remove(3);
console.log("Кошик після видалення:");
console.log(cart.getItems());
console.log("Нова сума:");
console.log(cart.getTotal());

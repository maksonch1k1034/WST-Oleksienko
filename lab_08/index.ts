import { Product, DiscountedProduct } from "./models";
import { ProductService, Cart } from "./services";

// Завдання 6. Створення сервісу товарів і кошика
const productService = new ProductService();
const cart = new Cart();

// Завдання 6. Створення масиву товарів
const products = [
    new Product(1, "Laptop", 45000, "Electronics", true),
    new Product(2, "Phone", 30000, "Electronics", true),
    new Product(3, "Sofa", 30000, "Furniture", false),
    new Product(4, "Book", 500, "Books", true),
    new DiscountedProduct(5, "Table", 12000, "Furniture", true, 15),
    new DiscountedProduct(6, "Headphones", 5000, "Electronics", true, 10)
];

// Завдання 6. Додавання товарів до ProductService
products.forEach(product => {
    productService.addProduct(product);
});

// Завдання 6. Виведення всіх товарів
console.log("Усі товари:");
console.log(productService.getAll());

console.log("Товари категорії Electronics:");
console.log(productService.getByCategory("Electronics"));

console.log("Товари в наявності:");
console.log(productService.getInStock());

// Завдання 6. Додавання товарів до кошика
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
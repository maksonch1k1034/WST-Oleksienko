"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = exports.ProductService = void 0;
class ProductService {
    constructor() {
        this.products = [];
    }
    getAll() {
        return this.products;
    }
    getByCategory(category) {
        return this.products.filter(product => product.category === category);
    }
    getInStock() {
        return this.products.filter(product => product.inStock);
    }
    findById(id) {
        return this.products.find(product => product.id === id);
    }
    addProduct(product) {
        this.products.push(product);
    }
}
exports.ProductService = ProductService;
class Cart {
    constructor() {
        this._items = [];
    }
    get items() {
        return this._items;
    }
    add(product) {
        this._items.push(product);
    }
    remove(id) {
        this._items = this._items.filter(product => product.id !== id);
    }
    getTotal() {
        const total = this._items.reduce((sum, product) => sum + product.price, 0);
        return Number(total.toFixed(2));
    }
    getItems() {
        return this._items;
    }
    clear() {
        this._items = [];
    }
}
exports.Cart = Cart;

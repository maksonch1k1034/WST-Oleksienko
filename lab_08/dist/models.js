"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountedProduct = exports.Product = exports.BaseEntity = void 0;
class BaseEntity {
}
exports.BaseEntity = BaseEntity;
class Product extends BaseEntity {
    constructor(id, name, price, category, inStock) {
        super();
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.inStock = inStock;
    }
    describe() {
        return `${this.name} - ${this.formattedPrice}`;
    }
    get formattedPrice() {
        return `UAH ${this.price.toFixed(2)}`;
    }
}
exports.Product = Product;
class DiscountedProduct extends Product {
    constructor(id, name, price, category, inStock, discount) {
        super(id, name, price, category, inStock);
        this.discount = discount;
    }
    get formattedPrice() {
        const discountedPrice = this.price * (1 - this.discount / 100);
        return `UAH ${discountedPrice.toFixed(2)}`;
    }
    describe() {
        return `${this.name} - ${this.formattedPrice}, discount: ${this.discount}%`;
    }
}
exports.DiscountedProduct = DiscountedProduct;

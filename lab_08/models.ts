// Завдання 2. Опис інтерфейсу товару
export interface IProduct {
    id: number;
    name: string;
    price: number;
    category: string;
    inStock: boolean;
}

// Завдання 2. Опис інтерфейсу кошика
export interface ICart {
    items: IProduct[];
    getTotal(): number;
}

// Завдання 3. Абстрактний клас BaseEntity
export abstract class BaseEntity {
    id!: number;
    abstract describe():string;
}

// Завдання 3. Клас Product, який реалізує IProduct і наслідує BaseEntity
export class Product extends BaseEntity implements IProduct {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public category: string,
        public inStock: boolean
    ) {
        super();
    }

    // Метод повертає опис товару
    describe(): string {
        return `${this.name} - ${this.formattedPrice}`;
    }
      
    // Гетер повертає ціну у форматі UAH
    get formattedPrice(): string {
        return `UAH ${this.price.toFixed(2)}`;
    }
}

// Завдання 3. Клас DiscountedProduct, який наслідує Product
export class DiscountedProduct extends Product {
    constructor(
        id: number,
        name: string,
        price: number,
        category: string,
        inStock: boolean,
        public discount: number
    ) {
        super(id, name, price, category, inStock);
    }

     // Перевизначений гетер, який враховує знижку
    override get formattedPrice(): string {
        const discountedPrice = this.price * (1 - this.discount / 100);
        return `UAH ${discountedPrice.toFixed(2)}`;
    }

    // Перевизначений метод з додаванням інформації про знижку
    override describe(): string {
        return `${this.name} - ${this.formattedPrice}, discount: ${this.discount}%`;
    }
}
import { IProduct, ICart } from "./models";

// Завдання 4. Клас ProductService для роботи з товарами
export class ProductService {
    private products: IProduct[] = [];

    getAll(): IProduct[] {
        return this.products;
    }

    getByCategory(category: string): IProduct[] {
        return this.products.filter(product => product.category === category); // взяти кожен товар і перевірити, чи його категорія дорівнює тій категорії, яку ми передали.
    }

     getInStock(): IProduct[] {
        return this.products.filter(product => product.inStock);
    }

    findById(id: number): IProduct | undefined {
        return this.products.find(product => product.id === id);
    }

    addProduct(product: IProduct): void {
        this.products.push(product);
    }
}

// Завдання 5. Клас Cart, який реалізує інтерфейс ICart
export class Cart implements ICart {
    private _items: IProduct[] = [];

    get items(): IProduct[] {
        return this._items;
    }

    add(product: IProduct): void {
        this._items.push(product);
    }

    remove(id: number): void {
        this._items = this._items.filter(product => product.id !== id);
    }

    getTotal(): number {
        const total = this._items.reduce((sum, product) => sum + product.price, 0);
        return Number(total.toFixed(2));
    }

    getItems(): IProduct[] {
        return this._items;
    }

    clear(): void {
        this._items = [];
    }
}

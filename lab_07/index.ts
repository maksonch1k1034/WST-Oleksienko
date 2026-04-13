import { getAllWorkers } from "./workers";
import { Worker, Category } from "./interfaces";

// Завдання 1
/**
 * Виводить першого доступного працівника
 */
function logFirstAvailable(workers: Worker[] = getAllWorkers()): void {
    console.log(`Кількість працівників: ${workers.length}`);

    let firstAvailable: Worker | undefined;

    for (const worker of workers) {
        if (worker.available) {
            firstAvailable = worker;
            break;
        }
    }

    if (firstAvailable) {
        console.log(`Перший доступний працівник: ${firstAvailable.name} ${firstAvailable.surname}`);
    } else {
        console.log("Немає доступних працівників");
    }
}

// Завдання 2
/**
 * Повертає прізвища працівників по категорії
 */
function getWorkersSurnamesByCategory(category: Category = Category.Designer): string[] {
    const workers: Worker[] = getAllWorkers();
    const result: string[] = [];

    for (const worker of workers) {
        if (worker.category === category) {
            result.push(worker.surname);
        }
    }

    return result;
}

/**
 * Виводить список прізвищ
 */
function logWorkersNames(names: string[]): void {
    if (!names.length) {
        console.log("Список пустий");
        return;
    }

    console.log("Список прізвищ:");

    for (const name of names) {
        console.log(name);
    }
}

// Завдання 3
/**
 * Виводить всіх Developer
 */
function logDevelopers(): void {
    console.log("Developers: ");

    getAllWorkers()
        .filter((worker: Worker) => worker.category === Category.Developer)
        .forEach((worker: Worker) => {
            console.log(`${worker.name} ${worker.surname}`);
        });
}

/**
 * Пошук працівника по ID
 */
function getWorkerByID(id: number): string {
    if (id <= 0) {
        return "Невірний ID";
    }

    const worker: Worker | undefined = getAllWorkers().find((w: Worker) => w.id === id);

    if (worker) {
        return `${worker.name} ${worker.surname}, Salary: ${worker.salary}`;
    } else {
        return "Працівника не знайдено";
    }
}

// Завдання 4
/**
 * Створює ID клієнта
 */
function createCustomerID(name: string, id: number): string {
    return `${name}_${id}`;
}

// Завдання 5.1
/**
 * Виводить інформацію про клієнта
 */
function createCustomer(name: string, age?: number, city?: string): void {
    if (!name) {
        console.log("Invalid name");
        return;
    }

    console.log(`Customer name: ${name}`);

    if (age !== undefined) {
        console.log(`Age: ${age}`);
    }

    if (city !== undefined) {
        console.log(`City: ${city}`);
    }
}

// Завдання 5.4
/**
 * Повертає доступних працівників по ID
 */
function checkoutWorkers(customer: string, ...workerIDs: number[]): string[] {
    console.log(`Customer: ${customer}`);

    if (workerIDs.length === 0) {
        return [];
    }

    const result: string[] = [];

    for (const id of workerIDs) {
        const workerData: Worker | undefined = getAllWorkers().find((w: Worker) => w.id === id);

        if (workerData && workerData.available) {
            result.push(`${workerData.name} ${workerData.surname}`);
        }
    }

    return result;
}


// Завдання 1
console.log("Завдання 1")
const workers: Worker[] = getAllWorkers();
console.log(workers);
logFirstAvailable();

// Завдання 2
console.log("Завдання 2")
const devs: string[] = getWorkersSurnamesByCategory(Category.Developer);
logWorkersNames(devs);

// Завдання 3
console.log("Завдання 3")
logDevelopers();
console.log(getWorkerByID(2));

// Завдання 4
console.log("Завдання 4")
const myID: string = createCustomerID("Maksym", 1);
console.log("My ID:", myID);

let idGenerator: (name: string, id: number) => string;

idGenerator = (name: string, id: number): string => {
   return `${name}_${id}`;
}

console.log("Generated ID:", idGenerator("Test", 123));

idGenerator = createCustomerID;

console.log("Generated ID (через функцію):", idGenerator("Ivan", 77));

// Завданя 5.1
createCustomer("Maksym");
createCustomer("Maksym", 18);
createCustomer("Maksym", 18, "Kyiv");

// Завдання 5.2
console.log("Завдання 5.2");
const designers: string[] = getWorkersSurnamesByCategory();
logWorkersNames(designers);

// Завдання 5.3
console.log("Завдання 5.3");
logFirstAvailable();

// Завдання 5.(4,5)
console.log("Завдання 5.(4,5)");

const myWorkers: string[] = checkoutWorkers("Maksym", 1, 2, 3, 4);

myWorkers.forEach((worker: string) => {
    console.log(worker);
});
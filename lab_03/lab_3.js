console.log("Завдання 2"); // - Завдання 2
const data = [12, 5, 8, 20, 15, 7]; // - 2
function sum(array){  // - 3 (a)
    let sum = 0;
    for (let i = 0; i < array.length; i++)
    sum+=array[i];
    console.log("Сума: " + sum);
}
function average(array){  // - 3 (b)   
    let sum = 0;
    for(let i = 0; i < array.length; i++)
        sum+=array[i];
    average = sum / array.length;
    console.log("Середнє арифметичне: " + average);
}
function min(array){    // - 3 (c)
    let min = array[0];
    for (let i = 0; i < array.length; i++)
        if (array[i] < min){
            min = array[i];
        }
        console.log("Мінімальне значення: " + min);
}
function max(array){ // - 3 (d)
    let max = array[0];
    for (let i = 0; i < array.length; i++)
        if (array[i] > max){
            max = array[i];
        }
        console.log("Максимальне значення: " + max);
}
sum(data);
average(data);
min(data);
max(data);

console.log("Завдання 3"); // - Завдання 3
function calculateMonthlyPayment(sum, annualRate, 
months){ // - 4
    let r = annualRate / 12 / 100;
    let power = Math.pow(1 + r, months);
    let payment = sum * (r * power) / (power - 1);
    return Number(payment.toFixed(2)); // - 5
}
let result = calculateMonthlyPayment(100000, 12, 24);
console.log("Щомісячний платіж: " + result);

console.log("Завдання 4"); // - Завдання 4
function processArray(array, processor){ // - 2
    let result = [];
    for (let i = 0; i < array.length; i++){
        let processedValue = processor(array[i]);
        result.push(processedValue);
    }
    return result;
}
const data2 = processArray(data, function(element) {
    return element * 3;
});
console.log("Оброблений масив: " + data2);

console.log("Завдання 5"); // - Завдання 5
function sumNum(n) { // - 1 (a)
    if (n === 0) {
        return 0;
    }
    return (n % 10) + sumNum(Math.floor(n / 10));
}
function countNum(n) { // - 1 (b)
    if (n < 10) {
        return 1;
    }
    return 1 + countNum(Math.floor(n / 10));
}
function factorialNum(n) { // - 1 (c)
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorialNum(n - 1);
}
function factorialCycle(n) { // - 3 
    let result = 1;

    for (let i = 1; i <= n; i++) {
        result *= i;
    }

    return result;
}
console.log("Сума цифр числа 1234: " + sumNum(1234));
console.log("Кількість цифр числа 7777: " + countNum(7777));
console.log("рекурсія 4!: " + factorialNum(4));
console.log("цикл 4!: " + factorialCycle(4));
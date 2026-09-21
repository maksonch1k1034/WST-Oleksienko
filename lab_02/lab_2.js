// Завдання 2
console.log("Завдання 2"); // - 1, 2
console.log(typeof 123, typeof "Hello", typeof true, typeof undefined, typeof null, typeof 31244n, typeof Symbol());

let a; // - 3
let b = null;
let c = 0;
console.log(a);
console.log(b);
console.log(c);
// Завдання 3
console.log("Завдання 3"); 
let num1 = "0"; // - 1
let num2 = "123";
let num3 = "";
console.log(Number(num1), Number(num2), Number(num3));

let val1 = 0; // - 2
let val2 = 1;
let val3 = -1;
let val4 = null;
let val5 = undefined;
console.log(Boolean(val1),Boolean(val2),Boolean(val3),Boolean(val4),Boolean(val5));
// Завдання 4
console.log("Завдання 4"); 
console.log(Number ("5") + 2,Number ("5"-2), Number (true + 1), Number (false + 1), Number (null + 1)); // - 1, 2
// Завдання 5
console.log("Завдання 5");
console.log(0 == false, 0 ===false); // - 1
console.log("" == false, "" === false);
console.log(null == undefined, null === undefined);
console.log("5" == 5, "5" === 5);
// Завдання 6
console.log("Завдання 6");
let arr = [4, "hello", true, 8, "bye", 7]; // - 1
console.log(arr[1], arr[4]); // - 2
arr[2] = "change"; // - 3
console.log("Змінений 3 елемент: " + arr);
console.log("Довжина: " + arr.length, "Тип: " + typeof(arr)); // - 4, 5
// Завдання 7 
console.log("Завдання 7");
let student = { // - 1
    name:"Maksym", // - 2
    surname:"Oleksienko", 
    year:"2008",
    university:"Kyiv National University",
    status:"student"
};
console.log("Звертання до властивостей об'єкта: " + student.name); // - 3
console.log("Звертання до властивостей об'єкта: " + student["surname"]);
student.scholarship = true; // - 4
console.log(student);
student.scholarship = !student.scholarship; // - 5
delete student.year; // - 6
console.log(student);
// Завдання 8
console.log("Завдання 8");
let arr2 = [6, 2, 9, 4, 4, 5, 1, 8, 6, 7]; // - 1
let result = Array.from(new Set(arr2)).sort((a, b) => a - b); // - 2, 3
console.log(result);
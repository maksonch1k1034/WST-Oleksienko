console.log("Завдання 2"); // Завдання 2

const student = {
    firstName: "Максим",
    lastName: "Олексієнко",
    score: 85, 

    greet(){
        console.log(`Привіт, я ${this.firstName} ${this.lastName}, мій бал: ${this.score}`);
    }
};
student.greet(); // this вказує на об'єкт student

const greetFn = student.greet;
greetFn(); // this втрачається, бо метод викликається вже не через student

// 1 спосіб - bind прив'язує this до student
const greetBind = student.greet.bind(student);
greetBind();

// 2 спосіб - стрілочна функція викликає метод через student
const greetArrow = () => student.greet();
greetArrow();

// 3 спосіб - зберігаємо об'єкт student у змінну self
const self = student;

const greetSelf = function () {
    console.log(`Привіт, я ${self.firstName} ${self.lastName}, мій бал: ${self.score}`);
};
greetSelf();

console.log("Завдання 3"); // Завдання 3

function introduce(greeting, punctuation) {
    console.log(`${greeting}, мене звуть ${this.firstName} ${this.lastName}${punctuation}`);
}


const person1 = {
    firstName: "Максим",
    lastName: "Олексієнко"
};

const person2 = {
    firstName: "Олег", 
    lastName: "Шевченко"
};

// call - викликає функцію і передає їй контекст this = person 1 (передає аргументи окремо)
introduce.call(person1, "Добрий день", "!");

// apply - викликає функцію і передає їй контекст this = person 2 (передає аргументи масивом)
introduce.apply(person2, ["Добрий день", "!"]);

console.log("Завдання 4"); // Завдання 4

function calculateTax(rate, bonus) {
    const tax = (this.salary + bonus) * rate / 100;

    return `Податок для ${this.name}: ${tax} UAH`;
}


const employee = {
    name: "Максим", 
    salary: 20000
}

// bind- прив'язує контекст this до об'єкта employee (створює нову функцію, яка при виклику прив'язується до певного контексту)
const calculateEmployeeTax = calculateTax.bind(employee, 18);

console.log(calculateEmployeeTax(1000));
console.log(calculateEmployeeTax(3000));
console.log(calculateEmployeeTax(5000));

// Додатково: Часткове застосування — це коли ми заздалегідь фіксуємо частину аргументів функції (this = employee, rate = 18 і bonus = 2000.)
const calculateFixedTax = calculateTax.bind(employee, 18, 2000);

console.log(calculateFixedTax());

 // Завдання 5

  const timer = {
    name: "Таймер",
    seconds: 0,

    start() {
        const intervalId = setInterval(function () {
            this.seconds++;
            console.log(`${this.name}: ${this.seconds} сек`);
        }.bind(this), 1000); // Без bind звичайна функція всередині setInterval втратила б this,і this.seconds та this.name не бралися б з об'єкта timer.

       
        setTimeout(function () {
            clearInterval(intervalId);
            console.log("Таймер зупинено");
        }, 5000);
    }
};

timer.start();

console.log("Завдання 6"); // Завдання 6

{
    function myBind(fn, context, ...fixedArgs) { // context — це об'єкт, який буде використовуватися як this
        return function (...args) {   // args — це аргументи, які передаємо вже під час виклику нової функції
            return fn.apply(context, [...fixedArgs, ...args]); // apply викликає fn з потрібним this і передає всі аргументи масивом
        };
    }

    function calculateTax(rate, bonus) {
        const tax = (this.salary + bonus) * rate / 100;

        return `Податок для ${this.name}: ${tax} UAH`;
    }

    const employee = {
        name: "Максим",
        salary: 20000
    };

    const calculateEmployeeTax = myBind(calculateTax, employee, 18);

    console.log(calculateEmployeeTax(1000));
    console.log(calculateEmployeeTax(3000));

    const calculateFixedTax = myBind(calculateTax, employee, 18, 2000);

    console.log(calculateFixedTax());
}
console.log("Завдання 5");
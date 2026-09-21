console.log("Завдання 2"); // Завдання 2

// Очікуваний порядок виведення: 1, 4, 3, 2
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");

console.log("Складніший приклад");

// Очікуваний порядок виведення: A, F, E, B, C, D
console.log("A");

setTimeout(() => {
    console.log("B");

    Promise.resolve().then(() => {
        console.log("C");
    });

    setTimeout(() => {
        console.log("D");
    }, 0);
}, 0);

Promise.resolve().then(() => {
    console.log("E");
});

console.log("F");

console.log("Завдання 3") // Завдання 3

function loadData(id, callback) {
    setTimeout(function () {
        const data = {
            id: id,
            name: "Товар " + id,
            price: id * 100
        };

        console.log("Дані завантажено:", data);

        callback(data);
    }, 1000);
}

function processData(data, callback) {
    setTimeout(function () {
        const processedData = {
            ...data,
            processed: true
        };

        console.log("Дані оброблено:", processedData);

        callback(processedData);
    }, 500);
}

function saveData(data, callback) {
    setTimeout(function () {
        console.log(`Збережено: ${data.name}`);

        callback(data);
    }, 500);
}

loadData(1, function (data) {
    processData(data, function (processedData) {
        saveData(processedData, function () {});
    });
});
// Проблема callback-підходу в тому, що при великій кількості послідовних асинхронних операцій код стає вкладеним і менш зручним для читання.
// Також у callback-підході складніше обробляти помилки, бо їх потрібно передавати вручну в кожен наступний callback.

console.log("Завдання 4"); // Завдання 4

{
    function loadData(id) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (id <= 0) {
                    reject("Некоректний id товару");
                    return;
                }

                const data = {
                    id: id,
                    name: "Товар " + id,
                    price: id * 100
                };

                console.log("Дані завантажено:", data);

                resolve(data);
            }, 1000);
        });
    }

    function processData(data) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                const processedData = {
                    ...data,
                    processed: true
                };

                console.log("Дані оброблено:", processedData);

                resolve(processedData);
            }, 500);
        });
    }

    function saveData(data) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                console.log(`Збережено: ${data.name}`);

                resolve(data);
            }, 500);
        });
    }

    // Кожен .then() отримує результат попереднього Promise і передає його в наступну асинхронну операцію.
    loadData(1)
        .then(function (data) {
            return processData(data);
        })
        .then(function (processedData) {
            return saveData(processedData);
        })
        .then(function () {
            console.log("Послідовне виконання завершено");

            return Promise.all([
                loadData(1),
                loadData(2),
                loadData(3)
            ]);
        })
        .then(function (products) {
            console.log("Одночасно завантажені товари:", products);
        })
        .catch(function (error) {
            console.log("Помилка:", error);
        });
}

console.log("Завдання 5"); // Завдання 5

{
    function loadData(id) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (id <= 0) {
                    reject("Некоректний id товару");
                    return;
                }

                const data = {
                    id: id,
                    name: "Товар " + id,
                    price: id * 100
                };

                console.log("Дані завантажено:", data);

                resolve(data);
            }, 1000);
        });
    }

    function processData(data) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                const processedData = {
                    ...data,
                    processed: true
                };

                console.log("Дані оброблено:", processedData);

                resolve(processedData);
            }, 500);
        });
    }

    function saveData(data) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                console.log(`Збережено: ${data.name}`);

                resolve(data);
            }, 500);
        });
    }

    async function run() {
        try {
            const data = await loadData(1); // await зупиняє виконання функції run, поки Promise не завершиться.
            const processedData = await processData(data);
            await saveData(processedData);
           
            const products = await Promise.all([  // Promise.all запускає всі loadData одночасно і чекає завершення всіх.
                loadData(1),
                loadData(2),
                loadData(3)
            ]);

            console.log("Паралельно завантажені товари:", products);

        } catch (error) {
            console.log("Помилка:", error);
        }
    }
    // Callback-підхід має велику вкладеність і гірше читається.
    // Promise.then() зменшує вкладеність, але при довгих ланцюжках код все одно може бути не дуже зручним.
    // async/await читається найпростіше, бо асинхронний код виглядає майже як звичайний послідовний код.
    run();
}

console.log("Завдання 6"); // Завдання 6

async function fetchWithRetry(promiseFn, retries) {
    for (let i = 1; i <= retries; i++) {
        try {
            console.log(`Спроба ${i}`);
            return await promiseFn();
        } catch (error) {
            if (i === retries) {
                throw error;
            }
        }
    }
}

function randomFetch() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (Math.random() < 0.7) {
                reject("Випадкова помилка");
                return;
            }

            resolve("Дані успішно завантажено");
        }, 500);
    });
}

fetchWithRetry(randomFetch, 5)
    .then(function (result) {
        console.log("Результат:", result);
    })
    .catch(function (error) {
        console.log("Усі спроби невдалі:", error);
    });
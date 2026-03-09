// Очищуємо body та встановлюємо базові стилі
document.body.classList.add('body');

// Створюємо контейнер для всього контенту
const container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

// Створюємо заголовок сторінки
const header = document.createElement('header');
header.className = 'header';

const mainTitle = document.createElement('h1');
mainTitle.className = 'mainTitle';
mainTitle.textContent = 'Джон фон Нойман';

const subtitle = document.createElement('p');
subtitle.className = 'subtitle';
subtitle.textContent = '1903-1957 | Математик, фізик, піонер комп\'ютерних наук';

header.appendChild(mainTitle);
header.appendChild(subtitle);
container.appendChild(header);

// Створюємо секцію з фото та коротким описом
const introSection = document.createElement('section');
introSection.className = 'intro-section';

// Створюємо блок для "фото" (замість реального фото - кольоровий блок)
const photoBlock = document.createElement('div');
photoBlock.className = 'photoBlock';
photoBlock.textContent = '📐 Джон фон Нойман';

// Створюємо блок з коротким описом
const introText = document.createElement('div');
introText.className = 'introText';

const introHeading = document.createElement('h2');
introHeading.className = 'introHeading';
introHeading.textContent = 'Про Джона фон Ноймана';

const introParagraph = document.createElement('p');
introParagraph.textContent = 'Джон фон Нойман був угорсько-американським математиком, фізиком та ученим у галузі комп\'ютерних наук. Він зробив величезний внесок у багато галузей, включаючи математику, фізику, економіку, обчислювальну техніку та статистику. Його ім\'я назавжди пов\'язане з архітектурою комп\'ютерів, яка використовується і сьогодні.';

introText.appendChild(introHeading);
introText.appendChild(introParagraph);
introSection.appendChild(photoBlock);
introSection.appendChild(introText);
container.appendChild(introSection);

// Створюємо секцію з основними досягненнями
const achievementsSection = document.createElement('section');
achievementsSection.className = 'achievements-section';

const achievementsTitle = document.createElement('h2');
achievementsTitle.textContent = 'Основні досягнення';

achievementsSection.appendChild(achievementsTitle);

// Масив з досягненнями
const achievements = [
    {
        title: 'Архітектура фон Ноймана',
        description: 'Розробив концепцію комп\'ютерної архітектури, де програми і дані зберігаються в одній пам\'яті. Ця архітектура є основою сучасних комп\'ютерів.'
    },
    {
        title: 'Теорія ігор',
        description: 'Разом з Оскаром Моргенштерном заклав основи математичної теорії ігор, яка застосовується в економіці, політології та біології.'
    },
    {
        title: 'Квантова механіка',
        description: 'Внесок у математичні основи квантової механіки, включаючи формалізацію гільбертових просторів.'
    },
    {
        title: 'Манхеттенський проект',
        description: 'Брав участь у розробці атомної бомби, проводив складні обчислення для проекту.'
    }
];

// Створюємо картки для кожного досягнення
achievements.forEach((achievement, index) => {
    const card = document.createElement('div');
    card.className = 'card';

    const cardTitle = document.createElement('h3');
    cardTitle.textContent = `${index + 1}. ${achievement.title}`;

    const cardDescription = document.createElement('p');
    cardDescription.textContent = achievement.description;

    card.appendChild(cardTitle);
    card.appendChild(cardDescription);
    achievementsSection.appendChild(card);
});

container.appendChild(achievementsSection);

// Створюємо секцію з цікавими фактами
const factsSection = document.createElement('section');
factsSection.className = 'facts-section';

const factsTitle = document.createElement('h2');
factsTitle.textContent = 'Цікаві факти';

factsSection.appendChild(factsTitle);

const factsList = document.createElement('ul');
factsList.className = 'factsList';

// Масив з фактами
const facts = [
    'Міг множити в умі два восьмизначних числа у віці шести років',
    'Володів фотографічною пам\'яттю і міг процитувати цілі сторінки книг',
    'Говорив кількома мовами, включаючи угорську, німецьку, французьку та англійську',
    'Любив жартувати і був відомий своїм почуттям гумору',
    'Працював над створенням одного з перших комп\'ютерів - EDVAC'
];

// Створюємо список фактів
facts.forEach(fact => {
    const listItem = document.createElement('li');
    listItem.className = 'listItem';
    listItem.textContent = '💡 ' + fact;
    factsList.appendChild(listItem);
});

factsSection.appendChild(factsList);
container.appendChild(factsSection);

// Створюємо цитату
const quoteSection = document.createElement('section');
quoteSection.className = 'quoteSection';

const quote = document.createElement('blockquote');
quote.className = 'quote';
quote.textContent =
'"Якщо люди не вірять, що математика проста, це тільки тому, що вони не усвідомлюють, наскільки складне життя"';

const quoteAuthor = document.createElement('p');
quoteAuthor.className = 'quoteAuthor';
quoteAuthor.textContent = '— Джон фон Нойман';

quoteSection.appendChild(quote);
quoteSection.appendChild(quoteAuthor);
container.appendChild(quoteSection);

// Створюємо footer
const footer = document.createElement('footer');
footer.className = 'footer';

const footerText = document.createElement('p');
footerText.className = 'footerText';
footerText.textContent = '© 2024 | Сторінка створена за допомогою JavaScript DOM маніпуляцій';

footer.appendChild(footerText);
container.appendChild(footer);

// Додаємо анімацію появи для всіх секцій
const sections = container.querySelectorAll('section');

sections.forEach((section, index) => {
    section.classList.add('section-hidden');

    setTimeout(() => {
        section.classList.add('section-visible');
    }, 150 * index);
});
// - Header
const header = document.createElement("div");
header.classList.add("header");

const headertitle = document.createElement("h1");
headertitle.classList.add("headertitle");
headertitle.textContent = "Луї де Фюнес";

const headerRight = document.createElement("div");
headerRight.classList.add("header-right");

const  homeLink = document.createElement("a");
homeLink.classList.add("active");
homeLink.textContent = "Головна";
homeLink.href = "../index.html";

headerRight.appendChild(homeLink);
header.appendChild(headertitle);
header.appendChild(headerRight);
document.body.appendChild(header);

// - Main
const main = document.createElement("main");
main.classList.add("maincontent")

const bioSection = document.createElement("section");
bioSection.classList.add("sectionBio");

const bioTittle = document.createElement("h2");
bioTittle.textContent = "Біографія";

const bioDiv = document.createElement("div");
bioDiv.classList.add("bio");

bioSection.appendChild(bioTittle);
bioSection.appendChild(bioDiv);
main.appendChild(bioSection);
document.body.appendChild(main);

const bioTextContainer = document.createElement("div");
bioTextContainer.classList.add("div");

const p1 = document.createElement("p");
p1.innerHTML = "<strong>Луї де Фюнес</strong> (1914 - 1983) — легендарний французький комік, чий шлях до слави був довгим: він працював джазовим піаністом і отримував лише епізодичні ролі до 40 років.";

const p2 = document.createElement("p");
p2.textContent = "Справжній успіх прийшов до нього у 1960-х завдяки неймовірній міміці та образам запальних, але кумедних персонажів у фільмах про Фантомаса та жандарма Крюшо."

const p3 = document.createElement("p");
p3.textContent = "Поза екраном актор був досить замкненою людиною, обожнював свою родину та пристрасно захоплювався вирощуванням троянд у своєму замку Клермон. Попри славу «короля сміху», він мав слабке здоров'я і пережив два інфаркти, але продовжував зніматися до останніх років життя.";

const p4 = document.createElement("p");
p4.textContent = " Свою знамениту міміку він запозичив у Дональда Дака з мультфільмів Волта Діснея. Також він казав, що його головним вчителем комедії була власна мати, яка мала вибуховий темперамент і неймовірне почуття часу.";

const p5 = document.createElement("p");
p5.textContent = "Попри екранний образ некерованого дивака, у роботі він був надзвичайно дисциплінованим. Щоб не проспати зйомки, актор заводив одразу три будильники.";


bioTextContainer.append(p1, p2, p3, p4, p5);

const figure = document.createElement("figure");
figure.classList.add("image");

const img = document.createElement("img");
img.src = "img/image.png";  
img.alt = "Louis_de_Funes";

const figcaption = document.createElement("figcaption");
figcaption.textContent = "Луї де Фюнес";

figure.append(img, figcaption);
bioDiv.append(bioTextContainer, figure);

const divFacts = document.createElement("div");
divFacts.classList.add("dates-and-life");

main.appendChild(divFacts);

const sectionFacts = document.createElement("section");
sectionFacts.classList.add("sectiondates");

const importantDates = document.createElement("h3");
importantDates.textContent = "Важливі дати";

const ulFacts = document.createElement("ul");

sectionFacts.append(importantDates, ulFacts);
divFacts.appendChild(sectionFacts);

const dates = [
"1914 - народився в Курбевуа, Франція, у родині іспанських аристократів.",
"1936 - перший шлюб із Жермен Луїзою Елоді Карруайє (розлучилися в 1942 році).",
"1943 - одруження з Жанною Огюстіною де Бартелемі де Мопассан.",
"1983 - помер від серцевого нападу в Нанті у віці 68 років."
];

dates.forEach(date => {
    const li = document.createElement("li");
    li.textContent = date;
    ulFacts.appendChild(li);
});

const sectionLife = document.createElement("section");
sectionLife.classList.add("life-section");

const sectionTitle = document.createElement("h3");
sectionTitle.textContent = "Життя і робота";

sectionLife.appendChild(sectionTitle);
divFacts.appendChild(sectionLife);

const lifeFlex = document.createElement("div");
lifeFlex.classList.add("life-flex");

sectionLife.appendChild(lifeFlex);

const lifeText = document.createElement("div");
lifeText.classList.add("text");

const lifeP = document.createElement("p");
lifeP.textContent = "Шлях Луї де Фюнеса до всесвітньої слави був довгим і тернистим, адже, провівши десятиліття у безвісних епізодичних ролях та підробляючи джазовим піаністом, він лише на порозі свого п'ятдесятиріччя зумів перетворити власну експресивну міміку та неймовірний комедійний темперамент на легендарні образи жандарма Крюшо і комісара Жюва, ставши при цьому в реальному житті замкнутим аристократом, який понад усе любив тишу свого замку та вирощування власних троянд.";

lifeText.appendChild(lifeP);
lifeFlex.appendChild(lifeText);

const figureVideo = document.createElement("figure");
figureVideo.classList.add("video");

const iframe = document.createElement("iframe");
iframe.src = "https://www.youtube.com/embed/ugHPJOC9lGk";
iframe.width = "100%";
iframe.height = "100%";
iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
iframe.allowFullscreen = true;

const figcaptionVideo = document.createElement("figcaption");
figcaptionVideo.textContent = "Луї де Фюнес у кіно";

figureVideo.append(iframe, figcaptionVideo);
lifeFlex.appendChild(figureVideo);

const sectionMemory = document.createElement("section");
sectionMemory.classList.add("memory");

const sectionHeader = document.createElement("h2");
sectionHeader.textContent = "Пам'ять сучасників";

const memoryDiv = document.createElement("div");

const memoryP1 = document.createElement("p");
memoryP1.textContent = "Сучасники згадують Луї де Фюнеса як неймовірного перфекціоніста, який за маскою ексцентричного коміка приховував глибоку інтелігентність та відданість своїй професії."

const memoryP2 = document.createElement("p");
memoryP2.textContent = " Для мільйонів глядачів він залишився символом золотої епохи французького кіно, чий талант досі зцілює сміхом і викликає теплу ностальгію за щирим мистецтвом.";

memoryDiv.append(memoryP1, memoryP2);

sectionMemory.append(sectionHeader, memoryDiv);

main.appendChild(sectionMemory);

// - Footer
const footer = document.createElement("footer");
footer.classList.add("page-footer");

const footerDiv1 = document.createElement("div");
footerDiv1.classList.add("footer1");

const footerDiv2 = document.createElement("div");
footerDiv2.classList.add("footer2");

const footerP1 = document.createElement("p");
footerP1.textContent = "Кафедра інформаційних систем та технологій";

const footerP2 = document.createElement("p");
footerP2.textContent = "Київський національний університет імені Тараса Шевченка";

footerDiv2.append(footerP1, footerP2);

const footerDiv3 = document.createElement("div");
footerDiv3.classList.add("footer3");

const footerLink = document.createElement("a");
footerLink.classList.add("footer-email");
footerLink.href = "mailto:maksymoleksienko13@gmail.com";
footerLink.textContent = "04116, м. Київ";

const br = document.createElement("br");

const room = document.createElement("p");
room.textContent = "405 каб.";

footerDiv3.append(footerLink, br, room);

footerDiv1.append(footerDiv2, footerDiv3);


const copyright = document.createElement("p");
copyright.classList.add("footer-copyright");
copyright.textContent = "Олексієнко Максим Павлович (с) 2025";

footer.append(footerDiv1, copyright);

document.body.appendChild(footer);
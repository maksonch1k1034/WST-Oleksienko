import './styles/main.scss';
import type { Teacher } from './types/teacher';
import { fetchTeachers } from './services/apiService';
import { renderTeacherCards } from './components/teacherCard';
import { renderTeacherTable } from './components/teacherTable';
import {
  getPagesCount,
  paginate,
  renderPagination,
} from './components/pagination';
import {
  closeTeacherModal,
  openTeacherModal,
} from './components/teacherModal';
import {
  closeAddTeacherModal,
  createTeacherFromForm,
  openAddTeacherModal,
} from './components/teacherForm';
import {
  addCustomTeacher,
  applyFavoriteState,
  getCustomTeachers,
  getFavoriteTeacherIds,
  toggleFavoriteTeacher,
} from './services/storageService';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App container not found');
}

app.innerHTML = `
  <div class="page">
    <header class="header">
      <div class="header__top">
        <a class="logo" href="#" aria-label="Teachinder home">
        <img src="/teachinder-logo.svg" alt="Teachinder" />
        </a>

        <form class="search" id="searchForm">
          <input
            class="search__input"
            id="searchInput"
            type="search"
            placeholder="Name, note or age to search"
          />
          <button class="button button--small" type="submit">Search</button>
        </form>
      </div>

      <div class="header__bottom">
        <nav class="nav">
          <a href="#teachers">Teachers</a>
          <a href="#statistics">Statistics</a>
          <a href="#favorites">Favorites</a>
          <a href="#about">About</a>
        </nav>

        <button class="button button--outline" id="openAddTeacherButton" type="button">
          Add teacher
        </button>
      </div>
    </header>

    <main>
      <section class="section" id="teachers">
        <div class="section-title">
          <h2>Top Teachers</h2>
        </div>

        <form class="filters">
          <label>
            Age
            <select id="ageFilter">
            <option value="">All</option>
            <option value="18-31">18-31</option>
            <option value="32-45">32-45</option>
            <option value="46-60">46-60</option>
            <option value="61-90">61-90</option>
            </select>
          </label>

          <label>
            Region
            <select id="regionFilter">
            <option value="">All</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="America">America</option>
            <option value="Australia">Australia</option>
            </select>
          </label>

          <label>
            Sex
            <select id="genderFilter">
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            </select>
          </label>

          <label class="checkbox">
            <input id="photoFilter" type="checkbox" />
            Only with photo
          </label>

          <label class="checkbox">
            <input id="favoritesFilter" type="checkbox" />
            Only favorites
          </label>
        </form>

        <div class="teachers-grid" id="topTeachersList"></div>
      </section>

      <section class="section" id="statistics">
        <div class="section-title">
          <h2>Statistics</h2>
        </div>

        <div class="table-wrap" id="statisticsTable"></div>

        <div class="pagination" id="pagination"></div>
      </section>

      <section class="section" id="favorites">
        <div class="section-title">
          <h2>Favorites</h2>
        </div>

        <div class="favorites">
          <button class="slider-button" type="button" data-favorites-scroll="left">‹</button>
<div class="favorites-list" id="favoritesList"></div>
<button class="slider-button" type="button" data-favorites-scroll="right">›</button>
        </div>
      </section>

      <section class="about" id="about">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque facere, hic impedit itaque molestiae sit tempore? Ea in mollitia natus rerum voluptates. Eos excepturi facere tempora. Aliquid asperiores hic impedit iusto natus quaerat ratione sit? Culpa iusto optio voluptas voluptate. Enim eveniet fugit iure maiores molestiae, praesentium quia.

        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
          eligendi illum in inventore ipsum odio officiis omnis quisquam sed
          tempora?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque esse
          expedita id iusto mollitia, odit sint ullam veritatis vero?
        </p>
      </section>
    </main>

    <footer class="footer">
      <nav class="nav">
        <a href="#teachers">Teachers</a>
        <a href="#statistics">Statistics</a>
        <a href="#favorites">Favorites</a>
        <a href="#about">About</a>
      </nav>

      <button class="button button--outline" id="footerAddTeacherButton" type="button">
      Add teacher
      </button>
    </footer>
  </div>
`;

const topTeachersList = document.querySelector<HTMLElement>('#topTeachersList');
const statisticsTable = document.querySelector<HTMLElement>('#statisticsTable');
const paginationContainer = document.querySelector<HTMLElement>('#pagination');
const favoritesList = document.querySelector<HTMLElement>('#favoritesList');

const searchForm = document.querySelector<HTMLFormElement>('#searchForm');
const searchInput = document.querySelector<HTMLInputElement>('#searchInput');
const ageFilter = document.querySelector<HTMLSelectElement>('#ageFilter');
const regionFilter = document.querySelector<HTMLSelectElement>('#regionFilter');
const genderFilter = document.querySelector<HTMLSelectElement>('#genderFilter');
const photoFilter = document.querySelector<HTMLInputElement>('#photoFilter');
const favoritesFilter = document.querySelector<HTMLInputElement>('#favoritesFilter');

let teachers: Teacher[] = [];
let filteredTeachers: Teacher[] = [];
const teachersPerPage = 10;
let currentPage = 1;

/**
 * Перевіряє, чи належить країна викладача до вибраного регіону.
 *
 * @param country - країна викладача
 * @param region - вибраний регіон
 * @returns true, якщо країна відповідає вибраному регіону
 */

function isCountryInRegion(country: string, region: string): boolean {
  const regions: Record<string, string[]> = {
    Europe: [
      'Ukraine',
      'Germany',
      'France',
      'Italy',
      'Netherlands',
      'Ireland',
      'Finland',
      'Denmark',
      'Norway',
      'Spain',
      'United Kingdom',
      'Serbia',
      'Turkey',
    ],
    Asia: ['India', 'Iran', 'China', 'Japan'],
    America: ['United States', 'Canada', 'Brazil', 'Mexico'],
    Australia: ['Australia'],
  };

  return regions[region]?.includes(country) ?? true;
}

/**
 * Застосовує пошук і вибрані фільтри до списку викладачів.
 * Після фільтрації оновлює filteredTeachers і повертає пагінацію на першу сторінку.
 */

function applyFilters(): void {
  const searchValue = searchInput?.value.trim().toLowerCase() ?? '';
  const ageValue = ageFilter?.value ?? '';
  const regionValue = regionFilter?.value ?? '';
  const genderValue = genderFilter?.value ?? '';
  const onlyWithPhoto = photoFilter?.checked ?? false;
  const onlyFavorites = favoritesFilter?.checked ?? false;

  filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.fullName.toLowerCase().includes(searchValue) ||
      teacher.note.toLowerCase().includes(searchValue) ||
      String(teacher.age).includes(searchValue);

    const matchesAge = ageValue
      ? teacher.age >= Number(ageValue.split('-')[0]) &&
        teacher.age <= Number(ageValue.split('-')[1])
      : true;

    const matchesRegion = regionValue
      ? isCountryInRegion(teacher.country, regionValue)
      : true;

    const matchesGender = genderValue ? teacher.gender === genderValue : true;
    const matchesPhoto = onlyWithPhoto ? Boolean(teacher.picture) : true;
    const matchesFavorite = onlyFavorites ? teacher.isFavorite : true;

    return (
      matchesSearch &&
      matchesAge &&
      matchesRegion &&
      matchesGender &&
      matchesPhoto &&
      matchesFavorite
    );
  });

  currentPage = 1;
}

/**
 * Відображає таблицю статистики та пагінацію відповідно до поточної сторінки.
 */

function renderStatistics(): void {
  if (!statisticsTable || !paginationContainer) {
    return;
  }

  const visibleTeachers = paginate(filteredTeachers, currentPage, teachersPerPage);
  const pagesCount = getPagesCount(filteredTeachers.length, teachersPerPage);

  renderTeacherTable(statisticsTable, visibleTeachers);
  renderPagination(paginationContainer, currentPage, pagesCount);
}

/**
 * Оновлює основні блоки інтерфейсу, які залежать від списку викладачів.
 * Перемальовує картки, список обраних викладачів, таблицю і пагінацію.
 */

function renderTeachersView(): void {
  if (!topTeachersList || !favoritesList) {
    return;
  }

  const favoriteTeachers = teachers.filter((teacher) => teacher.isFavorite);

renderTeacherCards(topTeachersList, filteredTeachers.slice(0, 12));
  renderTeacherCards(favoritesList, favoriteTeachers);
  renderStatistics();
}

/**
 * Ініціалізує застосунок: завантажує дані, застосовує обране,
 * фільтрує список і відображає початковий інтерфейс.
 */

async function initApp(): Promise<void> {
  if (!topTeachersList || !statisticsTable || !paginationContainer || !favoritesList) {
  return;
}

  topTeachersList.innerHTML = '<p>Loading teachers...</p>';

  try {
    const apiTeachers = await fetchTeachers(40);
    const customTeachers = getCustomTeachers();

    teachers = applyFavoriteState(
      [...customTeachers, ...apiTeachers],
      getFavoriteTeacherIds(),
    );

    applyFilters();

    renderTeachersView();
  } catch (error) {
    topTeachersList.innerHTML = '<p>Failed to load teachers. Please try again later.</p>';
    console.error(error);
  }
}

initApp();

paginationContainer?.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  const pageValue = target.dataset.page;

  if (!pageValue) {
    return;
  }

  const pagesCount = getPagesCount(filteredTeachers.length, teachersPerPage);

  currentPage = pageValue === 'last' ? pagesCount : Number(pageValue);
  renderStatistics();
});

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;

  const openButton = target.closest<HTMLElement>('[data-open-teacher-id]');
  const closeButton = target.closest<HTMLElement>('[data-close-modal]');

  const openAddTeacherButton = target.closest<HTMLElement>('#openAddTeacherButton');
  const footerAddTeacherButton = target.closest<HTMLElement>('#footerAddTeacherButton');
  const closeAddTeacherButton = target.closest<HTMLElement>('[data-close-add-modal]');
  const favoriteButton = target.closest<HTMLElement>('[data-favorite-id]');
  const favoritesScrollButton = target.closest<HTMLElement>('[data-favorites-scroll]');

  if (openButton) {
    const teacherId = openButton.dataset.openTeacherId;
    const selectedTeacher = teachers.find((teacher) => teacher.id === teacherId);

    if (selectedTeacher) {
      openTeacherModal(selectedTeacher);
    }
  }

  if (closeButton) {
    closeTeacherModal();
  }

  if (openAddTeacherButton || footerAddTeacherButton) {
    openAddTeacherModal();
  }

  if (closeAddTeacherButton) {
    closeAddTeacherModal();
  }

  if (favoriteButton) {
    const teacherId = favoriteButton.dataset.favoriteId;

    if (!teacherId) {
      return;
    }

    const favoriteIds = toggleFavoriteTeacher(teacherId);

    teachers = applyFavoriteState(teachers, favoriteIds);
    applyFilters();
    renderTeachersView();
  }

  if (favoritesScrollButton && favoritesList) {
  const direction = favoritesScrollButton.dataset.favoritesScroll;
  const scrollValue = direction === 'left' ? -360 : 360;

  favoritesList.scrollBy({
    left: scrollValue,
    behavior: 'smooth',
  });
}
});

document.addEventListener('submit', (event) => {
  const target = event.target as HTMLElement;

  if (!(target instanceof HTMLFormElement) || target.id !== 'addTeacherForm') {
    return;
  }

  event.preventDefault();

  const newTeacher = createTeacherFromForm(target);

  addCustomTeacher(newTeacher);
  teachers = [newTeacher, ...teachers];
  applyFilters();

  currentPage = 1;
  renderTeachersView();

  closeAddTeacherModal();
});

searchForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  applyFilters();
  renderTeachersView();
});

[ageFilter, regionFilter, genderFilter, photoFilter, favoritesFilter].forEach((filter) => {
  filter?.addEventListener('change', () => {
    applyFilters();
    renderTeachersView();
  });
});

searchInput?.addEventListener('input', () => {
  applyFilters();
  renderTeachersView();
});
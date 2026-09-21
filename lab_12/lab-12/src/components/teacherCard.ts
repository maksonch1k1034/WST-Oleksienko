import type { Teacher } from '../types/teacher';

/**
 * Формує ініціали викладача з імені та прізвища.
 *
 * @param teacher - об'єкт з даними викладача
 * @returns ініціали викладача
 */

function getInitials(teacher: Teacher): string {
  return `${teacher.firstName[0]}.${teacher.lastName[0]}`;
}

/**
 * Створює HTML-розмітку однієї картки викладача.
 *
 * @param teacher - дані викладача, які потрібно відобразити
 * @returns HTML-рядок з розміткою картки викладача
 */

export function createTeacherCard(teacher: Teacher): string {
  const imageMarkup = teacher.picture
    ? `<img src="${teacher.picture}" alt="${teacher.fullName}" />`
    : `<span>${getInitials(teacher)}</span>`;

  const favoriteClass = teacher.isFavorite ? 'teacher-card__favorite--active' : '';

  return `
    <article class="teacher-card" data-teacher-id="${teacher.id}">
      <button
        class="teacher-card__favorite ${favoriteClass}"
        type="button"
        data-favorite-id="${teacher.id}"
        aria-label="Add to favorites"
      >
        ★
      </button>

      <button
        class="teacher-card__photo"
        type="button"
        data-open-teacher-id="${teacher.id}"
        aria-label="Open teacher details"
      >
        ${imageMarkup}
      </button>

      <h3>${teacher.firstName}<br />${teacher.lastName}</h3>
      <p class="teacher-card__specialty">${teacher.specialty}</p>
      <p class="teacher-card__country">${teacher.country}</p>
    </article>
  `;
}

/**
 * Відображає список карток викладачів у вибраному контейнері.
 *
 * @param container - HTML-елемент, у який будуть вставлені картки
 * @param teachers - список викладачів для відображення
 */

export function renderTeacherCards(
  container: HTMLElement,
  teachers: Teacher[],
): void {
  container.innerHTML = teachers.map(createTeacherCard).join('');
}
import type { Teacher } from '../types/teacher';

/**
 * Створює контейнер для модального вікна з інформацією про викладача,
 * якщо він ще не існує на сторінці.
 *
 * @returns HTML-елемент модального вікна
 */

function getModalRoot(): HTMLElement {
  let modal = document.querySelector<HTMLElement>('#teacherInfoModal');

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'teacherInfoModal';
    modal.className = 'modal-layer';
    document.body.append(modal);
  }

  return modal;
}

/**
 * Відкриває модальне вікно з детальною інформацією про вибраного викладача.
 *
 * @param teacher - викладач, інформацію про якого потрібно показати
 */

export function openTeacherModal(teacher: Teacher): void {
  const modal = getModalRoot();

  modal.innerHTML = `
    <div class="teacher-info">
      <div class="teacher-info__header">
        <span>Teacher Info</span>
        <button
          class="teacher-info__close"
          type="button"
          data-close-modal
          aria-label="Close teacher info"
        >
          ×
        </button>
      </div>

      <div class="teacher-info__body">
        <img
          class="teacher-info__photo"
          src="${teacher.picture}"
          alt="${teacher.fullName}"
        />

        <div class="teacher-info__content">
          <div class="teacher-info__title-row">
            <h3>${teacher.fullName}</h3>
            <button
              class="teacher-info__favorite"
              type="button"
              data-favorite-id="${teacher.id}"
              aria-label="Add to favorites"
            >
              ★
            </button>
          </div>

          <p class="teacher-info__specialty">${teacher.specialty}</p>
          <p>${teacher.city}, ${teacher.country}</p>
          <p>${teacher.age}, ${teacher.gender === 'male' ? 'Male' : 'Female'}</p>
          <a href="mailto:${teacher.email}">${teacher.email}</a>
          <p>${teacher.phone}</p>
        </div>
      </div>

      <p class="teacher-info__note">${teacher.note}</p>

      <button class="teacher-info__map" type="button">
        toggle map
      </button>
    </div>
  `;

  modal.classList.add('modal-layer--open');
}

/**
 * Закриває модальне вікно з інформацією про викладача.
 */

export function closeTeacherModal(): void {
  const modal = document.querySelector<HTMLElement>('#teacherInfoModal');

  modal?.classList.remove('modal-layer--open');
}
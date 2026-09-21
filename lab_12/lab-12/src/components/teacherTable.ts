import type { Teacher } from '../types/teacher';

/**
 * Створює один рядок таблиці з даними викладача.
 *
 * @param teacher - дані викладача для відображення в таблиці
 * @returns HTML-рядок з розміткою одного рядка таблиці
 */

function createTeacherRow(teacher: Teacher): string {
  return `
    <tr>
      <td>
        <button
          class="table-link"
          type="button"
          data-open-teacher-id="${teacher.id}"
        >
          ${teacher.fullName}
        </button>
      </td>
      <td>${teacher.specialty}</td>
      <td>${teacher.age}</td>
      <td>${teacher.gender === 'male' ? 'Male' : 'Female'}</td>
      <td>${teacher.country}</td>
    </tr>
  `;
}

/**
 * Відображає таблицю зі списком викладачів.
 *
 * @param container - HTML-елемент, у який буде вставлена таблиця
 * @param teachers - список викладачів для відображення
 */

export function renderTeacherTable(
  container: HTMLElement,
  teachers: Teacher[],
): void {
  container.innerHTML = `
    <table class="teachers-table">
      <thead>
        <tr>
          <th>
  <button class="table-sort-button" type="button">
    Name
  </button>
</th>
<th>
  <button class="table-sort-button" type="button">
    Speciality
  </button>
</th>
<th>
  <button class="table-sort-button" type="button">
    Age
  </button>
</th>
<th>
  <button class="table-sort-button" type="button">
    Gender
  </button>
</th>
<th>
  <button class="table-sort-button" type="button">
    Nationality
  </button>
</th>
        </tr>
      </thead>
      <tbody>
        ${teachers.map(createTeacherRow).join('')}
      </tbody>
    </table>
  `;
}
import type { Gender, Teacher } from '../types/teacher';

/**
 * Обчислює вік людини за вибраною датою народження.
 *
 * @param birthDate - дата народження, отримана з поля форми
 * @returns вік людини
 */

function getAgeFromBirthDate(birthDate: string): number {
  const today = new Date();
  const date = new Date(birthDate);
  let age = today.getFullYear() - date.getFullYear();
  const monthDifference = today.getMonth() - date.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < date.getDate())
  ) {
    age -= 1;
  }

  return age;
}

/**
 * Повертає порожнє значення для фото нового викладача.
 * Якщо фото немає, у картці будуть відображатися ініціали.
 *
 * @returns порожній рядок замість посилання на фото
 */

function getTeacherPicture(): string {
  return '';
}

/**
 * Перетворює дані з форми додавання викладача в об'єкт Teacher.
 *
 * @param form - HTML-форма, яку заповнив користувач
 * @returns новий об'єкт викладача
 */

export function createTeacherFromForm(form: HTMLFormElement): Teacher {
  const formData = new FormData(form);
  const fullName = String(formData.get('fullName') || '').trim();
  const [firstName = 'Unknown', ...lastNameParts] = fullName.split(' ');
  const lastName = lastNameParts.join(' ') || 'Teacher';
  const birthDate = String(formData.get('birthDate') || '');
  const gender = String(formData.get('gender')) as Gender;

  return {
    id: crypto.randomUUID(),
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    gender,
    email: String(formData.get('email') || ''),
    phone: String(formData.get('phone') || ''),
    age: getAgeFromBirthDate(birthDate),
    city: String(formData.get('city') || ''),
    country: String(formData.get('country') || ''),
    nationality: String(formData.get('country') || ''),
    specialty: String(formData.get('specialty') || ''),
    picture: getTeacherPicture(),
    note: String(formData.get('note') || 'New teacher added by user.'),
    isFavorite: false,
  };
}

/**
 * Створює контейнер для модального вікна додавання викладача,
 * якщо він ще не існує на сторінці.
 *
 * @returns HTML-елемент модального вікна
 */

function getAddTeacherModalRoot(): HTMLElement {
  let modal = document.querySelector<HTMLElement>('#addTeacherModal');

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'addTeacherModal';
    modal.className = 'modal-layer';
    document.body.append(modal);
  }

  return modal;
}

/**
 * Відкриває модальне вікно з формою додавання нового викладача.
 */

export function openAddTeacherModal(): void {
  const modal = getAddTeacherModalRoot();

  modal.innerHTML = `
    <form class="add-teacher-form" id="addTeacherForm">
      <div class="add-teacher-form__header">
        <span>Add Teacher</span>
        <button
          class="add-teacher-form__close"
          type="button"
          data-close-add-modal
          aria-label="Close add teacher form"
        >
          ×
        </button>
      </div>

      <div class="add-teacher-form__body">
        <label>
          Name
          <input name="fullName" type="text" placeholder="Enter name" required />
        </label>

        <label>
          Speciality
          <select name="specialty" required>
            <option value="Mathematics">Mathematics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Physics">Physics</option>
            <option value="Computer Science">Computer Science</option>
            <option value="English">English</option>
            <option value="Biology">Biology</option>
            <option value="Art">Art</option>
            <option value="Statistics">Statistics</option>
            <option value="Chess">Chess</option>
          </select>
        </label>

        <div class="add-teacher-form__row">
          <label>
            Country
            <select name="country" required>
              <option value="Ukraine">Ukraine</option>
              <option value="USA">USA</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Italy">Italy</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Australia">Australia</option>
            </select>
          </label>

          <label>
            City
            <input name="city" type="text" required />
          </label>
        </div>

        <div class="add-teacher-form__row">
          <label>
            Email
            <input name="email" type="email" required />
          </label>

          <label>
            Phone
            <input name="phone" type="tel" required />
          </label>
        </div>

        <label>
          Date of birth
          <input name="birthDate" type="date" required />
        </label>

        <fieldset class="add-teacher-form__sex">
  <legend>Sex</legend>

  <label>
    Male
    <input name="gender" type="radio" value="male" required />
  </label>

  <label>
    Female
    <input name="gender" type="radio" value="female" required />
  </label>
</fieldset>

<label class="add-teacher-form__color">
  <span>Background color</span>
  <input name="backgroundColor" type="color" value="#ffffff" />
</label>

        <label>
          Notes(optional)
          <textarea name="note"></textarea>
        </label>

        <button class="button button--form" type="submit">
          Add
        </button>
      </div>
    </form>
  `;

  modal.classList.add('modal-layer--open');
}

/**
 * Закриває модальне вікно додавання викладача.
 */

export function closeAddTeacherModal(): void {
  const modal = document.querySelector<HTMLElement>('#addTeacherModal');

  modal?.classList.remove('modal-layer--open');
}
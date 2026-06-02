import type { RandomUser } from '../types/api';
import type { Teacher } from '../types/teacher';

const specialties = [
  'Chemistry',
  'Mathematics',
  'Physics',
  'Computer Science',
  'English',
  'Biology',
  'Art',
  'Statistics',
  'Chess',
];

const notes = [
  'Experienced teacher with a strong focus on practical learning and student progress.',
  'Helps students understand complex topics through clear examples and friendly communication.',
  'Creates engaging lessons and supports students in developing independent thinking.',
  'Combines academic knowledge with modern teaching methods and individual approach.',
];

/**
 * Повертає випадковий елемент з переданого масиву.
 *
 * @param items - масив доступних значень
 * @returns випадково вибране значення з масиву
 */

function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Перетворює користувача з Random User API у внутрішній об'єкт Teacher.
 *
 * @param user - користувач, отриманий із зовнішнього API
 * @returns нормалізований об'єкт викладача для застосунку
 */

export function normalizeTeacher(user: RandomUser): Teacher {
  return {
    id: user.login.uuid,
    firstName: user.name.first,
    lastName: user.name.last,
    fullName: `${user.name.first} ${user.name.last}`,
    gender: user.gender,
    email: user.email,
    phone: user.phone,
    age: user.dob.age,
    city: user.location.city,
    country: user.location.country,
    nationality: user.nat,
    specialty: getRandomItem(specialties),
    picture: user.picture.large || user.picture.medium,
    note: getRandomItem(notes),
    isFavorite: false,
  };
}
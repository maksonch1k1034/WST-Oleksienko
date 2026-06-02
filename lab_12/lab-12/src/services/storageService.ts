import type { Teacher } from '../types/teacher';

const customTeachersKey = 'teachinder-custom-teachers';
const favoriteTeachersKey = 'teachinder-favorite-teachers';

/**
 * Зчитує з localStorage викладачів, створених користувачем.
 *
 * @returns список збережених користувацьких викладачів
 */

export function getCustomTeachers(): Teacher[] {
  const savedTeachers = localStorage.getItem(customTeachersKey);

  if (!savedTeachers) {
    return [];
  }

  try {
    return JSON.parse(savedTeachers) as Teacher[];
  } catch {
    return [];
  }
}

/**
 * Зберігає викладачів, створених користувачем, у localStorage.
 *
 * @param teachers - список користувацьких викладачів
 */

export function saveCustomTeachers(teachers: Teacher[]): void {
  localStorage.setItem(customTeachersKey, JSON.stringify(teachers));
}

/**
 * Додає одного нового викладача до списку в localStorage.
 *
 * @param teacher - викладач, створений через форму додавання
 */

export function addCustomTeacher(teacher: Teacher): void {
  const teachers = getCustomTeachers();

  saveCustomTeachers([teacher, ...teachers]);
}

/**
 * Зчитує з localStorage список ID обраних викладачів.
 *
 * @returns список ідентифікаторів обраних викладачів
 */

export function getFavoriteTeacherIds(): string[] {
  const savedIds = localStorage.getItem(favoriteTeachersKey);

  if (!savedIds) {
    return [];
  }

  try {
    return JSON.parse(savedIds) as string[];
  } catch {
    return [];
  }
}

/**
 * Зберігає список ID обраних викладачів у localStorage.
 *
 * @param ids - ідентифікатори обраних викладачів
 */

export function saveFavoriteTeacherIds(ids: string[]): void {
  localStorage.setItem(favoriteTeachersKey, JSON.stringify(ids));
}

/**
 * Перевіряє, чи доданий викладач до обраного.
 *
 * @param teacherId - ідентифікатор викладача
 * @returns true, якщо викладач є в обраному
 */

export function isFavoriteTeacher(teacherId: string): boolean {
  return getFavoriteTeacherIds().includes(teacherId);
}

/**
 * Додає викладача в обране або прибирає його звідти.
 *
 * @param teacherId - ідентифікатор викладача
 * @returns оновлений список ID обраних викладачів
 */

export function toggleFavoriteTeacher(teacherId: string): string[] {
  const favoriteIds = getFavoriteTeacherIds();
  const isFavorite = favoriteIds.includes(teacherId);

  const updatedIds = isFavorite
    ? favoriteIds.filter((id) => id !== teacherId)
    : [...favoriteIds, teacherId];

  saveFavoriteTeacherIds(updatedIds);

  return updatedIds;
}

/**
 * Позначає викладачів як обраних відповідно до збережених ID.
 *
 * @param teachers - список викладачів
 * @param favoriteIds - список ID обраних викладачів
 * @returns список викладачів з оновленим станом isFavorite
 */

export function applyFavoriteState(
  teachers: Teacher[],
  favoriteIds: string[],
): Teacher[] {
  return teachers.map((teacher) => ({
    ...teacher,
    isFavorite: favoriteIds.includes(teacher.id),
  }));
}
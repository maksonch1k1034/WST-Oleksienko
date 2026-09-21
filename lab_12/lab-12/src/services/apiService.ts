import type { RandomUserResponse } from '../types/api';
import type { Teacher } from '../types/teacher';
import { normalizeTeacher } from "../utils/normalizeTeacher";

/**
 * Завантажує список викладачів із зовнішнього API Random User.
 *
 * @param count - кількість викладачів, яку потрібно завантажити
 * @returns Promise зі списком нормалізованих викладачів
 */

export async function fetchTeachers(count = 30): Promise<Teacher[]> {
  const response = await fetch(`https://randomuser.me/api/?results=${count}`);

  if (!response.ok) {
    throw new Error('Failed to load teachers');
  }

  const data = (await response.json()) as RandomUserResponse;

  return data.results.map(normalizeTeacher);
}
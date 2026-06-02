export type Gender = 'male' | 'female';

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: Gender;
  email: string;
  phone: string;
  age: number;
  city: string;
  country: string;
  nationality: string;
  specialty: string;
  picture: string;
  note: string;
  isFavorite: boolean;
}
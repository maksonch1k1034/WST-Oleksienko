/**
 * Описує відповідь, яку повертає Random User API.
 * Поле results містить масив користувачів.
 */

export interface RandomUserResponse {
  results: RandomUser[];
}

/**
 * Описує одного користувача, отриманого із зовнішнього API.
 * Ці дані потім перетворюються у внутрішній тип Teacher.
 */

export interface RandomUser {
  gender: 'male' | 'female';
  name: {
    first: string;
    last: string;
  };
  location: {
    city: string;
    country: string;
  };
  email: string;
  phone: string;
  dob: {
    age: number;
  };
  picture: {
    large: string;
    medium: string;
  };
  nat: string;
  login: {
    uuid: string;
  };
}
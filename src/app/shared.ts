export const genderList: any[] = [
  {value: 'female'},
  {value: 'male'}
];

export interface IClientData {
  'id': number;
  'name': string;
  'cardNumber': number;
  'gender': string;
  'birthDay': any;
  'birthMonth': any;
  'birthYear': any;
  'phone': string;
  'email': string;
  'address': string;
}

export function getBirthDateByParams(month, day, year): Date {
  if (!month || !day || !year) {
    console.error(`getBirthDateByParams: wrong params!`);
    return null;
  } else {
    return new Date(`${month}/${day}/${year}`);
  }
}

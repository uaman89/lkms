export const genderList: any[] = [
  {value: 'female'},
  {value: 'male'}
];

export interface IClientData {
  'id': number | string;
  'name': string;
  'cardNumber': number | string;
  'gender': string;
  'birthDay': number | string;
  'birthMonth': number | string;
  'birthYear': number | string;
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

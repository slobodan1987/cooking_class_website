import { IBEState } from './model';

export const mockEmptyBeState: IBEState = {
  dates: [],
  companyData: {
    name: 'Cooking Class Plitvice',
    googleCoordinates: 'Rastovača 14/1, Plitvička jezera',
    address: 'Mukinje 33 , Plitvička jezera',
    phone: '+38591 9146693',
    email: 'cooking.class.plitvice@gmail.com',
    startTime: '17:00',
    endTime: '21:00',
    minPersonsPerClass: 2,
    maxPersonsPerClass: 12,
    pricePerPerson: 80,
  },
};

export const mockBeStateWithDates: IBEState = {
  dates: [],
  companyData: {
    name: 'Cooking Class Plitvice',
    googleCoordinates: 'Rastovača 14/1, Plitvička jezera',
    address: 'Mukinje 33 , Plitvička jezera',
    phone: '+38591 9146693',
    email: 'cooking.class.plitvice@gmail.com',
    startTime: '17:00',
    endTime: '21:00',
    minPersonsPerClass: 2,
    maxPersonsPerClass: 12,
    pricePerPerson: 80,
  },
};

export interface IResult {
  success: boolean;
  message?: string;
}

export interface IBEStateResult {
  beState: IBEState;
  success: boolean;
  message?: string;
}

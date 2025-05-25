import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { IBEState, IBooking, ICompanyData, IDate } from './model';

export const mockBeState: IBEState = {
  dates: [
    {
      id: 'date-1',
      date: '2025-06-01',
      status: 'OPEN',
      bookings: [
        {
          id: 'booking-1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+385 91 123 4567',
          guests: 4,
          status: 'WAITING_FOR_CONFIRMATION',
        },
        {
          id: 'booking-2',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '+385 91 765 4321',
          guests: 2,
          status: 'CONFIRMED',
        },
        {
          id: 'booking-3',
          name: 'Alice Johnson',
          email: 'alice.johnson@example.com',
          phone: '+385 91 987 6543',
          guests: 3,
          status: 'CONFIRMED',
        },
      ],
    },
    {
      id: 'date-2',
      date: '2025-06-02',
      status: 'OPEN',
      bookings: [
        {
          id: 'booking-4',
          name: 'Pera Perić',
          email: 'pera.peric@example.com',
          phone: '+385 91 423 4567',
          guests: 2,
          status: 'CONFIRMED',
        },
        {
          id: 'booking-5',
          name: 'Ana Kovač',
          email: 'ana.kovac@example.com',
          phone: '+385 91 768 4321',
          guests: 5,
          status: 'CONFIRMED',
        },
      ],
    },
    {
      id: 'date-3',
      date: '2025-06-03',
      status: 'CLOSED',
      bookings: [
        {
          id: 'booking-6',
          name: 'Slobodan Jurić',
          email: 'slobodan.juric@example.com',
          phone: '+385 91 479 4567',
          guests: 12,
          status: 'CONFIRMED',
        },
      ],
    },
  ],
  companyData: {
    name: 'Cooking Class Plitvice',
    googleCoordinates: 'Rastovača 14/1, Plitvička jezera',
    address: 'Mukinje 33 , Plitvička jezera',
    phone: '+38591 9146693',
    email: 'cooking.class.plitvice@gmail.com',
    startTimeHours: 17,
    startTimeMinutes: 0,
    endTimeMinutes: 0,
    endTimeHours: 21,
    minPersonsPerClass: 4,
    maxPersonsPerClass: 12,
    pricePerPerson: 80,
    maxDaysInFuture: 30,
    minimalGroupSize: 2,
    maximalGroupSize: 12,
  },
};

export const mockEmptyBeState: IBEState = {
  dates: [],
  companyData: {
    name: 'Cooking Class Plitvice',
    googleCoordinates: 'Rastovača 14/1, Plitvička jezera',
    address: 'Mukinje 33 , Plitvička jezera',
    phone: '+38591 9146693',
    email: 'cooking.class.plitvice@gmail.com',
    startTimeHours: 17,
    startTimeMinutes: 0,
    endTimeMinutes: 0,
    endTimeHours: 21,
    minPersonsPerClass: 4,
    maxPersonsPerClass: 12,
    pricePerPerson: 80,
    maxDaysInFuture: 30,
    minimalGroupSize: 2,
    maximalGroupSize: 12,
  },
};

export interface IDb {
  /**
   * error simulation configuration
   * - used to simulate errors in the backend service
   * - this is used for testing purposes only
   */
  errorSimulationConfig?: {
    getBEState: boolean;
    createBooking: boolean;
    deleteBooking: boolean;
    excludeDate: boolean;
    updateBookingStatus: boolean;
    upsertCompanyData: boolean;
  };
  /**
   * the current backend state
   */
  beState: IBEState;
  /**
   * the database service used to interact with the backend
   */
  dbService: IDbService;
}

export interface IDbService {
  /**
   * used INTERNALLY to read the backend state
   */
  getBEState(): Observable<IBEStateResult>;
  /**
   * used BY USER to create one booking
   */
  createBooking(booking: IBooking, date: IDate): Observable<IResult>;
  /**
   * used BY ADMINISTRATOR to delete a booking
   * @param bookingId - the ID of the booking to delete
   */
  deleteBooking(bookingId: string): Observable<IResult>;
  /**
   * used BY ADMINISTRATOR to exclude a date from booking
   * @param dateId - the ID of the date to exclude
   */
  excludeDate(dateId: string): Observable<IResult>;
  /**
   * used BY ADMINISTRATOR to activate a date for booking
   * @param dateId - the ID of the date to activate
   */
  activateDate(dateId: string): Observable<IResult>;
  /**
   * used BY ADMINISTRATOR to change the status of a booking
   * @param bookingId - the ID of the booking to change
   */
  updateBookingStatus(bookingId: string, status: string): Observable<IResult>;
  /**
   * used BY ADMINISTRATOR to upsert the company data
   * @param companyData - the new company data to set
   */
  upsertCompanyData(companyData: ICompanyData): Observable<IResult>;
}

export interface IResult {
  success: boolean;
  message?: string;
}

export interface IBEStateResult {
  beState: IBEState;
  success: boolean;
  message?: string;
}

export const mockDb: IDb = {
  errorSimulationConfig: {
    getBEState: false,
    createBooking: false,
    deleteBooking: false,
    excludeDate: false,
    updateBookingStatus: false,
    upsertCompanyData: false,
  },
  beState: mockEmptyBeState,
  dbService: {
    getBEState: () => {
      return new Observable<IBEStateResult>((subscriber) => {
        // Simulate a successful backend state retrieval
        if (mockDb.errorSimulationConfig?.getBEState) {
          subscriber.error(new Error('Simulated error in getBEState'));
          return;
        }
        // Return the mock backend state
        subscriber.next({
          beState: mockDb.beState,
          success: true,
        });
        subscriber.complete();
      });
    },
    createBooking: (booking: IBooking, date: IDate) => {
      return new Observable<IResult>((subscriber) => {
        // Simulate a successful booking creation
        if (mockDb.errorSimulationConfig?.createBooking) {
          subscriber.error(new Error('Simulated error in createBooking'));
          return;
        }
        // Here you would typically add the booking to the mockBeState
        mockDb.beState.dates.forEach((d) => {
          if (d.id === date.id) {
            booking.id = uuidv4(); // Assign a new ID
            // Add the booking to the date's bookings array
            d.bookings.push(booking);
          }
        });
        // Return a success result
        subscriber.next({
          success: true,
        });
        subscriber.complete();
      });
    },
    deleteBooking: (bookingId: string) => {
      return new Observable<IResult>((subscriber) => {
        // Simulate a successful booking deletion
        if (mockDb.errorSimulationConfig?.deleteBooking) {
          subscriber.error(new Error('Simulated error in deleteBooking'));
          return;
        }
        // Here you would typically remove the booking from the mockBeState
        mockDb.beState.dates.forEach((date) => {
          date.bookings = date.bookings.filter(
            (booking) => booking.id !== bookingId
          );
        });
        // Return a success result
        subscriber.next({
          success: true,
        });
        subscriber.complete();
      });
    },
    excludeDate: (dateId: string) => {
      return new Observable<IResult>((subscriber) => {
        if (mockDb.errorSimulationConfig?.excludeDate) {
          subscriber.error(new Error('Simulated error in excludeDate'));
          return;
        }
        // Here you would typically remove the date from the mockBeState
        mockDb.beState.dates.forEach((date) => {
          if (date.id === dateId) {
            date.status = 'CLOSED'; // Change the status to CLOSED
          }
        });
        // Simulate a successful date exclusion
        subscriber.next({
          success: true,
        });
        subscriber.complete();
      });
    },
    activateDate: (dateId: string) => {
      return new Observable<IResult>((subscriber) => {
        if (mockDb.errorSimulationConfig?.excludeDate) {
          subscriber.error(new Error('Simulated error in activateDate'));
          return;
        }
        // Here you would typically change the status of the date to OPEN
        mockDb.beState.dates.forEach((date) => {
          if (date.id === dateId) {
            date.status = 'OPEN'; // Change the status to OPEN
          }
        });
        // Simulate a successful date activation
        subscriber.next({
          success: true,
        });
        subscriber.complete();
      });
    },
    updateBookingStatus: (bookingId: string, status: string) => {
      return new Observable<IResult>((subscriber) => {
        // Simulate a successful booking status update
        subscriber.next({
          success: true,
        });
        subscriber.complete();
      });
    },
    upsertCompanyData: (companyData: ICompanyData) => {
      return new Observable<IResult>((subscriber) => {
        // Simulate a successful company data update
        subscriber.next({
          success: true,
        });
        subscriber.complete();
      });
    },
  },
};

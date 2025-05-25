/**
 * BE state
 */
export interface IBEState {
  /**
   * array of dates containing all the bookings for that date
   */
  dates: IDate[];
  /**
   * company data containing address, phone, email, start and end time, min and max persons per class, price per person, and max days in future
   */
  companyData: ICompanyData;
}

/**
 * date object containing all the bookings for that date
 */
export interface IDate {
  /**
   * unique identifier for the date
   */
  id: string;
  /**
   * date in ISO format (e.g., "2023-10-01")
   */
  date: string;
  /**
   * array of bookings for that date
   */
  bookings: IBooking[];
  /**
   * status of the date
   * - 'OPEN': date is available for bookings
   * - 'CLOSED': date is not available for bookings (e.g. on public holidays, etc.)
   */
  status: 'OPEN' | 'CLOSED';
}

/**
 * booking object containing all the information for a booking
 */
export interface IBooking {
  /**
   * unique identifier for the booking
   */
  id?: string;
  /**
   * name of the person making the booking
   */
  name: string;
  /**
   * email of the person making the booking
   */
  email: string;
  /**
   * phone number of the person making the booking
   */
  phone: string;
  /**
   * number of guests for the booking
   */
  guests: number;

  /**
   * status of the booking
   * - 'WAITING_FOR_CONFIRMATION': booking is waiting for confirmation
   * - 'CONFIRMED': booking is confirmed
   */
  status: 'WAITING_FOR_CONFIRMATION' | 'CONFIRMED' | 'CANCELED';
}

/**
 * company data containing address, phone, email, start and end time, min and max persons per class, price per person, and max days in future
 */
export interface ICompanyData {
  /**
   * company name
   */
  name: string;
  /**
   * address of the company
   */
  address: string;
  /**
   * phone number of the company
   */
  phone: string;
  /**
   * email of the company
   */
  email: string;
  /**
   * start time of the booking in hours (0-23)
   */
  startTimeHours: number;
  /**
   * end time of the booking in hours (0-23)
   */
  endTimeHours: number;
  /**
   * start time of the booking in minutes (0-59)
   */
  startTimeMinutes: number;
  /**
   * end time of the booking in minutes (0-59)
   */
  endTimeMinutes: number;
  /**
   * minimum number of persons per class
   */
  minPersonsPerClass: number;
  /**
   * maximum number of persons per class
   */
  maxPersonsPerClass: number;
  /**
   * price per person for the booking (in euros)
   * - this is the price that will be charged for each person in the booking
   */
  pricePerPerson: number;
  /**
   * maximum number of days in the future a booking can be made
   */
  maxDaysInFuture: number;
  /**
   * minimal group size for the booking
   * - there can be more groups in one class!
   */
  minimalGroupSize: number;
  /**
   * maximum group size for the booking
   * - there can be more groups in one class!
   */
  maximalGroupSize: number;
  /**
   * google coordinates for the address
   */
  googleCoordinates: string;
}

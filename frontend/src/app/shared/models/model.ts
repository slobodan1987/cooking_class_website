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
   * status
   */
  status: 'AVAILABLE' | 'UNAVAILABLE';
  /**
   * custom start date for the date
   * - this is used to override the default start time for the date
   * - it is optional and can be left empty
   */
  customStartDate?: string;
  /**
   * custom end date for the date
   * - this is used to override the default end time for the date
   * - it is optional and can be left empty
   */
  customEndDate?: string;
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
   * message for the booking
   * - this can be used to provide additional information or requests for the booking
   * - it is optional and can be left empty
   */
  message?: string;
  /**
   * status of the booking
   * - 'WAITING_FOR_CONFIRMATION': booking is waiting for confirmation
   * - 'CONFIRMED': booking is confirmed
   */
  status: 'WAITING_FOR_CONFIRMATION' | 'CONFIRMED' | 'CANCELED';
  /**
   * request for review sent
   * - this is used to track if a request for review has been sent to the user after the booking
   */
  requestForReviewSent: boolean;
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
   * start time of the booking
   */
  startTime: string;
  /**
   * end time of the booking
   */
  endTime: string;
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
   * google coordinates for the address
   */
  googleCoordinates: string;
}

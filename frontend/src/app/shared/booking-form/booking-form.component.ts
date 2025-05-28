import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
// Update the path below if 'model' is located elsewhere, e.g.:
import { IBEState } from '../models/model';
// Or, if the file does not exist, create 'model.ts' in the correct directory with the IBEState definition.
import { CommonModule } from '@angular/common';

interface BookingForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  date: FormControl<string | null>;
  guests: FormControl<number | null>;
}

interface Form {
  bookingForm: FormGroup<BookingForm>;
}

@Component({
  selector: 'app-booking-form[beState]',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss',
})
export class BookingFormComponent {
  private _beState: IBEState | null = null;

  @Input()
  set beState(value: IBEState | null) {
    this._beState = value;
    this.setup();
  }
  get beState(): IBEState | null {
    return this._beState;
  }

  todayDate: Date | null = null;
  todayDateStr: string | null = null;
  pricePerPerson: number | null = null;

  startTime: string | null = null;
  endTime: string | null = null;

  address: string | null = null;
  companyPhone: string | null = null;
  companyMail: string | null = null;

  minPersonsPerClass: number | null = null;
  maxPersonsPerClass: number | null = null;
  maxDaysInFuture: number | null = null;

  maxDateInFuture: Date | null = null;
  maxDateInFutureStr: string | null = null;

  form: FormGroup<Form> = this.createForm();

  stripTime(date: Date | null): Date | null {
    if (!date) return null;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  phoneValidator(): ValidatorFn {
    return (control: AbstractControl<any, any>): ValidationErrors | null => {
      const phoneStr = control.value as string;

      // Simple phone number validation (can be adjusted based on requirements)
      const phoneRegex = /^\+?[0-9\s-]{7,}$/; // At least 7 digits, can include +, spaces, and dashes
      const isValidPhone = phoneRegex.test(phoneStr);
      if (!isValidPhone) {
        return { phoneInvalid: true };
      }
      return null;
    };
  }

  eMailValidator(): ValidatorFn {
    return (control: AbstractControl<any, any>): ValidationErrors | null => {
      const emailStr = control.value as string;

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValidEmail = emailRegex.test(emailStr);
      if (!isValidEmail) {
        return { emailInvalid: true };
      }
      return null;
    };
  }

  dateRangeValidator(min: Date | null, max: Date | null): ValidatorFn {
    return (control: AbstractControl<any, any>): ValidationErrors | null => {
      const value = new Date(control.value as string);

      if (isNaN(value.getTime())) return null; // skip if not a valid date

      const minStripped = this.stripTime(min);
      const maxStripped = this.stripTime(max);
      const valueStripped = this.stripTime(value);

      if (
        (minStripped && valueStripped && valueStripped < minStripped) ||
        (maxStripped && valueStripped && valueStripped > maxStripped)
      ) {
        return { dateOutOfRange: true };
      }
      return null;
    };
  }

  createForm(): FormGroup<Form> {
    return new FormGroup<Form>({
      bookingForm: new FormGroup<BookingForm>({
        name: new FormControl<string | null>({ value: null, disabled: false }, [
          Validators.required,
        ]),
        email: new FormControl<string | null>(
          { value: null, disabled: false },
          [Validators.required, this.eMailValidator()]
        ),
        phone: new FormControl<string | null>(
          { value: null, disabled: false },
          [Validators.required, this.phoneValidator()]
        ),
        date: new FormControl<string | null>(
          {
            value: null,
            disabled: false,
          },
          [
            this.dateRangeValidator(this.todayDate, this.maxDateInFuture),
            Validators.required,
          ]
        ),
        guests: new FormControl<number | null>({ value: 2, disabled: false }, [
          Validators.min(this.minPersonsPerClass ?? 2),
          Validators.max(this.maxPersonsPerClass ?? 12),
          Validators.required,
        ]),
      }),
    });
  }

  setup() {
    this.todayDate = new Date();
    this.todayDateStr = this.todayDate.toISOString().split('T')[0];
    this.pricePerPerson = this.beState?.companyData?.pricePerPerson ?? null;

    this.startTime = this.beState?.companyData?.startTime ?? null;
    this.endTime = this.beState?.companyData?.endTime ?? null;

    this.address = this.beState?.companyData?.address ?? null;
    this.companyPhone = this.beState?.companyData?.phone ?? null;
    this.companyMail = this.beState?.companyData?.email ?? null;

    this.minPersonsPerClass =
      this.beState?.companyData?.minPersonsPerClass ?? null;
    this.maxPersonsPerClass =
      this.beState?.companyData?.maxPersonsPerClass ?? null;

    this.maxDateInFuture = new Date(
      new Date().getTime() +
        (this.beState?.companyData?.maxDaysInFuture ?? 0) * 24 * 60 * 60 * 1000
    );
    this.maxDateInFutureStr = this.maxDateInFuture.toISOString().split('T')[0];
    this.form = this.createForm();
  }
}

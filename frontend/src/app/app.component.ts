import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { LanguageSwitcherComponent } from './shared/language-switcher/language-switcher.component';
import { mockEmptyBeState } from './shared/models/mock';
import { IBEState, IBooking, ICompanyData } from './shared/models/model';
import { Observable, of } from 'rxjs';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CarouselComponent,
    LanguageSwitcherComponent,
  ],
  styleUrls: ['../styles/styles.scss'],
})
export class AppComponent implements OnInit {
  beState: IBEState | null = null;

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
  minimalGroupSize: number | null = null;
  maximalGroupSize: number | null = null;
  maxDaysInFuture: number | null = null;

  maxDateInFuture: Date | null = null;
  maxDateInFutureStr: string | null = null;

  form: FormGroup<Form> = this.createForm();

  ngOnInit(): void {
    this.readBEState();
  }

  stripTime(date: Date | null): Date | null {
    if (!date) return null;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
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
        email: new FormControl<string | null>({ value: null, disabled: false }),
        phone: new FormControl<string | null>(
          { value: null, disabled: false },
          [Validators.required]
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
        guests: new FormControl<number | null>({ value: 1, disabled: false }, [
          Validators.min(this.minPersonsPerClass ?? 4),
          Validators.max(this.maxPersonsPerClass ?? 12),
          Validators.required,
        ]),
      }),
    });
  }

  readBEState() {
    // of(db).pipe().subscribe();

    this.beState = mockEmptyBeState;
    this.setup();
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

    this.minimalGroupSize = this.beState?.companyData?.minimalGroupSize ?? null;
    this.maximalGroupSize = this.beState?.companyData?.maximalGroupSize ?? null;

    this.maxDateInFuture = new Date(
      new Date().getTime() +
        (this.beState?.companyData?.maxDaysInFuture ?? 0) * 24 * 60 * 60 * 1000
    );
    this.maxDateInFutureStr = this.maxDateInFuture.toISOString().split('T')[0];
    this.form = this.createForm();
  }
}

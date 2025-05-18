import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { customConfig } from '../config/config';
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
export class AppComponent {

  todayDate = new Date();
  todayDateStr = this.todayDate.toISOString().split('T')[0];
  pricePerPerson = customConfig.pricePerPerson;

  start = customConfig.startTimeHours;
  end = customConfig.endTimeHours;

  address = customConfig.address;
  companyPhone = customConfig.phone;
  companyMail = customConfig.email;

  minPersonsPerClass = customConfig.minPersonsPerClass;
  maxPersonsPerClass = customConfig.maxPersonsPerClass;
  maxDateInFuture = new Date(
    new Date().getTime() + customConfig.maxDaysInFuture * 24 * 60 * 60 * 1000
  );
  maxDateInFutureStr = this.maxDateInFuture.toISOString().split('T')[0];
  form: FormGroup<Form> = this.createForm();

  stripTime(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  dateRangeValidator(min: Date, max: Date): ValidatorFn {
    return (control: AbstractControl<any, any>): ValidationErrors | null => {
      const value = new Date(control.value as string);

      if (isNaN(value.getTime())) return null; // skip if not a valid date

      if (
        this.stripTime(value) < this.stripTime(min) ||
        this.stripTime(value) > this.stripTime(max)
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
          Validators.min(this.minPersonsPerClass),
          Validators.max(this.maxPersonsPerClass),
          Validators.required,
        ]),
      }),
    });
  }
}

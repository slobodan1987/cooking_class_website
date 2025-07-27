import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { LanguageSwitcherComponent } from './shared/language-switcher/language-switcher.component';
import { mockEmptyBeState } from './shared/models/mock';
import { IBEState } from './shared/models/model';
import { BookingFormComponent } from './shared/booking-form/booking-form.component';
import { InfoSectionComponent } from './shared/info-section/info-section.component';
import { ReviewListComponent } from './shared/review-list/review-list.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent,
    LanguageSwitcherComponent,
    ReviewListComponent,
    BookingFormComponent,
    InfoSectionComponent,
  ],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  beState: IBEState | null = null;

  ngOnInit(): void {
    this.readBEState();
  }

  readBEState() {
    this.beState = mockEmptyBeState;
  }
}

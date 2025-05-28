import { Component, Input } from '@angular/core';
import { IBEState } from '../models/model';

@Component({
  selector: 'app-info-section[beState]',
  standalone: true,
  imports: [],
  templateUrl: './info-section.component.html',
  styleUrl: './info-section.component.scss',
})
export class InfoSectionComponent {
  private _beState: IBEState | null = null;

  @Input()
  set beState(value: IBEState | null) {
    this._beState = value;
    this.setup();
  }
  get beState(): IBEState | null {
    return this._beState;
  }
  pricePerPerson: number | null = null;

  startTime: string | null = null;
  endTime: string | null = null;

  address: string | null = null;
  companyPhone: string | null = null;
  companyMail: string | null = null;
  setup() {
    this.pricePerPerson = this.beState?.companyData?.pricePerPerson ?? null;

    this.startTime = this.beState?.companyData?.startTime ?? null;
    this.endTime = this.beState?.companyData?.endTime ?? null;

    this.address = this.beState?.companyData?.address ?? null;
    this.companyPhone = this.beState?.companyData?.phone ?? null;
    this.companyMail = this.beState?.companyData?.email ?? null;
  }
}

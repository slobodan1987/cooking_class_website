import { Component, OnInit } from '@angular/core';
import { IBEState } from '../models/model';
import { mockBeStateWithDates, mockEmptyBeState } from '../models/mock';

@Component({
  selector: 'app-admin-page',
  imports: [],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent implements OnInit {
  beState: IBEState | null = null;

  ngOnInit(): void {
    this.readBEState();
  }
  readBEState() {
    this.beState = mockBeStateWithDates;
  }
}

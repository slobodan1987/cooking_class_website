import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecensionsComponent } from './recensions.component';

describe('RecensionsComponent', () => {
  let component: RecensionsComponent;
  let fixture: ComponentFixture<RecensionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecensionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

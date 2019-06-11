import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBookingHomeComponent } from './section-booking-home.component';

describe('SectionBookingHomeComponent', () => {
  let component: SectionBookingHomeComponent;
  let fixture: ComponentFixture<SectionBookingHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionBookingHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionBookingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

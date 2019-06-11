import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBookingMbComponent } from './section-booking-mb.component';

describe('SectionBookingMbComponent', () => {
  let component: SectionBookingMbComponent;
  let fixture: ComponentFixture<SectionBookingMbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionBookingMbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionBookingMbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

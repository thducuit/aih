import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPhoneNumberComponent } from './booking-phone-number.component';

describe('BookingPhoneNumberComponent', () => {
  let component: BookingPhoneNumberComponent;
  let fixture: ComponentFixture<BookingPhoneNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingPhoneNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

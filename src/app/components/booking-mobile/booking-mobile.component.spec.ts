import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingMobileComponent } from './booking-mobile.component';

describe('BookingMobileComponent', () => {
  let component: BookingMobileComponent;
  let fixture: ComponentFixture<BookingMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

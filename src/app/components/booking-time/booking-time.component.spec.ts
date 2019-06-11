import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTimeComponent } from './booking-time.component';

describe('BookingTimeComponent', () => {
  let component: BookingTimeComponent;
  let fixture: ComponentFixture<BookingTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

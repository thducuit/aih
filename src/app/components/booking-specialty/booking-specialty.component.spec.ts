import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSpecialtyComponent } from './booking-specialty.component';

describe('BookingSpecialtyComponent', () => {
  let component: BookingSpecialtyComponent;
  let fixture: ComponentFixture<BookingSpecialtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingSpecialtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

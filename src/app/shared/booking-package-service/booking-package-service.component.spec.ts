import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPackageServiceComponent } from './booking-package-service.component';

describe('BookingPackageServiceComponent', () => {
  let component: BookingPackageServiceComponent;
  let fixture: ComponentFixture<BookingPackageServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingPackageServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingPackageServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

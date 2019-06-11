import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSlideComponent } from './doctor-slide.component';

describe('DoctorSlideComponent', () => {
  let component: DoctorSlideComponent;
  let fixture: ComponentFixture<DoctorSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

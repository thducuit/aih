import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDoctorComponent } from './section-doctor.component';

describe('SectionDoctorComponent', () => {
  let component: SectionDoctorComponent;
  let fixture: ComponentFixture<SectionDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

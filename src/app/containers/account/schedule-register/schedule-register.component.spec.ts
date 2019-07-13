import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleRegisterComponent } from './schedule-register.component';

describe('ScheduleRegisterComponent', () => {
  let component: ScheduleRegisterComponent;
  let fixture: ComponentFixture<ScheduleRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

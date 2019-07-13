import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCancelComponent } from './schedule-cancel.component';

describe('ScheduleCancelComponent', () => {
  let component: ScheduleCancelComponent;
  let fixture: ComponentFixture<ScheduleCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

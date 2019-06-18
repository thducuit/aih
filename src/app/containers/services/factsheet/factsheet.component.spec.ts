import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactsheetComponent } from './factsheet.component';

describe('FactsheetComponent', () => {
  let component: FactsheetComponent;
  let fixture: ComponentFixture<FactsheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactsheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceConsultingComponent } from './insurance-consulting.component';

describe('InsuranceConsultingComponent', () => {
  let component: InsuranceConsultingComponent;
  let fixture: ComponentFixture<InsuranceConsultingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceConsultingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceConsultingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

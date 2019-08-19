import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceMembershipComponent } from './insurance-membership.component';

describe('InsuranceMembershipComponent', () => {
  let component: InsuranceMembershipComponent;
  let fixture: ComponentFixture<InsuranceMembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

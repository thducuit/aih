import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipConsultingComponent } from './membership-consulting.component';

describe('MembershipConsultingComponent', () => {
  let component: MembershipConsultingComponent;
  let fixture: ComponentFixture<MembershipConsultingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipConsultingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipConsultingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

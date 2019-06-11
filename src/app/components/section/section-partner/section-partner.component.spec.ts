import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPartnerComponent } from './section-partner.component';

describe('SectionPartnerComponent', () => {
  let component: SectionPartnerComponent;
  let fixture: ComponentFixture<SectionPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

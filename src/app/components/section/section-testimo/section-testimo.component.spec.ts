import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTestimoComponent } from './section-testimo.component';

describe('SectionTestimoComponent', () => {
  let component: SectionTestimoComponent;
  let fixture: ComponentFixture<SectionTestimoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionTestimoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTestimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionNewsComponent } from './section-news.component';

describe('SectionNewsComponent', () => {
  let component: SectionNewsComponent;
  let fixture: ComponentFixture<SectionNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

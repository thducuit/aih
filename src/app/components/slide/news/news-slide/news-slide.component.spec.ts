import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSlideComponent } from './news-slide.component';

describe('NewsSlideComponent', () => {
  let component: NewsSlideComponent;
  let fixture: ComponentFixture<NewsSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebTitleComponent } from './web-title.component';

describe('WebTitleComponent', () => {
  let component: WebTitleComponent;
  let fixture: ComponentFixture<WebTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

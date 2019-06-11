import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionMapComponent } from './section-map.component';

describe('SectionMapComponent', () => {
  let component: SectionMapComponent;
  let fixture: ComponentFixture<SectionMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

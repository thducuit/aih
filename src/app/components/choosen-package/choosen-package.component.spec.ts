import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosenPackageComponent } from './choosen-package.component';

describe('ChoosenPackageComponent', () => {
  let component: ChoosenPackageComponent;
  let fixture: ComponentFixture<ChoosenPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosenPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosenPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

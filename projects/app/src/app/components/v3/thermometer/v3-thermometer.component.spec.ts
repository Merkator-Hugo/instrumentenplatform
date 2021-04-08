import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { V3ThermometerComponent } from './v3-thermometer.component';

describe('V3ThermometerComponent', () => {
  let component: V3ThermometerComponent;
  let fixture: ComponentFixture<V3ThermometerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ V3ThermometerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(V3ThermometerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { V3AnalogClockComponent } from './v3-analog-clock.component';

describe('AnalogClockComponent', () => {
  let component: V3AnalogClockComponent;
  let fixture: ComponentFixture<V3AnalogClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ V3AnalogClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(V3AnalogClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

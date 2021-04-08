import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastWidgetComponent } from './forecast-widget.component';

describe('ForecastWidgetComponent', () => {
  let component: ForecastWidgetComponent;
  let fixture: ComponentFixture<ForecastWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

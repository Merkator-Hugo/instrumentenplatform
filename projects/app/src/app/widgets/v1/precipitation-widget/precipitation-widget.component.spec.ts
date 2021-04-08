import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecipitationWidgetComponent } from './precipitation-widget.component';

describe('PrecipitationWidgetComponent', () => {
  let component: PrecipitationWidgetComponent;
  let fixture: ComponentFixture<PrecipitationWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecipitationWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecipitationWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

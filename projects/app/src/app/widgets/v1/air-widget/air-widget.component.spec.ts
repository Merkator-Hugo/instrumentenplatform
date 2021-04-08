import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirWidgetComponent } from './air-widget.component';

describe('AirWidgetComponent', () => {
  let component: AirWidgetComponent;
  let fixture: ComponentFixture<AirWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallTimeWidgetComponent } from './small-time-widget.component';

describe('SmallTimeWidgetComponent', () => {
  let component: SmallTimeWidgetComponent;
  let fixture: ComponentFixture<SmallTimeWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallTimeWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallTimeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

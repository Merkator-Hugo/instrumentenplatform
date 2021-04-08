import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { V2TimeWidgetComponent } from './v2-time-widget.component';

describe('V2TimeWidgetComponent', () => {
  let component: V2TimeWidgetComponent;
  let fixture: ComponentFixture<V2TimeWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ V2TimeWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(V2TimeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

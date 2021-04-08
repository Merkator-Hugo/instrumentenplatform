import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { V3WidgetComponent } from './v3-widget.component';

describe('V3WidgetComponent', () => {
  let component: V3WidgetComponent;
  let fixture: ComponentFixture<V3WidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ V3WidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(V3WidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

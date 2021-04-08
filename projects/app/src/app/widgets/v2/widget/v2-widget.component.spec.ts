import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { V2WidgetComponent } from './v2-widget.component';

describe('V2WidgetComponent', () => {
  let component: V2WidgetComponent;
  let fixture: ComponentFixture<V2WidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ V2WidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(V2WidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SunWidgetComponent } from './sun-widget.component';

describe('SunWidgetComponent', () => {
  let component: SunWidgetComponent;
  let fixture: ComponentFixture<SunWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SunWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SunWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

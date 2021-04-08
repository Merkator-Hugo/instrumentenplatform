import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraWidgetComponent } from './camera-widget.component';

describe('CameraWidgetComponent', () => {
  let component: CameraWidgetComponent;
  let fixture: ComponentFixture<CameraWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

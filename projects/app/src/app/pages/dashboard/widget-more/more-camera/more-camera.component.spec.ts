import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreCameraComponent } from './more-camera.component';

describe('MoreCameraComponent', () => {
  let component: MoreCameraComponent;
  let fixture: ComponentFixture<MoreCameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreCameraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

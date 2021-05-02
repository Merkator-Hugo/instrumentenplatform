import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirComponent } from './air.component';

describe('AirComponent', () => {
  let component: AirComponent;
  let fixture: ComponentFixture<AirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

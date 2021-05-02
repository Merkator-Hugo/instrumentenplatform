import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreMoonComponent } from './more-moon.component';

describe('MoreMoonComponent', () => {
  let component: MoreMoonComponent;
  let fixture: ComponentFixture<MoreMoonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreMoonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreMoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

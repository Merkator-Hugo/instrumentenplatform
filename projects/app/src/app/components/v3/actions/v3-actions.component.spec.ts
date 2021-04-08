import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { V3ActionsComponent } from './v3-actions.component';

describe('V3ActionsComponent', () => {
  let component: V3ActionsComponent;
  let fixture: ComponentFixture<V3ActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ V3ActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(V3ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

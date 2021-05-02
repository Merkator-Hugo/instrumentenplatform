import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TameteoComponent } from './tameteo.component';

describe('TameteoComponent', () => {
  let component: TameteoComponent;
  let fixture: ComponentFixture<TameteoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TameteoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TameteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreTimeComponent } from './more-time.component';

describe('MoreTimeComponent', () => {
  let component: MoreTimeComponent;
  let fixture: ComponentFixture<MoreTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

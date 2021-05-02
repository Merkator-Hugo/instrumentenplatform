import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaufortComponent } from './beaufort.component';

describe('BeaufortComponent', () => {
  let component: BeaufortComponent;
  let fixture: ComponentFixture<BeaufortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeaufortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeaufortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

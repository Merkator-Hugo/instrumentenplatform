import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreSunComponent } from './more-sun.component';

describe('MoreSunComponent', () => {
  let component: MoreSunComponent;
  let fixture: ComponentFixture<MoreSunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreSunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreSunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

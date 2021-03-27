import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonWidgetComponent } from './moon-widget.component';

describe('MoonWidgetComponent', () => {
  let component: MoonWidgetComponent;
  let fixture: ComponentFixture<MoonWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoonWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoonWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { V3ItemListComponent } from './v3-item-list.component';

describe('V3ItemListComponent', () => {
  let component: V3ItemListComponent;
  let fixture: ComponentFixture<V3ItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ V3ItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(V3ItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

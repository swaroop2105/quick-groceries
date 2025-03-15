import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryViewComponent } from './grocery-view.component';

describe('GroceryViewComponent', () => {
  let component: GroceryViewComponent;
  let fixture: ComponentFixture<GroceryViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroceryViewComponent]
    });
    fixture = TestBed.createComponent(GroceryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

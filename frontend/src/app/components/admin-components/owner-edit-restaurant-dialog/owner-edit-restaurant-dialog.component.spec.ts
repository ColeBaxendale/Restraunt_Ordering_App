import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerEditRestaurantDialogComponent } from './owner-edit-restaurant-dialog.component';

describe('OwnerEditRestaurantDialogComponent', () => {
  let component: OwnerEditRestaurantDialogComponent;
  let fixture: ComponentFixture<OwnerEditRestaurantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerEditRestaurantDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerEditRestaurantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

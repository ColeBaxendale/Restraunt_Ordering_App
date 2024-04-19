import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerEditDialogComponent } from './owner-edit-dialog.component';

describe('OwnerEditDialogComponent', () => {
  let component: OwnerEditDialogComponent;
  let fixture: ComponentFixture<OwnerEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerEditDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

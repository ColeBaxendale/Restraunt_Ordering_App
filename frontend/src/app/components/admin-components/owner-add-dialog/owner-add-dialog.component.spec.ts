import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerAddDialogComponent } from './owner-add-dialog.component';

describe('OwnerAddDialogComponent', () => {
  let component: OwnerAddDialogComponent;
  let fixture: ComponentFixture<OwnerAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerAddDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

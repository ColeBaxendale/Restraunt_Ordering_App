import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowDialogComponent } from './admin-show-dialog.component';

describe('AdminShowDialogComponent', () => {
  let component: AdminShowDialogComponent;
  let fixture: ComponentFixture<AdminShowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminShowDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminShowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

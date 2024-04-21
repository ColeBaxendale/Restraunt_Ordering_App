import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerFirstLoginComponent } from './owner-first-login.component';

describe('OwnerFirstLoginComponent', () => {
  let component: OwnerFirstLoginComponent;
  let fixture: ComponentFixture<OwnerFirstLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerFirstLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerFirstLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

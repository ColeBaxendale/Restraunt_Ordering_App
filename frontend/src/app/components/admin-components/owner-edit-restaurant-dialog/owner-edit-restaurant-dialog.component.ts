import { Component, Inject, OnInit } from '@angular/core';
import { User, UserResponse, UserRole } from '../../../../../types';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/admin/owner/requests/user.service';
import { UserValidatorService } from '../../../services/admin/owner/validators/user.validator.service';

@Component({
  selector: 'app-owner-edit-restaurant-dialog',
  standalone: true,
  imports: [NgIf, FormsModule, CommonModule],
  templateUrl: './owner-edit-restaurant-dialog.component.html',
  styleUrl: './owner-edit-restaurant-dialog.component.css'
})
export class OwnerEditRestaurantDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<OwnerEditRestaurantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private userValidator: UserValidatorService
  ) {}

  errorMsg = '';
  orignalEmail = '';
  newOwner = '';
  user: User = {
    email: '',
  };

  ngOnInit(): void {
    this.userService.getUserById(this.data.owner).subscribe({
      next: (response: UserResponse) => {
        if (response.user) {
          this.user.email = response.user.email;
          this.orignalEmail = response.user.email;
        }
      },
      error: (error) => {
        console.error('Failed to find user:', error);
        this.errorMsg = error.error
          ? error.error.message
          : 'An unknown error occurred';
      },
    });
  }

  submitForm() {
    this.errorMsg = '';
    if (this.user.email === this.orignalEmail) {
      this.dialogRef.close();
      return;
    }
    const validationResult = this.userValidator.isValidUserInfo(this.user);
    console.log(validationResult);

    if (!validationResult.isValid) {
      if (validationResult.message) {
        this.errorMsg = validationResult.message;

        return;
      } else {
        this.errorMsg = 'An unknown validation error occured.';
      }
    }
    this.userService.updateUser(this.data.owner, this.user).subscribe({
      next: (response: UserResponse) => {
        console.log('Successfully updated user:', response.message);
        if (response.user) {
          this.user.email = response.user.email;
          this.orignalEmail = response.user.email;
          this.dialogRef.close();

          return;
        }
      },
      error: (error) => {
        console.error('Failed to create user:', error);
        this.errorMsg = error.error
          ? error.error.message
          : 'An unknown error occurred';
      },
    });
  }

  reset(){
    this.userService.resetUser(this.data.owner).subscribe({
      next: (response: UserResponse) => {
        console.log('Successfully reset user:', response.message);
        this.dialogRef.close(response.message);
        return;
      },
      error: (error) => {
        console.error('Reset failed', error);
        this.errorMsg = error.error.message;
      },
    });
  }

  delete() {
    this.userService.deleteUser(this.data.owner).subscribe({
      next: (response: UserResponse) => {
        console.log('Successfully deleted restaurant:', response.message);
        this.dialogRef.close(response.message);
        return;
      },
      error: (error) => {
        console.error('Delete failed', error);
        this.errorMsg = error.error.message;
      },
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}

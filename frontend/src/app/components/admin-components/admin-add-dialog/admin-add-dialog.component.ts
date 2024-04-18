import { Component, Inject } from '@angular/core';
import { User, UserResponse, UserRole } from '../../../../../types';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/owner/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-dialog',
  standalone: true,
  imports: [NgIf, FormsModule, CommonModule],

  templateUrl: './admin-add-dialog.component.html',
  styleUrl: './admin-add-dialog.component.css',
})
export class AdminAddDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AdminAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
  ) {}
  errorMsg = '';
  user: User = {
    email: '',
  };

  cancel() {
    this.dialogRef.close();
  }

  submitForm() {
    this.userService.createUser(this.user).subscribe({
      next: (response: UserResponse) => {
        console.log('Successfully created user:', response.message);
        if (response.userId) {
          this.dialogRef.close(response.userId);
        } else {
          this.dialogRef.close();
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
}

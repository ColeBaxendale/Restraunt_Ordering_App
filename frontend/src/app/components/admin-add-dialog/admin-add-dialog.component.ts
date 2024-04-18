import { Component, Inject } from '@angular/core';
import { User, UserResponse, UserRole } from '../../../../types';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/owner/user.service';
import { Router } from '@angular/router';
import { R3SelectorScopeMode } from '@angular/compiler';

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
    @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, private router: Router, ) {}
  errorMsg = '';
  user: User = {
    email: '',
    password: '',
  };

  cancel() {
    this.dialogRef.close();
  }

  submitForm() {
    this.userService.createUser(this.user).subscribe({
      next: (response: UserResponse) => {
        console.log('Successfully created user:', response.message);
        // Assuming response.user holds the created user data
        console.log(response.userId);
        
        if (response.userId) {
          this.dialogRef.close(response.userId);  // Pass the created user back
        } else {
          this.dialogRef.close(); // Close without data if user is not in the response
        }
      },   
      error: (error) => {
        console.error('Failed to create user:', error);
        this.errorMsg = error.error ? error.error.message : 'An unknown error occurred';
      },
    });
  }
  
}

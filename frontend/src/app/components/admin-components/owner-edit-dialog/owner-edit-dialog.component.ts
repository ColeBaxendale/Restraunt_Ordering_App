import { Component, Inject, OnInit } from '@angular/core';
import { User, UserResponse, UserRole } from '../../../../../types';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/owner/user.service';
@Component({
  selector: 'app-owner-edit-dialog',
  standalone: true,
  imports: [NgIf, FormsModule, CommonModule],
  templateUrl: './owner-edit-dialog.component.html',
  styleUrl: './owner-edit-dialog.component.css'
})
export class OwnerEditDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<OwnerEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
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
    if(this.user.email === this.orignalEmail){
      this.dialogRef.close();

      return;
    }
    this.userService.updateUser(this.data.owner, this.user).subscribe({
      next: (response: UserResponse) => {
        console.log('Successfully updated user:', response.message);
        if(response.user){
          this.user.email = response.user.email
          this.orignalEmail = response.user.email
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

  delete(){
    this.userService.deleteUser(this.data.owner).subscribe({
      next: (response: UserResponse) => {
        console.log('Successfully deleted restaurant:', response.message);
        this.dialogRef.close('deleted');
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

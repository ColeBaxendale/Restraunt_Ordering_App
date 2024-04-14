import { Component } from '@angular/core';
import {  UserAdd, UserRole } from '../../../../types';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-add-dialog',
  standalone: true,
  imports: [NgIf, FormsModule, CommonModule],

  templateUrl: './admin-add-dialog.component.html',
  styleUrl: './admin-add-dialog.component.css'
})
export class AdminAddDialogComponent {
cancel() {
throw new Error('Method not implemented.');
}
submitForm() {
throw new Error('Method not implemented.');
}
  user: UserAdd = {
    email: '',
    name: '',
    role: UserRole.Owner,
  }
}

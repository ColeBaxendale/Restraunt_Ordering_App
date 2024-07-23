import { NgIf, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-owner-first-login',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatProgressBarModule,
  ],
  templateUrl: './owner-first-login.component.html',
  styleUrl: './owner-first-login.component.css'
})
export class OwnerFirstLoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

}

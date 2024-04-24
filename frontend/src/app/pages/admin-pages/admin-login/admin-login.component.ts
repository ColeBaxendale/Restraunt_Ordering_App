import { NgIf, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';
import { SessionService } from '../../../services/session/session.service';
import { LoginService } from '../../../services/admin/login/login.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [NgIf, CommonModule, FormsModule, RouterOutlet,MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  errorMsg = '';
  adminCreds = {
    username: '',
    password: '',
  };
  hide = true;
  constructor(private router: Router, private adminLoginService: LoginService) {}

  onSubmit() {
    this.adminLoginService.login(this.adminCreds.username, this.adminCreds.password).subscribe({
      next: (response) => {    
          this.router.navigate(['/admin']);
          return;
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMsg = error.error.message;
      },
    });
  }
}

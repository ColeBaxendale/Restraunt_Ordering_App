import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { response } from 'express';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private sessionService: SessionService) {}

  onSubmit() {
    this.sessionService.login(this.user.email, this.user.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response.role + ' role');
        const role = response.role;
        if (role === 'admin') this.router.navigate(['/admin']);
        else if (role === 'owner') this.router.navigate(['/owner']);
        else {
          console.error('Unexpected user role:', role);
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        console.error('Login failed', error);
        // Handle login error (show error message to user, etc.)
      },
    });
  }
}

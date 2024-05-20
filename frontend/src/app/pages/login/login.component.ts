import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { SessionService } from '../../services/session/session/session.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, CommonModule, FormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  errorMsg = '';
  user = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private sessionService: SessionService) {}

  onSubmit() {
    this.sessionService.login(this.user.email, this.user.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response.user.role + ' role' + response.firstLogin);
        this.sessionService.setCurrentId(response.user._id);
        if (response.firstLogin && response.user.role === 'owner') {
          console.log('here');
          
          this.router.navigate(['/owner/reset/'+response.user._id]);
          return;
        } else if (response.user.role === 'owner') {
          this.router.navigate(['/owner/' + response.user._id]);
          return;
        } else if(response.user.role === 'admin' ) {
          this.router.navigate(['/admin']);

        }
        else {
          console.error('Unexpected user role:', response.user.role);
          this.errorMsg = 'Unexpected user role:' + response.user.role;
          this.router.navigate(['/']);
          return;
        }
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMsg = error.error.message;
      },
    });
  }
}

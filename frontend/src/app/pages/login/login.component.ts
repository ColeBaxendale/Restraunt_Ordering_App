import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  // Assuming part of src/app/login.component.ts
onSubmit() {
  this.authService.login(this.user.email, this.user.password)
    .subscribe({
      next: () => {
        // After login, verify the user to determine the role and redirect accordingly
        this.authService.verifyUser().subscribe({
          next: (res: { role: string; }) => {
            // Navigate based on the role
            if (res.role === 'admin') {
              this.router.navigate(['/admin']);
            } else if (res.role === 'owner') {
              this.router.navigate(['/owner']); // Ensure you handle the 'owner' route correctly in your routing module
            } else {
              // Optionally handle other roles or lack thereof
              console.log('Unauthorized role or no role provided');
            }
          },
          error: (error: any) => {
            console.error('Verification failed:', error);
            // Handle error (e.g., redirect to login page)
          }
        });
      },
      error: (error: any) => {
        console.error('Login failed:', error);
        // Optionally display an error message
      }
    });
}

}


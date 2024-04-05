import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';


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

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    console.log(this.user);
    this.http.post('http://localhost:3000/user/login', this.user, { withCredentials: true })
      .subscribe({
        next: (res: any) => {
          alert(res);
          localStorage.setItem('token', res.token);
          // Correctly use Angular's Router to navigate
          console.log('Login successful:', res);
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}


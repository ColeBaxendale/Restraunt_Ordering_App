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
          console.log('Login successful:', res);
          if(res.role === "admin"){
            this.router.navigate(['/admin']);
          }
          else if(res.role === "owner"){
            this.router.navigate(['/owner']);
          }
          else{
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}


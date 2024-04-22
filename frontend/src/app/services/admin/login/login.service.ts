import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/admin/';


  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'login',
      { username, password },
      { withCredentials: true }
    );
  }

  logout(): Observable<any> {
    return this.http.get(this.apiUrl + 'logout', {
      responseType: 'text',
      withCredentials: true,
    });
  }
}

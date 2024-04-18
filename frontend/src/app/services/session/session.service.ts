import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = 'http://localhost:3000/session/';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl + 'login', { email, password },{ withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.get(this.apiUrl + 'logout', { responseType: 'text', withCredentials: true });
  }



}

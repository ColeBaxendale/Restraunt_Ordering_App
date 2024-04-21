import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../../../types';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private apiUrl = 'http://localhost:3000/session/';
  private currentId!: string;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      this.apiUrl + 'login',
      { email, password },
      { withCredentials: true }
    );
  }

  logout(): Observable<any> {
    return this.http.get(this.apiUrl + 'logout', {
      responseType: 'text',
      withCredentials: true,
    });
  }

  setCurrentId(id: string) {
    this.currentId = id;
  }

  getCurrentId(): string {
    return this.currentId;
  }
}


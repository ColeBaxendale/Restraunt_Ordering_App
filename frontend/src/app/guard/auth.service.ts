// src/app/authentication.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  verifyAdminRole() {
    return this.http
      .get<{ authorized: boolean }>(
        'http://localhost:3000/session/auth/admin',
        { withCredentials: true }
      )
      .pipe(
        map((response) => response.authorized),
        catchError(() => of(false))
      );
  }

  verifyOwnerRole() {
    return this.http
      .get<{ authorized: boolean }>(
        'http://localhost:3000/session/auth/owner',
        { withCredentials: true }
      )
      .pipe(
        map((response) => response.authorized),
        catchError(() => of(false))
      );
  }
}

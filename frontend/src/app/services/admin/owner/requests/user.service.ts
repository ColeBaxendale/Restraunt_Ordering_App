import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User, UserResponse } from '../../../../../../types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/admin/users'; // Assuming your API endpoint for users

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.baseUrl}`, user, {
      withCredentials: true,
    });
  }
  getUserById(id: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }

  updateUser(id: string, user: User): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.baseUrl}/${id}`, user, {
      withCredentials: true,
    });
  }

  resetUser(id: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.baseUrl}/${id}/reset`, {
      withCredentials: true,
    });
  }

  deleteUser(id: string): Observable<UserResponse> {
    return this.http.delete<UserResponse>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }

  getAllUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.baseUrl}`, {
      withCredentials: true,
    });
  }
}

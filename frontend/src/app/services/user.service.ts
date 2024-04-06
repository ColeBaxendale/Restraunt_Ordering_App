import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/admin/users'; // Assuming your API endpoint for users

  constructor(private http: HttpClient) {}

  // Create a new user
  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user).pipe(
      catchError(error => {
        console.error('Error creating user:', error);
        throw error;
      })
    );
  }

  // Retrieve all users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error getting users:', error);
        throw error;
      })
    );
  }

  // Retrieve a single user by ID
  getUserById(userId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error getting user by ID:', error);
        throw error;
      })
    );
  }

  // Update an existing user
  updateUser(user: any): Observable<any> {
    const url = `${this.apiUrl}/${user._id}`; // Assuming user has an '_id' property
    return this.http.put<any>(url, user).pipe(
      catchError(error => {
        console.error('Error updating user:', error);
        throw error;
      })
    );
  }

  // Delete an existing user by ID
  deleteUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<any>(url).pipe(
      catchError(error => {
        console.error('Error deleting user:', error);
        throw error;
      })
    );
  }
}

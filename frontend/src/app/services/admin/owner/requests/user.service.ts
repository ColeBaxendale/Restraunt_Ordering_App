import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { User, UserResponse } from '../../../../../../types';
import { LoadingService } from '../../../loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/admin/users'; // Assuming your API endpoint for users

  constructor(private http: HttpClient,public loadingService: LoadingService,) {}

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
  const token = localStorage.getItem('token'); // Adjust based on how you store the token
  return this.http.post<UserResponse>(`${this.baseUrl}/${id}/reset`, {}, {
    headers: new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    }),
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
  doesUserExist(email: string): Observable<boolean> {
    this.loadingService.setLoading(true, 'owner'); // Set loading to true
    return this.http.post<{ exists: boolean }>(
      `${this.baseUrl}/check-email`, 
      { email }, 
      { withCredentials: true }
    ).pipe(
      map(response => response.exists), // Map the response to the existence boolean
      finalize(() => this.loadingService.setLoading(false, 'owner')) // Reset loading state on completion or error
    );
  }
}

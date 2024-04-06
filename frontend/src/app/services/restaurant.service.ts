import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../pages/admin/admin.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private baseUrl = 'http://localhost:3000/admin/restaurants'; // Assuming your backend API endpoint

  constructor(private http: HttpClient) { }

  createRestaurant(payload: { email: any; name: any; restaurantData: any; }): Observable<Restaurant> {

    return this.http.post<Restaurant>(this.baseUrl, payload,{withCredentials: true });
  }

  getRestaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.baseUrl}/${id}`,{withCredentials: true });
  }

  updateRestaurant(id: string, restaurant: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.baseUrl}/${id}`, restaurant,{withCredentials: true });
  }

  deleteRestaurant(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`,{withCredentials: true });
  }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.baseUrl}`,{withCredentials: true });
  }
}
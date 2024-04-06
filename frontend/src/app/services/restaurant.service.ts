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

    return this.http.post<Restaurant>(this.baseUrl, payload);
  }

  getRestaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.baseUrl}/${id}`);
  }

  updateRestaurant(id: string, restaurant: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.baseUrl}/${id}`, restaurant);
  }

  deleteRestaurant(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.baseUrl}`);
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private baseUrl = 'http://localhost:3000/admin/restaurants'; // Assuming your backend API endpoint

  constructor(private http: HttpClient) { }

  createRestaurant(restaurantData: any): Observable<Restaurant> {
    return this.http.post<Restaurant>(`${this.baseUrl}`, restaurantData, { withCredentials: true });
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
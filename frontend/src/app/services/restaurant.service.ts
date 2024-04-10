import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestaurantDetailsUpdate, Restaurant } from '../../../types';
import { RestaurantResponse } from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private baseUrl = 'http://localhost:3000/admin/restaurants'; 

  constructor(private http: HttpClient) { }

  createRestaurant(restaurantData: any): Observable<RestaurantResponse> {
    return this.http.post<RestaurantResponse>(`${this.baseUrl}`, restaurantData, { withCredentials: true });
  }
  
  getRestaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.baseUrl}/${id}`,{withCredentials: true });
  }

  updateRestaurant(id: string, restaurant: Restaurant): Observable<RestaurantResponse> {
    return this.http.put<RestaurantResponse>(`${this.baseUrl}/${id}`, restaurant,{withCredentials: true });
  }

  updateRestaurantDetails(id: string, restaurant: RestaurantDetailsUpdate): Observable<RestaurantResponse> {
    return this.http.put<RestaurantResponse>(`${this.baseUrl}/${id}`, restaurant,{withCredentials: true });
  }
  
  updateRestaurantStepThree(id: string, restaurant: RestaurantDetailsUpdate): Observable<RestaurantResponse> {
    return this.http.put<RestaurantResponse>(`${this.baseUrl}/${id}`, restaurant,{withCredentials: true });
  }

  deleteRestaurant(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`,{withCredentials: true });
  }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.baseUrl}`,{withCredentials: true });
  }
}
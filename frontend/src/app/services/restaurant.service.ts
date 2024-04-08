import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PartialRestaurantUpdate, Restaurant } from '../../../types';
import { RestaurantResponse } from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private baseUrl = 'http://localhost:3000/admin/restaurants'; // Assuming your backend API endpoint

  constructor(private http: HttpClient) { }

  createRestaurant(restaurantData: any): Observable<RestaurantResponse> {
    return this.http.post<RestaurantResponse>(`${this.baseUrl}`, restaurantData, { withCredentials: true });
  }
  
  getRestaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.baseUrl}/${id}`,{withCredentials: true });
  }

  updateRestaurant(name: string, restaurant: Restaurant): Observable<RestaurantResponse> {
    return this.http.put<RestaurantResponse>(`${this.baseUrl}/${name}`, restaurant,{withCredentials: true });
  }

  updateRestaurantStepTwo(name: string, restaurant: PartialRestaurantUpdate): Observable<RestaurantResponse> {
    return this.http.put<RestaurantResponse>(`${this.baseUrl}/${name}`, restaurant,{withCredentials: true });
  }

  updateRestaurantStepThree(name: string, restaurant: PartialRestaurantUpdate): Observable<RestaurantResponse> {
    return this.http.put<RestaurantResponse>(`${this.baseUrl}/${name}`, restaurant,{withCredentials: true });
  }

  deleteRestaurant(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`,{withCredentials: true });
  }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.baseUrl}`,{withCredentials: true });
  }
}
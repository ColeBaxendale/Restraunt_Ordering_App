import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, map } from 'rxjs';
import { Restaurant, RestaurantAndUserResponse } from '../../../../../../types';
import { RestaurantResponse } from '../../../../../../types';
import { LoadingService } from '../../../loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private baseUrl = 'http://localhost:3000/admin/restaurants';
  private currentId!: string;
  private currentOwnerEmail!: string;
  private currentOwnerId!: string;
  private currentRestaurantName!: string;


  constructor(private http: HttpClient,public loadingService: LoadingService) {}

  setCurrentId(id: string) {
    this.currentId = id;
  }

  getCurrentId(): string {
    return this.currentId;
  }

  setCurrentOwnerId(id: string) {
    this.currentOwnerId = id;
  }

  getCurrentOwnerId(): string {
    return this.currentOwnerId;
  }

  setCurrentOwnerEmail(currentOwnerEmail: string) {
    this.currentOwnerEmail = currentOwnerEmail;
  }

  getCurrentOwnerEmail(): string {
    return this.currentOwnerEmail;
  }

  setCurrentRestaurantName(currentRestaurantName: string) {
    this.currentRestaurantName = currentRestaurantName;
  }

  getCurrentRestaurantName(): string {
    return this.currentRestaurantName;
  }



  createRestaurant(restaurantData: any): Observable<RestaurantResponse> {
    return this.http.post<RestaurantResponse>(
      `${this.baseUrl}`,
      restaurantData,
      { withCredentials: true }
    );
  }

  createRestaurantWithOwner(email: string, restaurantData: any): Observable<RestaurantAndUserResponse> {
    const requestBody = {
      email: email,
      ...restaurantData
    };
    return this.http.post<RestaurantAndUserResponse>(
      `${this.baseUrl}-with-owner`,
      requestBody,
      { withCredentials: true }
    );
  }

  getRestaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }

  updateRestaurant(id: string,restaurant: Restaurant): Observable<RestaurantResponse> {
    if(this.getCurrentOwnerId()){
      restaurant.details.owner = this.getCurrentOwnerId();
    }
    return this.http.put<RestaurantResponse>(
      `${this.baseUrl}/${id}`,
      restaurant,
      { withCredentials: true }
    );
  }

  updateRestaurantWithNewOwner(id: string, restaurant: Restaurant): Observable<RestaurantAndUserResponse> {
    return this.http.put<RestaurantAndUserResponse>(
      `${this.baseUrl}/${id}/create-owner`,
      restaurant,
      { withCredentials: true }
    );
  }

  deleteOwnerAndUpdateRestaurant(id: string, restaurant: Restaurant): Observable<RestaurantAndUserResponse> {
    const requestBody = {
      email: this.getCurrentOwnerEmail(),
      ...restaurant
    };
    return this.http.put<RestaurantAndUserResponse>(
      `${this.baseUrl}/${id}/delete-owner`,
      requestBody,
      { withCredentials: true }
    );
  }

  deleteOwnerAddNewOwnerUpdateRestaurant(id: string, restaurant: Restaurant): Observable<RestaurantAndUserResponse> {
    const requestBody = {
      email: this.getCurrentOwnerEmail(),
      ...restaurant
    };
    return this.http.put<RestaurantAndUserResponse>(
      `${this.baseUrl}/${id}/delete-and-add-owner`,
      requestBody,
      { withCredentials: true }
    );
  }

  deleteRestaurant(id: string): Observable<RestaurantResponse> {
    return this.http.delete<RestaurantResponse>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.baseUrl}`, {
      withCredentials: true,
    });
  }

  doesRestaurantExist(name: string): Observable<boolean> {
    this.loadingService.setLoading(true, 'name'); // Set loading to true
    return this.http.post<{ exists: boolean }>(
      `${this.baseUrl}/check-name`, 
      { name }, 
      { withCredentials: true }
    ).pipe(
      map((response: { exists: any; }) => response.exists), // Map the response to the existence boolean
      finalize(() => this.loadingService.setLoading(false, 'name')) // Reset loading state on completion or error
    );
  }


}

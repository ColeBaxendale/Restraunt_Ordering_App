import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { Restaurant } from '../../../../../types';
import { RestaurantService } from '../../../services/admin/restaurant/requests/restaurant.service';
import { SessionService } from '../../../services/session/session.service';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DividerModule } from 'primeng/divider';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, NgFor,AutoCompleteModule,ReactiveFormsModule,MatCardModule,FormsModule, MatIcon],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  restaurants: Restaurant[] = [];
  selectedRestaurant: Restaurant | null = null;
  totalIncome: number = 0;
  totalLiveRestaurants: number = 0;
  totalAmountMade: number = 0;
  searchTerm: string = '';

  formGroup: FormGroup;
  filteredRestaurants: Restaurant[] = [];

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.formGroup = this.fb.group({
      selectedRestaurant: new FormControl()
    });
  }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchRestaurants(this.searchTerm);
  }
  
  loadRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe({
      next: (response: any) => {
        if (response && response.restaurants) {
          this.restaurants = response.restaurants;
          this.filteredRestaurants = this.restaurants;
          this.totalLiveRestaurants = this.restaurants.filter(
            (r) => r.admin && r.admin.isActive
          ).length;
          this.totalAmountMade = this.restaurants.reduce(
            (acc, curr) =>
              acc +
              (curr.admin && curr.admin.overallIncome
                ? curr.admin.overallIncome
                : 0) -
              0.01,
            0
          );
        } else {
          console.error('Invalid data structure:', response);
        }
        console.log('Restaurants loaded:', this.restaurants);
      },
      error: (err) => {
        console.error('Error loading restaurants:', err);
      },
    });
  }

  restaurantPage(restaurantId: string) {
    this.restaurantService.setCurrentId(restaurantId);
    this.router.navigate(['/restaurant']);
  }

  searchRestaurants(searchTerm: string): void {
    if (searchTerm) {
      this.filteredRestaurants = this.restaurants.filter(restaurant =>
        restaurant.details.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      // If no search term is provided, show all restaurants
      this.filteredRestaurants = this.restaurants;
    }
  }

  addRestaurant(): void {
    this.router.navigate(['/addRestaurant']);
  }

  logout(): void {
    this.sessionService
      .logout()
      .pipe(finalize(() => this.router.navigate(['/login/admin'])))
      .subscribe({
        next: () => console.log('Logged out successfully'),
        error: (error) => console.error('Logout failed:', error),
      });
  }
}

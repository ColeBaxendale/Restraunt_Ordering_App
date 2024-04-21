import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { Restaurant } from '../../../../../types';
import { RestaurantService } from '../../../services/admin/restaurant/requests/restaurant.service';
import { SessionService } from '../../../services/session/session.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  selectedRestaurant: Restaurant | null = null;
  totalIncome: number = 0;
  totalLiveRestaurants: number = 0;
  totalAmountMade: number = 0;

  constructor(
    private restaurantService: RestaurantService,
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe({
      next: (response: any) => {
        if (response && response.restaurants) {
          this.restaurants = response.restaurants;
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

  searchRestaurants(inputElement: HTMLInputElement): void {
    const searchTerm = inputElement.value;
    // Implement search functionality
  }

  addRestaurant(): void {
    this.router.navigate(['/addRestaurant']);
  }

  logout(): void {
    this.sessionService
      .logout()
      .pipe(finalize(() => this.router.navigate(['/login'])))
      .subscribe({
        next: () => console.log('Logged out successfully'),
        error: (error) => console.error('Logout failed:', error),
      });
  }
}

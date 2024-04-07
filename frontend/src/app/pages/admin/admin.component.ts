import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { SessionService } from '../../services/session.service';
import { Restaurant } from '../../../../types';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,NgFor],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  selectedRestaurant: Restaurant | null = null;
  totalIncome: number = 0;

  constructor(private restaurantService: RestaurantService, public dialog: MatDialog,private http: HttpClient,private router: Router, private sessionService: SessionService) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe(
      (data: any) => {
        this.restaurants = data.restaurants; // Assign retrieved data to restaurants array
        console.log('Restaurants loaded successfully:', this.restaurants);
      },
      (error) => {
        console.error('Error loading restaurants:', error);
      }
    );
  }
  


  searchRestaurants(inputElement: HTMLInputElement): void {
  const searchTerm = inputElement.value;
  // Implement search functionality
  }

  addRestaurant(): void {
    this.router.navigate(['/addRestaurant']);
}

  selectRestaurant(restaurant: Restaurant): void {
    // Set selectedRestaurant for editing and show modal/form
  }

  logout(): void {
    this.sessionService.logout()
    .pipe(
      finalize(() => this.router.navigate(['/login']))
    )
    .subscribe({
      next: () => console.log('Logged out successfully'),
      error: (error) => console.error('Logout failed:', error),
    });
}

}


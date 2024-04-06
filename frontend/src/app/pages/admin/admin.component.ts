import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { AddRestaurantDialogComponent } from '../../components/add-restaurant/add-restaurant.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
export interface Restaurant {
  uniqueId: string;
  name: string;
  description?: string;
  location: {
    address: string,
    city: string, 
    state: string, 
    zipCode: string, 
  };
  owner?: string;
  operatingHours?: {
    monday: { open: string, close: string }, 
    tuesday: { open: string, close: string }, 
    wednesday: { open: string, close: string }, 
    thursday: { open: string, close: string }, 
    friday: { open: string, close: string }, 
    saturday: { open: string, close: string }, 
    sunday: { open: string, close: string }, 
  };
  menuSections?: string[]; 
  ordersEnabled?: boolean;
  isActive?: boolean;
  stripeAccountId: string;
  overallIncome: number;
  fixedRate: number;
  addFees: boolean;
}

export interface User {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'owner';
  restaurant: string;
}


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  selectedRestaurant: Restaurant | null = null;
  totalIncome: number = 0;

  constructor(private restaurantService: RestaurantService, public dialog: MatDialog,private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    // Implement service call to fetch restaurants
    // Calculate total income
  }

  searchRestaurants(inputElement: HTMLInputElement): void {
  const searchTerm = inputElement.value;
  // Implement search functionality
  }

  showAddRestaurantForm(): void {
    const dialogRef = this.dialog.open(AddRestaurantDialogComponent, {
      width: '70vw',
      height: 'max-content',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      // Handle result if needed, result is what's passed with dialog close
  })
}

  selectRestaurant(restaurant: Restaurant): void {
    // Set selectedRestaurant for editing and show modal/form
  }

  logout(): void {
    this.http.get('http://localhost:3000/user/logout', { withCredentials: true })
    .pipe(
      finalize(() => this.router.navigate(['/login']))
    )
    .subscribe({
      next: (response) => console.log('Logged out successfully'),
      error: (error) => console.error('Logout failed:', error),
    });
}}
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant, RestaurantResponse } from '../../../../types';
import { SessionService } from '../../services//session/session.service';
import { finalize } from 'rxjs';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant/requests/restaurant.service';
import { RestaurantValidatorService } from '../../services/restaurant/validators/restaurant.validator.service';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [NgIf, FormsModule, CommonModule],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent {
  restaurantId!: string;  // Non-null assertion
  restaurant!: Restaurant;  // Consider defining a more specific type
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router: Router,
    private sessionService: SessionService,
    private restaurantValidator: RestaurantValidatorService


  ) { }

  ngOnInit() {
    this.restaurantId = this.route.snapshot.paramMap.get('id')!;
    this.fetchRestaurant();
  }

  fetchRestaurant() {
    if (this.restaurantId) {
      this.restaurantService.getRestaurantById(this.restaurantId).subscribe({
        next: (data) => this.restaurant = data,
        error: (error) => console.error('Error fetching restaurant data:', error)
      });
    } else {
      console.error('Restaurant ID is not available');
    }
  }

  submitForm() {
    this.resetTimesIfNeeded();
    this.errorMsg = '';
    const validationResult = this.restaurantValidator.isValidRestaurantInfo(this.restaurant);
    if (!validationResult.isValid) {
      if(validationResult.message){
        this.errorMsg = validationResult.message;
        return;
      } else{
        this.errorMsg = 'An unknown validation error occured.'
      }
    }
  
    this.restaurantService.updateRestaurant(this.restaurantId, this.restaurant).subscribe({
      next: (response: RestaurantResponse) => {
        console.log('Successfully updated restaurant:', response.message);
        this.router.navigate(['/admin']);
      },
      error: (error) => {
        console.error('Update failed', error);
        this.errorMsg = error.error.message;
      },
    });
  }
  

   resetTimesIfNeeded() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    days.forEach(day => {
      if (!this.restaurant.details.operatingHours[day].isOpen) {
        this.restaurant.details.operatingHours[day].open = '';
        this.restaurant.details.operatingHours[day].close = '';
      }
    });
  }


  cancel() {
    this.router.navigate(['/admin']);
  }
  
  
  logout(): void {
    this.sessionService
      .logout()
      .pipe(finalize(() => this.router.navigate(['/login'])))
      .subscribe({
        next: () => console.log('Logged out successfully'),
        error: (error: any) => console.error('Logout failed:', error),
      });
  }
  

  delete(): void {
    this.restaurantService.deleteRestaurant(this.restaurantId).subscribe({
      next: (response: RestaurantResponse) => {
        console.log('Successfully deleted restaurant:', response.message);
        this.router.navigate(['/admin']);
      },
      error: (error) => {
        console.error('Delete failed', error);
        this.errorMsg = error.error.message;
      }
    });
  }
  
}

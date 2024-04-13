import { Component } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant, RestaurantResponse } from '../../../../types';
import { SessionService } from '../../services/session.service';
import { finalize } from 'rxjs';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    console.log('submitForm started');
    this.resetTimesIfNeeded();
  
    let validationErrors = [];
    
    if (!this.restaurant) {
      validationErrors.push('Restaurant is undefined');
    }
  
    if (!this.restaurant.details.name || this.restaurant.details.name === '') {
      validationErrors.push('Name must be filled in');
    } else if (!this.isValidName()) {
      validationErrors.push('Name must be more than 4 characters and less than 50');
    }
  
    if (this.restaurant.details.phone && !this.isValidPhoneNumber()) {
      validationErrors.push('Phone number must be in the format 111-111-1111');
    }
  
    if (this.restaurant.details.description && !this.isValidDescription()) {
      validationErrors.push('Description must be between 50 to 1000 characters');
    }
  
    if (this.restaurant.details.location.address && !this.isValidAddress()) {
      validationErrors.push('Address must be between 6 to 100 characters');
    }
  
    if (this.restaurant.details.location.city && !this.isValidCity()) {
      validationErrors.push('City must be between 4 to 30 characters');
    }
  
    if (this.restaurant.details.location.state) {
      this.restaurant.details.location.state = this.restaurant.details.location.state.toUpperCase();
      if (!this.isValidState()) {
        validationErrors.push('State is not valid');
      }
    }
  
    if (this.restaurant.details.location.zipCode && !this.isValidZipPlus4Code()) {
      validationErrors.push('Zip code must be 5 digits or +4 11971-1311');
    }
  
    ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].forEach(day => {
      if (!this.isValidOperatingHours(day)) {
        validationErrors.push(`Invalid operating hours for ${day}. Open time must be before close time and both must be filled.`);
      }
    });
  
    if (this.restaurant.admin.fixedRate != 0.02 && !this.isValidFixedRate()) {
      validationErrors.push('Fixed rate must be between 0.01 and 0.10');
    }
  
    if (this.restaurant.stripe.stripeAccountId && !this.isValidStripeID()) {
      validationErrors.push('Stripe ID must be between 1 and 100');
    }
  
    if (validationErrors.length > 0) {
      console.log('Validation errors:', validationErrors);
      this.errorMsg = validationErrors.join(', ');
      return;
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
  



  isValidName(): boolean {
   if(this.restaurant.details.name.length > 4 && this.restaurant.details.name.length < 50)
    return true;
  return false; 
  }

  isValidPhoneNumber(): boolean {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(this.restaurant.details.phone);
  }

  isValidDescription(): boolean {
   if(this.restaurant.details.description.length > 50 && this.restaurant.details.description.length < 1000)
    return true;
  return false; 
  }

  isValidAddress(): boolean {
    if(!this.restaurant.details.location.address)
      return false;
    if(this.restaurant.details.location.address.length > 6 && this.restaurant.details.location.address.length < 100)
     return true;
   return false; 
   }

   isValidCity(): boolean {
    if(!this.restaurant.details.location.city)
      return false;
    if(this.restaurant.details.location.city.length > 4 && this.restaurant.details.location.city.length < 30)
     return true;
   return false; 
   }

   isValidState(): boolean {
    console.log('Checking state:', this.restaurant.details.location.state); // Log the state value
    if (!this.restaurant.details.location.state) {
      console.log('State is undefined or empty');
      return false;
    }
    const stateRegex = /^(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)$/;
    const isValid = stateRegex.test(this.restaurant.details.location.state);
    console.log('State is valid:', isValid);
    return isValid;
  }
  

   isValidZipPlus4Code(): boolean {
    if(!this.restaurant.details.location.zipCode)
      return false;
    const pattern = /^\d{5}(-\d{4})?$/; // Matches 5 digits, optionally followed by a hyphen and 4 more digits
    return pattern.test(this.restaurant.details.location.zipCode);
  }

  isValidOperatingHours(day: string | number): boolean {
    const hours = this.restaurant.details.operatingHours[day];
    if (!hours.isOpen) {
      return true; // No need to check times if the day is marked as closed
    }
  
    if (!hours.open || !hours.close) {
      return false; // Both times must be filled
    }
  
    // Compare times, assuming time format is HH:mm (24-hour format)
    const openTime = new Date('1970-01-01T' + hours.open + ':00Z');
    const closeTime = new Date('1970-01-01T' + hours.close + ':00Z');
  
    return openTime < closeTime;
  }

  isValidFixedRate(): boolean {
    if(!this.restaurant.admin.fixedRate)
      return false;
    if(this.restaurant.admin.fixedRate < 0.10 && this.restaurant.admin.fixedRate > 0.01)
     return true;
   return false; 
   }

   isValidStripeID(): boolean {
    if(!this.restaurant.stripe.stripeAccountId)
      return false;
    if(this.restaurant.stripe.stripeAccountId.length > 1 && this.restaurant.stripe.stripeAccountId.length < 100)
     return true;
   return false; 
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
  
}

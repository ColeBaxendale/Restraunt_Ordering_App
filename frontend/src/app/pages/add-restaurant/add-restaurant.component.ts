import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { FormsModule } from '@angular/forms';
import {
  RestaurantResponse,
  Restaurant,
  UserRole,
} from '../../../../types';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { SessionService } from '../../services/session.service';
import { AdminAddDialogComponent } from '../../components/admin-add-dialog/admin-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add-restaurant',
  standalone: true,
  imports: [NgIf, FormsModule, CommonModule],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.css',
})
export class AddRestaurantComponent {

  currentStep: number = 1;
  id: string | undefined;
  errorMsg = '';
  name: string = "";
  restaurantDetails: Restaurant = {
    details: {
      name: '',
      logo: '',
      description: '',
      phone: '',
      location: {
        address: '',
        city: '',
        state: ''.toUpperCase(),
        zipCode: '',
      },
      operatingHours: {
        monday: { isOpen: false, open: '', close: '' },
        tuesday: { isOpen: false, open: '', close: '' },
        wednesday: { isOpen: false, open: '', close: '' },
        thursday: { isOpen: false, open: '', close: '' },
        friday: { isOpen: false, open: '', close: '' },
        saturday: { isOpen: false, open: '', close: '' },
        sunday: { isOpen: false, open: '', close: '' },
      },
      ordersEnabled: false,
      owner: undefined,
      menuSections: []
    },

    admin:{
      isActive: false,
      fixedRate: 0.02,
      overallIncome: 0.01
    },

    stripe: {
      stripeAccountId: '',
      addFees: false,
    },

  };


  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private sessionService: SessionService,
    private dialog: MatDialog
  ) {}
  
  submitForm() {
    console.log(this.restaurantDetails);
    this.resetTimesIfNeeded();
    
    this.errorMsg = '';
    if (!this.restaurantDetails.details.name || this.restaurantDetails.details.name === '') {
      this.errorMsg = 'Name must be filled in';
      return;
    }
    // Validate name length
    else if (!this.isValidName()) {
      this.errorMsg = 'Name must be more than 4 characters and less than 50';
      return;
    }
    
    if (this.restaurantDetails.details.phone != '') {
      if(!this.isValidPhoneNumber())
      this.errorMsg = 'Phone number must be in the format 111-111-1111';
      return;
    }

    if(this.restaurantDetails.details.description != ''){
      if(!this.isValidDescription())
        this.errorMsg = 'Description must be between 50 to 1000 characters';
        return;
    }

    if(this.restaurantDetails.details.location.address != ''){
      if(!this.isValidAddress())
        this.errorMsg = 'Address must be between 6 to 100 characters';
        return;
    }

    if(this.restaurantDetails.details.location.city != ''){
      if(!this.isValidCity())
        this.errorMsg = 'City must be between 4 to 30 characters';
        return;
    }

    if(this.restaurantDetails.details.location.state != ''){
      if(!this.isValidState())
        this.errorMsg = 'State is not valid';
        return;
    }

    if(this.restaurantDetails.details.location.zipCode != ''){
      if(!this.isValidZipPlus4Code())
        this.errorMsg = 'Zip code must be 5 digits or +4 11971-1311';
        return;
    }
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    for (const day of days) {
      if (!this.isValidOperatingHours(day)) {
        this.errorMsg = `Invalid operating hours for ${day}. Open time must be before close time and both must be filled.`;
        return;
      }
    }

    if(this.restaurantDetails.admin.fixedRate != 0.02){
      if(!this.isValidFixedRate())
        this.errorMsg = 'Fixed rate must be between 0.01 and 0.10';
        return;
    }

    if(this.restaurantDetails.stripe.stripeAccountId != ''){
      if(!this.isValidStripeID())
        this.errorMsg = 'Stripe ID must be between 1 and 100';
        return;
    }

    this.restaurantService.createRestaurant(this.restaurantDetails).subscribe({
      next: (response: RestaurantResponse) => {
        console.log('Successfully created restaurant' + response.message);
        this.router.navigate(['/admin']);

      
      },   
      error: (error) => {
        console.error('Login failed', error);
        this.errorMsg = error.error.message;
      },
    })
  }



  isValidName(): boolean {
   if(this.restaurantDetails.details.name.length > 4 && this.restaurantDetails.details.name.length < 50)
    return true;
  return false; 
  }

  isValidPhoneNumber(): boolean {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(this.restaurantDetails.details.phone);
  }

  isValidDescription(): boolean {
   if(this.restaurantDetails.details.description.length > 50 && this.restaurantDetails.details.description.length < 1000)
    return true;
  return false; 
  }

  isValidAddress(): boolean {
    if(!this.restaurantDetails.details.location.address)
      return false;
    if(this.restaurantDetails.details.location.address.length > 6 && this.restaurantDetails.details.location.address.length < 100)
     return true;
   return false; 
   }

   isValidCity(): boolean {
    if(!this.restaurantDetails.details.location.city)
      return false;
    if(this.restaurantDetails.details.location.city.length > 4 && this.restaurantDetails.details.location.city.length < 30)
     return true;
   return false; 
   }

   isValidState(): boolean {
    if(!this.restaurantDetails.details.location.state)
      return false;
    const stateRegex = /^(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)$/;
    return stateRegex.test(this.restaurantDetails.details.location.state.toUpperCase());
  }

   isValidZipPlus4Code(): boolean {
    if(!this.restaurantDetails.details.location.zipCode)
      return false;
    const pattern = /^\d{5}(-\d{4})?$/; // Matches 5 digits, optionally followed by a hyphen and 4 more digits
    return pattern.test(this.restaurantDetails.details.location.zipCode);
  }

  isValidOperatingHours(day: string | number): boolean {
    const hours = this.restaurantDetails.details.operatingHours[day];
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
    if(!this.restaurantDetails.admin.fixedRate)
      return false;
    if(this.restaurantDetails.admin.fixedRate < 0.10 && this.restaurantDetails.admin.fixedRate > 0.01)
     return true;
   return false; 
   }

   isValidStripeID(): boolean {
    if(!this.restaurantDetails.stripe.stripeAccountId)
      return false;
    if(this.restaurantDetails.stripe.stripeAccountId.length > 1 && this.restaurantDetails.stripe.stripeAccountId.length < 100)
     return true;
   return false; 
   }
  

  resetTimesIfNeeded() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    days.forEach(day => {
      if (!this.restaurantDetails.details.operatingHours[day].isOpen) {
        this.restaurantDetails.details.operatingHours[day].open = '';
        this.restaurantDetails.details.operatingHours[day].close = '';
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


  openAddAdminDialog(): void {
    const dialogRef = this.dialog.open(AdminAddDialogComponent, {
      width: '600px', // Set the width
      height: '600px', // Set the height
      data: { /* data passed to the dialog */ }
    });
  
    dialogRef.afterClosed().subscribe(newAdmin => {
      if (newAdmin) {
        this.restaurantDetails.details.owner = newAdmin;
        // Optionally, update backend or state management if required
      }
    });
  }

}

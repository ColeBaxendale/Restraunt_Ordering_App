import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RestaurantResponse, Restaurant, UserRole } from '../../../../../types';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AdminAddDialogComponent } from '../../../components/admin-components/admin-add-dialog/admin-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EditAdminDialogComponent } from '../../../components/admin-components/edit-admin-dialog/edit-admin-dialog.component';
import { RestaurantService } from '../../../services/restaurant/requests/restaurant.service';
import { SessionService } from '../../../services/session/session.service';
import { RestaurantValidatorService } from '../../../services/restaurant/validators/restaurant.validator.service';

@Component({
  selector: 'app-add-restaurant',
  standalone: true,
  imports: [NgIf, FormsModule, CommonModule],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.css',
})
export class AddRestaurantComponent {
  errorMsg = '';
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
      owner: '',
      menuSections: [],
    },

    admin: {
      isActive: false,
      fixedRate: 0.02,
      overallIncome: 0.01,
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
    private dialog: MatDialog,
    private restaurantValidator: RestaurantValidatorService
  ) {}

  submitForm() {
    this.resetTimesIfNeeded();
    this.errorMsg = '';
    const validationResult = this.restaurantValidator.isValidRestaurantInfo(this.restaurantDetails);
    if (!validationResult.isValid) {
      if(validationResult.message){
        this.errorMsg = validationResult.message;
        return;
      } else{
        this.errorMsg = 'An unknown validation error occured.'
      }
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
    });
  }




  openAddAdminDialog(): void {
    if (this.restaurantDetails.details.owner != '') {
      const dialogRef = this.dialog.open(EditAdminDialogComponent, {
        width: '600px', // Set the width
        height: '600px', // Set the height
        data: {
          /* data passed to the dialog */
        },
      });

      dialogRef.afterClosed().subscribe((newAdmin) => {
        if (newAdmin) {
          this.restaurantDetails.details.owner = newAdmin;
          console.log(newAdmin);
        }
      });
    } else {
      const dialogRef = this.dialog.open(AdminAddDialogComponent, {
        width: '600px', // Set the width
        height: '600px', // Set the height
        data: {
          /* data passed to the dialog */
        },
      });

      dialogRef.afterClosed().subscribe((newAdmin) => {
        if (newAdmin) {
          this.restaurantDetails.details.owner = newAdmin._id;
          console.log(newAdmin);
        }
      });
    }
  }

  resetTimesIfNeeded() {
    const days = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ];
    days.forEach((day) => {
      if (!this.restaurantDetails.details.operatingHours[day].isOpen) {
        this.restaurantDetails.details.operatingHours[day].open = '';
        this.restaurantDetails.details.operatingHours[day].close = '';
      }
    });
  }

  cancel() {
    // DELETE OWNER IF ALREADY CREATED
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



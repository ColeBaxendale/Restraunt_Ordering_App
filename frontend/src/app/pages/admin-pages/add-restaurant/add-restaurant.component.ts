import { CommonModule, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  RestaurantResponse,
  Restaurant,
  UserResponse,
} from '../../../../../types';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RestaurantService } from '../../../services/admin/restaurant/requests/restaurant.service';
import { SessionService } from '../../../services/session/session.service';
import { RestaurantValidatorService } from '../../../services/admin/restaurant/validators/restaurant.validator.service';
import { UserService } from '../../../services/admin/owner/requests/user.service';
import { OwnerAddDialogComponent } from '../../../components/admin-components/owner-add-dialog/owner-add-dialog.component';
import { OwnerEditDialogComponent } from '../../../components/admin-components/owner-edit-dialog/owner-edit-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge} from 'rxjs';
import {MatCheckboxModule} from '@angular/material/checkbox';
@Component({
  selector: 'app-add-restaurant',
  standalone: true,
  imports: [NgIf, FormsModule, CommonModule,MatFormFieldModule, MatInputModule, MatIconModule,ReactiveFormsModule,MatCheckboxModule],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.css',
})
export class AddRestaurantComponent {
  errorMsg = '';
  inputErrorMessage = '';

  restaurantDetails: Restaurant = {
    details: {
      name: '',
      logo: '',
      description: '',
      phone: '',
      location: {
        address: '',
        city: '',
        state: '',
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
  name = new FormControl('', [Validators.required, this.restaurantValidator.isValidNameValidation()]);


  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private sessionService: SessionService,
    private dialog: MatDialog,
    private restaurantValidator: RestaurantValidatorService,
    private userService: UserService,
    
  ) {
    merge(this.name.statusChanges, this.name.valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateNameErrorMessage());
  }
  
  updateNameErrorMessage() {
    this.inputErrorMessage = '';
    if (this.name.errors) {
      if (this.name.errors['required']) {
        this.inputErrorMessage = 'Name is required.';
      } else if (this.name.errors['invalidName']) {
        this.inputErrorMessage = this.name.errors['invalidName'].value;
      }
    }
  }

  submitForm() {
    console.log(this.restaurantDetails);

    this.resetTimesIfNeeded();
    this.errorMsg = '';
    if(this.restaurantDetails.details.location.state)
        this.restaurantDetails.details.location.state = this.restaurantDetails.details.location.state.toUpperCase()
    const validationResult = this.restaurantValidator.isValidRestaurantInfo(
      this.restaurantDetails
    );
    if (!validationResult.isValid) {
      if (validationResult.message) {
        this.errorMsg = validationResult.message;
        return;
      } else {
        this.errorMsg = 'An unknown validation error occured.';
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

  openOwnerDialog(): void {
    if (this.restaurantDetails.details.owner != '') {
      const dialogRef = this.dialog.open(OwnerEditDialogComponent, {
        width: '600px', // Set the width
        height: '470px', // Set the height
        data: {
          owner: this.restaurantDetails.details.owner,
        },
      });

      dialogRef.afterClosed().subscribe((newOwner) => {
        if (newOwner) {
          if (!/\d/.test(newOwner) || newOwner.length !== 24) {
            this.errorMsg = newOwner
            if(newOwner == 'User account deleted successfully'){
              this.restaurantDetails.details.owner = '';
              console.log(this.restaurantDetails.details.owner);
            }
          }          
        }
      });
    } else {
      const dialogRef = this.dialog.open(OwnerAddDialogComponent, {
        width: '600px', // Set the width
        height: '470px', // Set the height
        data: {
          /* data passed to the dialog */
        },
      });

      dialogRef.afterClosed().subscribe((newOwner) => {
        if (newOwner) {
          this.restaurantDetails.details.owner = newOwner;
          console.log('New owner set:', this.restaurantDetails.details.owner);
          console.log(newOwner);
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
    if (
      this.restaurantDetails.details.owner !== '' &&
      this.restaurantDetails.details.owner !== undefined
    ) {
      this.userService
        .deleteUser(this.restaurantDetails.details.owner)
        .subscribe({
          next: (response: UserResponse) => {
            console.log(response.message);
          },
          error: (error) => {
            console.error('Delete failed', error);
            this.errorMsg = error.error.message;
          },
        });
    }
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

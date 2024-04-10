import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { FormsModule } from '@angular/forms';
import {
  RestaurantUpdateAdmin,
  RestaurantUpdateDetails,
  RestaurantUpdateStripe,
  RestaurantResponse,
} from '../../../../types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgZone } from '@angular/core';
import { response } from 'express';

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
  restaurantDetails: RestaurantUpdateDetails = {
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
    },
  };

  restaurantAdmin: RestaurantUpdateAdmin = {
    admin: {
      nameLowerCase: '',
      isActive: false,
      overallIncome: 0,
      fixedRate: 0.02,
    },
  };

  restaurantStripe: RestaurantUpdateStripe = {
    stripe: {
      stripeAccountId: '',
      addFees: false,
    },
  };

  constructor(
    private restaurantService: RestaurantService,
    private snackBar: MatSnackBar,
    private zone: NgZone
  ) {}

  submitForm() {
    this.errorMsg = '';
    if (this.currentStep == 1) {
      this.stepOne();
    }
    if (this.currentStep == 2) {
      this.stepTwo();
    }
    if (this.currentStep == 3) {
      this.stepThree();
    }
    if (this.currentStep == 4) {
      this.stepFour();
    }
    if (this.currentStep == 5) {
    }
  }

  private stepOne() {
    if (this.restaurantDetails.details.name === '') {
      this.errorMsg = 'Restaurant name field must not be blank.';
      return;
    }

    if (
      this.restaurantDetails.details.name.length < 4 ||
      this.restaurantDetails.details.name.length > 50
    ) {
      this.errorMsg = 'Restaurant name input validation failed.';
      return;
    }

    if (this.restaurantDetails.details.name.match(/\d+/)) {
      this.errorMsg = 'Restaurant name cannot contain numbers.';
      return;
    }
    console.log(this.restaurantDetails);
    this.restaurantService.createRestaurant(this.restaurantDetails).subscribe({
      next: (response: RestaurantResponse) => {
        // this.showMessage(response.message);
        this.id = response.restaurant._id;
        this.errorMsg = '';
        this.stepAhead();
        return;
      },
      error: (error) => {
        this.errorMsg = error.error.error;
        return;
      },
    });
  }

  private stepTwo() {
    if (!this.id) {
      this.errorMsg = 'Restaurant ID is undefined.';
      return;
    }
    const { logo, description, phone, location, operatingHours } =
      this.restaurantDetails.details;

    const areDetailsEmpty = [
      logo,
      description,
      phone,
      location.address,
      location.city,
      location.state,
      location.zipCode,
    ].every((detail) => detail === '');
    const areAllDaysClosed = Object.values(operatingHours).every(
      (day) => day.isOpen === false
    );

    if (areDetailsEmpty && areAllDaysClosed) {
      // this.showMessage('No details were added.');
      this.stepAhead();
      return;
    } else {
      this.restaurantService
        .updateRestaurantDetails(this.id, this.restaurantDetails)
        .subscribe({
          next: (response: RestaurantResponse) => {
            // this.showMessage(response.message);
            this.stepAhead();
            return;
          },
          error: (error) => {
            this.errorMsg = error.error.error;
            return;
          },
        });
    }
  }

  private stepThree() {
    if (!this.id) {
      this.errorMsg = 'Restaurant ID is undefined.';
      return;
    }

    if (this.restaurantAdmin.admin.fixedRate == 0.02) {
      this.stepAhead();
      return;
    } else {
      if (
        this.restaurantAdmin.admin.fixedRate < 0.01 ||
        this.restaurantAdmin.admin.fixedRate > 0.1
      ) {
        this.errorMsg = 'Fixed rate should be between 0.01 and 0.1.';
        return;
      } else {
        this.restaurantService
          .updateRestaurantAdmin(this.id, this.restaurantAdmin)
          .subscribe({
            next: (response: RestaurantResponse) => {
              // this.showMessage(response.message);
              this.stepAhead();
              return;
            },
            error: (error) => {
              this.errorMsg = error.error.error;
              return;
            },
          });
      }
    }
  }

  private stepFour() {
    if (!this.id) {
      this.errorMsg = 'Restaurant ID is undefined.';
      return;
    }
    if (
      this.restaurantStripe.stripe.addFees == false &&
      this.restaurantStripe.stripe.stripeAccountId == ''
    ) {
      this.stepAhead();
      return;
    } else {
      // INPUT VALIDATION FOR STRIPE ID
      this.restaurantService
        .updateRestaurantStripe(this.id, this.restaurantStripe)
        .subscribe({
          next: (response: RestaurantResponse) => {
            // this.showMessage(response.message);
            this.stepAhead();
            return;
          },
          error: (error) => {
            this.errorMsg = error.error.error;
            return;
          },
        });
    }
  }

  private stepAhead() {
    this.currentStep++;
  }

  private showMessage(message: string, duration: number = 3000): void {
    this.zone.runOutsideAngular(() => {
      this.snackBar.open(message, '', {
        duration: duration,
      });
    });
  }
}

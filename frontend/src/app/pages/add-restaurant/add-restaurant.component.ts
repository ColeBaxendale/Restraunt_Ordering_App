import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { FormsModule } from '@angular/forms';
import {
  RestaurantUpdateDetails,
  RestaurantResponse,
  RestaurantUpdateAdminStripe,
  Restaurant,
} from '../../../../types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgZone } from '@angular/core';
import { response } from 'express';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-restaurant',
  standalone: true,
  imports: [NgIf, FormsModule, CommonModule],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.css',
})
export class AddRestaurantComponent {
cancel() {
throw new Error('Method not implemented.');
}
logout() {
throw new Error('Method not implemented.');
}
  currentStep: number = 1;
  id: string | undefined;
  errorMsg = '';
  name: string = "";
  restaurantDetails: Restaurant = {
    details: {
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
      name: '',
      owners: [],
      menuSections: []
    },

    admin:{
      isActive: false,
      fixedRate: 0.02,
      overallIncome: 0
    },

    stripe: {
      stripeAccountId: '',
      addFees: false,
    },

  };


  constructor(
    private restaurantService: RestaurantService,
    private snackBar: MatSnackBar,
    private zone: NgZone,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}
  
  submitForm() {

  }
}

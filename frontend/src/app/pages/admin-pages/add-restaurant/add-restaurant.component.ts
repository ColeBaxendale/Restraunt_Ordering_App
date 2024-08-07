import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { RestaurantAndUserResponse, RestaurantResponse } from '../../../../../types';
import { Router } from '@angular/router';
import { RestaurantService } from '../../../services/admin/restaurant/requests/restaurant.service';
import { RestaurantValidatorService } from '../../../services/admin/restaurant/validators/restaurant.validator.service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoadingService } from '../../../services/loading/loading.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-add-restaurant',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatProgressBarModule,
  ],
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css'],
})
export class AddRestaurantComponent implements OnInit{
  
  form!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router,
    private restaurantValidator: RestaurantValidatorService,
    public loadingService: LoadingService,   
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      details: this.fb.group({
        logo: [''],
        name: [
          '',
          [Validators.required],
          [this.restaurantValidator.isValidNameValidation()],
        ],
        description: [
          '',
          this.restaurantValidator.isValidDescriptionValidation(),
        ],
        phone: ['', this.restaurantValidator.isValidPhoneValidation()],
        location: this.fb.group({
          address: ['', this.restaurantValidator.isValidAddressValidation()],
          city: ['', this.restaurantValidator.isValidCityValidation()],
          state: ['', this.restaurantValidator.isValidStateValidation()],
          zipCode: ['', this.restaurantValidator.isValidZipValidation()],
        }),
        operatingHours: this.fb.group({
          monday: this.initDay(),
          tuesday: this.initDay(),
          wednesday: this.initDay(),
          thursday: this.initDay(),
          friday: this.initDay(),
          saturday: this.initDay(),
          sunday: this.initDay(),
        }),
        ordersEnabled: [false],
        owner: ['', null, this.restaurantValidator.isValidOwnerEmailAsync()],
        menuSections: this.fb.array([]),
      }),
      admin: this.fb.group({
        overallIncome: [0.01],
      }),
      stripe: this.fb.group({
        stripeAccountId: [
          '',
          this.restaurantValidator.isValidStripeIdValidation(),
        ],
        addFees: [false],
      }),
    });
  }


  private initDay() {
    return this.fb.group(
      {
        isOpen: [false],
        open: [{ value: '', disabled: true }, Validators.required],
        close: [{ value: '', disabled: true }, Validators.required],
      },
      { validators: this.restaurantValidator.operatingHoursValidator() }
    );
  }

  toggleDay(day: string): void {
    const dayGroup = this.form.get(`details.operatingHours.${day}`);
    if (dayGroup) {
      const isOpen = dayGroup.get('isOpen')?.value;
      const openControl = dayGroup.get('open');
      const closeControl = dayGroup.get('close');

      if (isOpen) {
        openControl?.enable();
        closeControl?.enable();
      } else {
        openControl?.disable();
        closeControl?.disable();
        openControl?.reset();
        closeControl?.reset();
      }
    }
  }

  getErrorMessage(field: string): string {
    const control = this.form.get(field);
    if (control && control.errors) {
      if (control.hasError('required')) {
        return 'Name must be filled in.';
      }
      const errorKeys = Object.keys(control.errors);
      const firstErrorKey = errorKeys[0];
      const error = control.errors[firstErrorKey];
      return error.value || 'Invalid field';
    }
    return '';
  }

  clearInput(path: string | Array<string | number>) {
    const control = this.form.get(path);
    if (control) {
      control.reset(''); 
      control.markAsPristine();
      control.markAsUntouched();
    } 
  }

  async submitForm() {
    if (this.loadingService.getLoading()) {
      return;
    }
    if (this.form.valid) {
     if (this.form.get('details.owner')?.value === '') {
      this.restaurantService.createRestaurant(this.form.value).subscribe({
        next: (response: RestaurantResponse) => {
          this.snackbarService.showAlert('Successfully created restaurant: ' + response.restaurant?.details.name, 'Success')
          this.router.navigate(['/admin']);
        },
          error: (error) => {
            this.snackbarService.showAlert(
             error.error.message || 'An error occurred during form submission.', 'Error'
            )
            return;
          },
        });
      } else {
        this.restaurantService.createRestaurantWithOwner(this.form.get('details.owner')?.value, this.form.value).subscribe({
          next: (response: RestaurantAndUserResponse) => {
           this.snackbarService.showAlert('Successfully created restaurant: ' + response.restaurant?.details.name, 'Success')
            this.router.navigate(['/admin']); 
            return;
          },
          error: (error) => {
            this.snackbarService.showAlert(
             error.error.message || 'An error occurred during form submission.', 'Error'
            )
          },
        });
      }
    } else {
      const control = this.form.get('details.name');
      if (control) {
        if (control.hasError('required')) {
          this.snackbarService.showAlert(
            'Error, name field must be filled in.', 'Error'
          )
        } else {
          this.snackbarService.showAlert(
            'Errors occurs in the form', 'Error'
          )
        }
      } else {
        this.snackbarService.showAlert(
          'Errors occurs in the form', 'Error'
        )
      }
    }
  }

  cancel() {
    this.router.navigate(['/admin']);
  }
}
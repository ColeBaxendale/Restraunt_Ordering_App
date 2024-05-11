import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import {
  RestaurantResponse,
} from '../../../../../types';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RestaurantService } from '../../../services/admin/restaurant/requests/restaurant.service';
import { SessionService } from '../../../services/session/session.service';
import { RestaurantValidatorService } from '../../../services/admin/restaurant/validators/restaurant.validator.service';
import { UserService } from '../../../services/admin/owner/requests/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoadingService } from '../../../services/loading/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'app-add-restaurant',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.css',
})
export class AddRestaurantComponent implements OnInit {
  form!: FormGroup;
  errorMsg = '';
  currentOwnerEmail =['', this.restaurantValidator.isValidPhoneValidation()];

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router,
    private restaurantValidator: RestaurantValidatorService,
    public loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      details: this.fb.group({
        logo: [''],
        name: ['', [Validators.required], [this.restaurantValidator.isValidNameValidation()]],
        description: ['', this.restaurantValidator.isValidDescriptionValidation()],
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
    console.log(this.form.get('details.owner'));

    console.log(this.form);
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
      // Generic catch-all for any other error types
      const errorKeys = Object.keys(control.errors);
      const firstErrorKey = errorKeys[0];
      const error = control.errors[firstErrorKey];
      return error.value || 'Invalid field';
    }
    return ''; // Ensure a string is always returned
  }
  
  

  clearInput(path: string | Array<string | number>) {
    const control = this.form.get(path);
    if (control) {
      console.log(control);
      control.reset(''); // Reset without value to clear to `null` or use `''` to reset to empty string
      control.markAsPristine();
      control.markAsUntouched();
      console.log(control);
    } else console.log(control);
  }

  async submitForm() {
    if(this.loadingService.getLoading()){
      return;
    }
    if (this.form.valid) {
      console.log('Form Data:', this.form.value);
      this.restaurantService.createRestaurant(this.form.value).subscribe({
        next: (response: RestaurantResponse) => {
          console.log('Successfully created restaurant:', response.message);
          this.router.navigate(['/admin']); // Navigate to the admin page or dashboard
          return;

        },
        error: (error) => {
          console.error('Failed to create restaurant:', error);
          this.errorMsg = error.error.message || 'An error occurred during form submission.';
          return;

        }
      });
    } 
    else{
      const control = this.form.get('details.name');
      if(control){
        if (control.hasError('required')) {
           this.errorMsg = 'Name field is required.';
        }
        else{
          this.errorMsg = 'Errors occur in the form'
        }
      } else{
        this.errorMsg = 'Errors occur in the form'

      }
    }
  }




  cancel() {
    this.router.navigate(['/admin']);
  }


}

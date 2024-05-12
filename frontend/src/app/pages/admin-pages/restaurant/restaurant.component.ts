import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../../services/session/session.service';
import { Subject, finalize, takeUntil } from 'rxjs';
import { NgIf, CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RestaurantService } from '../../../services/admin/restaurant/requests/restaurant.service';
import { RestaurantValidatorService } from '../../../services/admin/restaurant/validators/restaurant.validator.service';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/admin/owner/requests/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoadingService } from '../../../services/loading/loading.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RestaurantResponse } from '../../../../../types';
@Component({
  selector: 'app-restaurant',
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
    MatProgressSpinnerModule,
  ],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css',
})
export class RestaurantComponent implements OnInit {
  errorMsg = '';
  currentName: string = '';
  private unsubscribe$ = new Subject<void>();
  form!: FormGroup;
  private restaurantId = this.restaurantService.getCurrentId();
  private userId: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router,
    private dialog: MatDialog,
    private sessionService: SessionService,
    private restaurantValidator: RestaurantValidatorService,
    public loadingService: LoadingService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initializeForm();
    const restaurantId = this.restaurantService.getCurrentId();
    if (restaurantId) {
      this.loadRestaurantData(restaurantId);
      this.loadingService.setLoading(false, '');
    } else {
      this.router.navigate(['/admin']);
    }
  }

  private initializeForm() {
    this.form = this.fb.group({
      details: this.fb.group({
        logo: [''],
        name: [
          '',
          [Validators.required],
          [this.restaurantValidator.isValidNameEditValidation()],
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
        owner: [
          '',
          null,
          this.restaurantValidator.isValidOwnerEmailEditAsync(),
        ],
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

  private loadRestaurantData(restaurantId: string) {
    this.loadingService.setLoading(true, 'page');
    this.restaurantService
      .getRestaurantById(restaurantId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response) => {
          this.restaurantService.setCurrentRestaurantName(
            response.details.name
          );
          this.form.patchValue(response);
          Object.keys(response.details.operatingHours).forEach((day) => {
            const dayGroup = this.form.get(`details.operatingHours.${day}`);
            if (dayGroup) {
              // Check if dayGroup is not null
              const openControl = dayGroup.get('open');
              const closeControl = dayGroup.get('close');
              if (response.details.operatingHours[day].isOpen) {
                openControl?.enable();
                closeControl?.enable();
              } else {
                openControl?.disable();
                closeControl?.disable();
              }
            }
          });

          console.log(response);

          this.currentName = this.restaurantService.getCurrentRestaurantName();
          if (response.details.owner) {
            this.userId = response.details.owner;
            this.userService
              .getUserById(response.details.owner)
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe({
                next: (userResponse) => {
                  if (userResponse.user?.email) {
                    this.restaurantService.setCurrentOwnerEmail(
                      userResponse.user.email ?? ''
                    );
                  }
                  this.form.patchValue({
                    details: {
                      owner: userResponse.user?.email,
                    },
                  });
                },
                error: (error) =>
                  console.error('Error fetching user data:', error),
              });
          }
        },
        error: (error) =>
          console.error('Error fetching restaurant data:', error),
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.restaurantService.setCurrentOwnerEmail('');
    this.restaurantService.setCurrentRestaurantName('');
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
      console.log(control);
      control.reset('');
      control.markAsPristine();
      control.markAsUntouched();
      console.log(control);
    }
  }

  cancel() {
    this.router.navigate(['/admin']);
    this.restaurantService.setCurrentOwnerEmail('');
    this.restaurantService.setCurrentRestaurantName('');
  }

  submitForm() {
    if (this.loadingService.getLoading()) {
      console.log('loading while submit');
      return;
    }
    if (!this.form.valid) {
      this.errorHandle();
      return;
    }

    if (this.restaurantService.getCurrentOwnerEmail() != '') {
      if (this.restaurantService.getCurrentOwnerEmail().toLowerCase() != this.form.get('details.owner')?.value.toLowerCase()) {
        // DELETE AND ADD NEW OWNER
        this.updateRestaurantWithOldAndNewOwner();
        return;
      }
      // NO CHANGE TO ALREADY MADE OWNER
      this.updateRestaurantWithSameOwner();
      return;
    }
    if (this.form.get('details.owner')?.value != null) {
      // CREATE NEW OWNER
      this. updateRestaurantWithNewOwner();
      return;
    }
    // NO OWNER AT ALL IN THIS ROUTE
    this.updateRestaurantWithNoOwner();
    return;
  }



  private errorHandle(){
    const control = this.form.get('details.name');
      if (control) {
        if (control.hasError('required')) {
          this.errorMsg = 'Name field is required.';
        } else {
          this.errorMsg = 'Errors occur in the form';
        }
      } else {
        this.errorMsg = 'Errors occur in the form';
      }
  }

  private updateRestaurantWithNewOwner(){
      // @DO CREATE NEW USER AND UPDATE RESTAURANT
      // MUST DO BACK END SESSION ROUTE AS WELL

  }

  private updateRestaurantWithOldAndNewOwner(){
      //@DO  DELETE OLD OWNER AND UPDATE RESTAURANT WITH NEW OWNER


  }


  private updateRestaurantWithSameOwner() {
    // UPDATE RESTAURANT WITHOUT CHANGING OWNER
    this.form.patchValue({ details: { owner: this.userId } });
    this.restaurantService
      .updateRestaurant(this.restaurantId, this.form.value)
      .subscribe({
        next: (response: RestaurantResponse) => {
          console.log('Successfully updateed restaurant:', response.message);
          this.router.navigate(['/admin']);
          return;
        },
        error: (error) => {
          console.error('Failed to create restaurant:', error);
          this.errorMsg =
            error.error.message || 'An error occurred during form submission.';
          return;
        },
      });
  }

  private updateRestaurantWithNoOwner() {
    // UPDATE RESTAURANT WITHOUT OWNER
    this.restaurantService
      .updateRestaurant(this.restaurantId, this.form.value)
      .subscribe({
        next: (response: RestaurantResponse) => {
          console.log('Successfully updateed restaurant:', response.message);
          this.router.navigate(['/admin']);
          return;
        },
        error: (error) => {
          console.error('Failed to create restaurant:', error);
          this.errorMsg =
            error.error.message || 'An error occurred during form submission.';
          return;
        },
      });
  }
}

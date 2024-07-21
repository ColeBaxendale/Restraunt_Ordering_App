import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NgIf, CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RestaurantService } from '../../../services/admin/restaurant/requests/restaurant.service';
import { RestaurantValidatorService } from '../../../services/admin/restaurant/validators/restaurant.validator.service';
import { UserService } from '../../../services/admin/owner/requests/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoadingService } from '../../../services/loading/loading.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RestaurantAndUserResponse, RestaurantResponse, UserResponse } from '../../../../../types';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertService } from 'easy-angular-alerts';
import { SnackbarService } from '../../../services/snackbar.service';
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
  currentName: string = '';
  private unsubscribe$ = new Subject<void>();
  form!: FormGroup;
  private restaurantId = this.restaurantService.getCurrentId();

  constructor(
    private fb: FormBuilder,
    public restaurantService: RestaurantService,
    private router: Router,
    private restaurantValidator: RestaurantValidatorService,
    public loadingService: LoadingService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private snackbarService: SnackbarService
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

  public toggleDay(day: string): void {
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
          this.currentName = this.restaurantService.getCurrentRestaurantName();
          if (response.details.owner) {
            this.userService
              .getUserById(response.details.owner)
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe({
                next: (userResponse) => {
                  if (userResponse.user?.email && userResponse.user._id) {
                    this.restaurantService.setCurrentOwnerEmail(
                      userResponse.user.email ?? ''
                    );
                  this.restaurantService.setCurrentOwnerId(userResponse.user._id);
                  }
                  this.form.patchValue({
                    details: {
                      owner: userResponse.user?.email,
                    },
                  });
                },
                error: (error) =>
                  this.showAlert(
                    'Error fetching restaurant data:' + error,
                  )
              });
          }
        },
        error: (error) =>
          this.showAlert(
            'Error fetching restaurant data:' + error,
          )
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.restaurantService.setCurrentOwnerEmail('');
    this.restaurantService.setCurrentRestaurantName('');
    this.restaurantService.setCurrentOwnerId('');

  }

  public getErrorMessage(field: string): string {
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

  public clearInput(path: string | Array<string | number>) {
    const control = this.form.get(path);
    if (control) {
      control.reset('');
      control.markAsPristine();
      control.markAsUntouched();
    }
  }

  public cancel() {
    this.router.navigate(['/admin']);
    this.restaurantService.setCurrentOwnerEmail('');
    this.restaurantService.setCurrentRestaurantName('');
  }
  public submitForm() {
    if (this.loadingService.getLoading()) {
      return;
    }
  
    if (!this.form.valid) {
      this.errorHandle();
      return;
    }
  
    const currentOwnerEmail = this.restaurantService.getCurrentOwnerEmail();
    const formOwnerEmail = this.form.get('details.owner')?.value;
  
    // Check if there is a change in owner email
    if (currentOwnerEmail && formOwnerEmail && currentOwnerEmail.toLowerCase() !== formOwnerEmail.toLowerCase()) {
      // Owner email has changed
      this.updateRestaurantWithOldAndNewOwner();
      return;
    }
  
    if (!currentOwnerEmail && formOwnerEmail) {
      // No current owner but a new owner email has been submitted
      this.updateRestaurantWithNewOwner();
      return;
    }
  
    if (currentOwnerEmail && !formOwnerEmail) {
      // Current owner exists but form submission removes it
      this.updateRestaurantWithOwnerRemoval();
      return;
    }

    // No changes to owner
    this.updateRestaurantWithNoOwnerChange();
  }
  


  private updateRestaurantWithNewOwner(){
    this.restaurantService
    .updateRestaurantWithNewOwner(this.restaurantId, this.form.value)
    .subscribe({
      next: (response: RestaurantAndUserResponse) => {
        this.showAlert('Successfully updated restaurant: ' + response.restaurant?.details.name)
        this.router.navigate(['/admin']);
        return;
      },
      error: (error) => {
        this.showAlert(
          error.error.message || 'An error occurred during form submission.'
        )
        return;
      },
    });
  }

  private updateRestaurantWithOldAndNewOwner(){
    // this.showAlert(
    //   'Are you sure you want to proceed, ' + this.restaurantService.getCurrentOwnerEmail() + ' will be deleted?',
    //   () => {
    //     this.restaurantService
    //     .deleteOwnerAddNewOwnerUpdateRestaurant(this.restaurantId, this.form.value)
    //     .subscribe({
    //       next: (response: RestaurantAndUserResponse) => {
    //         this.showAlert('Successfully updated restaurant: ' + response.restaurant?.details.name)
    //         this.router.navigate(['/admin']);
    //         return;
    //       },
    //       error: (error) => {
    //         this.showAlert(
    //           error.error.message || 'An error occurred during form submission.'
    //         )
    //         return;
    //       },
    //     });
    //   },
    //   () => {
    //     console.log('Cancelled!');
    //     return;
    //   });
   
  }

  private updateRestaurantWithOwnerRemoval(){

    // this.showAlert(
    //   'Are you sure you want to proceed, ' + this.restaurantService.getCurrentOwnerEmail() + ' will be deleted?',
    //   () => {
    //     this.restaurantService
    //     .deleteOwnerAndUpdateRestaurant(this.restaurantId, this.form.value)
    //     .subscribe({
    //       next: (response: RestaurantAndUserResponse) => {
    //         this.showAlert('Successfully updated restaurant: ' + response.restaurant?.details.name)
    //         this.router.navigate(['/admin']);
    //         return;
    //       },
    //       error: (error) => {
    //         this.showAlert(
    //           error.error.message || 'An error occurred during form submission.'
    //         )
    //         return;
    //       },
    //     });
    //   },
    //   () => {
    //     console.log('Cancelled!');
    //     return;
    //   });
  }


  private updateRestaurantWithNoOwnerChange() {
    this.restaurantService
      .updateRestaurant(this.restaurantId, this.form.value)
      .subscribe({
        next: (response: RestaurantResponse) => {
          this.showAlert('Successfully updated restaurant: ' + response.restaurant?.details.name)
          this.router.navigate(['/admin']);
          return;
        },
        error: (error) => {
          this.showAlert(
            error.error.message || 'An error occurred during form submission.'
          )
          return;
        },
      });
  }


  private errorHandle(){
    const control = this.form.get('details.name');
      if (control) {
        if (control.hasError('required')) {
          this.showAlert(
            'Name field is required'
          )
        } else {
          this.showAlert(
            'Errors occur in the form'
          )
        }
      } else {
        this.showAlert(
          'Errors occur in the form'
        )
      }
  }

  public resetOwner() {
    const ownerId = this.restaurantService.getCurrentOwnerId();
    const email = this.restaurantService.getCurrentOwnerEmail();
    console.log('in reset');
    
    if (email) {
      console.log('Showing confirmation alert');
      this.snackbarService.showConfirmation(
        'Are you sure you want to proceed? ' + email + ' password will be reset?', 'Confirmation',
        () => {
          console.log('Confirmed!');
          if (ownerId) {
            this.userService.resetUser(ownerId).subscribe({
              next: (response: UserResponse) => {
                console.log('User reset successful');
                this.snackbarService.showAlert('Successfully reset user: ' + email, 'Success');
                this.router.navigate(['/admin']);
              },
              error: (error) => {
                console.error('Error during reset:', error);
                this.snackbarService.showAlert(error.error.message || 'An error occurred during form submission.' , 'Error');
              },
            });
          }
        },
        () => {
          console.log('Cancelled!');
        }
      );
    } else {
      console.log('Owner email undefined.');
      this.snackbarService.showAlert('Owner email undefined.' , 'Error');
    }
  }
  
  showAlert(message: string, action: string = 'Close', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}

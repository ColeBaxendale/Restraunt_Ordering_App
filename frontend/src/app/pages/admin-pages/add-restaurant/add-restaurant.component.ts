import { CommonModule, NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormsModule,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
    private sessionService: SessionService,
    private dialog: MatDialog,
    private restaurantValidator: RestaurantValidatorService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      details: this.fb.group({
        logo: [''],
        name: [
          '',
          [
            Validators.required,
            this.restaurantValidator.isValidNameValidation(),
          ],
        ],
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
        return 'This field is required.';
      }
      if (control.hasError('invalidEmailFormat')) {
        return 'Invalid email format.';
      }
      if (control.hasError('emailInUse')) {
        return 'This email is already in use.';
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

  submitForm() {
    console.log(this.form);

    // console.log(this.restaurantDetails);

    // this.resetTimesIfNeeded();
    // this.errorMsg = '';
    // if(this.restaurantDetails.details.location.state)
    //     this.restaurantDetails.details.location.state = this.restaurantDetails.details.location.state.toUpperCase()
    // const validationResult = this.restaurantValidator.isValidRestaurantInfo(
    //   this.restaurantDetails
    // );
    // if (!validationResult.isValid) {
    //   if (validationResult.message) {
    //     this.errorMsg = validationResult.message;
    //     return;
    //   } else {
    //     this.errorMsg = 'An unknown validation error occured.';
    //   }
    // }

    // this.restaurantService.createRestaurant(this.restaurantDetails).subscribe({
    //   next: (response: RestaurantResponse) => {
    //     console.log('Successfully created restaurant' + response.message);
    //     this.router.navigate(['/admin']);
    //   },
    //   error: (error) => {
    //     console.error('Login failed', error);
    //     this.errorMsg = error.error.message;
    //   },
    // });
  }






  // openAddOwnerDialog(): void {
  //   const dialogRef = this.dialog.open(OwnerAddDialogComponent, {
  //         width: '600px', // Set the width
  //         height: '470px', // Set the height
  //         data: {
  //           /* data passed to the dialog */
  //         },
  //       });
  //       dialogRef.afterClosed().subscribe((newOwner) => {
  //         if (newOwner && this.form.get('details.owner')) { // Check if newOwner is not null and the control exists
  //           this.form.get('details.owner')!.setValue(newOwner._id);  // Use the non-null assertion operator `!`
  //           this.currentOwner = newOwner.email;
  //           console.log(this.currentOwner);
  //           return;
            
  //         } else {
  //           console.error('No new owner provided or control does not exist');
  //         }
  //       });
      

    // if (this.restaurantDetails.details.owner != '') {
    //   const dialogRef = this.dialog.open(OwnerEditDialogComponent, {
    //     width: '600px', // Set the width
    //     height: '470px', // Set the height
    //     data: {
    //       owner: this.restaurantDetails.details.owner,
    //     },
    //   });
    //   dialogRef.afterClosed().subscribe((newOwner) => {
    //     if (newOwner) {
    //       if (!/\d/.test(newOwner) || newOwner.length !== 24) {
    //         this.errorMsg = newOwner
    //         if(newOwner == 'User account deleted successfully'){
    //           this.restaurantDetails.details.owner = '';
    //           console.log(this.restaurantDetails.details.owner);
    //         }
    //       }
    //     }
    //   });
    // } else {
    //   const dialogRef = this.dialog.open(OwnerAddDialogComponent, {
    //     width: '600px', // Set the width
    //     height: '470px', // Set the height
    //     data: {
    //       /* data passed to the dialog */
    //     },
    //   });
    //   dialogRef.afterClosed().subscribe((newOwner) => {
    //     if (newOwner) {
    //       this.restaurantDetails.details.owner = newOwner;
    //       console.log('New owner set:', this.restaurantDetails.details.owner);
    //       console.log(newOwner);
    //     }
    //   });
    // }
  // }

  getOwnerName(userId: string){
    this.userService.getUserById(userId).subscribe({
      next: (response: UserResponse) => {
        console.log(response.user?.email);
        
        return response.user?.email;
      },
      error: (error) => {
        console.error('Error geting owner email', error);
        this.errorMsg = error.error.message;
      },
    });
  }

  resetTimesIfNeeded() {
    // const days = [
    //   'monday',
    //   'tuesday',
    //   'wednesday',
    //   'thursday',
    //   'friday',
    //   'saturday',
    //   'sunday',
    // ];
    // days.forEach((day) => {
    //   if (!this.restaurantDetails.details.operatingHours[day].isOpen) {
    //     this.restaurantDetails.details.operatingHours[day].open = '';
    //     this.restaurantDetails.details.operatingHours[day].close = '';
    //   }
    // });
  }

  cancel() {
    // if (
    //   this.restaurantDetails.details.owner !== '' &&
    //   this.restaurantDetails.details.owner !== undefined
    // ) {
    //   this.userService
    //     .deleteUser(this.restaurantDetails.details.owner)
    //     .subscribe({
    //       next: (response: UserResponse) => {
    //         console.log(response.message);
    //       },
    //       error: (error) => {
    //         console.error('Delete failed', error);
    //         this.errorMsg = error.error.message;
    //       },
    //     });
    // }
    this.router.navigate(['/admin']);
  }

  logout(): void {
    // this.sessionService
    //   .logout()
    //   .pipe(finalize(() => this.router.navigate(['/login'])))
    //   .subscribe({
    //     next: () => console.log('Logged out successfully'),
    //     error: (error: any) => console.error('Logout failed:', error),
    //   });
  }
}

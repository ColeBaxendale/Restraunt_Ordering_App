import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  OperatingHours,
  Restaurant,
  RestaurantResponse,
  UserResponse,
  WeeklyOperatingHours,
} from '../../../../../types';
import { SessionService } from '../../../services/session/session.service';
import { finalize } from 'rxjs';
import { NgIf, CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestaurantService } from '../../../services/admin/restaurant/requests/restaurant.service';
import { RestaurantValidatorService } from '../../../services/admin/restaurant/validators/restaurant.validator.service';
import { OwnerEditDialogComponent } from '../../../components/admin-components/owner-edit-dialog/owner-edit-dialog.component';
import { OwnerAddDialogComponent } from '../../../components/admin-components/owner-add-dialog/owner-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/admin/owner/requests/user.service';
import { OwnerEditRestaurantDialogComponent } from '../../../components/admin-components/owner-edit-restaurant-dialog/owner-edit-restaurant-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge} from 'rxjs';
import {MatCheckboxModule} from '@angular/material/checkbox';
@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [NgIf, FormsModule,CommonModule,MatFormFieldModule, MatInputModule, MatIconModule,ReactiveFormsModule,MatCheckboxModule],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css',
})
export class RestaurantComponent implements OnInit {
  restaurantId!: string; // Non-null assertion
  restaurant: Restaurant = this.initializeRestaurant();
  errorMsg = '';
  name = new FormControl('', [Validators.required, this.restaurantValidator.isValidNameValidation()]);
  inputErrorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router: Router,
    private dialog: MatDialog,
    private sessionService: SessionService,
    private restaurantValidator: RestaurantValidatorService
  ) { merge(this.name.statusChanges, this.name.valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateNameErrorMessage());}

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

  ngOnInit() {
    this.restaurantId = this.restaurantService.getCurrentId();
    this.fetchRestaurant().then(() => {});
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.handleFile(file); // Implement this method to process the file
    }
  }
  
  handleFile(file: File): void {
    // Example: Read the file as a data URL (base64) and assign it to a model property
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.restaurant.details.logo = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  initializeRestaurant(): Restaurant {
    return {
      details: {
        logo: '',
        name: '',
        description: '',
        phone: '',
        location: {
          address: '',
          city: '',
          state: '',
          zipCode: ''
        },
        operatingHours: this.initializeOperatingHours(),
        owner: '',
        menuSections: [],
        ordersEnabled: false
      },
      admin: {
        overallIncome: 0,
      },
      stripe: {
        stripeAccountId: '',
        addFees: false
      }
    };
  }

  private initializeOperatingHours(): WeeklyOperatingHours {
    const defaultHours: OperatingHours = { isOpen: false, open: '', close: '' };
    return {
      monday: defaultHours,
      tuesday: defaultHours,
      wednesday: defaultHours,
      thursday: defaultHours,
      friday: defaultHours,
      saturday: defaultHours,
      sunday: defaultHours
    };
  }

  async fetchRestaurant() {
    if (this.restaurantId) {
      try {
        const temp = await this.restaurantService
          .getRestaurantById(this.restaurantId)
          .toPromise();
        if (temp) {
          this.restaurant = temp;
        }
        console.log(this.restaurant);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    } else {
      console.error('Restaurant ID is not available');
    }
  }

  submitForm() {
  //   if (!this.restaurant || !this.restaurant.details) {
  //   console.error('Restaurant data is not loaded');
  //   return;
  // }
  //   this.resetTimesIfNeeded();
  //   this.errorMsg = '';
  //   console.log(this.restaurant);
  //   if(this.restaurant.details.location.state)
  //     this.restaurant.details.location.state = this.restaurant.details.location.state.toUpperCase()
  //   const validationResult = this.restaurantValidator.isValidRestaurantInfo(
  //     this.restaurant
  //   );
  //   if (!validationResult.isValid) {
  //     if (validationResult.message) {
  //       this.errorMsg = validationResult.message;
  //       return;
  //     } else {
  //       this.errorMsg = 'An unknown validation error occured.';
  //     }
  //   }
  //   this.restaurantService
  //     .updateRestaurant(this.restaurantId, this.restaurant)
  //     .subscribe({
  //       next: (response: RestaurantResponse) => {
  //         console.log('Successfully updated restaurant:', response.message);
  //         this.router.navigate(['/admin']);
  //       },
  //       error: (error) => {
  //         console.error('Update failed', error);
  //         this.errorMsg = error.error.message;
  //       },
  //     });
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
      if (!this.restaurant.details.operatingHours[day].isOpen) {
        this.restaurant.details.operatingHours[day].open = '';
        this.restaurant.details.operatingHours[day].close = '';
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

  delete(): void {
    this.restaurantService.deleteRestaurant(this.restaurantId).subscribe({
      next: (response: RestaurantResponse) => {
        console.log('Successfully deleted restaurant:', response.message);
        this.router.navigate(['/admin']);
      },
      error: (error) => {
        console.error('Delete failed', error);
        this.errorMsg = error.error.message;
      },
    });
  }

  openOwnerDialog(): void {
    if (this.restaurant.details.owner != undefined) {
      const dialogRef = this.dialog.open(OwnerEditRestaurantDialogComponent, {
        width: '600px', // Set the width
        height: '600px', // Set the height
        data: {
          owner: this.restaurant.details.owner,
        },
      });

      dialogRef.afterClosed().subscribe((newOwner) => {
        if (newOwner) {
          if (!/\d/.test(newOwner) || newOwner.length !== 24) {
            this.errorMsg = newOwner;
            if (newOwner == 'User account deleted successfully') {
              console.log('Dialog closed. New owner:');
              this.restaurant.details.owner = undefined;
              console.log(this.restaurant.details.owner);
              this.restaurantService
                .updateRestaurant(this.restaurantId, this.restaurant)
                .subscribe({
                  next: (response: RestaurantResponse) => {
                    console.log(
                      'Successfully updated restaurant:',
                      response.message
                    );
                  },
                  error: (error) => {
                    console.error('Update failed', error);
                    this.errorMsg = error.error.message;
                  },
                });
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
          this.restaurant.details.owner = newOwner;
          console.log('New owner set:', this.restaurant.details.owner);
          console.log(newOwner);
          this.restaurantService
            .updateRestaurant(this.restaurantId, this.restaurant)
            .subscribe({
              next: (response: RestaurantResponse) => {
                console.log(
                  'Successfully updated restaurant:',
                  response.message
                );
              },
              error: (error) => {
                console.error('Update failed', error);
                this.errorMsg = error.error.message;
              },
            });
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant, RestaurantResponse, UserResponse } from '../../../../../types';
import { SessionService } from '../../../services/session/session.service';
import { finalize } from 'rxjs';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../../../services/restaurant/requests/restaurant.service';
import { RestaurantValidatorService } from '../../../services/restaurant/validators/restaurant.validator.service';
import { OwnerEditDialogComponent } from '../../../components/admin-components/owner-edit-dialog/owner-edit-dialog.component';
import { OwnerAddDialogComponent } from '../../../components/admin-components/owner-add-dialog/owner-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/owner/requests/user.service';
import { OwnerEditRestaurantDialogComponent } from '../../../components/admin-components/owner-edit-restaurant-dialog/owner-edit-restaurant-dialog.component';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [NgIf, FormsModule, CommonModule],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css',
})
export class RestaurantComponent implements OnInit {
  restaurantId!: string; // Non-null assertion
  restaurant!: Restaurant; // Consider defining a more specific type
  errorMsg = '';
  hasOwnerAtStart = false;
  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router: Router,
    private dialog: MatDialog,
    private sessionService: SessionService,
    private restaurantValidator: RestaurantValidatorService,
  ) {}

  ngOnInit() {
    this.restaurantId = this.route.snapshot.paramMap.get('id')!;
    this.fetchRestaurant().then(() => {

    });
    console.log(this.restaurantId);
  }

  async fetchRestaurant() {
    if (this.restaurantId) {
      try {
        const temp = await this.restaurantService.getRestaurantById(this.restaurantId).toPromise();
        if(temp){
          this.restaurant = temp
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
    this.resetTimesIfNeeded();
    this.errorMsg = '';
    console.log(this.restaurant);
    
    const validationResult = this.restaurantValidator.isValidRestaurantInfo(
      this.restaurant
    );
    if (!validationResult.isValid) {
      if (validationResult.message) {
        this.errorMsg = validationResult.message;
        return;
      } else {
        this.errorMsg = 'An unknown validation error occured.';
      }
    }
    this.restaurantService
      .updateRestaurant(this.restaurantId, this.restaurant)
      .subscribe({
        next: (response: RestaurantResponse) => {
          console.log('Successfully updated restaurant:', response.message);
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          console.error('Update failed', error);
          this.errorMsg = error.error.message;
        },
      });
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
          console.log('Dialog closed. New owner:');
          this.restaurant.details.owner = undefined;
          console.log(this.restaurant.details.owner);
          
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
        }
      });
    }
  }
}

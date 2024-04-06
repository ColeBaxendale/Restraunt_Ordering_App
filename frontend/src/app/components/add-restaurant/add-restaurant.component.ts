import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant, User } from '../../pages/admin/admin.component';

@Component({
  selector: 'app-add-restaurant',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule,MatInputModule,ReactiveFormsModule,FormsModule],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.css'
})
export class AddRestaurantDialogComponent {

  restaurantForm: FormGroup;

  // Fixed values
  fixedRestaurantValues: Partial<Restaurant> = {
    ordersEnabled: true,
    isActive: false, // Assuming isActive should be false by default
    // Add other fixed restaurant values here
  };


  constructor(
    public dialogRef: MatDialogRef<AddRestaurantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantService,
    private userService: UserService
  ) {
    this.restaurantForm = this.formBuilder.group({
      uniqueId: ['elbowroqwomtooqwdqwd'],
      name: ['elbowroom'],
      description: ['elbowroomtoo'],
      location: this.formBuilder.group({
        address: ['123 main road'],
        city: ['jamesport'],
        state: ['NY'],
        zipCode: ['11901']
      }),
      ownerEmail: ['cbaxendale9999@gmail.com'],
      ownerName: ['cole'],
      operatingHours: this.formBuilder.group({
        monday: this.formBuilder.group({
          open: ['1:00 PM'],
          close: ['1:00 PM']
        }),
        tuesday: this.formBuilder.group({
          open: ['1:00 PM'],
          close: ['1:00 PM']
        }),
        wednesday: this.formBuilder.group({
          open: ['1:00 PM'],
          close: ['1:00 PM']
        }),
        thursday: this.formBuilder.group({
          open: ['1:00 PM'],
          close: ['1:00 PM']
        }),
        friday: this.formBuilder.group({
          open: ['1:00 PM'],
          close: ['1:00 PM']
        }),
        saturday: this.formBuilder.group({
          open: ['1:00 PM'],
          close: ['1:00 PM']
        }),
        sunday: this.formBuilder.group({
          open: ['1:00 PM'],
          close: ['1:00 PM']
        })
      }),
      menuSections: this.formBuilder.array([]), // Assuming menuSections is an empty array by default
      isActive: [true],
      stripeAccountId: ['12345'],
      overallIncome: [0], // Assuming initial income is 0
      fixedRate: [0.02], // Assuming a default fixed rate
      addFees: [true] // Assuming fees are not added by default
    });
  }

  onSubmit(): void {
    if (this.restaurantForm.valid) {
      const { ownerEmail, ownerName, ...restaurantData } = this.restaurantForm.value;
      console.log(restaurantData);
      const payload = { 
        email: ownerEmail, 
        name: ownerName, 
        restaurantData: restaurantData 
      };
  
      this.restaurantService.createRestaurant(payload).subscribe(
        (response) => {
          console.log(response);
          // Assuming the response includes a unique ID or any identifier of the created restaurant
          // You can then use this response to perform further actions, such as redirecting
          // the user or displaying a success message.
        },
        (error) => {
          console.error('Error creating restaurant:', error);
          alert('Error creating restaurant: ' + error.message);
          // Handle any errors that occur during the HTTP request.
        }
      );
    } else {
      console.error('Form is not valid');
      // Optionally, handle the case where the form is not valid.
      // You might want to display validation errors or a generic message to the user.
    }
  }
  

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without saving
  }
}
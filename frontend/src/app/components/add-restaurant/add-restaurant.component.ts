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
      uniqueId: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      location: this.formBuilder.group({
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required]
      }),
      ownerEmail: [],
      ownerName: [],
      owner: [''],
      operatingHours: this.formBuilder.group({
        monday: this.formBuilder.group({
          open: [''],
          close: ['']
        }),
        tuesday: this.formBuilder.group({
          open: [''],
          close: ['']
        }),
        wednesday: this.formBuilder.group({
          open: [''],
          close: ['']
        }),
        thursday: this.formBuilder.group({
          open: [''],
          close: ['']
        }),
        friday: this.formBuilder.group({
          open: [''],
          close: ['']
        }),
        saturday: this.formBuilder.group({
          open: [''],
          close: ['']
        }),
        sunday: this.formBuilder.group({
          open: [''],
          close: ['']
        })
      }),
      menuSections: this.formBuilder.array([]), // Assuming menuSections is an empty array by default
      stripeAccountId: [''],
      overallIncome: [0], // Assuming initial income is 0
      fixedRate: [0.02], // Assuming a default fixed rate
      addFees: [true] // Assuming fees are not added by default
    });
  }

  onSubmit(): void {
    if (this.restaurantForm.valid) {
      const { ownerEmail, ownerName, ...restaurantData } = this.restaurantForm.value;
      console.log(restaurantData);
  
      // Assuming restaurantData includes all necessary restaurant details
      // And assuming createRestaurant expects an object with { email, name, restaurantData }
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
          // Handle any errors that occur during the HTTP request.
        }
      );
    } else {
      console.error('Form is not valid');
      // Optionally, handle the case where the form is not valid.
      // You might want to display validation errors or a generic message to the user.
    }


    // if (this.restaurantForm.valid) {
    //   // Remove email and owner name from the restaurant form value
    //   const { email, name, ...restaurantData } = this.restaurantForm.value;
  
    //   // Step 1: Create the restaurant object
    //   this.restaurantService.createRestaurant(restaurantData).subscribe(
    //     (restaurantResponse: Restaurant) => { 
    //       console.log(`Created restaurant with server-assigned id ${restaurantResponse.id}`);
          
    //       // Step 2: Create the user object with restaurant ID, email, and owner name
    //       const userData: User = {
    //         email: email, // Use the omitted email field
    //         name: name,   // Use the omitted owner name field
    //         password: 'password',
    //         role: 'owner',
    //         restaurant: restaurantResponse.id // Assign restaurant ID to user
    //       };
  
    //       // Step 3: Create the user object
    //       this.userService.createUser(userData).subscribe(
    //         (userResponse: User) => {
    //           console.log(`Created user with server-assigned id ${userResponse.id}`);
    //           // Step 4: Optionally, update restaurant information with the new user
    //           this.restaurantService.updateRestaurant(restaurantResponse.id, { owner: userResponse.id }).subscribe(
    //             () => {
    //               console.log('Restaurant information updated with owner ID');
    //               // Additional actions after successful creation and update can be added here
    //             },
    //             error => {
    //               console.error('Error updating restaurant information:', error);
    //             }
    //           );
    //         },
    //         error => {
    //           console.error('Error creating user:', error);
    //         }
    //       );
    //     },
    //     error => {
    //       console.error('Error creating restaurant:', error);
    //     }
    //   );
    // }
  }
  

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without saving
  }
}
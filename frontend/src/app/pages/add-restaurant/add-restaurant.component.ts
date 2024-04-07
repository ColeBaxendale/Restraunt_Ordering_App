import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from 'express';
import { RestaurantService } from '../../services/restaurant.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-restaurant',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.css'
})
export class AddRestaurantComponent {
  currentStep: number = 1;
  restaurantName: string = '';

  constructor(private restaurantService: RestaurantService) {}

  // Mock function to submit form
  submitForm() {
    console.log(this.currentStep);
    
    if(this.currentStep == 1){
      console.log("step one");
        const payload = {
          
            details: { name: this.restaurantName }
          
        };

        this.restaurantService.createRestaurant(payload).subscribe({
          next: (response) => {
            console.log('Restaurant added successfully', response);
          },
          error: (error) => console.error('Error adding restaurant:', error)
        })
    } else {
      // Handle form submission for other steps
    }


    // if (this.currentStep === 1) {
    //   // Adjust the payload to match the expected structure in your service
    //   const payload = {
    //     restaurantData: {
    //       details: { name: this.restaurantName }
    //     }
    //   };
  
    //   this.restaurantService.createRestaurant(payload).subscribe({
    //     next: (response) => {
    //       console.log('Restaurant added successfully', response);
    //       // Navigate to next step or confirmation page
    //       // You might want to increment the currentStep here or navigate to a different route
    //       this.currentStep++; // Example to move to the next step
    //     },
    //     error: (error) => console.error('Error adding restaurant:', error)
    //   });
    // } else {
    //   // Handle form submission for other steps
    // }
  
    console.log('Form submitted');
  }
  

  // Function to go to the next form part

  // Function to go to the previous form part
  previousStep() {
    this.currentStep--;
  }
}
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
  errorMsg = '';

  constructor(private restaurantService: RestaurantService) {}

  // Mock function to submit form
  submitForm() {
    console.log(this.currentStep);
    
    if(this.currentStep == 1){
      console.log("step one");
      const newRestaurantData = {
        data: {
          details: {
            name: this.restaurantName
          }
        }
      };
      console.log(newRestaurantData);

        this.restaurantService.createRestaurant(newRestaurantData).subscribe({
          next: (response) => {
            console.log('Restaurant added successfully', response);
            this.nextStep()
            this.errorMsg = ''
            return(response)
          },
          error: (error) => {
            console.log(error);
            
            this.errorMsg = error.error.error;
            return;

          }
        })
    } else {
      

      
    }
    console.log('Form submitted');
  }
  

  // Function to go to the next form part
  nextStep() {
    this.currentStep++;
  }
  // Function to go to the previous form part
  previousStep() {
    this.currentStep--;
  }
}
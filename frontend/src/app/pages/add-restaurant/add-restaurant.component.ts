import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from 'express';
import { RestaurantService } from '../../services/restaurant.service';
import { FormsModule } from '@angular/forms';
import { RestaurantResponse } from '../../../../types';

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
  id: string | undefined;
  errorMsg = '';
  logo: string = '';
  description: string = '';
  phone: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  zipCode: string = '';




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
          next: (response: RestaurantResponse) => {
            console.log('Restaurant added successfully', response);
            this.nextStep()
            this.errorMsg = ''
            console.log(response)
            this.id = response.restaurant._id;
            console.log(this.id);
        
            return(response)
          },
          error: (error) => {
            console.log(error);
            
            this.errorMsg = error.error.error;
            return;

          }
        })
    } else if(this.currentStep === 2){
      // Check if at least one of the fields is provided before attempting an update
      if (this.logo !== '' || this.description !== '' || this.phone !== '' || this.address !== '' || this.city !== '' || this.state !== '' || this.zipCode !== '') {
        const updatedRestaurantData = {
            details: {
              logo: this.logo,
              description: this.description,
              phone: this.phone,
              location:{
                address: this.address,
                city: this.city,
                state: this.state,
                zipCode: this.zipCode,

              }
            }
        };

        if (this.id) {
          this.restaurantService.updateRestaurantStepTwo(this.restaurantName, updatedRestaurantData).subscribe({
            next: (response) => {
              console.log('Restaurant updated successfully', response);
              this.nextStep();
            },
            error: (error) => {
              console.error('Error updating restaurant:', error);
              
              this.errorMsg = error.error.error;
              console.log(this.errorMsg);

            }
          });
        } else {
          console.error('No restaurant ID defined for update.');
          this.errorMsg = 'Attempted to update without a valid restaurant ID.';
        }

      }
    } else{

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
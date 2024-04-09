import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { FormsModule } from '@angular/forms';
import { RestaurantResponse, WeeklyOperatingHours} from '../../../../types';

@Component({
  selector: 'app-add-restaurant',
  standalone: true,
  imports: [NgIf, FormsModule,CommonModule,],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.css'
})
export class AddRestaurantComponent {
  

  constructor(private restaurantService: RestaurantService) {}

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
  days = [
    { name: 'Monday', isOpen: false, openTime: '', closeTime: '' },
    { name: 'Tuesday', isOpen: false, openTime: '', closeTime: '' },
    { name: 'Wednesday', isOpen: false, openTime: '', closeTime: '' },
    { name: 'Thursday', isOpen: false, openTime: '', closeTime: '' },
    { name: 'Friday', isOpen: false, openTime: '', closeTime: '' },
    { name: 'Saturday', isOpen: false, openTime: '', closeTime: '' },
    { name: 'Sunday', isOpen: false, openTime: '', closeTime: '' },
  ];


}
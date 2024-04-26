import { Injectable } from '@angular/core';
import {
  OperatingHours,
  Restaurant,
  ValidationResponse,
} from '../../../../../../types';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RestaurantValidatorService {
  constructor() {}
  days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  @Injectable({ providedIn: 'root' })
  isValidNameValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;  
      }
      const validationResult = this.isValidNameValidation2(value);
      return validationResult.isValid ? null : { invalidName: { value: validationResult.message } };
    };
  }

  isValidNameValidation2(name:string): ValidationResponse{
    if (
      !name ||
      name === ''
    )
      return { isValid: false, message: 'Name must be filled in' };
    else if (!this.isValidName(name)) {
      return {
        isValid: false,
        message: 'Between 4 & 50 characters',
      };
    }
    return { isValid: true };
  }

  




  isValidRestaurantInfo(restaurantDetails: Restaurant): ValidationResponse {
    if (
      !restaurantDetails.details.name ||
      restaurantDetails.details.name === ''
    )
      return { isValid: false, message: 'Name must be filled in' };
    else if (!this.isValidName(restaurantDetails.details.name)) {
      return {
        isValid: false,
        message: 'Name must be more than 4 characters and less than 50',
      };
    }

    if (restaurantDetails.details.phone != '') {
      if (!this.isValidPhoneNumber(restaurantDetails.details.phone)) {
        return {
          isValid: false,
          message: 'Phone number must be in the format 111-111-1111',
        };
      }
    }

    if (restaurantDetails.details.description != '') {
      if (!this.isValidDescription(restaurantDetails.details.description)) {
        return {
          isValid: false,
          message: 'Description must be between 50 to 1000 characters',
        };
      }
    }

    if (restaurantDetails.details.location.address != '') {
      if (!this.isValidAddress(restaurantDetails.details.location.address)) {
        return {
          isValid: false,
          message: 'Address must be between 6 to 100 characters',
        };
      }
    }

    if (restaurantDetails.details.location.city != '') {
      if (!this.isValidCity(restaurantDetails.details.location.city)) {
        return {
          isValid: false,
          message: 'City must be between 4 to 30 characters',
        };
      }
    }

    if (restaurantDetails.details.location.state != '') {
      if (!this.isValidState(restaurantDetails.details.location.state)) {
        return { isValid: false, message: 'State is not valid' };
      }
    }

    if (restaurantDetails.details.location.zipCode != '') {
      if (
        !this.isValidZipPlus4Code(restaurantDetails.details.location.zipCode)
      ) {
        return {
          isValid: false,
          message: 'Zip code must be 5 digits or +4 11971-1311',
        };
      }
    }

    for (const day of this.days) {
      const hours = restaurantDetails.details.operatingHours[day];
      if (!this.isValidOperatingHours(hours)) {
        return {
          isValid: false,
          message: `Invalid operating hours for ${day}. Open time must be before close time and both must be filled if marked open.`,
        };
      }
    }

    if (restaurantDetails.admin.fixedRate != 0.02) {
      if (!this.isValidFixedRate(restaurantDetails.admin.fixedRate)) {
        return {
          isValid: false,
          message: 'Fixed rate must be between 0.01 and 0.10',
        };
      }
    }

    if (restaurantDetails.stripe.stripeAccountId != '') {
      if (!this.isValidStripeID(restaurantDetails.stripe.stripeAccountId)) {
        return {
          isValid: false,
          message: 'Stripe ID must be between 1 and 100',
        };
      }
    }
    return { isValid: true };
  }

  isValidName(name: string): boolean {
    return name.length > 4 && name.length < 50;
  }

  isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  }

  isValidDescription(description: string): boolean {
    return description.length > 50 && description.length < 1000;
  }

  isValidAddress(address: string): boolean {
    return address.length > 6 && address.length < 100;
  }

  isValidCity(city: string): boolean {
    return city.length > 4 && city.length < 30;
  }

  isValidState(state: string): boolean {
    const stateRegex =
      /^(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)$/;
    return stateRegex.test(state);
  }

  isValidZipPlus4Code(zipCode: string): boolean {
    const pattern = /^\d{5}(-\d{4})?$/;
    return pattern.test(zipCode);
  }

  isValidOperatingHours(hours: OperatingHours): boolean {
    if (!hours.isOpen) {
      return true;
    }

    if (!hours.open || !hours.close) {
      return false;
    }

    const openTime = new Date('1970-01-01T' + hours.open + ':00Z');
    const closeTime = new Date('1970-01-01T' + hours.close + ':00Z');

    return openTime < closeTime;
  }

  isValidFixedRate(rate: number): boolean {
    return rate > 0.01 && rate < 0.1;
  }

  isValidStripeID(id: string): boolean {
    return id.length > 1 && id.length < 100;
  }
}

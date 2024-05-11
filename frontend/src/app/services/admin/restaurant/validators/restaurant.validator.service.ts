import { Injectable } from '@angular/core';
import {
  OperatingHours,
  Restaurant,
  ValidationResponse,
} from '../../../../../../types';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, catchError, debounceTime, filter, map, of, switchMap } from 'rxjs';
import { UserService } from '../../owner/requests/user.service';
import { RestaurantService } from '../requests/restaurant.service';

@Injectable({
  providedIn: 'root',
})
export class RestaurantValidatorService {
  constructor(private restaurantService: RestaurantService, private userService: UserService) {}
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

  isValidNameValidation(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value;
      if (!value || value === '') {
        return of({ required: { value: 'Name must be filled in' } });
      }

      if (value.length > 50) {
        // Wrap the error object in 'of()' to return an Observable
        return of({ tooLarge: { value: 'Name must be less than 50 characters' } });
      }
  
      if (value.length < 5) {
        // Wrap the error object in 'of()' to return an Observable
        return of({ tooSmall: { value: 'Name must be more than 4 characters' } });
      }

      // Only checks if the email exists if the format is valid
      return this.restaurantService.doesRestaurantExist(value).pipe(
        map(restaurantExists => restaurantExists ? { exists: { value: 'This name is already in use.' } } : null)
      );
    };
  }

  isValidPhoneValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      // If there's no value and input is not required, return null indicating no error.
      if (!value && value === '') {
        return null;
      }
      // Inline regex to check the format.
      const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
      const isValid = phoneRegex.test(value);
      if(!isValid){
        return {
          tooSmall: { value: 'Phone Number must be in 631-123-4568 format' },
        };
      }
      return null;
    };
  }

  isValidAddressValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value && value === '') {
        return null;
      }

      if (value.length < 7) {
        return {
          tooSmall: { value: 'Address must be more than 6 characters' },
        };
      }

      if (value.length > 100) {
        return {
          tooLarge: { value: 'Address must be less than 100 characters' },
        };
      }
      return null;
    };
  }

  isValidCityValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value && value === '') {
        return null;
      }

      if (value.length < 5) {
        return {
          tooSmall: { value: 'City must be more than 4 characters' },
        };
      }

      if (value.length > 30) {
        return {
          tooLarge: { value: 'City must be less than 30 characters' },
        };
      }
      return null;
    };
  }

  isValidStateValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.toUpperCase();
      if (!value) {
        return null;
      }
      const stateRegex = /^(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)$/i;
      if (!stateRegex.test(value)) {
        return {
          invalid: { value: 'Invalid state.' }
        };
      }
      return null;
    };
  }

  isValidDescriptionValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value && value === '') {
        return null;
      }

      if (value.length < 51) {
        return {
          tooSmall: {value: 'Description must be more than 50 characters'},
        };
      }

      if (value.length > 1000) {
        return {
          tooLarge: { value: 'Description must be less than 1000 characters' },
        };
      }
      return null;
    };
  }


  isValidZipValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.toUpperCase();
      if (!value) {
        return null;
      }
      const zipRegex = /^\d{5}(-\d{4})?$/;
      if (!zipRegex.test(value)) {
        return {
          invalid: { value: 'Invalid ZipCode' }
        };
      }
      return null;
    };
  }

  operatingHoursValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const isOpen = group.get('isOpen')?.value;
      const open = group.get('open')?.value;
      const close = group.get('close')?.value;
  
      if (isOpen) {
        if (!open || !close) {
          return { requiredTimes: 'Opening and closing times are required.' };
        }
        if (open >= close) {
          return { invalidOrder: 'Opening time must be before closing time.' };
        }
      }
      return null;
    };
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

  isValidStripeIdValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value && value === '') {
        return null;
      }

      if (value.length < 2) {
        return {
          tooSmall: { value: 'Stripe ID must be more than 1 characters' },
        };
      }

      if (value.length > 100) {
        return {
          tooLarge: { value: 'Stripe ID must be less than 100 characters' },
        };
      }
      return null;
    };
  }

  isValidFixedRateValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value || value === '') {
        return { required: { value: 'Fixed Rate must be filled in' } };
      }

      if (!/^\d+(\.\d+)?$/.test(value)) {
        return { invalid: { value: 'Fixed Rate must be only digits' } };

      }
      if (value > 0.1) {
        return {
          tooLarge: { value: 'Fixed rate must be less than 0.10' },
        };
      }

      if (value < 0.01) {
        return {
          tooSmall: { value: 'Fixed rate must be more than 0.01' },
        };
      }
      return null;
    };
  }



  isValidOwnerEmailAsync(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value;
      if (!value) { // Checks for both empty string and null
        return of(null); // No error if field is empty
      }
      const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailPattern.test(value)) {
        return of({ invalidEmailFormat: { value: 'Invalid Owner Email' } });
      }
      // Only checks if the email exists if the format is valid
      return this.userService.doesUserExist(value).pipe(
        map(userExists => userExists ? { exists: { value: 'This email is a2lready in use.' } } : null)
      );
    };
  }

  isValidOwnerEmailEditAsync(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value;
      const oldEmail = this.restaurantService.getCurrentOwnerEmail();
      console.log(oldEmail);
      
      if (!value) { // Checks for both empty string and null
        return of(null); // No error if field is empty
      }
      const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailPattern.test(value)) {
        return of({ invalidEmailFormat: { value: 'Invalid Owner Email' } });
      }
      
      if(oldEmail.toLowerCase() === value.toLowerCase()){
        return of(null);
      }
      else{
      return this.userService.doesUserExist(value).pipe(
        map(userExists => userExists ? { exists: { value: 'This email is already in use.' } } : null)
        );
      };
    }
  }

  
  
  
}

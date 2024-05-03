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
      if (!value || value === '') {
        return { invalidName: { value: 'Name must be filled in' } };
      }

      if (value.length < 5) {
        return {
          invalidName: { value: 'Name must be more than 4 characters' },
        };
      }

      if (value.length > 50) {
        return {
          invalidName: { value: 'Name must be less than 50 characters' },
        };
      }
      return null;
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
      return isValid
        ? null
        : {
            invalidPhoneNumber: {
              value: 'Phone number must be in the format 111-111-1111',
            },
          };
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
          invalidName: { value: 'Address must be more than 6 characters' },
        };
      }

      if (value.length > 100) {
        return {
          invalidName: { value: 'Address must be less than 100 characters' },
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
          invalidName: { value: 'City must be more than 4 characters' },
        };
      }

      if (value.length > 30) {
        return {
          invalidName: { value: 'City must be less than 30 characters' },
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
          invalidState: { value: 'Invalid state.' }
        };
      }
      return null;
    };
  }

  isValidDesciptionValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value && value === '') {
        return null;
      }

      if (value.length < 51) {
        return {
          invalidName: { value: 'Desciption must be more than 50 characters' },
        };
      }

      if (value.length > 1000) {
        return {
          invalidName: { value: 'Desciption must be less than 1000 characters' },
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
          invalidState: { value: 'Invalid ZipCode' }
        };
      }
      return null;
    };
  }

  operatingHoursValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isOpen = control.get('isOpen')?.value;
      const open = control.get('open')?.value;
      const close = control.get('close')?.value;
  
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

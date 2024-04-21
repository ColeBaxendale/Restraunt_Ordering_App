import { Injectable } from '@angular/core';
import { User, ValidationResponse } from '../../../../../../types';

@Injectable({
  providedIn: 'root'
})
export class UserValidatorService {

  constructor() { }


  isValidEmail(email: string): boolean {
    // Simple regex for email validation
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
  }

  isValidPassword(password: string): boolean {
    // Regex to check the password criteria mentioned
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  }

  isValidUserInfo(user: User): ValidationResponse {
      if(user.email == ''){
        return {
          isValid: false,
          message: 'Email must be filled in.'
        };
      }
      if (!this.isValidEmail(user.email)) {
        return {
          isValid: false,
          message: 'Invalid email format.'
        };
      }


    if(user.password){
      if (!this.isValidPassword(user.password)) {
        return {
          isValid: false,
          message: 'Password must be at least 8 characters long and contain a mix of uppercase letters, lowercase letters, numbers, and special characters.'
        };
      }
    }

    if(user.role){
      if (user.role !== 'owner') {
        return {
          isValid: false,
          message: 'Role must be owner.'
        };
      }
  
    }

    return { isValid: true };
  }
}
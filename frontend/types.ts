import internal from 'node:stream';

export enum UserRole {
  Admin = 'admin',
  Owner = 'owner',
}

export interface LoginResponse {
  message: string;
  firstLogin: boolean; 
  user: {
    role: UserRole;
    _id: string;
  };
}



export interface User {
  _id?: string; // Optional since it's assigned by MongoDB when a document is created
  email: string;
  password?: string; // Optional in frontend models to avoid exposing sensitive data
  role?: UserRole;
}
export interface RestaurantLocation {
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface OperatingHours {
  isOpen: boolean;
  open?: string; // Made optional since it's conditionally required based on isOpen
  close?: string; // Made optional for the same reason
}

export interface WeeklyOperatingHours {
  [key: string]: OperatingHours;
  monday: OperatingHours;
  tuesday: OperatingHours;
  wednesday: OperatingHours;
  thursday: OperatingHours;
  friday: OperatingHours;
  saturday: OperatingHours;
  sunday: OperatingHours;
}

export interface RestaurantDetails {
  logo: string;
  name: string;
  description: string;
  phone: string;
  location: RestaurantLocation;
  operatingHours: WeeklyOperatingHours;
  owner: User["_id"]; // Assuming these are Owner IDs. You could use an Owner interface instead if needed
  menuSections?: string[]; // Assuming these are MenuSection IDs. Adjust as necessary
  ordersEnabled?: boolean;
}

export interface AdminDetails {
  isActive: boolean;
  overallIncome: number;
  fixedRate: number;
}

export interface StripeDetails {
  stripeAccountId: string;
  addFees: boolean;
}

export interface Restaurant {
  _id?: string;
  details: RestaurantDetails;
  admin: AdminDetails;
  stripe: StripeDetails;
}

export interface RestaurantResponse {
  message: string;
  restaurant?: Restaurant;
  error?: string; 

}

export interface UserResponse {
  message: string; // A message about the result of the request, e.g., "User created successfully."
  userId?: string; // Optional user ID, provided on successful creation.
  user?: Omit<User, 'password'>; // User data excluding the password
  error?: string; // Optional error message if something went wrong.
}


export interface ValidationResponse{
  isValid: boolean;
  message?: string;
}
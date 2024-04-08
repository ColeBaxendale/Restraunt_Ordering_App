export enum UserRole {
    Admin = 'admin',
    Owner = 'owner',
  }
  
  export interface User {
    _id?: string; // Optional since it's assigned by MongoDB when a document is created
    email: string;
    password?: string; // Optional in frontend models to avoid exposing sensitive data
    name: string;
    role: UserRole;
    restaurants: Restaurant[] | string[]; // Array of restaurant documents or just their IDs
  }









  export interface RestaurantLocation {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  }
  
  export interface OperatingHours {
    isOpen: boolean;
    open?: number; // Made optional since it's conditionally required based on isOpen
    close?: number; // Made optional for the same reason
  }
  
  export interface WeeklyOperatingHours {
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
    owners: User[]; // Assuming these are Owner IDs. You could use an Owner interface instead if needed
    menuSections: string[]; // Assuming these are MenuSection IDs. Adjust as necessary
    ordersEnabled: boolean;
  }
  
  export interface AdminDetails {
    nameLowerCase: string;
    isActive: boolean;
    overallIncome: number;
    fixedRate: number;
  }
  
  export interface StripeDetails {
    stripeAccountId: string;
    addFees: boolean;
  }
  
  export interface Restaurant {
    [x: string]: any;
    _id?: string; // Optional since it's assigned by MongoDB when a document is created
    details: RestaurantDetails;
    admin: AdminDetails;
    stripe: StripeDetails;
  }



  export interface RestaurantResponse {
    message: string;
    restaurant: Restaurant;
  }

  export interface idType {
    id: string;
  }

  export interface PartialRestaurantUpdate {
    details:{
      logo?: string;
      description?: string;
      phone?: string;
    }

  }
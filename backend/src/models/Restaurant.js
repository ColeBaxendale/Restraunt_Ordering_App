const mongoose = require('mongoose');



const RestaurantLocation = new mongoose.Schema({
  address: { type: String, default: ''},
  city: { type: String, default: ''},
  state: { type: String, default: ''},
  zipCode: { type: String, default: ''},
});

// Define a schema for operating hours
const OperatingHoursSchema = new mongoose.Schema({
  isOpen: { type: Boolean, default: false},
  open: { type: String, required: function() { return this.isOpen; } }, // Only required if isOpen is true
  close: { type: String, required: function() { return this.isOpen; } }, // Only required if isOpen is true
});

// Define a schema for the restaurant's weekly operating hours
const WeeklyOperatingHoursSchema = new mongoose.Schema({
  monday: OperatingHoursSchema,
  tuesday: OperatingHoursSchema,
  wednesday: OperatingHoursSchema,
  thursday: OperatingHoursSchema,
  friday: OperatingHoursSchema,
  saturday: OperatingHoursSchema,
  sunday: OperatingHoursSchema,
});

const RestaurantDetails = new mongoose.Schema({
  logo: { type: String, default: ''},
  name: { type: String, unique: true},
  nameLowerCase: { type: String, unique: true },
  description: { type: String, default: '' },
  phone: {type: String, default: ''},
  location: RestaurantLocation,
  operatingHours: WeeklyOperatingHoursSchema,
  ordersEnabled: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: function() { return this.role === 'owner'; }},
  menuSections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuSection' }],
  ordersEnabled: { type: Boolean, default: false},
});

const AdminDetails = new mongoose.Schema({
  isActive: { type: Boolean, default: false},
  overallIncome: { type: Number, default: 0.02 },
  fixedRate: { type: Number, default: 0.02 },

});
const StripeDetails = new mongoose.Schema({
  stripeAccountId: { type: String, default: ''},
  addFees: { type: Boolean, default: true},
});

// Define the main restaurant schema
const RestaurantSchema = new mongoose.Schema({
  details: RestaurantDetails,
  admin: AdminDetails,
  stripe: StripeDetails
  
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);

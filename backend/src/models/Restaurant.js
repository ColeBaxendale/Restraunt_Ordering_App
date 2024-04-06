const mongoose = require('mongoose');



const RestaurantLocation = new mongoose.Schema({
  address: { type: String},
  city: { type: String},
  state: { type: String},
  zipCode: { type: String},
});

// Define a schema for operating hours
const OperatingHoursSchema = new mongoose.Schema({
  isOpen: { type: Boolean},
  open: { type: Number, required: function() { return this.isOpen; } }, // Only required if isOpen is true
  close: { type: Number, required: function() { return this.isOpen; } }, // Only required if isOpen is true
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
  logo: { type: String },
  name: { type: String, unique: true, required: true },
  description: { type: String },
  location: RestaurantLocation,
  operatingHours: WeeklyOperatingHoursSchema,

  owners: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: function() { return this.role === 'owner'; }
  }],
  menuSections: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'MenuSection' 
  }],
  ordersEnabled: { type: Boolean, default: true },

});

const AdminDetails = new mongoose.Schema({
  isActive: { type: Boolean, default: false },
  overallIncome: { type: Number, default: 0 },
  fixedRate: { type: Number, required: true },

});
const StripeDetails = new mongoose.Schema({
  stripeAccountId: { type: String},
  addFees: { type: Boolean, required: true },
});

// Define the main restaurant schema
const RestaurantSchema = new mongoose.Schema({
  details: RestaurantDetails,
  admin: AdminDetails,
  stripe: StripeDetails
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);

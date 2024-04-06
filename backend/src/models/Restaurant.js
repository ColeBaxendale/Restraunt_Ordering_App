const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  uniqueId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true}, 
  description: String,
  location: {
    address: { type: String, required: true},
    city: { type: String, required: true}, 
    state: { type: String, required: true}, 
    zipCode: { type: String, required: true}, 
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  operatingHours:{
    monday: { open: String, close: String }, 
    tuesday: { open: String, close: String }, 
    wednesday: { open: String, close: String }, 
    thursday: { open: String, close: String }, 
    friday: { open: String, close: String }, 
    saturday: { open: String, close: String }, 
    sunday: { open: String, close: String },
  },
  menuSections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuSection' }],
  ordersEnabled: { type: Boolean, default: true }, 
  isActive: { type: Boolean, default: false }, 
  stripeAccountId: { type: String, required: true },
  overallIncome: { type: Number, required: true },
  fixedRate:{type: Number, required: true},
  addFees:{type: Boolean, required: true},
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
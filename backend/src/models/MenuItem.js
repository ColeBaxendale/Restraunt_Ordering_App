const mongoose = require('mongoose');

const ingredientOptionSchema = new mongoose.Schema({
  name: String,
  additionalCost: Number,
});

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  imageUrl: String, // Optional image URL
  customizableIngredients: [ingredientOptionSchema], // Array of ingredient options
});

module.exports = mongoose.model('MenuItem', menuItemSchema);

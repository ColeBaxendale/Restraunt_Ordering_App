const mongoose = require('mongoose');

const menuSectionSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  name: { type: String, required: true }, // Section name, e.g., "Appetizers"
  description: { type: String, default: '' }, // Optional description of the section
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }], // Array of menu items belonging to this section
});

module.exports = mongoose.model('MenuSection', menuSectionSchema);

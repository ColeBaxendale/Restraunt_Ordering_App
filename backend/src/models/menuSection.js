const mongoose = require('mongoose');

const menuSectionSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  name: { type: String, required: true },
  position: { type: Number, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
});

module.exports = mongoose.model('MenuSection', menuSectionSchema);

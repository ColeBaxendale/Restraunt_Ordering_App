const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  section: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuSection', required: true },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  imageUrl: String,
  customizableOptions: [{
    optionName: String,
    additionalCost: Number,
    }],
});

module.exports = mongoose.model('MenuItem', menuItemSchema);

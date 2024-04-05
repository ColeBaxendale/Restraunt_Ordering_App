const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'owner'],
    required: true,
  },
  restaurants: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: function() { return this.role === 'owner'; }
  }]
});

module.exports = mongoose.model('User', userSchema);

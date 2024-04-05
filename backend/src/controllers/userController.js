const User = require('../models/user'); // Assuming you have a User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  // Check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email or password is wrong.');

  // Check password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  // Create and assign a token
  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.header('Authorization', token).send({ token });
};

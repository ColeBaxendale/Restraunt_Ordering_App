const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password, name, role } = req.body;
  console.log(req.body);


  // Basic validation
  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("An account with this email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      name: name,
      role: role || 'user', // Default role to 'user'
    });

    const savedUser = await user.save();

    // Create a token
    const token = jwt.sign({ _id: savedUser._id, role: savedUser.role }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.header('Authorization', token).json({
      message: "User registered successfully",
      token: token,
      user: { id: savedUser._id, email: savedUser.email, role: savedUser.role }
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const emailLC = email.toLowerCase();

  const user = await User.findOne({ email });
  if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'strict', secure: true }); // Adjust cookie settings as needed
    res.send("Login successful");
}

exports.verifyUser = (req, res) => {
  res.send({ isAuthenticated: true, role: req.user.role });
};
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
    try {
      const { email, password, name } = req.body;

      const emailLower = email.toLowerCase();
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      let restaurants = [];
  
      // Create a new user instance and save it to the database
      const newUser = await User.create({
        emailLower,
        password: hashedPassword,
        name,
        role: 'owner',
        restaurants // This will be an empty array for 'owner' if not provided
      });
  
      res.status(201).json({
        message: 'User created successfully',
        user: newUser,
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
  };

  
  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user == null) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.updateUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const updateData = req.body;
  
      // If updating password, hash the new password
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        message: 'User updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
  };
  
  exports.deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
  };
  
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || typeof email !== "string" || email.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "Email is required and must be a string." });
    }

    if (!password || typeof password !== "string" || password.trim() === 0) {
      return res
        .status(400)
        .json({ message: "Password is required and must be a string." });
    }

    const existingUser = await User.findOne({ email: email }).exec();
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "A User with the same email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userInfo = {
      email,
      password: hashedPassword,
      role: 'owner'
    };

    const newUser = new User(userInfo);
    await newUser.save();
    res.status(201).json({
      message: "New User added successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add new restaurant.", error: error.message });
  }
};



exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({'role': 'owner'});
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
    if(user.role == 'admin'){
      return res.status(400).json({message: 'Can not get an admin account.'})
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = {...req.body};

    // Fetch the current user to check their role
    const currentUser = await User.findById(id);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent updating if the user is an admin
    if (currentUser.role === 'admin') {
      return res.status(400).json({ message: "Cannot update an admin account." });
    }

    // Hash the new password if it's being updated
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    // Update user details except the role to 'admin'
    if (updateData.role && updateData.role === 'admin') {
      return res.status(400).json({ message: "Role change to admin is not allowed." });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found after update attempt." });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({message: "Invalid user ID format"});
    }
    res.status(500).json({ message: "Failed to update user", error: error.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch the user to check for existence and role
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent deletion if the user is an admin
    if (user.role === 'admin') {
      return res.status(400).json({ message: "Cannot delete an admin account." });
    }

    // Perform the deletion
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" }); // This might be redundant if user was found earlier
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({message: "Invalid user ID format"});
    }
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};


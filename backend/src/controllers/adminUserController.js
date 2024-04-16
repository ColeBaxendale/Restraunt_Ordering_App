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
    const userId = req.params.id;
    const updateData = req.body;

    // If updating password, hash the new password
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};

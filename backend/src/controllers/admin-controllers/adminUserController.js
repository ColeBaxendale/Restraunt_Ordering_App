const User = require("../../models/User");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string" || email.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "Email is required and must be a string." });
    }

    const existingUser = await User.findOne({ email: email }).exec();
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "A User with the same email already exists." });
    }

    const hashedPassword = await bcrypt.hash("Welcome1", 10);

    const userInfo = {
      email,
      password: hashedPassword,
      role: "owner",
    };

    const newUser = new User(userInfo);
    await newUser.save();

    // Fetch the user without the password and role fields
    

    res.status(201).json({
      message: "New User added successfully",
      userId: userToSend._id,
      user: userToSend,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add new restaurant.", error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users with the role 'owner' excluding 'password' and 'role' fields
    const users = await User.find({ role: "owner" }).select("-password -role");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -role");
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role == "admin") {
      return res.status(400).json({ message: "Can not get an admin account." });
    }
    res.status(201).json({
      message: "User found successfully",
      userId: user._id,
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.resetUserPassword = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Default password to reset to
    const defaultPassword = "Welcome1";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "User password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to reset password", error: error.message });
  }
};

exports.isFirstLogin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -role");
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role == "admin") {
      return res.status(400).json({ message: "Can not get an admin account." });
    }
    const firstLogin = await bcrypt.compare('Welcome1', user.password);
    if(!firstLogin){
      res.status(201).json({
        message: "User found successfully",
        firstLoginBool: false
      });
    }
    res.status(201).json({
      message: "User found successfully",
      firstLoginBool: true
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    if (user.role === "admin") {
      return res
        .status(400)
        .json({ message: "Cannot delete an admin account." });
    }

    // Perform the deletion
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" }); // This might be redundant if user was found earlier
    }

    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};

exports.checkUserEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    console.log("Error: Email parameter missing in request body.");
    return res.status(400).json({ exists: false, error: 'Email is required' });
  }

  console.log("Checking if user exists with email:", email);

  try {
    const user = await User.findOne({ email: email }).exec();
    if (user) {
      console.log("User found with email:", email);
      return res.json({ exists: true });
    } else {
      console.log("No user found with email:", email);
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error('Failed to check user existence:', error);
    return res.status(500).json({ exists: false, error: 'Error checking user existence' });
  }
};
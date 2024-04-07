const Restaurant = require("../models/Restaurant"); // Adjust the path as necessary
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createRestaurant = async (req, res, next) => {
    try {
      let { restaurantData } = req.body;
  
      console.log(restaurantData); // To ensure we receive the expected structure
      console.log("Accessing name:", restaurantData.details.name); // This should now work as expected
  
      // Directly call .toLowerCase() on the string
      const lowerCaseName = restaurantData.details.name.toLowerCase();
  
      if (!restaurantData.details || !restaurantData.details.name) {
        return res.status(400).json({ error: "Missing restaurant name in details." });
      }
  
      // Check for an existing restaurant with the same name in lowercase
      const existingRestaurant = await Restaurant.findOne({
        "admin.nameLowerCase": lowerCaseName,
      });
  
      if (existingRestaurant) {
        return res.status(409).json({ error: "Restaurant name already exists." });
      }
      restaurantData.details.phone = restaurantData.details.phone || '';
      // Ensure admin object exists
      restaurantData.admin = restaurantData.admin || { nameLowerCase: lowerCaseName, isActive: false, overallIncome: 0, fixedRate: 0.02 };
      
      // Initialize StripeDetails if not provided
      restaurantData.stripe = restaurantData.stripe || { stripeAccountId: '', addFees: true };
  
      // Initialize location with defaults if not provided
      restaurantData.details.location = restaurantData.details.location || { address: '', city: '', state: '', zipCode: '' };
  
      // Initialize operatingHours with default closed status if not provided
      const defaultOperatingHoursClosed = { isOpen: false, open: null, close: null };
      restaurantData.details.operatingHours = restaurantData.details.operatingHours || {
        monday: defaultOperatingHoursClosed,
        tuesday: defaultOperatingHoursClosed,
        wednesday: defaultOperatingHoursClosed,
        thursday: defaultOperatingHoursClosed,
        friday: defaultOperatingHoursClosed,
        saturday: defaultOperatingHoursClosed,
        sunday: defaultOperatingHoursClosed,
      };
  
      const newRestaurant = new Restaurant(restaurantData);
      await newRestaurant.save();
  
      return res.status(201).json({
        message: "Restaurant created successfully",
        restaurant: newRestaurant,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };
  


exports.getRestaurantName = async (req, res, next) => {
  try {
    const { name } = req.params; // Ensure you're using the correct parameter name as defined in your route
    const lowerCaseName = name.toLowerCase();

    console.log(lowerCaseName);
    const restaurant = await Restaurant.findOne({ "admin.nameLowerCase": lowerCaseName }); // Use findOne with the condition
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json({ restaurant });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch restaurant", error: error.message });
  }
};

exports.updateRestaurant = async (req, res, next) => {
  try {
    const { name } = req.params;
    const lowerCaseName = name.toLowerCase();

    // First, find the restaurant by the lowercase name
    const restaurant = await Restaurant.findOne({ "admin.nameLowerCase": lowerCaseName });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Now update the restaurant with the new values from req.body
    Object.keys(req.body).forEach(key => {
      restaurant[key] = req.body[key];
    });

    // Save the updated document
    const updatedRestaurant = await restaurant.save();

    res.status(200).json({
      message: "Restaurant updated successfully",
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update restaurant", error: error.message });
  }
};



exports.deleteRestaurant = async (req, res, next) => {
  try {
    const { name } = req.params;
    const lowerCaseName = name.toLowerCase();
    const deletedRestaurant = await Restaurant.findOneAndDelete({"admin.nameLowerCase": lowerCaseName});
    if (!deletedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete restaurant", error: error.message });
  }
};


exports.getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({ restaurants });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch restaurants", error: error.message });
  }
};







exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
      role: req.body.role,
      restaurant: req.body.restaurant,
    });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    if (req.body.email != null) {
      user.email = req.body.email;
    }
    if (req.body.name != null) {
      user.name = req.body.name;
    }
    if (req.body.role != null) {
      user.role = req.body.role;
    }
    if (req.body.restaurant != null) {
      user.restaurant = req.body.restaurant;
    }
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.remove();
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

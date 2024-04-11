const Restaurant = require("../models/Restaurant"); // Adjust the path as necessary
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createRestaurant = async (req, res, next) => {
  try {
    const { name } = req.body; // Only name is provided in the request

    // Check if name is provided
    if (!name) {
      return res.status(400).json({ message: "Restaurant name is required." });
    }

    // Check if `name` is provided and is a string
    if (typeof name !== "string" || name.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "Restaurant name is required and must be a string." });
    }

    // Now it's safe to use .toLowerCase() since `name` is confirmed to be a string
    const nameLowerCase = name.toLowerCase();
    // Initialize the restaurant document with default values and provided name
    const restaurantDetails = {
      details: {
        name,
        nameLowerCase: name.toLowerCase(), // For case-insensitive uniqueness
        logo: "", // Default or predefined value
        description: "", // Default or predefined value
        phone: "", // Default or predefined value
        location: {
          address: "",
          city: "",
          state: "",
          zipCode: "",
        },
        operatingHours: {
          monday: { isOpen: false, open: null, close: null },
          tuesday: { isOpen: false, open: null, close: null },
          wednesday: { isOpen: false, open: null, close: null },
          thursday: { isOpen: false, open: null, close: null },
          friday: { isOpen: false, open: null, close: null },
          saturday: { isOpen: false, open: null, close: null },
          sunday: { isOpen: false, open: null, close: null },
          // Add similar entries for other days...
        },
        ordersEnabled: false, // Default or predefined value
        // Ensure 'owners' and 'menuSections' are initialized if they're arrays
        owners: [],
        menuSections: [],
      },
      admin: {
        isActive: false, // Default or predefined value
        overallIncome: 0, // Default or predefined value
        fixedRate: 0.02, // Default or predefined value
      },
      stripe: {
        stripeAccountId: "", // Default or predefined value
        addFees: true, // Default or predefined value
      },
    };

    const newRestaurant = new Restaurant(restaurantDetails);
    await newRestaurant.save();

    res.status(201).json({
      message: "New restaurant added successfully",
      restaurant: newRestaurant,
    });
  } catch (error) {
    console.error("Failed to add new restaurant:", error);
    if (error.code === 11000) {
      res
        .status(400)
        .json({ message: "A restaurant with the same name already exists." });
    } else {
      res.status(500).json({
        message: "Failed to add new restaurant.",
        error: error.message,
      });
    }
  }
};

exports.getRestaurant = async (req, res, next) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    console.error('Failed to get restaurant:', error);
    res.status(500).json({ message: "Failed to get restaurant", error: error.toString() });
  }
};


exports.updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Fetch the current document to update
    let restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    // Update the name and ensure nameLowerCase is synchronized with name if name is being updated
    if (updates.details && updates.details.name) {
      restaurant.details.name = updates.details.name;
      restaurant.details.nameLowerCase = updates.details.name.toLowerCase();
    }

    if (updates.details && typeof updates.details === 'object') {
      Object.keys(updates.details).forEach(key => {
        restaurant.details[key] = updates.details[key];
      });
    }

    // Similarly, update admin and stripe fields if provided, excluding nameLowerCase
    if (updates.admin && typeof updates.admin === 'object') {
      Object.keys(updates.admin).forEach(key => {
        if (key !== 'nameLowerCase') { // Still ensuring 'nameLowerCase' cannot be directly updated
          restaurant.admin[key] = updates.admin[key];
        }
      });
    }

    if (updates.stripe && typeof updates.stripe === 'object') {
      Object.keys(updates.stripe).forEach((key) => {
        restaurant.stripe[key] = updates.stripe[key];
      });
    }

    // Save the updated document
    await restaurant.save();

    res.status(200).json({
      message: "Restaurant updated successfully",
      restaurant,
    });
  } catch (error) {
    console.error("Failed to update restaurant:", error);
    res.status(500).json({
      message: "Failed to update restaurant",
      error: error.toString(),
    });
  }
};

exports.deleteRestaurant = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);

    if (!deletedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }
    res.status(200).json({ message: "Restaurant deleted successfully." });
  } catch (error) {
    console.error('Failed to delete restaurant:', error);
    res.status(500).json({ message: "Failed to delete restaurant", error: error.toString() });
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

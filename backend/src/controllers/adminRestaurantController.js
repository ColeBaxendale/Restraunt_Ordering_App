const Restaurant = require("../models/Restaurant"); // Adjust the path as necessary
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createRestaurant = async (req, res, next) => {
  try {
    // Extracting all properties under 'details', and 'admin' and 'stripe' separately
    const { details, admin, stripe } = req.body;
    if (
      !details.name ||
      typeof details.name !== "string" ||
      details.name.trim().length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Restaurant name is required and must be a string." });
    }

    const nameLowerCase = details.name.toLowerCase();
    const existingRestaurant = await Restaurant.findOne({
      "details.nameLowerCase": nameLowerCase,
    }).exec();

    if (existingRestaurant) {
      return res
        .status(400)
        .json({ message: "A restaurant with the same name already exists." });
    }

    let ownerId = null;
    if (details.owner && details.owner.trim() !== "") {
      ownerId = details.owner; // Only set if it's not an empty string
    }

    // Constructing the restaurant object with structured validation and defaulting
    const restaurantDetails = {
      details: {
        name: details.name,
        nameLowerCase, // Lowercase version for case-insensitive operations
        logo: details.logo || "",
        description: details.description || "",
        phone: details.phone || "",
        location: {
          address: details.location?.address || "",
          city: details.location?.city || "",
          state: details.location?.state.toUpperCase() || "",
          zipCode: details.location?.zipCode || "",
        },
        operatingHours: details.operatingHours || {
          monday: { isOpen: false, open: "", close: "" },
          // Preset defaults for other days if needed
        },
        ordersEnabled: details.ordersEnabled || false,
        owner: ownerId,
        menuSections: details.menuSections || [],
      },
      admin: {
        isActive: admin?.isActive || false,
        fixedRate: admin?.fixedRate || 0.02,
        overallIncome: admin?.overallIncome || 0,
      },
      stripe: {
        stripeAccountId: stripe?.stripeAccountId || "",
        addFees: stripe?.addFees || false,
      },
    };

    // Create a new restaurant instance and save it to the database
    const newRestaurant = new Restaurant(restaurantDetails);
    await newRestaurant.save();

    // Send success response
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
      res
        .status(500)
        .json({
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
    console.error("Failed to get restaurant:", error);
    res
      .status(500)
      .json({ message: "Failed to get restaurant", error: error.toString() });
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

    if (updates.details && updates.details.owner == undefined) {
      updates.details.owner = null; // Correctly set owner to null if empty string provided
    }

    if (updates.details && typeof updates.details === "object") {
      Object.keys(updates.details).forEach((key) => {
        restaurant.details[key] = updates.details[key];
      });
    }

    // Similarly, update admin and stripe fields if provided, excluding nameLowerCase
    if (updates.admin && typeof updates.admin === "object") {
      Object.keys(updates.admin).forEach((key) => {
        if (key !== "nameLowerCase") {
          // Still ensuring 'nameLowerCase' cannot be directly updated
          restaurant.admin[key] = updates.admin[key];
        }
      });
    }

    if (updates.stripe && typeof updates.stripe === "object") {
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
    console.error("Failed to delete restaurant:", error);
    res
      .status(500)
      .json({
        message: "Failed to delete restaurant",
        error: error.toString(),
      });
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

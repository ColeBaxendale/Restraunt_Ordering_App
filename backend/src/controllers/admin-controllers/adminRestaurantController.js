const Restaurant = require("../../models/Restaurant"); // Adjust the path as necessary
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

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

    const restaurantDetails = {
      details: {
        name: details.name,
        nameLowerCase,
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
          tuesday: { isOpen: false, open: "", close: "" },
          wednesday: { isOpen: false, open: "", close: "" },
          thursday: { isOpen: false, open: "", close: "" },
          friday: { isOpen: false, open: "", close: "" },
          saturday: { isOpen: false, open: "", close: "" },
          sunday: { isOpen: false, open: "", close: "" },
        },
        ordersEnabled: details.ordersEnabled || false,
        owner: ownerId,
        menuSections: details.menuSections || [],
      },
      admin: {
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
      res.status(500).json({
        message: "Failed to add new restaurant.",
        error: error.message,
      });
    }
  }
};

exports.createRestaurantWithOwner = async (req, res) => {
  const session = await mongoose.startSession(); // Start a MongoDB session for transactions
  session.startTransaction(); // Start the transaction

  try {
    const { email, details, admin, stripe } = req.body;

    if (!email || !details.name) {
      throw new Error("Required fields are missing");
    }

    const existingUser = await User.findOne({ email: email }).session(session);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash("Welcome1", 10);

    const userInfo = {
      email,
      password: hashedPassword,
      role: "owner",
    };

    const newUser = new User(userInfo);
    await newUser.save({ session });

    const nameLowerCase = details.name.toLowerCase();
    const existingRestaurant = await Restaurant.findOne({
      "details.nameLowerCase": nameLowerCase,
    }).session(session);
    if (existingRestaurant) {
      throw new Error("A restaurant with the same name already exists");
    }

    const restaurantDetails = {
      details: {
        name: details.name,
        nameLowerCase,
        logo: details.logo || "",
        description: details.description || "",
        phone: details.phone || "",
        location: details.location,
        operatingHours: details.operatingHours,
        ordersEnabled: details.ordersEnabled || false,
        owner: newUser._id,
        menuSections: details.menuSections || [],
      },
      admin,
      stripe,
    };

    const newRestaurant = new Restaurant(restaurantDetails);
    await newRestaurant.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "New restaurant and owner created successfully",
      restaurant: newRestaurant,
      user: newUser,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({
      message: "Failed to create restaurant and owner.",
      error: error.message,
    });
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

    // Update name and synchronize nameLowerCase
    if (
      updates.details &&
      updates.details.name &&
      updates.details.name !== restaurant.details.name
    ) {
      restaurant.details.name = updates.details.name;
      restaurant.details.nameLowerCase = updates.details.name.toLowerCase();
    }

    // Ensure owner is cleared if set to undefined in the update
    if (updates.details && updates.details.owner === undefined) {
      restaurant.details.owner = null;
    }

    // Generic update for details except owner if undefined
    if (updates.details && typeof updates.details === "object") {
      Object.keys(updates.details).forEach((key) => {
        if (key !== "owner" || updates.details.owner !== undefined) {
          restaurant.details[key] = updates.details[key];
        }
      });
    }

    // Update admin details except for overallIncome
    if (updates.admin && typeof updates.admin === "object") {
      Object.keys(updates.admin).forEach((key) => {
        if (key !== "overallIncome") {
          restaurant.admin[key] = updates.admin[key];
        }
      });
    }

    // Update stripe details
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

exports.createOwnerAndUpdateRestaurant = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const { details, admin, stripe } = req.body;  // Directly destructuring from req.body

    if (!details || !details.name || !details.owner) {
      throw new Error("Required fields are missing");
    }
    const email = details.owner

    const existingUser = await User.findOne({ email: email }).session(session);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash("Welcome1", 10);
    const userInfo = {
      email,
      password: hashedPassword,
      role: "owner",
    };

    const newUser = new User(userInfo);
    await newUser.save({ session });

    let restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    // Name handling
    if (details.name && details.name !== restaurant.details.name) {
      restaurant.details.name = details.name;
      restaurant.details.nameLowerCase = details.name.toLowerCase();
    }

    // Owner update
    restaurant.details.owner = newUser._id;

    // Details update
    if (typeof details === "object") {
      Object.keys(details).forEach((key) => {
        if (key !== "owner") {
          restaurant.details[key] = details[key];
        }
      });
    }

    // Admin update, excluding overallIncome
    if (admin && typeof admin === "object") {
      Object.keys(admin).forEach((key) => {
        if (key !== "overallIncome") {
          restaurant.admin[key] = admin[key];
        }
      });
    }

    // Stripe update
    if (stripe && typeof stripe === "object") {
      Object.keys(stripe).forEach((key) => {
        restaurant.stripe[key] = stripe[key];
      });
    }

    // Save the updated document
    await restaurant.save();
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Owner created and restaurant updated",
      user: newUser,
      restaurant,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({
      message: "Failed to create owner and update restaurant",
      error: error.message,
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
    res.status(500).json({
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

exports.checkRestaurantName = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    console.log("Error: Restaurant Name parameter missing in request body.");
    return res
      .status(400)
      .json({ exists: false, error: "Restaurant Name is required" });
  }

  const nameToCheck = name.toLowerCase(); // Normalize input to lowercase

  try {
    // Adjust query to target the 'details.nameLowerCase' field
    const restaurant = await Restaurant.findOne({
      "details.nameLowerCase": nameToCheck, // Corrected to access the nested field
    }).exec();

    if (restaurant) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error("Failed to check restaurant existence:", error);
    return res
      .status(500)
      .json({ exists: false, error: "Error checking restaurant existence" });
  }
};

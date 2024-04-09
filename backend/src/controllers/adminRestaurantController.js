const Restaurant = require("../models/Restaurant"); // Adjust the path as necessary
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createRestaurant = async (req, res, next) => {
    try {
      let { data } = req.body;
  
      console.log(data); // To ensure we receive the expected structure
      console.log("Accessing name:", data.details.name); // This should now work as expected
  
      // Directly call .toLowerCase() on the string
      const lowerCaseName = data.details.name.toLowerCase();
  
      if (!data.details || !data.details.name) {
        return res.status(400).json({ error: "Missing restaurant name in details." });
      }
  
      // Check for an existing restaurant with the same name in lowercase
      const existingRestaurant = await Restaurant.findOne({
        "admin.nameLowerCase": lowerCaseName,
      });
  
      if (existingRestaurant) {
       console.log("Restaurant name already exists.");
        
        return res.status(409).json({ error: "Restaurant name already exists." });
      }
      data.details.phone = data.details.phone || '';
      // Ensure admin object exists
      data.admin = data.admin || { nameLowerCase: lowerCaseName, isActive: false, overallIncome: 0, fixedRate: 0.02 };
      
      // Initialize StripeDetails if not provided
      data.stripe = data.stripe || { stripeAccountId: '', addFees: true };
  
      // Initialize location with defaults if not provided
      data.details.location = data.details.location || { address: '', city: '', state: '', zipCode: '' };
  
      // Initialize operatingHours with default closed status if not provided
      const defaultOperatingHoursClosed = { isOpen: false, open: null, close: null };
      data.details.operatingHours = data.details.operatingHours || {
        monday: defaultOperatingHoursClosed,
        tuesday: defaultOperatingHoursClosed,
        wednesday: defaultOperatingHoursClosed,
        thursday: defaultOperatingHoursClosed,
        friday: defaultOperatingHoursClosed,
        saturday: defaultOperatingHoursClosed,
        sunday: defaultOperatingHoursClosed,
      };
  
      const newRestaurant = new Restaurant(data);
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
    const { id } = req.params;  // Ensure you're using the correct parameter name as defined in your route
 

    // First, find the restaurant by the lowercase name
    const restaurant = await Restaurant.findById(id);
    console.log(restaurant);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    if ('admin' in req.body && 'nameLowerCase' in req.body.admin) {
      return res.status(400).json({ message: "Cannot directly update admin nameLowerCase" });
    }

    // If the 'name' field in details is being updated
    if (req.body.details && 'name' in req.body.details) {
      // Assuming the correct path is "details.name" and we should also update "admin.nameLowerCase"
      restaurant.details.name = req.body.details.name;
      restaurant.admin.nameLowerCase = req.body.details.name.toLowerCase();
    }

    // Update other fields from req.body directly on the restaurant object
    Object.keys(req.body).forEach(key => {
      if (key !== 'details') { // Prevent direct overwrite of details, handled above
        restaurant[key] = req.body[key];
      }
    });
    

    // Now update the restaurant with the new values from req.body
    Object.keys(req.body).forEach(key => {
      if (key !== 'name') { // Avoid overwriting the name set above
        restaurant[key] = req.body[key];
      }
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






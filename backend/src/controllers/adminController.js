const Restaurant = require('../models/restaurant'); // Adjust the path as necessary
const User = require('../models/user')

exports.createRestaurant = async (req, res, next) => {
  try {
    const { ownerEmail, ownerName, restaurant } = req.body;
    // Ensure all required fields are present
    console.log(ownerEmail + ' ' + ownerName + '' + restaurant + ' ' + restaurant.uniqueId);
    if (!ownerEmail || !ownerName || !restaurant || !restaurant.uniqueId) {
      throw new Error("Missing fields or restaurant unique ID");
    }
    
    // Check if a restaurant with the same uniqueId already exists
    const existingRestaurant = await Restaurant.findOne({ uniqueId: restaurant.uniqueId });
    if (existingRestaurant) {
      throw new Error("Restaurant unique ID already exists");
    }

    // Create and save the restaurant
    const rest = new Restaurant(restaurant);
    await rest.save();

    // Hash the temporary password
    const tempPass = await bcrypt.hash('password', 10); // Consider using a more secure way to set initial passwords
    
    // Create and save a new user associated with the restaurant
    const newUser = new User({
      email: ownerEmail,
      password: tempPass,
      name: ownerName,
      role: 'owner',
      restaurant: rest._id // Link the restaurant ID
    });

    await newUser.save();

    // Since the restaurant is created without owner information initially,
    // you might want to update it to include the owner's information.
    // Assuming you have an 'owner' field in your Restaurant schema to hold the User ID.
    // If not, you might want to adjust the logic accordingly.
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      rest._id,
      { $set: { owner: newUser._id } }, // Update the restaurant with the new user's ID as owner
      { new: true } // Return the updated document
    );

    // Sending back the response
    return res.status(201).json({
      message: "Restaurant and User created successfully",
      restaurant: updatedRestaurant, // Now includes the owner information
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        restaurant: newUser.restaurant
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};




exports.getRestaurantByUniqueId = async (req, res, next) => {
  try {
    const { uniqueId } = req.params; // Ensure you're using the correct parameter name as defined in your route
    const restaurant = await Restaurant.findOne({ uniqueId: uniqueId }); // Use findOne with the condition
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json({ restaurant });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch restaurant', error: error.message });
  }
};


exports.updateRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json({ message: 'Restaurant updated successfully', restaurant: updatedRestaurant });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update restaurant', error: error.message });
  }
};

exports.deleteRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
    if (!deletedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete restaurant', error: error.message });
  }
};

exports.getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({ restaurants });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch restaurants', error: error.message });
  }
};


exports.createUser= async (req, res) =>{
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
      role: req.body.role,
      restaurant: req.body.restaurant
    });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
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
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.remove();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



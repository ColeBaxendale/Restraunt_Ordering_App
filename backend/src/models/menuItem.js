const mongoose = require("mongoose");

// Schema for cooking options like "well done", "medium rare"
const CookingOptionSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Cooking Preference"
  options: [{ type: String, required: true }], // e.g., ["Well Done", "Medium Rare"]
});

// Schema for ingredient modifications
const IngredientModificationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["Add", "Remove"], // Restricts the type to either "Add" or "Remove"
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ], // List of ingredients to be added or removed
  cost: {
    type: Number,
    required: true,
    default: 0, // Use 0 to indicate no extra cost; positive values for additional costs
  },
});

const menuItemSchema = new mongoose.Schema({
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuSection",
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  imageUrl: { type: String, default: "" },
  dietaryTags: [{ type: String }],
  cookingOptions: [CookingOptionSchema], // Array of cooking options
  ingredientModifications: [IngredientModificationSchema], // Array of ingredient modifications
});

module.exports = mongoose.model("MenuItem", menuItemSchema);

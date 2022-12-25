import mongoose, { Schema } from "mongoose";

const recipeSchema = new Schema({
  userid: { type: Number, required: true },
  recipeName: { type: String, require: true },
  serveSize: { type: Number, required: true },
  cookingTime: { type: String, required: true },
  source: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  category: [{ type: String, required: true }],
  photoURL: { type: String, required: true },
  date: { type: Date, default: new Date() },
});
const Recipes = mongoose.model(`Recipe`, recipeSchema);

export default Recipes;

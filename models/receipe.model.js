import mongoose, { Schema } from "mongoose";

const receipeSchema = new Schema({
  receipeName: { type: String, require: true },
  serveSize: { type: Number, required: true },
  cookingTime: { type: String, required: true },
  source: { type: String, required: true },
  ingredients: [
    {
      quantity: [{ type: String, required: true }],
      ingredientName: [{ type: String, required: true }],
    },
  ],
  instructions: { type: String, required: true },
  category: [{ type: String, required: true }],
  photoURL: { type: String, required: true },
});
const Receipes = mongoose.model(`Receipe`, receipeSchema);

export default Receipes;

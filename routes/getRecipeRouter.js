import express from "express";
import Recipes from "../models/recipe.model.js";
export const router = express.Router();

router.route(`/:userid`).get((req, res) => {
  const userid = req.params.userid;
  Recipes.find({ userid }, (error, recipeData) => {
    error
      ? res.status(404).json({
        message: `Sorry, no recipe found. Please try again.`,
      })
      : res.status(200).json(recipeData);
  });
});

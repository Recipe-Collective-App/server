import express from "express";
import Recipes from "../models/recipe.model.js";
export const router = express.Router();

router.route(`/:userid/:category`).get((req, res) => {
  const userid = req.params.userid;
  const category = req.params.category;
  Recipes.find(
    { $and: [{ userid: { $in: userid }, category: { $in: [category] } }] },
    (error, recipeData) => {
      if (error || recipeData.length === 0)
        res.status(404).json({
          message: `Sorry, No recipe found! Please Enter a valid Category!`,
        });
      else {
        res.status(200).json(recipeData);
      }
    }
  );
});

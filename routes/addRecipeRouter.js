import express from "express";
import { check, validationResult } from "express-validator";
import Recipes from "../models/recipe.model.js";
export const router = express.Router();

router
  .route(`/`)
  .post(
    [
      check("userid").exists().isNumeric(),
      check("recipeName").exists().trim().isLength({ min: 2 }),
      check("serveSize").exists(),
      check("cookingTime").exists().trim(),
      check("source").exists().trim(),
      check("ingredients").exists(),
      check("instructions").exists().trim().isLength({ min: 2 }),
      check("category").exists(),
      check("photoURL").exists().trim(),
    ],
    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty() && errors.errors[0].param === "recipeName") {
        return res.send({ message: `Please enter a valid recipe name` });
      }
      if (!errors.isEmpty() && errors.errors[0].param === "serveSize") {
        return res.send({ message: `Please enter a valid serving size` });
      }
      if (!errors.isEmpty() && errors.errors[0].param === "cookingTime") {
        return res.send({ message: `Please Enter a valid cooking time` });
      }
      if (!errors.isEmpty() && errors.errors[0].param === "instructions") {
        return res.send({
          message: `Instructions must be more than 2 characters`,
        });
      }
      if (!errors.isEmpty() && errors.errors[0].param === "category") {
        return res.send({
          message: `Category must be more than 2 characters`,
        });
      }
      if (!errors.isEmpty()) {
        return res.status(422).json({
          message: `An error has occurred.`,
        });
      }
      const recipeData = new Recipes(req.body);
      try {
        const recipes = await recipeData.save();
        res
          .status(201)
          .json({ recipes, message: `Recipe added!` });
      } catch {
        res.status(400).json({
          message: `Cannot add recipe at this time. Please try again.`,
        });
      }
    }
  );

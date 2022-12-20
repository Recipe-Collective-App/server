import express from "express";
import { check, validationResult } from "express-validator";
import Receipes from "../models/receipe.model.js";
export const router = express.Router();

router
  .route(`/`)
  .post(
    [
      check("receipeName").exists().trim().isLength({ min: 2 }),
      check("serveSize").exists(),
      check("cookingTime").exists().trim(),
      check("ingredients").exists(),
      check("instructions").exists().trim().isLength({ min: 2 }),
      check("category").exists().trim().isLength({ min: 2 }),
      check("photoURL").exists().trim(),
    ],
    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty() && errors.errors[0].param === "receipeName") {
        return res.send({ message: `Please enter a valid Receipe Name` });
      }
      if (!errors.isEmpty() && errors.errors[0].param === "serveSize") {
        return res.send({ message: `Please enter a valid Serving Size` });
      }
      if (!errors.isEmpty() && errors.errors[0].param === "cookingTime") {
        return res.send({ message: `Please Enter a valid Cooking Time` });
      }
      if (!errors.isEmpty() && errors.errors[0].param === "instructions") {
        return res.send({
          message: `Instrucions must be more than 2 characters`,
        });
      }
      if (!errors.isEmpty() && errors.errors[0].param === "category") {
        return res.send({
          message: `Category must be more than 2 characters`,
        });
      }
      if (!errors.isEmpty()) {
        return res.status(422).json({
          message: `There is a Error in Receipe Data.`,
        });
      }
      const receipeData = new Receipes(req.body);
      try {
        const receipes = await receipeData.save();
        res
          .status(201)
          .json({ receipes, message: `Receipe has been Added Successfully` });
      } catch {
        res.status(400).json({
          message: `ReceipeData Insertion Fails`,
        });
      }
    }
  );

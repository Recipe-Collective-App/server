import express from "express";
import Receipes from "../models/receipe.model.js";
export const router = express.Router();

router.route(`/:category`).get((req, res) => {
  const category = req.params.category;
  Receipes.find({ category }, (error, receipeData) => {
    error
      ? res.status(404).json({
          message: `Sorry,There is no receipe found.Please Try Again!`,
        })
      : res.status(200).json(receipeData);
  });
});

import express, { request } from "express";
import { check, validationResult } from "express-validator";
import { getJamiesRecipes } from "../scrapers/JamieOliverScraper.js";
import Recipes from "../models/recipe.model.js";
export const router = express.Router();

function extractDomain(url) {
    let domain = new URL(url)
    domain = domain.hostname

    return domain
}


router
    .route('/')
    .post((req, res) => {
        const { url } = req.body
        const supportedDomains = {
            "www.jamieoliver.com": getJamiesRecipes,
            "www.recipetineats.com": "coming up next"
        }
        let domain = extractDomain(url)
        if (supportedDomains[domain]) {
            supportedDomains[domain](url)
                .then(function (urlRecipe) {
                    const urlRecipeData = new Recipes(urlRecipe);
                    try {
                        const recipes = urlRecipeData.save();
                        res
                            .status(201)
                            .json({ recipes, message: `Recipe added!` });
                    } catch {
                        res.status(400).json({
                            message: `Cannot add recipe at this time. Please try again.`,
                        });
                    }
                })
        } else {
            return res.send({ message: "Site access coming soon" })
        }
    });

import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

async function getJamiesRecipes() {
    let url = 'https://www.jamieoliver.com/recipes/chicken-recipes/cajun-chicken-traybake/'

    try {
        const res = await fetch(url);

        const body = await res.text();

        const $ = cheerio.load(body);

        const items = [];

        const recipeName = $(".single-recipe-title").text();
        const serveSize = $(".recipe-detail.serves").text()
            .replace("Serves", "")
            .replace("Serves", "")
            .replace(/\s\s+/g, " ")
            .trim();
        const cookingTime = $(".recipe-detail.time").text()
            .replace("Cooks In", "")
            .replace("Time", "")
            .replace(/\s\s+/g, " ")
            .trim();
        const source = url;
        const quantity = []
        const ingredientName = []
        const ingredients = { quantity, ingredientName }
        const instructions = $(".method-p > div").first().text()
            .replace(/ *\([^)]*\) */g, "")
            .replace(/\s\s+/g, " ")
            .trim()
        const category = [];
        const photoURL = $("meta[property='og:image']").attr("content") ||
            $("meta[name='og:image']").attr("content") ||
            $("meta[itemprop='image']").attr("content");

        items.push({
            "recipeName": recipeName,
            "serveSize": serveSize,
            "source": source,
            "cookingTime": cookingTime,
            "ingredients": ingredients,
            "instructions": instructions,
            "category": category,
            "photoURL": photoURL
        })

        $("ul.ingred-list li").each((i, el) => {
            const q = $(el)
                .text()
                .replace(/ *\([^)]*\) */g, "")
                .replace(/\D/g, "")
                .trim()
            const n = $(el)
                .text()
                .replace(/\s\s+/g, " ")
                .replace(/ *\([^)]*\) */g, "")
                .replace(/[0-9]/g, "")
                .trim();
            if (q !== "")
                quantity.push(q)
            if (n !== "") {
                ingredientName.push(n);
            }
        });

        $(".tags-list a").each((i, el) => {
            const tag = $(el)
                .text()
                .replace(/\s\s+/g, " ")
                .trim();
            if (tag !== "") {
                category.push(tag);
            }
        });

        console.log(items);

    } catch (error) {
        console.log(error);
    }
}

getJamiesRecipes();
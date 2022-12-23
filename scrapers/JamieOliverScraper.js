import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

export async function getJamiesRecipes(url) {
    try {
        const res = await fetch(url);

        const body = await res.text();

        const $ = cheerio.load(body);

        // const items = [];

        const userid = "3"
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
            .trim() || "N/A";
        const source = url;
        const ingredients = []
        const instructions = $(".method-p > div").first().text()
            .replace(/ *\([^)]*\) */g, "")
            .replace(/\s\s+/g, " ")
            .trim()
        const category = [];
        const photoURL = $("meta[property='og:image']").attr("content") ||
            $("meta[name='og:image']").attr("content") ||
            $("meta[itemprop='image']").attr("content");

        const items = {
            userid, userid,
            recipeName: recipeName,
            serveSize: parseInt(serveSize),
            source: source,
            cookingTime: cookingTime,
            ingredients: ingredients,
            instructions: instructions,
            category: category,
            photoURL: photoURL
        }

        $("ul.ingred-list li").each((i, el) => {
            const n = $(el)
                .text()
                .replace(/\s\s+/g, " ")
                .trim();
            if (n !== "") {
                ingredients.push(n);
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

        return items;

    } catch (error) {
        console.log(error);
    }
}
import Recipes from "../models/recipe.model.js";
import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../app.js";
import testData from "./testData/sampleRecipe.js";
const testDataArray = testData.recipes;
chai.use(chaiHttp);

describe(`Testing requests on the database`, () => {
  const testServer = chai.request(server).keepOpen();

  beforeEach(async () => {
    try {
      await Recipes.deleteMany();
      console.log(`Database cleared`);
    } catch (error) {
      console.log(`Error clearing`);
      throw new Error();
    }
    try {
      await Recipes.insertMany(testDataArray);
      console.log(`Database populated with test Recipes`);
    } catch (error) {
      console.log(`Error inserting`);
      throw new Error();
    }
  });
  describe(`/POST create a Recipes`, () => {
    it(`should create a SuccessFul Post request`, async () => {
      let recipes = {
        userid: 3,
        recipeName: "Cajun chicken traybake",
        serveSize: 4,
        source: "testsource",
        cookingTime: "1 hour",
        ingredients: ["2 red onions", "3 mixed-colour peppers"],
        instructions: "Preheat the oven",
        category: ["One-pan recipes", "Chicken"],
        photoURL: "www.abc.com",
      };

      const res = await testServer.post(`/addRecipe`).send(recipes);
      expect(res).to.have.status(201);
      expect(res.body).to.be.an(`object`);
      expect(res.body.message).to.be.eql("Recipe added!");
    });
    it(`should not create a Recipe without a userid field`, async () => {
      let recipes = {
        recipeName: "Cajun chicken traybake",
        serveSize: 4,
        source: "testsource",
        cookingTime: "1 hour",
        ingredients: ["2 red onions", "3 mixed-colour peppers"],
        instructions: "Preheat the oven",
        category: ["One-pan recipes", "Chicken"],
        photoURL: "www.abc.com",
      };

      const res = await testServer.post(`/addRecipe`).send(recipes);
      expect(res).to.have.status(422);
      expect(res).to.have.property(`error`);
      expect(res.body.message).to.be.eql(
        `Cannot add recipe at this time. Please try again.`
      );
    });
    it(`should not create a Recipe without a recipeName field`, async () => {
      let recipes = {
        userid: 3,
        serveSize: 4,
        source: "testsource",
        cookingTime: "1 hour",
        ingredients: ["2 red onions", "3 mixed-colour peppers"],
        instructions: "Preheat the oven",
        category: ["One-pan recipes", "Chicken"],
        photoURL: "www.abc.com",
      };

      const res = await testServer.post(`/addRecipe`).send(recipes);
      expect(res).to.have.status(200);
      expect(res).to.have.property(`error`);
      expect(res.body.message).to.be.eql(`Please enter a valid recipe name`);
    });
    it(`should not create a Recipe without a serveSize field`, async () => {
      let recipes = {
        userid: 3,
        recipeName: "Cajun chicken traybake",
        source: "testsource",
        cookingTime: "1 hour",
        ingredients: ["2 red onions", "3 mixed-colour peppers"],
        instructions: "Preheat the oven",
        category: ["One-pan recipes", "Chicken"],
        photoURL: "www.abc.com",
      };

      const res = await testServer.post(`/addRecipe`).send(recipes);
      expect(res).to.have.status(200);
      expect(res).to.have.property(`error`);
      expect(res.body.message).to.be.eql(`Please enter a valid serving size`);
    });
    it(`should not create a Recipe without a source field`, async () => {
      let recipes = {
        userid: 3,
        recipeName: "Cajun chicken traybake",
        serveSize: 4,
        cookingTime: "1 hour",
        ingredients: ["2 red onions", "3 mixed-colour peppers"],
        instructions: "Preheat the oven",
        category: ["One-pan recipes", "Chicken"],
        photoURL: "www.abc.com",
      };

      const res = await testServer.post(`/addRecipe`).send(recipes);
      expect(res).to.have.status(422);
      expect(res).to.have.property(`error`);
      expect(res.body.message).to.be.eql(
        `Cannot add recipe at this time. Please try again.`
      );
    });
    it(`should not create a Recipe without a cookingTime field`, async () => {
      let recipes = {
        userid: 3,
        recipeName: "Cajun chicken traybake",
        serveSize: 4,
        source: "testsource",
        ingredients: ["2 red onions", "3 mixed-colour peppers"],
        instructions: "Preheat the oven",
        category: ["One-pan recipes", "Chicken"],
        photoURL: "www.abc.com",
      };

      const res = await testServer.post(`/addRecipe`).send(recipes);
      expect(res).to.have.status(200);
      expect(res).to.have.property(`error`);
      expect(res.body.message).to.be.eql(`Please Enter a valid cooking time`);
    });
    it(`should not create a Recipe without an ingredients field`, async () => {
      let recipes = {
        userid: 3,
        recipeName: "Cajun chicken traybake",
        serveSize: 4,
        source: "testsource",
        cookingTime: "1 hour",
        instructions: "Preheat the oven",
        category: ["One-pan recipes", "Chicken"],
        photoURL: "www.abc.com",
      };

      const res = await testServer.post(`/addRecipe`).send(recipes);
      expect(res).to.have.status(422);
      expect(res).to.have.property(`error`);
      expect(res.body.message).to.be.eql(
        `Cannot add recipe at this time. Please try again.`
      );
    });
    it(`should not create a Recipe without an instructions field`, async () => {
      let recipes = {
        userid: 3,
        recipeName: "Cajun chicken traybake",
        serveSize: 4,
        source: "testsource",
        cookingTime: "1 hour",
        ingredients: ["2 red onions", "3 mixed-colour peppers"],
        category: ["One-pan recipes", "Chicken"],
        photoURL: "www.abc.com",
      };

      const res = await testServer.post(`/addRecipe`).send(recipes);
      expect(res).to.have.status(200);
      expect(res).to.have.property(`error`);
      expect(res.body.message).to.be.eql(
        `Instructions must be more than 2 characters`
      );
    });
    it(`should not create a Recipe without a category field`, async () => {
      let recipes = {
        userid: 3,
        recipeName: "Cajun chicken traybake",
        serveSize: 4,
        source: "testsource",
        cookingTime: "1 hour",
        ingredients: ["2 red onions", "3 mixed-colour peppers"],
        instructions: "Preheat the oven",
        photoURL: "www.abc.com",
      };

      const res = await testServer.post(`/addRecipe`).send(recipes);
      expect(res).to.have.status(200);
      expect(res).to.have.property(`error`);
      expect(res.body.message).to.be.eql(
        `Category must be more than 2 characters`
      );
    });
    it(`should not create a Recipe without a photoURL field`, async () => {
      let recipes = {
        userid: 3,
        recipeName: "Cajun chicken traybake",
        serveSize: 4,
        source: "testsource",
        cookingTime: "1 hour",
        ingredients: ["2 red onions", "3 mixed-colour peppers"],
        instructions: "Preheat the oven",
        category: ["One-pan recipes", "Chicken"],
      };

      const res = await testServer.post(`/addRecipe`).send(recipes);
      expect(res).to.have.status(422);
      expect(res).to.have.property(`error`);
      expect(res.body.message).to.be.eql(
        `Cannot add recipe at this time. Please try again.`
      );
    });
  });
});

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
  describe(`/GET Recipes`, () => {
    it(`should return all of the Recipes as an array`, async () => {
      const userid = 3;
      const category = "Chicken";
      const res = await testServer
        .get(`/searchRecipe/${userid}/${category}`)
        .send();
      expect(res).to.have.status(200);
      expect(res.body).to.be.an(`array`);
      expect(res.body.length).to.equal(2);
    });
  });
});

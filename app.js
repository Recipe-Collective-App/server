import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import methodOverride from "method-override";
import { router as imageRouter } from "./routes/imageRouter.js";
import { router as addRecipeRouter } from "./routes/addRecipeRouter.js";
import { router as getRecipeRouter } from "./routes/getRecipeRouter.js";
import { router as searchRecipeRouter } from "./routes/searchRecipeRouter.js";
import { router as urlAddRecipeRouter } from "./routes/urlAddRecipeRouter.js";
import { router as getImageRouter } from "./routes/getImageRouter.js";
import { router as deleteImageRouter } from "./routes/deleteImageRouter.js";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
mongoose.set("strictQuery", true);

let app = express();

const dbConnection = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(process.env.DBURI);
    console.log(`Connected to the database at: ${process.env.DBURI}`);
  } catch (e) {
    console.log(`Database failed to connect: ${e.message}`);
  }
};

dbConnection();
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(cors());
app.use(`/file`, imageRouter);
app.use(`/addRecipe`, addRecipeRouter);
app.use(`/getRecipe`, getRecipeRouter);
app.use(`/searchRecipe`, searchRecipeRouter);
app.use(`/urlAddRecipe`, urlAddRecipeRouter);
app.use(`/getImage`, getImageRouter);
app.use(`/deleteImage`, deleteImageRouter);

const server = app.listen(process.env.PORT, () => {
  console.log(`App is listening at http://localhost:${process.env.PORT}`);
});
export default server;

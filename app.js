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
const url = process.env.DB;
const connect = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Init gfs
let gfs;
dbConnection();
connect.once("open", () => {
  // Init stream
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "photos",
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(cors());
app.use(`/file`, imageRouter);
app.use(`/addRecipe`, addRecipeRouter);
app.use(`/getRecipe`, getRecipeRouter);
app.use(`/searchRecipe`, searchRecipeRouter);

// media GET routes and delete the routes of image.
app.get("/file/:filename", async (req, res) => {
  await gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      return res.status(200).json({
        success: false,
        message: "Image Not Found!",
      });
    }
    if (
      files[0].contentType === `image/jpeg` ||
      files[0].contentType === `image/png`
    ) {
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    } else {
      res.status(404).json({
        err: `Image Not Found!`,
      });
    }
  });
});

app.delete("/file/:id", async (req, res) => {
  await gfs.delete(new mongoose.Types.ObjectId(req.params.id)),
    (err, data) => {
      return res.status(404).json({ err: err });
    };
  res
    .status(200)
    .json({ success: true, message: `Image Deleted Successfully` });
});

const server = app.listen(process.env.PORT, () => {
  console.log(`App is listening at http://localhost:${process.env.PORT}`);
});
export default server;

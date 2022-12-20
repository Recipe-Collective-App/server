import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Grid from "gridfs-stream";
import methodOverride from "method-override";
import { router as imageRouter } from "./routes/imageRouter.js";

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
    await mongoose.connect(`mongodb://localhost:27017`);
    console.log(`Connected to the database at: ${`mongodb://localhost:27017`}`);
  } catch (e) {
    console.log(`Database failed to connect: ${e.message}`);
  }
};
let gfs;
dbConnection();
const conn = mongoose.connection;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});
console.log("GFS_______" + gfs);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(cors());
app.use(`/file`, imageRouter);
// media GET routes and delete the routes of image.
app.get("/file/:filename", async (req, res) => {
  try {
    const file = await gfs.files.find({ filename: req.params.filename });
    console.log("GET FileName------" + req.params.filename);
    console.dir(file);
    const readStream = gfs.createReadStream(file.filename);
    console.log(readStream);
    readStream.pipe(res);
  } catch (error) {
    res.send("not found");
  }
});

app.delete("/file/:filename", async (req, res) => {
  try {
    console.log(req.params.filename);
    await gfs.files.deleteOne({ filename: req.params.filename });
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("An error occured.");
  }
});

const server = app.listen(process.env.PORT, () => {
  //console.log(`App is listening at http://localhost:${process.env.PORT}`);
  console.log(`App is listening at http://localhost:4000`);
});
export default server;

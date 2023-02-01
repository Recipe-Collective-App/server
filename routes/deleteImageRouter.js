import mongoose from "mongoose";
import express from "express";
export const router = express.Router();

const url = `mongodb+srv://swetashah:chitter12@cluster0.a0ek0j7.mongodb.net/dbrecipe?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`;
const connect = mongoose.createConnection(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Init gfs
let gfs;
connect.once("open", () => {
  // Init stream
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "photos",
  });
});

router.route("/:id").delete(async (req, res) => {
  await gfs.delete(new mongoose.Types.ObjectId(req.params.id)),
    (err, data) => {
      return res.status(404).json({ err: err });
    };
  res
    .status(200)
    .json({ success: true, message: `Image Deleted Successfully` });
});

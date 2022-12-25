import mongoose from "mongoose";
import express from "express";
export const router = express.Router();

const url = `mongodb://localhost/image-upload`;
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

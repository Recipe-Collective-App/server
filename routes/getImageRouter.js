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

router.route("/:filename").get(async (req, res) => {
  await gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      return res.status(200).json({
        success: false,
        message: "Image Not Found!",
      });
    }
    if (
      files[0].contentType === `image/jpeg` ||
      files[0].contentType === `image/png` ||
      files[0].contentType === `image/heic`
    ) {
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    } else {
      res.status(404).json({
        err: `Image Not Found!`,
      });
    }
  });
});

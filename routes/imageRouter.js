import upload from "../middleware/upload.js";
import express from "express";
export const router = express.Router();

const PORT = process.env.PORT || 4001;
router.post("/upload", upload.single("file"), async (req, res) => {
  if (req.file === undefined) return res.send("You must select a file.");
  const imgUrl = `https://recipe-page-7duf.onrender.com/getImage/${req.file.filename}`;
  return res.send(imgUrl);
});

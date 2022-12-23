import upload from "../middleware/upload.js";
import express from "express";
export const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  if (req.file === undefined) return res.send("You must select a file.");
  const imgUrl = `http://localhost:4000/file/${req.file.filename}`;
  return res.send(imgUrl);
});

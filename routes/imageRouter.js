import upload from "../middleware/upload.js";
import express from "express";
export const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  console.log(`@@@@@@@@@@@` + req.file.filename);
  if (req.file === undefined) return res.send("you must select a file.");
  const imgUrl = `http://localhost:4000/file/${req.file.filename}`;
  console.log(`££££££££££££` + imgUrl);
  return res.send(imgUrl);
});

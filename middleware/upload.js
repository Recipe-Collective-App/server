import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

//When user send a image we check it's a valid image type or not.
//We save image in database and return it

const storage = new GridFsStorage({
  url: `mongodb+srv://swetashah:chitter12@cluster0.a0ek0j7.mongodb.net/dbrecipe?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg", "image/heic"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `${file.originalname}`,
    };
  },
});
export default multer({ storage });

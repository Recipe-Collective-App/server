import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

//When user send a image we check it's a valid image type or not.
//We save image in database and return it

//console.log(process.env.DB);
const storage = new GridFsStorage({
  url: `mongodb://localhost/image-upload`,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-any-name-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-any-name-${file.originalname}`,
    };
  },
});
export default multer({ storage });

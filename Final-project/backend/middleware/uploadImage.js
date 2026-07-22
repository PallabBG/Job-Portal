const multer = require("multer");
const path = require("path");
const fs = require("fs");

const createUpload = (folderName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = `uploads/${folderName}`;

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },

    filename: function (req, file, cb) {
      const uniqueName =
        Date.now() + "_" + Math.round(Math.random() * 1000000);

      cb(null, uniqueName + path.extname(file.originalname));
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowed = /jpg|jpeg|png|webp/;

    const extname = allowed.test(
      path.extname(file.originalname).toLowerCase()
    );

    const mimetype = allowed.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  };

  return multer({
    storage,
    fileFilter,
  });
};

module.exports = createUpload;
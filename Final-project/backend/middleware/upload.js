const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../server/utils/cloudinary");
const path = require("path");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "jobportal/uploads",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
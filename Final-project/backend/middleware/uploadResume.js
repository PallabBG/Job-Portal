const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../server/utils/cloudinary");
const path = require("path");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "jobportal/resumes",
    resource_type: "auto",
    allowed_formats: ["pdf"],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
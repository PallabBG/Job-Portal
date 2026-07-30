const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../server/utils/cloudinary");
const path = require("path");

const createUpload = (folderName) => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: `jobportal/${folderName}`,
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
    },
  });

  return multer({ storage: storage });
};

module.exports = createUpload;
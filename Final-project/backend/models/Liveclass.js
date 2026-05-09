const mongoose = require("mongoose");

const liveclassSchema = new mongoose.Schema(
  {
    title: String,
    subject: String,
    employerName: String,
    date:String,
    time:String,
    roomName:String,
    roomUrl:String,
    createdBy: String,
    createdByRole: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Liveclasses",liveclassSchema);
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: String,
    senderName: String,
    senderRole: String,

    receiverId:String,
    message:String,
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
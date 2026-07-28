const Message = require("../models/Message");
const User = require("../models/User");

exports.getmessages = async(req,res)=>{
    try {
        const {senderId,receiverId} = req.params;

        const messages = await Message.find({
            $or:[
                {
                    senderId,
                    receiverId,
                },
                {
                    senderId:receiverId,
                    receiverId:senderId,
                },
            ],
        });
        res.json(messages);
    } catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" }); 
    }
}


exports.getConversations = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: userId },
        { receiverId: userId },
      ],
    }).sort({ updatedAt: -1 });

    const uniqueUsers = new Map();

    for (const msg of messages) {
      const otherUserId =
        msg.senderId === userId
          ? msg.receiverId
          : msg.senderId;

      if (!uniqueUsers.has(otherUserId)) {
        const user = await User.findById(otherUserId).select(
          "name profileImage role companyProfile"
        );

        if (user) {
          // Calculate unread count for this specific conversation
          const unreadCount = messages.filter(
            (m) => m.senderId === otherUserId && m.receiverId === userId && m.isRead !== true
          ).length;

          uniqueUsers.set(otherUserId, { ...user.toObject(), unreadCount });
        }
      }
    }

    res.json([...uniqueUsers.values()]);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to fetch conversations",
    });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    
    // Mark all messages from sender to receiver as read
    // Use $ne: true to include older messages that don't have the isRead field
    await Message.updateMany(
      { senderId, receiverId, isRead: { $ne: true } },
      { $set: { isRead: true } }
    );

    res.status(200).json({ message: "Messages marked as read" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to mark messages as read" });
  }
};

exports.getUnreadCount = async (req, res) => {
  try {
    const { userId } = req.params;
    // Use $ne: true to include older messages that don't have the isRead field
    const count = await Message.countDocuments({ receiverId: userId, isRead: { $ne: true } });
    res.status(200).json({ unreadCount: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch unread count" });
  }
};
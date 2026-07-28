const Message = require("../models/Message");

const users = {};

// Get socket id of a connected user
const getUserSocket = (userId) => users[userId];

const sockethandeler = (io) => {
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // ==========================
    // User joins
    // ==========================
    socket.on("join", (userId) => {
      users[userId] = socket.id;
      console.log("Joined:", userId);
    });

    // ==========================
    // User leaves (Logout)
    // ==========================
    socket.on("leave", (userId) => {
      delete users[userId];
      console.log("Left:", userId);
    });

    // ==========================
    // Send Notification
    // ==========================
    socket.on("sendNotification", ({ receiverId, notification }) => {
      const receiverSocketId = users[receiverId];

      if (receiverSocketId) {
        io.to(receiverSocketId).emit(
          "receiveNotification",
          notification
        );
      }
    });

    // ==========================
    // Notification Read
    // ==========================
    socket.on("notificationsRead", () => {
      socket.emit("notificationsUpdated");
    });

    // ==========================
    // Messages Read
    // ==========================
    socket.on("messagesRead", () => {
      socket.emit("messagesUpdated");
    });

    // ==========================
    // Send Chat Message
    // ==========================
    socket.on("sendMessage", async (data) => {
      try {
        const savedMsg = await Message.create(data);

        const receiverSocketId = users[data.receiverId];

        if (receiverSocketId) {
          io.to(receiverSocketId).emit(
            "receiveMessage",
            savedMsg
          );
        }

        // Send message back to sender
        socket.emit("receiveMessage", savedMsg);

      } catch (err) {
        console.log("Socket Error:", err);
      }
    });

    // ==========================
    // Disconnect
    // ==========================
    socket.on("disconnect", () => {

      for (const userId in users) {
        if (users[userId] === socket.id) {
          delete users[userId];
          console.log("Disconnected:", userId);
          break;
        }
      }

      console.log("User Disconnected:", socket.id);
    });
  });
};

module.exports = {
  sockethandeler,
  getUserSocket,
};
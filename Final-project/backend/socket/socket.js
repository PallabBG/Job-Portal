const Message = require("../models/Message");
const users = {};

const sockethandeler = (io)=>{
    io.on("connection",(socket)=>{
        console.log("user connected");
        socket.on("join",(userId)=>{
            users[userId] = socket.id;
            console.log("joined:",userId);
        });

        socket.on("sendMessage", async(data)=>{
            try {
                const savedmsg = await Message.create(data);
                const receversocketid = users[data.receiverId];

                if(receversocketid) {
                    io.to(receversocketid).emit(
                        "receiveMessage",
                        savedmsg
                    );
                }
                socket.emit(
                   "receiveMessage",
                        savedmsg  
                );
            } catch(err){
                console.log("Socket Error:", err);
            }
        });
        socket.on("disconnect", ()=>{
            console.log("user disconnected");
        });
    });
};
module.exports = sockethandeler;
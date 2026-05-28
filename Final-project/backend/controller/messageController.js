const Message = require("../models/Message");

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
        res.status(500).json({ message: "Internal Server Error" }); // Add this line
    }
}
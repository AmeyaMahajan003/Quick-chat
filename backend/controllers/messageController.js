const router = require('express').Router();
const authmiddleware = require('../middlewares/authMiddleware');
const Chat = require('../models/chat');
const Message = require('../models/message');

router.post('/new-message',authmiddleware,async (req,res)=>{
    try {
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();

        const currentChat = await Chat.findOneAndUpdate({_id : req.body.chatId}, {lastMessage:savedMessage._id,$inc : {unreadMessagesCount : 1} });

        res.status(201).json({
            success : true,
            message : "Message sent successfully",
            data : savedMessage
        });
        
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        });
    }
});

router.get('/get-all-messages/:chatId',authmiddleware, async (req,res)=>{
    try {
        const allMessages = await Message.find({chatId: req.params.chatId}).sort({createdAt : 1 });
        res.status(200).json({
            success : true,
            message : "Messages fetch successfully",
            data : allMessages
        });
        
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        });
    }
});

module.exports = router;
const router = require('express').Router();
const authmiddleware = require('../middlewares/authMiddleware');
const Chat = require('../models/chat');

router.post('/create-new-chat',authmiddleware,async (req,res)=>{
    try {
        const chat = new Chat(req.body);
        const savedChat = await chat.save();

        res.status(201).json({
            success : true,
            message : "Chat created successfully",
            data : savedChat
        });
        
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        });
    }
});

router.get('/get-all-chats',authmiddleware, async (req,res)=>{
    try {
        const allChats = await Chat.find({members: {$in: req.body.userId}}).populate('members').sort({updatedAt : -1});
        res.status(200).json({
            success : true,
            message : "Chat fetch successfully",
            data : allChats
        });
        
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        });
    }
});

module.exports = router;
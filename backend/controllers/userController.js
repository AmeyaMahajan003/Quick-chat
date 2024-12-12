const router = require('express').Router();
const User = require('../models/user');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/get-logged-user', authMiddleware ,async (req,res) => {
    try {
        const user = await User.findOne({_id : req.body.userId},{password : 0});
        res.json({
            success : true,
            message : "User fetched successfully",
            data : user
        });
        
    } catch (error) {
        res.json({
            success : false,
            message : error.message
        });
    }
})

router.get('/get-all-user', authMiddleware ,async (req,res) => {
    try {
        const allUsers = await User.find({_id : {$ne : req.body.userId}},{password : 0});
        res.json({
            success : true,
            message : "All users fetched successfully",
            data : allUsers
        });
        
    } catch (error) {
        res.json({
            success : false,
            message : error.message
        });
    }
})

module.exports = router
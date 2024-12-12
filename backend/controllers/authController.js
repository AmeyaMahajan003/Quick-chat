const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup',async (req,res)=>{
    try {
        const user = await User.findOne({email : req.body.email});
        if(user){
            return res.json({
                success : false,
                message : "user already exist"
            });
        }

        const hashedpassword = await bcrypt.hash(req.body.password , 10);
        req.body.password = hashedpassword;
        
        
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({
            success : true,
            message : "user created successfully"
        });
        
    } catch (error) {
        res.json({
            success : false,
            message : error.message
        });
    }
});

router.post('/login', async (req,res)=>{
    try {
        const user = await User.findOne({email : req.body.email});
        if(!user){
            return res.json({
                success : false,
                message : "user does not exist"
            });
        }
        
        const isValid =  await bcrypt.compare(req.body.password,user.password);
        if(!isValid){
            return res.json({
                success : false,
                message : "Invalid password"
            });
        }

        const token = jwt.sign({userId : user._id},process.env.SECRET_KEY,{expiresIn : '1d'});
        res.status(200).json({
            success : true,
            message : "User Login Successful",
            token
        });

        
    } catch (error) {
        res.json({
            success : false,
            message : error.message
        });
    }
});

module.exports = router;
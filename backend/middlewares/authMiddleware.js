const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];

        const decodedToken = jwt.verify(token,process.env.SECRET_KEY);
        req.body.userId = decodedToken.userId ; 

        next();

    } catch (error) {
        res.json({
            success : false,
            message : error.message
        });
    }
}
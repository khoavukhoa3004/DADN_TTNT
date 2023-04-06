const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
exports.isAuthenticated = async (req, res, next) => {
    if(req.headers && req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];
        // console.log(token);
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decode.userID);
    
            // check if no user
            if(!user){
                console.log("No user found");
                return res.json({success: false, message: 'Unauthorized access!'});
            }
    
            req.user = user;
            next();
        } catch (error){
            if(error.name ==='JsonWebTokenError'){
                return res.json({success: false, message:"Unauthorize acess"});
            }
            if(error.name === 'TokenExpiredError'){
                return res.json({success: false, message:"Sesson expired, try Sign In again!"});
            }
            res.json({success: false, message: "Internal server error!"});
        }
    }
    else {
        res.json({success: false, message: 'Unauthorized access!'});
    }

}
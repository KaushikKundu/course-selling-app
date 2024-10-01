const jwt = require('jsonwebtoken');
const JWT_USER_PASSWORD = require("../config")

 function userAuthMiddleware(req,res,next){
    const token = req.headers.token;
    try{
        const decoded = jwt.verify(token,JWT_USER_PASSWORD);
        if(decoded){
            req.userId = decoded.id;
            next();
        }else{
            return res.status(404).json({
                message:"Not authenticated"
            })
        }
    }catch(err){
        console.log(err);
        
        res.status(403).json({
            message:"something went wrong"
        })
    }
}
module.exports = {
    userAuthMiddleware
}
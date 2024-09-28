const jwt = require('jsonwebtoken');
const JWT_USER_PASSWORD = require("../config")

 function userAuthMiddleware(req,res,next){
    const token = req.headers.token;
    const decoded = jwt.verify(token,JWT_USER_PASSWORD);
    if(decoded){
        req.userId = decoded.id;
        next();
    }else{
        return res.status(404).json({
            message:"Not authenticated"
        })
    }
}
module.exports = {
    userAuthMiddleware
}
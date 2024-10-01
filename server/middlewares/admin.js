const jwt = require('jsonwebtoken');
const {JWT_ADMIN_PASSWORD} = require("../config")

 function adminAuthMiddleware(req,res,next){
    const token = req.headers.token;
    const decoded = jwt.verify(token,JWT_ADMIN_PASSWORD);
    console.log(decoded);
    
    if(decoded){
        req.userId = decoded.userId;
        next();
    }else{
        return res.status(403).json({
            message:"Not authenticated"
        })
    }
}
module.exports = {
    adminAuthMiddleware
}
const {Router} = require("express");
const JWT_USER_PASSWORD = require("../config")
const userRouter = Router();

userRouter.post('/login', async (req,res) => {
    const {email,password} = req.body;
    const existingUser = usermodel.findOne({email});
    if(!existingUser){
        return res.status(403).json({
            message:"user doesn't exist"
        })
    }
    try{
        const token = await jwt.sign({email,password}, JWT_USER_PASSWORD);
        return res.status(200).json({
            userId: user._id,
            token,
            message:"login successful"
        })
    }catch(error){
        res.json({
            error,
            message:"login failed"
        })
    }
})

userRouter.get('/courses', (req,res) => {
    
})

userRouter.post('/signup', async (req,res)=>{
    const {email,firstname,lastname,password} = req.body;
    const hashedPassword = bcrypt.hash(password);
    const existingUser = usermodel.findOne({email});
    if(existingUser){
        return res.status(403).json({
            message:"email already exists"
        })
    }
    const user = await usermodel.create({
        firstname,
        lastname,
        email,
        hashedPassword
    })
    return res.status(200).json({
        userId: user._id,
        message:"user created successfully"
    })
})

module.exports = {
    userRouter
}
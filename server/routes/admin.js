const {Router} = require("express");

const adminRouter = Router();

adminRouter.post('/login', (req,res) => {
    res.json({
        message:"login"
    })
})

adminRouter.get('/courses', (req,res) => {

})

adminRouter.post('/signup', (req,res)=>{

})

module.exports = {
    adminRouter
}
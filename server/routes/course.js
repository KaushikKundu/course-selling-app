const {Router} = require("express");

const courseRouter = Router();

courseRouter.post('/purchase', (req,res)=> {
    res.json({
        message:"purchase endopoit"
    })
})
courseRouter.get('/preview', (req,res)=> {
    res.json({
        message:"preview endpoint"
    })
})

module.exports = {
    courseRouter
}
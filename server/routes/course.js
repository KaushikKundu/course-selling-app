const { Router } = require("express");
const { userAuthMiddleware } = require("../middlewares/user");
const { courseModel, userModel, purchaseModel } = require("../db/db");
const courseRouter = Router();

courseRouter.post("/purchase", userAuthMiddleware, async (req, res) => {
  const { courseId } = req.body;
  const userId = req.userId;
  const user = await userModel.findById(userId);
  try {
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "course not found",
      });
    }
    const purchase = await purchaseModel.findOne({ userId, courseId });
    if (purchase) {
      return res.status(400).json({
        message: "course already purchased",
      });
    }
    await purchaseModel.create({
      userId,
      courseId,
    });
    res.json({
      courseId,
      message: `${course.title} purchased successfullly`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err,
      message: "something went wrong",
    });
  }
});
courseRouter.get("/preview",async (req, res) => {
    try{
        const courses = await courseModel.find({});
        res.status(200).json({
            courses,
            message:"all courses fetched"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            err,
            message:"something went wrong"
        })
    }
  
});

module.exports = {
  courseRouter,
};

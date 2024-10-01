const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db/db");
const {JWT_ADMIN_PASSWORD} = require("../config")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {adminAuthMiddleware} = require("../middlewares/admin")

adminRouter.get("/test", (req, res) => {
  res.json({
    message: "admin",
  });
});
adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await adminModel.findOne({ email });
  if (!existingUser) {
    return res.status(403).json({
      message: "user doesn't exist",
    });
  }
  //console.log(existingUser);
  const userId = existingUser._id;
  // Compare the provided password with the stored hashed password
  const isPasswordValid = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordValid) {
    return res.status(403).json({
      message: "wrong password",
    });
  }
  try {
    const token = jwt.sign({ email, userId }, JWT_ADMIN_PASSWORD);
    return res.status(200).json({
      userId,
      token,
      message: "login successful",
    });
  } catch (error) {
    res.json({
      error,
      message: "login failed",
    });
  }
});

adminRouter.post("/course",adminAuthMiddleware, async (req, res) => {
    const {title,description,price,imageUrl} = req.body;
    const userId = req.userId;
    console.log(userId);
    const course = await courseModel.create({
        title,
        description,
        price,
        imageUrl,
        creatorId: userId
    });
    return res.json({
        courseId:course._id,
      message: "course created successfully",
    });
  });


adminRouter.post("/signup", async (req, res) => {
    const { email, firstname, lastname, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const existingUser = await adminModel.findOne({ email });
    console.log(existingUser);
  
    if (existingUser) {
      return res.status(403).json({
        message: "email already exists",
      });
    }
    try {
      const user = await adminModel.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
      });
      const userId = user._id;
      const token = jwt.sign({ email, userId }, JWT_ADMIN_PASSWORD);
      return res.status(200).json({
        userId,
        token,
        message: "user created successfully",
      });
    } catch (err) {
      return res.status(500).json({
        err,
        message: "signup failed",
      });
    }
  });

adminRouter.put("/course",adminAuthMiddleware, async (req,res) => {
    const {courseId,title,description,price,imageUrl} = req.body;
    const userId = req.userId;
    const course = await courseModel.findOne({_id:courseId});
    if(!course){
        return res.status(404).json({
            message: "course not found",
        })
    }
    if(course.creatorId?.toString() !== userId){
        return res.status(403).json({
            message: "you are not authorized to update this course",
        })
    }
    await courseModel.findByIdAndUpdate(courseId,{
        title,
        description,
        price,
        imageUrl,
    })
    return res.json({
        message: "course updated"
    })
})
  
module.exports = {
  adminRouter,
};

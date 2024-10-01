const { Router } = require("express");
const { JWT_USER_PASSWORD } = require("../config");
const userRouter = Router();
const { userModel, purchaseModel, courseModel } = require("../db/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

userRouter.get("/test", (req, res) => {
  res.json({
    message: "user route working",
  });
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await userModel.findOne({ email });
  if (!existingUser) {
    return res.status(403).json({
      message: "user doesn't exist",
    });
  }
  console.log(existingUser);
  const userId = existingUser._id;
  // Compare the provided password with the stored hashed password
  const isPasswordValid = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordValid) {
    return res.status(403).json({
      message: "wrong password",
    });
  }
  try {
    const token = jwt.sign({ email, userId }, JWT_USER_PASSWORD);
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

//get all bought courses
userRouter.get("/purchases", async (req, res) => {
  const userId = req.userId;
  const purchases = await purchaseModel.find({ userId });
  let purchasedCourseIds = [];
  purchases.map((item) => {
    purchasedCourseIds.push(item.courseId);
  });
  const courses = await courseModel.find({ _id: { $in: purchasedCourseIds } });
  return res.json({
    courses,
    message: "courses fetched successfully",
  });
});

userRouter.post("/signup", async (req, res) => {
  const { email, firstname, lastname, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const existingUser = await userModel.findOne({ email });
  //console.log(existingUser);
  console.log("JWT_USER_PASSWORD:", JWT_USER_PASSWORD);

  if (existingUser) {
    return res.status(403).json({
      message: "email already exists",
    });
  }
  try {
    const user = await userModel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    const userId = user._id;
    const token = jwt.sign({ email, userId }, JWT_USER_PASSWORD);
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

module.exports = {
  userRouter,
};

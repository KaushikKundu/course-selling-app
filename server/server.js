const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());

const {userRouter} = require("./routes/user")
const {courseRouter} = require("./routes/course")
const {adminRouter} = require("./routes/admin")
const secret = process.env.JWT_SECRET;  // This should be in an environment variable in a real application
const port = process.env.PORT;

app.use('api/v1/user', userRouter);
app.use('api/v1/admin', adminRouter);
app.use('api/v1/course', courseRouter);

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
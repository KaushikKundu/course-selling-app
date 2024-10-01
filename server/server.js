const express = require('express');
const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());

const {userRouter} = require("./routes/user")
const {courseRouter} = require("./routes/course")
const {adminRouter} = require("./routes/admin")

const secret = process.env.JWT_SECRET;  // This should be in an environment variable in a real application
const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/course', courseRouter);
app.get('/api/v1/test', (req, res) => {
    res.send('Hello, World!');
});
async function dbConnect() {
    await mongoose.connect(MONGO_URL);
    console.log("db connected");
    app.listen(port, () => {
        console.log('Server is listening on port 3000');
    });
}
dbConnect();

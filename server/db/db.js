const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    firstname:String,
    lastname:String,
    email:{type:String, unique:true},
    password:String
})
const adminSchema = new Schema({
    firstname:String,
    lastname:String,
    email:{type:String, unique:true},
    password:String
})
const courseSchema = new Schema({
    title:String,
    description:String,
    price:Number,
    creatorId:ObjectId,
    imageUrl:String
})
const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}
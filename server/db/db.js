import {Schema} from "mongoose";
import mongoose from "mongoose";

mongoose.connect("");

const userSchema = new Schema({
    name: {
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    courses: {
        type:Array,

    }
})
const adminSchema = new Schema({
     name: {
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    courses: {
        type:Array,
        
    }
})
const courseSchema = new Schema({
    courseId:{type: Schema.Types.ObjectId, ref:'Admins'},
    
})

const User = new mongoose.model('User',userSchema);
const Admin = new mongoose.model('Admin',adminSchema);
const Course = new mongoose.model('Course',courseSchema);

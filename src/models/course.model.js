import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    class:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"classes",
        required:true
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
},{timestamps:true});

export const courseModel = mongoose.model("course",courseSchema);
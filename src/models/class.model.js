import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name:{
    type:String,
    unique:true
  },

  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  }],
  latitude:Number,
  longitude:Number,
  radius:Number,
  section:String

}, { timestamps: true });

export const classModel = mongoose.model("class",classSchema);
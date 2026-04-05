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

  // 🔥 GPS
  location: {
    latitude: Number,
    longitude: Number,
    radius: {
      type: Number,
      default: 30,
    }
  }

}, { timestamps: true });

export const classModel = mongoose.model("class",classSchema);
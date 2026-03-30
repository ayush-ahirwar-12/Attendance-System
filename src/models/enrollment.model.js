import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  }

}, { timestamps: true });

export const enrollementModel = mongoose.model("enrollment",enrollmentSchema);
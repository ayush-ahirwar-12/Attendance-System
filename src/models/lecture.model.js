import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "courses",
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classes",
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,    // "09:00"
    required: true
  },
  endTime: {
    type: String,    // "10:00"
    required: true
  },
  topic: {
    type: String     // teacher baad me fill karega
  },
  status: {
    type: String,
    enum: ["scheduled", "ongoing", "completed", "cancelled"],
    default: "scheduled"
  },
  cancelReason: {
    type: String,
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"     // manager
  }
}, { timestamps: true });

export const lectureModel = mongoose.model("lectures", lectureSchema);
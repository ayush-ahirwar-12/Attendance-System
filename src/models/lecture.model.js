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
  semester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "semesters",
    required: true
  },
  timetable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "timetables"
  },
  date: {
    type: Date,
    required: true
  },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  topic: { type: String, default: null },
  room: String,
  type: {
    type: String,
    enum: ["regular", "extra"],
    default: "regular"
  },
  status: {
    type: String,
    enum: ["scheduled", "ongoing", "completed", "cancelled"],
    default: "scheduled"
  },
  cancelReason: { type: String, default: null },
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    default: null
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
}, { timestamps: true });

export const lectureModel = mongoose.model("lectures", lectureSchema);
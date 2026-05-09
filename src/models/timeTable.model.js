import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
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
  dayOfWeek: {
    type: Number,
    required: true  // 0=Sun, 1=Mon ... 6=Sat
  },
  startTime: {
    type: String,
    required: true  // "09:00"
  },
  endTime: {
    type: String,
    required: true  // "10:00"
  },
  room: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
}, { timestamps: true });

export const timetableModel = mongoose.model("timetables", timetableSchema);
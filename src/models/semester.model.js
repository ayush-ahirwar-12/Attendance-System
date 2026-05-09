import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true   // "Semester 5 - 2024"
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["upcoming", "active", "completed"],
    default: "upcoming"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
}, { timestamps: true });

export const semesterModel = mongoose.model("semesters", semesterSchema);
import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  semester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "semesters",
    required: true
  },
  type: {
    type: String,
    enum: ["national", "regional", "college"],
    default: "college"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
}, { timestamps: true });

export const holidayModel = mongoose.model("holidays", holidaySchema);